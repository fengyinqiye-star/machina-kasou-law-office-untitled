# カソウ法律事務所 コーポレートサイト / Kasou Law Office Website

東京都千代田区丸の内のカソウ法律事務所のコーポレートサイトです。日本語・英語の二言語に対応しています。

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **多言語対応**: next-intl
- **フォーム**: react-hook-form + zod
- **メール送信**: Resend
- **アニメーション**: framer-motion
- **デプロイ**: Vercel

## セットアップ

### 前提条件

- Node.js 18.x 以上
- npm

### インストール

```bash
npm install
```

### 環境変数の設定

`.env.local.example` をコピーして `.env.local` を作成し、必要な環境変数を設定してください。

```bash
cp .env.local.example .env.local
```

| 環境変数 | 説明 | 必須 |
|---------|------|------|
| `RESEND_API_KEY` | Resend APIキー（メール送信用） | はい |
| `RESEND_FROM_EMAIL` | メール送信元アドレス | はい |
| `NOTIFICATION_EMAIL` | 相談予約通知先メールアドレス | はい |

### 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でサイトを確認できます。`/ja/` が日本語、`/en/` が英語です。

### ビルド

```bash
npm run build
npm run start
```

## ディレクトリ構成

```
src/
├── app/
│   ├── [locale]/          # ロケール別ページ
│   │   ├── page.tsx       # トップページ
│   │   ├── practice-areas/# 取扱業務
│   │   ├── lawyers/       # 弁護士紹介
│   │   ├── office/        # 事務所概要
│   │   ├── fees/          # 料金案内
│   │   ├── contact/       # 相談予約フォーム
│   │   ├── privacy-policy/# プライバシーポリシー
│   │   └── disclaimer/    # 免責事項
│   └── api/contact/       # 相談予約API
├── components/            # UIコンポーネント
├── i18n/                  # 多言語設定
├── lib/                   # ユーティリティ
└── types/                 # 型定義
messages/
├── ja.json                # 日本語翻訳
└── en.json                # 英語翻訳
```

## 翻訳テキストの編集

`messages/ja.json` と `messages/en.json` を編集してください。変更後はビルドし直す必要があります。

## デプロイ

Vercelにデプロイする場合は、以下の環境変数をVercelプロジェクトに設定してください:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `NOTIFICATION_EMAIL`
