import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // next-intl v3 の推奨 matcher パターン
  // /_next/ や /api/ 等の内部パスを除く全パスにミドルウェアを適用
  matcher: [
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
