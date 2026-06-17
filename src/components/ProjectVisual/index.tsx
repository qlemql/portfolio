import type { Locale } from "@/data/resume";
import AdAdminVisual from "./AdAdminVisual";
import AiCollabVisual from "./AiCollabVisual";
import AiStoreWebviewVisual from "./AiStoreWebviewVisual";
import B2cOtaVisual from "./B2cOtaVisual";
import CrossCodebaseVisual from "./CrossCodebaseVisual";
import DailybookVisual from "./DailybookVisual";
import DataDrivenUxVisual from "./DataDrivenUxVisual";
import FamilycareVisual from "./FamilycareVisual";
import MvpSseVisual from "./MvpSseVisual";
import QuoteTimeVisual from "./QuoteTimeVisual";
import SocialLoginVisual from "./SocialLoginVisual";

type VisualComponent = (props: { locale: Locale }) => React.ReactNode;

const MAP: Record<string, VisualComponent> = {
  "ad-admin-stabilization": AdAdminVisual,
  "ai-collab-infra": AiCollabVisual,
  "ai-store-webview": AiStoreWebviewVisual,
  "b2c-ota-expansion": B2cOtaVisual,
  "cross-codebase-interface": CrossCodebaseVisual,
  "dailybook-react-query": DailybookVisual,
  "data-driven-ux": DataDrivenUxVisual,
  "familycare-kidsnote": FamilycareVisual,
  "mvp-sse-streaming": MvpSseVisual,
  "quote-time-simplification": QuoteTimeVisual,
  "social-login-conversion": SocialLoginVisual,
};

type Props = {
  slug: string;
  locale: Locale;
  className?: string;
};

export default function ProjectVisual({ slug, locale, className }: Props) {
  const Component = MAP[slug];
  if (!Component) return null;
  return (
    <div
      className={
        className ??
        "h-32 w-full rounded-lg border border-accent/15 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-5 dark:border-accent/20 dark:from-accent/15 dark:via-accent/5 dark:to-transparent"
      }
    >
      <Component locale={locale} />
    </div>
  );
}
