import path from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // 상위 디렉터리에 다른 lockfile이 있어 Next가 워크스페이스 루트를 홈 디렉터리로
  // 추론한다. 파일 추적 범위가 과도해지므로 이 프로젝트로 고정한다.
  outputFileTracingRoot: path.resolve(__dirname),
};

export default withNextIntl(nextConfig);
