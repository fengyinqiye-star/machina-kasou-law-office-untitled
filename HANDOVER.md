# 引き渡しガイド / Handover Guide

## 1. コンテンツの更新方法

### テキストの変更

全てのテキストは翻訳ファイルで管理されています。

- **日本語**: `messages/ja.json`
- **英語**: `messages/en.json`

JSONファイルを編集し、ビルドし直してデプロイしてください。

例: 電話番号を変更する場合
```json
// messages/ja.json
"common": {
  "phone": "03-5678-1234",  // ← ここを変更
  ...
}
```

### 弁護士写真の差し替え

現在はプレースホルダー（グレーのアイコン）が表示されています。実際の写真に差し替えるには:

1. 写真を `public/images/` に配置（推奨サイズ: 600x800px、JPGまたはWebP）
2. `src/components/home/LawyersPreview.tsx` と `src/app/[locale]/lawyers/page.tsx` のプレースホルダーSVGを `<Image>` コンポーネントに置き換え

### 取扱業務の追加

1. `messages/ja.json` と `messages/en.json` の `practiceAreas.categories` に新しいカテゴリを追加
2. `src/types/index.ts` の `PRACTICE_AREA_SLUGS` に新しいスラグを追加

### 料金の更新

`messages/ja.json` と `messages/en.json` の `fees.categories` セクションを編集してください。

## 2. 環境変数一覧

| 変数名 | 用途 | 設定場所 |
|--------|------|---------|
| `RESEND_API_KEY` | メール送信API | Vercel環境変数 |
| `RESEND_FROM_EMAIL` | メール送信元アドレス | Vercel環境変数 |
| `NOTIFICATION_EMAIL` | 相談予約通知先 | Vercel環境変数 |

## 3. 技術的な情報

- **フレームワーク**: Next.js 14
- **パッケージマネージャ**: npm
- **ホスティング**: Vercel
- **Node.js**: 18.x以上

## 4. よくある作業

### テキスト変更のみの場合

1. `messages/ja.json` or `messages/en.json` を編集
2. `npm run build` でビルド確認
3. Gitにpushしてデプロイ

### 新しいページの追加

1. `src/app/[locale]/新ページ名/page.tsx` を作成
2. 翻訳ファイルに対応するキーを追加
3. ヘッダー・フッターのナビゲーションに追加

## 5. 本番運用における注意事項

### レートリミットについて

お問い合わせフォームのレートリミット（`src/lib/rateLimit.ts`）は、現在インメモリ（Map）で実装されています。
Vercel Serverless環境ではLambdaインスタンスごとにメモリが分離されるため、本番運用では十分なスパム防止効果が得られない場合があります。

本格的なスパム対策が必要な場合は、以下への移行を推奨します:
- **Vercel KV**（Redis互換）: `@vercel/kv` パッケージを使用
- **Upstash Redis**: `@upstash/redis` パッケージを使用

現在の実装でも開発環境やある程度のスパム防止には有効です。

## 6. お問い合わせ

技術的なお問い合わせは開発チームまでご連絡ください。
