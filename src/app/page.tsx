import { redirect } from "next/navigation";

// ルートパス（/）へのアクセスをデフォルトロケール（/ja）にリダイレクト
// next-intl のミドルウェアが処理する前にこのページが返される場合のフォールバック
export default function RootPage() {
  redirect("/ja");
}
