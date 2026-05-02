import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
  // React Compiler는 일부 컨텍스트 라이브러리와 호환 이슈가 있어 비활성화
  reactCompiler: false
};

export default withNextIntl(nextConfig);
