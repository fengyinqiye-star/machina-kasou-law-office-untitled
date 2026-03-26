import { Resend } from "resend";
import type { ContactFormInput } from "./validators/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

const categoryLabels: Record<string, { ja: string; en: string }> = {
  divorce: { ja: "離婚・家事事件", en: "Divorce & Family Law" },
  inheritance: { ja: "相続・遺言", en: "Inheritance & Wills" },
  labor: { ja: "労働問題", en: "Employment & Labor Law" },
  corporate: { ja: "企業法務", en: "Corporate Law" },
  traffic: { ja: "交通事故", en: "Traffic Accidents" },
  "real-estate": { ja: "不動産トラブル", en: "Real Estate Disputes" },
  other: { ja: "その他", en: "Other" },
};

export async function sendNotificationEmail(data: ContactFormInput) {
  const categoryLabel =
    categoryLabels[data.category]?.ja || data.category;
  const now = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "noreply@ai-company.dev",
    to: process.env.NOTIFICATION_EMAIL || "futo0819@i.softbank.jp",
    subject: `[相談予約] ${data.name}様より - ${categoryLabel}`,
    html: `
      <h2>新しい相談予約が入りました</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;width:120px;">お名前</td><td style="padding:8px;border:1px solid #ddd;">${esc(data.name)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">電話番号</td><td style="padding:8px;border:1px solid #ddd;">${esc(data.phone)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">メール</td><td style="padding:8px;border:1px solid #ddd;">${esc(data.email)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">カテゴリ</td><td style="padding:8px;border:1px solid #ddd;">${esc(categoryLabel)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">希望日時</td><td style="padding:8px;border:1px solid #ddd;">${esc(data.preferredDate)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">相談内容</td><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap;">${esc(data.message)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">言語</td><td style="padding:8px;border:1px solid #ddd;">${data.locale === "ja" ? "日本語" : "English"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">送信日時</td><td style="padding:8px;border:1px solid #ddd;">${now}</td></tr>
      </table>
    `,
  });
}

export async function sendAutoReplyEmail(data: ContactFormInput) {
  const isJa = data.locale === "ja";

  const subject = isJa
    ? "[カソウ法律事務所] ご相談のお申し込みを受け付けました"
    : "[Kasou Law Office] Your consultation request has been received";

  const html = isJa
    ? `
      <div style="font-family:'Hiragino Sans','Noto Sans JP',sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#0B1628;">${esc(data.name)} 様</h2>
        <p>この度は、カソウ法律事務所にご相談のお申し込みをいただき、誠にありがとうございます。</p>
        <p>ご相談予約を受け付けました。<strong>3営業日以内</strong>に担当者よりご連絡いたします。</p>
        <hr style="border:none;border-top:1px solid #D4C5A9;margin:24px 0;" />
        <p style="font-size:14px;color:#555;">
          お急ぎの場合は、お電話にてご連絡ください。<br/>
          電話: <a href="tel:0312345678">03-1234-5678</a><br/>
          営業時間: 平日 9:00 - 18:00
        </p>
        <p style="font-size:12px;color:#999;">
          ※ このメールは自動送信されています。このメールに返信いただいてもお応えできない場合がございます。
        </p>
      </div>
    `
    : `
      <div style="font-family:'Noto Sans',sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#0B1628;">Dear ${esc(data.name)},</h2>
        <p>Thank you for submitting a consultation request to Kasou Law Office.</p>
        <p>We have received your request and will contact you <strong>within 3 business days</strong>.</p>
        <hr style="border:none;border-top:1px solid #D4C5A9;margin:24px 0;" />
        <p style="font-size:14px;color:#555;">
          For urgent matters, please call us directly.<br/>
          Phone: <a href="tel:+81312345678">+81-3-1234-5678</a><br/>
          Business Hours: Weekdays 9:00 AM - 6:00 PM (JST)
        </p>
        <p style="font-size:12px;color:#999;">
          This is an automated message. Please do not reply to this email.
        </p>
      </div>
    `;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "noreply@ai-company.dev",
    to: data.email,
    subject,
    html,
  });
}
