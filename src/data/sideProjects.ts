export type Locale = "ko" | "en";
export type Localized = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type SideProjectLink = {
  type: "github" | "website" | "app-store" | "play-store";
  url: string;
};

export type DetailSection = {
  heading: Localized;
  body?: Localized;
  bullets?: LocalizedList;
  /** 이 결정을 보여주는 인라인 스크린샷(/public 기준). */
  image?: string;
  imageAlt?: Localized;
};

export type SideProjectDetail = {
  tldr: Localized;
  sections: DetailSection[];
};

export type SideProject = {
  slug: string;
  name: Localized;
  tagline: Localized;
  tags: string[];
  bullets: LocalizedList;
  links: SideProjectLink[];
  publishedAt: string;
  /** 출시 완료 vs 개발 중. 미지정 시 출시 완료로 간주. */
  status?: "shipped" | "wip";
  /** 상세 페이지 본문(의사결정 서술). 없으면 카드만 노출되고 상세 링크는 비활성. */
  detail?: SideProjectDetail;
  /** 대표 이미지 경로(/public 기준). 카드 썸네일 + 상세 히어로에 사용. */
  image?: string;
  /** 이미지 방향. 카드 렌더링 최적화에 사용(가로=꽉 채움, 세로=폰 미리보기). 미지정 시 landscape. */
  imageOrientation?: "portrait" | "landscape";
};

export const SIDE_PROJECTS: SideProject[] = [
  {
    slug: "morning-briefing",
    image: "/projects/morning-briefing-v2.png",
    imageOrientation: "portrait",
    name: {
      ko: "Morning Briefing — 일일 AI 브리핑",
      en: "Morning Briefing — Daily AI briefing",
    },
    tagline: {
      ko: "사용자가 늘어도 AI 비용이 늘지 않게 설계한, 매일 아침 경제·시사 요약 앱.",
      en: "A daily AI briefing whose API cost stays flat regardless of user count, thanks to a shared-cache architecture.",
    },
    tags: ["Next.js 16", "Claude API", "Cost Engineering", "Capacitor"],
    bullets: {
      ko: [
        "Per-user 생성 대신 일별·카테고리별 1회 서버 캐시 + 클라이언트 localStorage. API 비용을 사용자 수와 무관하게 fixed로 유지.",
        "App Store iOS 출시 (Capacitor 8). 5가지 명시 에러 상태, 페이월 블러 + 스켈레톤으로 perceived performance 향상.",
        "스택: Next.js 16 · React 19 · TypeScript 5 · Tailwind 4 · Claude API · Vercel.",
      ],
      en: [
        "Replaced per-user generation with one-per-day-per-category server cache + client localStorage — API cost stays fixed regardless of user count.",
        "Shipped to the App Store via Capacitor 8. Five distinct error states; paywall blur + skeletons for perceived performance.",
        "Stack: Next.js 16 · React 19 · TypeScript 5 · Tailwind 4 · Claude API · Vercel.",
      ],
    },
    links: [
      { type: "app-store", url: "https://apps.apple.com/kr/app/%EB%89%B4%EC%8A%A4%EC%B9%B4%EB%93%9C-ai-%EB%B8%8C%EB%A6%AC%ED%95%91/id6762124483" },
      { type: "github", url: "https://github.com/qlemql/morning-briefing" },
      { type: "website", url: "https://morning-briefing-mocha.vercel.app" },
    ],
    publishedAt: "2026-04-01",
    detail: {
      tldr: {
        ko: "사람들이 AI 앱에서 가장 먼저 부딪히는 어려움은 화면이 아니라 비용입니다. 사용자마다 새로 만들면 사람이 늘수록 비용도 그대로 따라 늘어(하루 사용자 50명이면 한 달 약 $45), 자비로 운영하는 사이드 프로젝트는 50명쯤에서 적자가 됩니다. 그래서 '모두가 같은 날 같은 브리핑을 본다'는 점을 받아들여, 하루에 한 번만 만들어 모두에게 똑같이 보여주도록 했습니다. 덕분에 사용자가 1명이든 1,000명이든 비용이 똑같고(월 약 $0.9, 사용자마다 만들 때보다 약 1,000배 저렴), 화면을 만들기 전에 이 비용 구조부터 설계했습니다.",
        en: "The genuinely hard problem in an LLM consumer app wasn't the UI — it was the cost model. Per-user generation scales linearly with users (DAU 50 ≈ $45/month), so a self-funded side project breaks around ~50 users. By accepting the constraint 'everyone sees the same briefing on the same day,' I made cost flat regardless of user count — generate once per day → shared cache (~$0.9/month, ~1,000× cheaper than per-user) — and designed the cache layer before writing a line of UI.",
      },
      sections: [
        {
          heading: { ko: "1. 배경 — 진짜 문제는 비용", en: "1. Background — the real problem was cost" },
          body: {
            ko: "왕복 한 시간 출퇴근길에 '잡음 없이, 일에 도움 되는 경제 소식만 5분'으로 읽고 싶어 시작했습니다. 그런데 대부분의 AI 앱은 사용자마다 따로 콘텐츠를 만들어서, 사람이 늘면 API 비용도 그만큼 늘어납니다. 이 프로젝트 기준 한 건에 약 $0.03인데, 하루 사용자 50명이면 한 달 약 $45 — 무료로 풀면 50명쯤에서 자비로는 감당이 안 됩니다. 종합 뉴스 앱은 너무 많아 피곤하고, 뉴스레터는 일일이 사람이 골라야 해서 확장이 안 됐고요.",
            en: "I started it for a 1-hour commute: five minutes of useful economic context, no noise. But most LLM consumer apps generate content per user, so API cost scales linearly with users. At this project's measured ~$0.03/briefing, DAU 50 means ~$45/month — offered free, self-funding breaks around 50 users. News apps overload; newsletters need manual curation and don't scale.",
          },
        },
        {
          heading: { ko: "2. 첫 번째 결정 — 사용자마다 만들지 않고, 하루 한 번만", en: "2. Decision ① — shared daily cache (per-user ❌ → per-day ✅)" },
          body: {
            ko: "사용자마다 맞춤 생성하기, 모두에게 같은 걸 한 번만 만들어 보여주기, 사람이 직접 고르기 중에서 '한 번만 만들어 공유'를 골랐습니다. 종류별로 하루 한 번만 Claude를 부르고, 세 단계 저장(앱 메모리 → 저장소 → 예비 콘텐츠)으로 서버가 막 켜졌거나 문제가 생겨도 다시 만들지 않고 모두에게 같은 글을 보여줍니다. 사용자가 몰리기 전 아침 7시에 미리 만들어 두기 때문에 거의 모든 요청이 이미 만들어 둔 걸 그대로 받습니다 — 사용자가 직접 AI를 부르는 길은 아예 없습니다. 맞춤형은 포기했지만, 그 대가로 '1,000번째 사용자도 첫 사용자와 비용이 같은'(월 약 $0.9, 사용자마다 만들면 하루 1,000명에 약 $900) 구조를 얻었습니다.",
            en: "Among personalized generation, a shared cache for everyone, and human curation, I chose the shared cache: call Claude once per day per category, with a 3-tier cache (in-memory → Redis → evergreen fallback) serving everyone the same content with no regeneration on cold start or failure. A cron generates before user traffic (07:00 KST), so practically 100% of requests are cache hits — there is no code path where a user triggers a Claude call. Giving up personalization bought 'the 1,000th user costs the same as the first' (~$0.9/month vs ~$900 for per-user at DAU 1,000).",
          },
        },
        {
          heading: { ko: "3. 두 번째 결정 — AI에게 직접 검색을 맡기기", en: "3. Decision ② — let the AI web-search (no custom RAG)" },
          body: {
            ko: "뉴스를 직접 긁어와 검색·요약 시스템을 만드는 대신, Claude의 웹 검색 기능에 맡겼습니다. 종류별로 믿을 만한 언론사만 미리 정해 두고 검색 횟수도 제한해서, '검색 → 요약 → 출처 달기'를 한 번의 호출로 끝냈습니다. 덕분에 혼자 운영하는 부담이 거의 0이 됐어요. 운영하면서 AI가 접근하지 못하는 언론사도 직접 찾아내, 실제로 읽어 올 수 있는 곳만 남겼습니다.",
            en: "Instead of building a news-API ingest + embeddings/RAG stack, I delegated to Claude's web_search server tool: per-category whitelisted domains with max_uses 3, doing search→summarize→cite in a single call and driving solo ops complexity near zero. I discovered which domains Anthropic's crawler is blocked from (mk.co.kr, reuters.com, etc.) and narrowed the whitelist to reachable sources.",
          },
        },
        {
          heading: { ko: "4. 세 번째 결정 — 유료화: 결제 막기에서 후원으로", en: "4. Decision ③ — monetization: pivot from paywall to donations" },
          body: {
            ko: "처음엔 일부 카드를 유료로 잠갔다가, 7일 무료체험 후 구독으로 바꿨다가, 결국 전부 무료로 풀고 후원받는 방식으로 옮겼습니다. 사업자 등록 없이 바로 돈을 받을 길이 필요했는데, 카카오페이·토스 후원이 수수료도 없고 가입도 바로 되고 사업자도 필요 없어 가장 부담이 적었거든요(해외 후원 서비스는 한국 정산이 안 돼 탈락). 매달 들어오는 구독 수익의 예측 가능성은 포기했지만, 콘텐츠를 잠그던 장치는 끄기만 하고 그대로 남겨 둬서 언제든 다시 켤 수 있습니다.",
            en: "Card paywall (HMAC server gating) → 7-day trial subscription → fully free + donations. Collecting money without a business registration needed a channel, and KakaoPay/Toss donations have 0% fees, instant signup, and no business requirement — the least friction (Buy Me a Coffee was out: no Korean payouts). I gave up subscription MRR predictability, but kept the HMAC-SHA256 gating infrastructure (just switched off) so it can be revived anytime.",
          },
        },
        {
          heading: { ko: "5. 가장 까다로웠던 문제 — 티 안 나게 멈춘 자동 작업", en: "5. Hard problem — the silently-failing cron" },
          body: {
            ko: "매일 아침 글을 만드는 자동 작업이 며칠 동안 조용히 건너뛰어, 사용자는 오래된 예비 글을 보고 있었는데 저는 며칠이나 몰랐습니다. 원인은 이랬어요 — 글을 못 만들면 저장소가 대신 예비 글을 돌려주는데, 자동 작업은 그걸 '정상'으로 착각하고 아무것도 저장하지 않았던 겁니다. 겉으론 멀쩡해 보이는 고장이었죠. 그래서 ① 실패를 예비 글로 가리지 말고 그대로 드러내고(예비 글은 보여 줄 때만 쓰게) ② '만들어졌다'와 '실제로 저장됐다'를 따로 확인하고 ③ 작업과 감시를 여러 겹으로 두되, 방금 멈춘 그 플랫폼이 아니라 바깥의 다른 서비스에서 따로 확인해 이상하면 텔레그램으로 알리게 했습니다. ④ 같은 작업을 여러 번 돌려도 안전하게 만들었고요. 교훈은 '잘 풀리는 경우는 쉬운 80%, 진짜 일은 고장 났을 때 어떻게 알아챌지를 설계하는 것'입니다.",
            en: "The daily cron silently skipped several mornings — users saw stale evergreen fallback, and I didn't notice for days. The root cause was a symptomless failure: on generation failure the cache returned a fallback (3 cards), the cron read that as 'OK,' and saved nothing. Fixes: ① propagate failures to the caller instead of masking them with fallback (fallback is the read path's job only), ② verify 'generated' and 'persisted to Redis' separately, ③ layer Vercel cron + a watchdog + an external GitHub Action heartbeat that doesn't depend on the platform that just died + a Telegram dead-man's switch, ④ make it idempotent so re-runs are safe. The lesson: the happy path is the easy 80%; the real work is designing how you'll know when it breaks — over a channel that isn't the thing that just broke.",
          },
        },
        {
          heading: { ko: "6. 덜어낸 것, 그리고 배운 것", en: "6. Scope cuts & retrospective" },
          body: {
            ko: "종류를 3개에서 1개(경제·시사)로 줄이고, 맞춤형·직접 검색 시스템·로그인·정기결제는 일부러 뺐습니다(코드는 한 줄로 되살릴 수 있게 남겨 뒀어요). 운영 중에 쓰던 AI 모델이 예고 없이 종료돼 글 생성이 전면 멈춘 적이 있어서, 모델 이름을 한곳에서 관리하고 종료 소식을 미리 챙겼어야 했다는 걸 배웠습니다. 가장 크게 배운 건 '제약이 오히려 구조를 살린다'는 점이에요 — '모두에게 같은 글'이라는 제약을 받아들이니 비용과 운영이 한 번에 풀렸고, 저장 방식을 화면보다 먼저 정해 두니 앱·서버·보관·검색이 전부 같은 기준으로 맞아떨어졌습니다. (현재 App Store 출시, 실제 콘텐츠 비용 월 약 $0.9)",
            en: "I narrowed categories from 3 to 1 (economy/news) with a one-line flag, and deliberately cut personalization, custom RAG, login, and recurring billing (all preserved behind a one-line revival). When the model snapshot I used retired without grace and halted generation entirely, I learned to pin the model ID in one place and monitor for retirement. The biggest lesson: constraints save the architecture — accepting 'same content for everyone' solved cost and ops at once, and pinning the data model (cache key) before the UI aligned client, server, archive, and SEO on one key. (Currently live on the App Store; measured content cost ~$0.9/month.)",
          },
        },
      ],
    },
  },
  {
    slug: "minimal-habit-tracker",
    image: "/projects/minimal-habit-tracker-v2.png",
    imageOrientation: "portrait",
    name: {
      ko: "Ssak — 미니멀 습관 트래커",
      en: "Ssak — Minimal Habit Tracker",
    },
    tagline: {
      ko: "3가지 습관만, 5초로 기록. 하루 빠져도 흐름은 이어집니다.",
      en: "Three habits. Five seconds. A missed day is a comma, not a full stop.",
    },
    tags: ["React Native", "Expo", "iOS Widgets", "Mobile"],
    bullets: {
      ko: [
        "App Store 출시(Google Play 준비 중). 습관을 3개로만 제한하고, 하루쯤 빠져도 연속 기록이 끊기지 않게 해 '꾸준함'을 보상하도록 설계.",
        "App Group + 자체 Expo 네이티브 모듈로 iOS 위젯 5종(홈·잠금화면)을 단일 데이터 소스로 구동. 값 쓰기 즉시 WidgetCenter 갱신.",
        "서버 0대·네트워크 호출 0·분석 SDK 0 — 완전 로컬 퍼스트로 런타임 비용 $0/월. 11주에 7릴리즈.",
        "스택: Expo SDK 54 · React Native 0.81 · React 19 · Zustand · TypeScript.",
      ],
      en: [
        "Shipped on the App Store (Google Play in preparation). The 3-habit cap and a forgiving streak that survives a missed day reward consistency over a perfect record.",
        "Drives 5 iOS widgets (home + lock screen) from one data source via an App Group and a custom Expo native module, reloading WidgetCenter on every write.",
        "Zero servers, zero network calls, zero analytics SDKs — fully local-first at $0/month runtime. 7 releases in 11 weeks.",
        "Stack: Expo SDK 54 · React Native 0.81 · React 19 · Zustand · TypeScript.",
      ],
    },
    links: [
      { type: "app-store", url: "https://apps.apple.com/kr/app/%EC%8B%B9-%EC%8A%B5%EA%B4%80-%ED%8A%B8%EB%9E%98%EC%BB%A4/id6762334017" },
      { type: "github", url: "https://github.com/qlemql/minimal-habit-tracker" },
    ],
    publishedAt: "2026-04-12",
    detail: {
      tldr: {
        ko: "'많으면 지치고, 적으면 지켜진다.' 코드를 짜기 전에 먼저 지킬 원칙 10가지를 정해 두고, 모든 기능을 그 기준에 통과시켰습니다. 습관은 딱 3개까지만, 하루쯤 빠져도 기록이 끊기지 않게, 서버는 0대(폰 안에서만 돌아가 운영비 0원) — 이 세 가지가 기둥이고, 그 원칙 덕에 11주 동안 7번 출시했습니다.",
        en: "'Too many and you burn out; few and you keep them.' Before any code, I wrote a 10-article 'constitution' and ran every feature decision through it as the top criterion. Three pillars: a hard 3-habit cap, a forgiving 'Two-Day' streak, and zero servers (local-first, $0 runtime) — and that discipline shipped 7 releases in 11 weeks.",
      },
      sections: [
        {
          heading: { ko: "1. 배경 — 적게 만드는 게 핵심", en: "1. Background — constraint as the value" },
          body: {
            ko: "기존 습관 앱들은 '많이 기록할수록 좋다'고 봅니다. 그래서 항목이 많아 관리가 일이 되고, 연속 기록이 하루만 끊겨도 0으로 돌아가 '어차피 망쳤으니' 하고 아예 그만두게 돼요(사실 하루 빠진 건 습관 만들기에 거의 영향이 없는데도요). 그래서 '적게가 낫다 — 3개로 줄이고 하루쯤 봐주면 계속 쓰게 된다'는 생각으로 시작했고, 흔들리지 않으려고 처음에 지킬 원칙 10가지를 문서로 못박았습니다.",
            en: "Existing habit apps assume 'the more you track, the better.' The result: so many items that managing them becomes a chore, and a streak that resets to zero after a single missed day, pushing people to quit entirely ('it's broken anyway') — even though behavioral science says one missed day barely affects habit formation. So I started from a hypothesis: constraint is the value — cap at three, forgive a day, and it becomes an app you keep using. To keep from wavering, I nailed down a 10-article constitution (CLAUDE.md) before writing code.",
          },
        },
        {
          heading: { ko: "2. 첫 번째 결정 — 3개를 '못 넘게' 막기", en: "2. Decision ① — make 3 a hard cap" },
          body: {
            ko: "무제한으로 두되 3개를 권하기, 무료는 3개·유료는 무제한, 누구도 3개를 못 넘기 중에서 '아예 못 넘게'를 골랐습니다(원칙 1번). 권하기만 하면 결국 10개를 등록해 똑같이 지치고, 유료로 무제한을 파는 순간 '적게가 낫다'는 제품 철학과 정면으로 부딪치니까요. 코드에서는 세 겹으로 막았습니다 — 추가 함수 자체가 막고, 꽉 차면 추가 버튼이 점선 '빈 자리'로 바뀌고, 추가 화면까지 가도 저장이 안 됩니다. 다 키운 습관은 개수에서 빼서 '3개를 끝까지 키우면 비우고 새로 시작'하는 흐름은 열어 뒀어요. 많이 쓰려는 사용자가 떠나는 것과 유료 매출은 일부러 포기한 부분입니다.",
            en: "Among soft (unlimited + recommend three), Free-3/Pro-unlimited (upsell), and a hard cap nobody exceeds, I chose the hard cap (Article 1). Soft just leads to ten habits and the same burnout; the Pro upsell collides head-on with the product philosophy the moment you sell 'unlimited.' In code, a triple guard prevents a 4th by any path — a constant + store guard (`canAddHabit`), a UI gate (when full, the add button becomes a dashed 'empty slot'), and a final guard on the add screen (returns null). Graduated habits are excluded from the count, allowing a cycle of 'raise three to the end, then clear and restart.' Power-user churn and upsell revenue are deliberately forgone trade-offs.",
          },
        },
        {
          heading: { ko: "3. 두 번째 결정 — 하루는 봐주는 기록", en: "3. Decision ② — a forgiving streak (Two-Day Rule)" },
          body: {
            ko: "하루만 빠져도 0이 되는 방식, 하루는 쉼표로 넘기고 이틀 연속이면 끊는 방식, 지난 날을 나중에 채우는 방식 중 두 번째를 골랐습니다. 첫 번째는 사람을 떠나게 만드는 바로 그 원인이고, 지난 날을 채우게 하면 '오늘을 산다'는 취지가 무너지고 달력 편집 화면이 붙어 '5초 안에 끝낸다'는 원칙과 부딪치니까요(지난 기록은 못 고치게 확정). 구현은 따로 숫자를 저장하지 않고, 완료 기록을 오늘부터 거꾸로 훑어 계산하는 함수 하나로 했습니다 — 이틀 연속 비면 끊고, 오늘만 비면 '쉼표'로 봅니다. 지금 기록과 역대 최고 기록을 따로 둬서, 잠깐 끊겨도 키워 둔 단계는 사라지지 않습니다.",
            en: "Among a traditional hard streak (zero on a miss), a Two-Day Rule (one day is a pause, two in a row resets), and retroactive check-ins, I chose the Two-Day Rule. The hard streak is the very churn trigger; retroactive editing breaks the 'live today' spirit and bolts on a calendar-edit UI that violates the 5-second rule (Article 2) — so the past is read-only. It's implemented as one pure function that doesn't store a counter but recomputes from the completion log, today→backward: `consecutiveMisses >= 2` ends the flow; an empty today is a 'pause.' Current flow and all-time longest are tracked separately, so a brief break preserves the growth stage you reached.",
          },
          image: "/projects/ssak-flow.png",
          imageAlt: {
            ko: "하루 쉬어도 흐름이 이어지는 관용적 연속 기록 화면",
            en: "The forgiving streak screen — flow continues through a rest day",
          },
        },
        {
          heading: { ko: "4. 세 번째 결정 — 서버를 두지 않는다", en: "4. Decision ③ — no backend at all" },
          body: {
            ko: "계정·클라우드 동기화 대신, 폰 안에서만 돌아가게 했습니다(원칙 5번). 실제로 코드에 네트워크 통신도, 외부 서비스 연결도 0개예요. 혼자 개발할 때 서버 운영(유지비·장애 대응·보안)은 사이드 프로젝트를 죽이는 가장 큰 원인이니까요. 기기 간 동기화와 백업을 포기한 대신, '서버 없음·계정 없음·정보 수집 없음'이 그대로 강점이 됐습니다 — 운영비 0원이고, 앱 스토어의 개인정보 항목에 '아무것도 수집 안 함'이라고 쓸 수 있는 게 가장 강한 신뢰 신호였어요.",
            en: "Instead of Supabase accounts/sync, I chose fully local-first (Article 5): the code has zero network calls and zero Supabase imports. For a solo dev, server ops burden (upkeep, incident response, auth security) is the biggest killer of side projects. Giving up cross-device sync/backup returned, in exchange, 'no server, no account, no collection' as a privacy marketing message, $0 ops, and the strongest trust signal of all on the Play data-safety form: 'collects no data.'",
          },
        },
        {
          heading: { ko: "5. 가장 까다로웠던 문제 — 위젯과 앱의 기록 맞추기", en: "5. Hard problem — syncing iOS widgets with the RN app" },
          body: {
            ko: "앱(자바스크립트)과 iOS 위젯(Swift)은 서로 메모리를 공유하지 않아, 위젯이 늘 최신 체크 상태를 보이게 하려면 둘이 함께 들여다보는 저장 공간이 필요했습니다. 그래서 앱과 위젯이 같은 저장소를 공유하도록 묶고, 직접 만든 작은 연결 모듈로 앱에서 그 저장소에 값을 쓰는 즉시 위젯을 새로 고치게 했습니다. 자정이 지나면 위젯이 옛 날짜로 남는 문제는, '다음 자정에 다시 그려라'고 시스템에 예약해 두어 해결했어요. 결과적으로 홈 2종·잠금화면 3종, 총 5개 위젯을 같은 기록 하나로 굴리고, 안드로이드도 같은 방식으로 똑같이 맞췄습니다.",
            en: "The RN (JS) world and Swift WidgetKit don't share memory, so keeping widgets on the latest check state required a store that crosses the process boundary. I registered an App Group (`group.com.qlemql.minimalhabittracker`) on both app and widget entitlements, bridged JS→UserDefaults(suiteName:) writes via a custom Expo native module (`shared-defaults`), and call `WidgetCenter.reloadAllTimelines()` immediately on write. The midnight-staleness problem was solved by a timeline policy of `.after(next midnight)`, letting the system auto-request a fresh entry at midnight. The result: 5 widgets (2 home + 3 lock-screen) from one data source, with the same pattern reproduced on Android via RemoteViews + SharedPreferences + AlarmManager.",
          },
          image: "/projects/ssak-widget.png",
          imageAlt: {
            ko: "홈 화면 위젯과 잠금 화면 위젯",
            en: "Home-screen and lock-screen widgets",
          },
        },
        {
          heading: { ko: "6. 또 하나의 난관 — 이미 한 날엔 알림이 안 오게", en: "6. Hard problem — no reminder on days you already finished" },
          body: {
            ko: "'이미 체크한 날에도 알림이 와서 거슬린다'는 제 피드백에서 출발했는데, 앱은 알림이 울리기 직전에 '오늘 했는지'를 따져 보는 코드를 돌릴 수 없고 서버로 보내는 것도 원칙상 금지였습니다. 그래서 '매일 반복' 알림을 버리고, 앞으로 7일치를 하루씩 따로 예약(각 알림에 날짜를 새겨 둠)한 뒤, 습관을 완료하면 그날 날짜의 알림 하나만 콕 집어 지웁니다. 7일 뒤엔 '돌아오라'는 알림을 하나 걸어 일주일 안 쓰면 부드럽게 부르고, 앱을 열 때마다 전체를 지우고 다시 예약해서 며칠 만에 열어도 늘 7일치가 채워져 있게 했습니다. 서버 없이 '한 일은 조르지 않고, 잊으면 한 번만 부르는' 알림을 폰 안에서만 구현한 거죠.",
            en: "It started from my own feedback — 'a reminder still fires on days I've already checked off' — but RN can't run JS to judge completion just before a background fire, and server push is barred by Article 5. So I dropped the DAILY repeating trigger and pre-register the next 7 days as individual single-shot notifications (each stamped with its date); completing a habit cancels only the one matching today's date. A 'reactivation' notification sits past the 7-day window for a gentle nudge after a week idle, and an idempotent function that clears and re-registers everything on cold start keeps the 7-day window full even if you open the app days later. The result: a 'never nag about what's done, call once if forgotten' notification UX, purely local, with no server.",
          },
        },
        {
          heading: { ko: "7. 덜어낸 것, 그리고 배운 것", en: "7. Scope cuts & retrospective" },
          body: {
            ko: "무제한 습관·구독 모델·사용량 분석·지난 날 채우기·설정 늘리기는 원칙에 따라 잘라냈습니다('더하기 전에 뺄 것부터 찾는다', '기존 앱과 뭐가 다른지 답 못하면 안 만든다'가 문턱 역할을 했어요). 다시 한다면 개인정보를 안 건드리는 선에서 최소한의 지표라도 남겼을 거예요 — 분석을 아예 안 넣어서 다운로드나 재방문을 저조차 볼 수 없거든요(의도한 맞바꿈이긴 합니다). 가장 크게 배운 건, 혼자 개발할 때 가장 비싼 건 시간이 아니라 '아니오'라고 말하는 절제이고, 그 판단을 의지가 아니라 '미리 적어 둔 원칙'에 맡긴 게 이 프로젝트의 진짜 골격이었다는 점입니다.",
            en: "I cut unlimited habits, subscriptions, analytics SDKs, retroactive check-ins, and settings bloat via the constitution (Article 3 'find something to remove before adding,' Article 10 'don't build it if you can't answer how it differs' were the enforced gates). If I did it again, I'd add at least a privacy-preserving minimal metric — with no analytics, even the developer can't see downloads or retention (an intended trade-off). The biggest lesson: a solo dev's most expensive resource isn't time but the discipline to say no — and delegating that decision to documented constraints rather than willpower was this project's real architecture.",
          },
        },
      ],
    },
  },
  {
    slug: "claude-boilerplate",
    name: {
      ko: "Claude Code Boilerplate — 프로젝트 부트스트랩 템플릿",
      en: "Claude Code Boilerplate — project bootstrap template",
    },
    tagline: {
      ko: "새 프로젝트의 개발부터 출시·운영·유지보수까지 한 번에 세팅해 주는 템플릿. 셸 스크립트 대신 자연어로 시키는 작업 묶음으로 굴러갑니다.",
      en: "A setup template that bootstraps the whole lifecycle — build, ship, operate, maintain — driven by skill-based natural-language workflows rather than shell scripts.",
    },
    tags: ["Claude Code", "Skills", "Hooks", "DX"],
    bullets: {
      ko: [
        "회사에서 만든 하네스·스킬 패턴을 개인 프로젝트로 일반화 — 신규 레포를 한 번에 셋업.",
        "셸 스크립트 대신 스킬 기반 자연어 워크플로우로 개발부터 배포·운영·유지보수까지 커버.",
        "스택: Claude Code · Custom Skills · Hooks · MCP.",
      ],
      en: [
        "Generalizes the harness and skill patterns built at work into personal projects — sets up a new repo in one pass.",
        "Covers build through deploy, operate, and maintain via skill-based natural-language workflows instead of shell scripts.",
        "Stack: Claude Code · Custom Skills · Hooks · MCP.",
      ],
    },
    links: [],
    publishedAt: "2026-05-01",
    detail: {
      tldr: {
        ko: "새 프로젝트마다 반복되는 셋업·운영 규칙을, 셸 스크립트가 아니라 '스킬 기반 자연어 워크플로우'로 부트스트랩하는 템플릿. 회사에서 검증한 하네스 패턴을 개인 프로젝트로 일반화한 결과물입니다.",
        en: "A template that bootstraps the setup and ops rules repeated on every new project — driven by skill-based natural-language workflows rather than shell scripts. It generalizes the harness patterns I validated at work into personal projects.",
      },
      sections: [
        {
          heading: { ko: "1. 문제 — 매번 반복되는 셋업", en: "1. Problem — setup repeated every time" },
          body: {
            ko: "개인 프로젝트를 새로 시작할 때마다 린트·CI·릴리스 절차·운영 규칙을 다시 세팅했습니다. 회사 모노레포에서 다듬은 하네스·스킬 패턴이 재사용 가능하다고 보고, 신규 레포를 한 번에 셋업하는 템플릿으로 추출했습니다.",
            en: "Every new personal project meant re-setting up linting, CI, release steps, and ops rules. Seeing that the harness/skill patterns I'd refined in the company monorepo were reusable, I extracted them into a template that sets up a new repo in one pass.",
          },
        },
        {
          heading: { ko: "2. 셸 스크립트 대신 스킬", en: "2. Skills instead of shell scripts" },
          body: {
            ko: "전통적 보일러플레이트는 셸 스크립트·Makefile로 동작합니다. 대신 Claude Code 스킬(자연어 워크플로우)로 구성해, 각 단계가 곧 '읽을 수 있는 문서'이자 '실행 가능한 절차'가 되도록 했습니다. 개발부터 배포·운영·유지보수까지 한 흐름으로 커버합니다.",
            en: "Traditional boilerplates run on shell scripts and Makefiles. Instead I built it from Claude Code skills (natural-language workflows), so each step is both readable documentation and an executable procedure — covering build through deploy, operate, and maintain in one flow.",
          },
        },
        {
          heading: { ko: "3. 구성", en: "3. What's inside" },
          body: {
            ko: "17개 커맨드 · 7개 에이전트 · 6개 훅, 그리고 node/java/python/swift 스택별 오버레이로 언어에 맞춰 확장됩니다.",
            en: "17 commands, 7 agents, 6 hooks, plus stack overlays for node/java/python/swift so it adapts to the language in use.",
          },
        },
      ],
    },
  },
  {
    slug: "ai-content-repurposer",
    image: "/projects/ai-content-repurposer.png",
    imageOrientation: "landscape",
    name: {
      ko: "AI Content Repurposer — 콘텐츠 멀티포맷 자동 생성",
      en: "AI Content Repurposer — multi-format content generation",
    },
    tagline: {
      ko: "유튜브 영상이나 글 하나로 블로그·X·인스타·뉴스레터·숏폼까지 한 번에. 한국어 품질을 가장 우선하고, 만들어지는 과정을 실시간으로 보여 줍니다.",
      en: "Turn one YouTube video or text into a blog post, X thread, Instagram caption, newsletter, and short-form script at once — Korean-first quality with live-streamed generation.",
    },
    tags: ["Next.js 16", "Claude API", "Supabase", "SaaS"],
    bullets: {
      ko: [
        "유튜브 자막 추출 + 자막 없는 영상은 Whisper 폴백(Pro 한정)으로 원본 확보 후 7종 포맷(블로그·X·인스타·뉴스레터·링크드인·숏폼·SEO 메타)으로 변환.",
        "Claude API 스트리밍으로 생성 과정을 실시간 노출 — 로딩만 보여주는 경쟁 서비스와 차별화. 한국어 결과 품질을 1순위로 설계.",
        "Supabase 인증·DB + 요금제(Free/Pro/크레딧) 과금 설계. 웹(Next.js 16) + 모바일(Expo) 동시 구성.",
        "스택: Next.js 16 · React 19 · Claude API · Supabase · Tailwind 4 · Expo(mobile).",
      ],
      en: [
        "Pulls YouTube captions (with a Pro-only Whisper fallback for videos without subtitles), then transforms into 7 formats: blog, X thread, Instagram, newsletter, LinkedIn, short-form, SEO meta.",
        "Streams the generation live via the Claude API — unlike competitors that only show a spinner. Korean output quality is the top design priority.",
        "Supabase auth & DB plus a Free/Pro/credit pricing model. Built as web (Next.js 16) and mobile (Expo) in parallel.",
        "Stack: Next.js 16 · React 19 · Claude API · Supabase · Tailwind 4 · Expo (mobile).",
      ],
    },
    links: [],
    status: "wip",
    publishedAt: "2026-04-01",
    detail: {
      tldr: {
        ko: "기존 콘텐츠 재가공 도구들은 영어 위주에 만드는 동안 로딩만 보여 줘서, 한국어 품질과 '만들어지는 과정을 실시간으로 보여 주기'를 차별점으로 잡았습니다. 그리고 비용이 큰 받아쓰기(Whisper)는 유료 사용자에게만 열어, 어떤 기능을 누구에게 줄지와 비용을 요금제로 나눈 게 핵심 결정입니다.",
        en: "I anchored the product on what existing repurposing tools get wrong: English-first output and a spinner-only UX. Korean-first quality, live-streamed generation, and gating the expensive Whisper path behind Pro were the key decisions.",
      },
      sections: [
        {
          heading: { ko: "1. 차별화 지점", en: "1. Where it differentiates" },
          body: {
            ko: "대부분의 서비스는 영어 결과를 한국어로 옮긴 듯 어색하고, 만드는 동안엔 로딩 화면만 보여 줍니다. 그래서 처음부터 한국어 품질을 가장 우선해 AI에게 주는 지시를 다듬고, 글이 만들어지는 과정을 실시간으로 보여 줘 '제대로 돌고 있다'는 신뢰를 높였습니다.",
            en: "Most tools read like English translated into Korean, and show only a loading screen while generating. I designed prompts for Korean quality from the start, and streamed the Claude API output so users watch the content take shape — building trust through visibility.",
          },
        },
        {
          heading: { ko: "2. 자막 없는 영상 처리와 비용 선긋기", en: "2. Subtitle-less videos & a cost boundary" },
          body: {
            ko: "유튜브 자막이 있으면 그대로 쓰고, 없는 영상은 음성을 받아쓰기(Whisper)로 글로 옮깁니다. 다만 받아쓰기는 호출 비용이 커서 무료 사용자에게 열면 남용될 수 있어, 유료 사용자에게만 허용했습니다. 어떤 기능을 누구에게 줄지와 비용을 요금제 선에서 나눈 결정입니다.",
            en: "It pulls YouTube captions first, with a Whisper transcription fallback for videos that have none. But Whisper is costly per call and risks abuse if opened to free users, so I gated it behind Pro — separating feature availability from cost at the pricing boundary.",
          },
        },
        {
          heading: { ko: "3. 제품화", en: "3. Productization" },
          body: {
            ko: "Supabase로 로그인과 데이터를 처리하고 무료·유료·횟수권 결제를 얹었으며, 7가지 형식(블로그·X·인스타·뉴스레터·링크드인·숏폼·SEO 정보)을 지원합니다. 웹(Next.js)과 모바일(Expo)을 함께 만들었습니다.",
            en: "On top of Supabase auth and DB, I layered Free/Pro/credit-pack billing and 7 output formats (blog, X, Instagram, newsletter, LinkedIn, short-form, SEO meta), built across web (Next.js 16) and mobile (Expo).",
          },
        },
      ],
    },
  },
  {
    slug: "fox-walk",
    image: "/projects/fox-walk-v2.png",
    imageOrientation: "portrait",
    name: {
      ko: "여우와 산책 — 만보기 + 여우 육성 시뮬",
      en: "Fox Walk — pedometer + companion-raising sim",
    },
    tagline: {
      ko: "걸으면 여우가 앞서 걷고, 멈추면 뒤돌아본다. 숫자만 오르는 만보기가 아니라 '함께 걷는' 경험으로 설계한 육성 시뮬레이션.",
      en: "The fox walks ahead as you move and looks back when you stop — a raising-sim built around the feeling of walking *with* a companion, not a step counter.",
    },
    tags: ["React Native", "Expo", "expo-sensors", "Game Design"],
    bullets: {
      ko: [
        "멈춘 시간에 따라 반응이 단계적으로 변하는 여우 행동 상태머신(걷기→뒤돌아봄→다가옴→앉음→누움)으로 '살아있는 동반자' 느낌을 구현.",
        "걸음수(expo-sensors·HealthKit) + 위치 기반 날씨 연동(OpenWeatherMap)으로 비·눈엔 보너스를 줘 악천후 산책까지 동기부여.",
        "코인/젬 이원 재화 + 등급별 꾸미기·먹이 상점, 여우 성장·진화 루프. AdMob·IAP 수익화 설계.",
        "스택: React Native · Expo (expo-router) · expo-sensors · expo-location · zustand · 픽셀아트.",
      ],
      en: [
        "A fox behavior state machine (walk → look back → approach → sit → lie down) that escalates with idle time, creating the feel of a living companion.",
        "Step counting (expo-sensors / HealthKit) plus location-based weather (OpenWeatherMap); rain and snow grant bonuses to motivate walking even in bad weather.",
        "Dual currency (coins/gems), tiered cosmetics & feeding shop, and a fox growth/evolution loop. Monetization designed around AdMob + IAP.",
        "Stack: React Native · Expo (expo-router) · expo-sensors · expo-location · zustand · pixel art.",
      ],
    },
    links: [],
    status: "wip",
    publishedAt: "2026-04-14",
    detail: {
      tldr: {
        ko: "만보기 앱은 숫자만 올라갈 뿐이라 며칠이면 질립니다. 그래서 걸음을 '여우가 자라는 재미'로 바꿔 봤습니다. 핵심은 서버도 로그인도 백그라운드 실행도 없이 만들어, 혼자 운영하는 비용을 0원으로 맞춘 것입니다. 그중 가장 까다로웠던 건 앱을 꺼 둔 사이 걸은 걸음을 다시 채워 넣는 방법이었습니다. (아직 출시 전이라, 아래 숫자는 사용자 지표가 아니라 코드와 비용에서 잰 값입니다.)",
        en: "I tackled the 'numbers just go up' motivation cliff of pedometer apps by translating steps into a fox's growth. The core is a deliberate set of constraints — zero server, zero login, zero background — that keeps a solo project's running cost at $0. The hardest part: restoring steps walked while the app was closed, with no background execution, via a cumulative-counter diff pattern. (Currently unreleased — figures are measured from code and unit economics.)",
      },
      sections: [
        {
          heading: { ko: "1. 왜 만들었나", en: "1. Background — the pedometer motivation cliff" },
          body: {
            ko: "삼성헬스나 애플 피트니스는 정확하지만 걷는 재미가 없어서 며칠이면 알림부터 끄게 됩니다. 그래서 '걸을수록 여우가 자란다면 더 오래 쓰지 않을까' 하는 생각에서 시작했습니다. 비슷한 걷기 게임들은 대부분 가입을 강요하고 광고와 결제를 들이미는데, 이 앱은 반대로 갔습니다. 가입도 서버도 없이 켜자마자 시작하고, 광고는 사용자가 원할 때만 봅니다.",
            en: "Samsung Health and Apple Fitness are accurate but offer zero emotional reward, so people mute the notifications within days. I started from a hypothesis: translating steps into the growth of something you raise should improve retention. Existing step-RPGs mostly depend on a server, force sign-up, and push aggressive purchases — so I differentiated on 'no server, no login, instant play on first launch, ads only as opt-in rewards.'",
          },
          image: "/projects/foxwalk-feeding.png",
          imageAlt: {
            ko: "여우에게 먹이를 주며 교감하는 화면",
            en: "Feeding and bonding with the fox",
          },
        },
        {
          heading: { ko: "2. 첫 번째 결정 — 서버를 두지 않는다", en: "2. Decision ① — no backend at all" },
          body: {
            ko: "데이터를 클라우드에 맞출지, 직접 서버를 둘지, 아니면 폰 안에만 저장할지 고민하다 폰 안에만 저장하기로 했습니다. 혼자 키우는 게임이라 기기끼리 맞출 일이 거의 없는데, 서버를 두면 매달 드는 비용·개인정보·심사 부담만 늘어나니까요. 대신 폰을 바꾸면 기록을 옮길 수 없지만, 혼자 만드는 입장에선 '운영비 0원, 로그인 코드 0줄'이 그 손해보다 컸습니다. 유료 재화도 광고로만 얻게 해서, 결제를 검증하는 서버 없이도 부정 사용을 처음부터 막았습니다.",
            en: "Among Firebase sync, a custom server, and 100% on-device, I chose on-device (AsyncStorage). For a single-device raising game, cross-device sync has little value, while a server adds fixed cost, a privacy surface, and review risk. The cost is no data migration across devices — but for a solo project, $0 ops and zero auth code outweigh that. I also made the paid currency (gems) earnable only via ads, eliminating fraudulent acquisition without any receipt-verification server.",
          },
        },
        {
          heading: { ko: "3. 두 번째 결정 — 걸음을 보상으로 바꾸는 규칙", en: "3. Decision ② — step economy: hard cap + weather multiplier" },
          body: {
            ko: "100걸음에 발자국 1개, 하루 최대 1만 걸음까지만 쌓이게 했습니다. 성장 단계와 맞물려 빠르면 5일, 길면 50일쯤 걸리도록 속도를 고정했습니다. 상한을 안 두면 많이 걷는 사람이 하루 만에 끝을 봐서 다시 안 들어오고, 그렇다고 단계별로 줄여 주면 코드가 복잡해져서, 단순하고 예측 가능한 쪽을 택했습니다. 비 오는 날·눈 오는 날엔 보너스를 줘서 '오늘도 걸을 이유'를 만들되, 날씨를 못 불러올 때 비나 눈을 가짜로 주면 보상이 망가지니까 그럴 땐 맑음·흐림만 돌려주게 했습니다.",
            en: "100 steps = 🐾1, capped at 10,000 steps = 🐾100 per day. Combined with growth thresholds (500/2,000/5,000), this fixes the journey at 5 to ~50 days. Unlimited accrual lets heavy users finish in a day (killing retention and ad value), and a soft cap adds code complexity — so I chose simple and predictable. A weather multiplier (rain ×1.3, snow ×1.5) creates a reason to walk today, but since a fallback that fakes rain/snow would break the economy, the weather-API fallback only ever returns clear/cloudy.",
          },
          image: "/projects/foxwalk-shop.png",
          imageAlt: {
            ko: "코인·젬으로 꾸미기 아이템을 사는 상점 화면",
            en: "The shop — buying cosmetics with coins and gems",
          },
        },
        {
          heading: { ko: "4. 세 번째 결정 — 여우를 '살아있게' 만들기", en: "4. Decision ③ — the fox as a behavior state machine" },
          body: {
            ko: "멈춰 있는 그림 대신, 얼마나 안 걸었는지에 따라 여우 반응이 달라지게 했습니다. 10초 안엔 그냥 걷고, 좀 지나면 뒤돌아보고, 더 지나면 다가와 보채고, 2분이 넘으면 앉아서 기다리다, 5분이 넘으면 드러눕습니다. 다시 걸으면 벌떡 일어나 달려가고요. '살아있다'는 느낌이 이 앱의 전부라, 단계마다 19컷씩 네 단계, 총 76컷이나 되는 그림 작업을 감수했습니다.",
            en: "Instead of a static image or a single looping sprite, I chose an idle-time behavior FSM. Five states (walking <10s → looking back 10–30s → approaching/nudging 30s–2m → sitting 2–5m → lying 5m+) are decided by a pure function of one variable — time since the last step — ticking every 2 seconds, with a 'spring up' transition on resume to avoid jumps. Since 'feeling alive' is the app's emotional core, I accepted the large asset cost: 19 frames × 4 growth stages = 76 behavior frames.",
          },
        },
        {
          heading: { ko: "5. 가장 까다로웠던 문제 — 꺼 둔 사이 걸은 걸음 채우기", en: "5. Hard problem — restoring steps with no background execution" },
          body: {
            ko: "앱은 배터리와 iOS 제약 때문에 꺼져 있는 동안 돌 수 없는데, 사람들은 앱을 끈 채로 걷습니다. 그래서 폰이 세어 두는 '오늘 0시부터의 걸음 수'를 읽어, 마지막으로 확인한 값과의 차이만큼만 더해 줍니다. 차이가 0보다 크면 그만큼 쌓고 기준을 새로 잡고, 0 이하면 그대로 둬서 같은 걸음이 두 번 쌓이는 걸 막습니다. 이 장치 덕분에 걸음을 읽어 오는 곳이 바뀌어 숫자가 거꾸로 가거나, 테스트로 오늘 걸음을 0으로 만들어도 실제 걸음과 꼬이지 않습니다. 백그라운드로 도는 것 없이, 배터리도 더 안 쓰면서 '껐다 켜면 그동안 걸은 만큼 들어와 있는' 경험을 만들었습니다.",
            en: "The app can't run in the background (battery and iOS constraints), yet people walk with it closed. So I read the OS's 'steps since midnight' counter and accrue only the diff against a stored baseline (syncedSteps): if diff > 0, accrue and update the baseline; if diff ≤ 0, hold the baseline to prevent double-counting. That guard means even when the source flips between HealthKit and CoreMotion (making the total go backwards), or a simulation resets today's steps to 0, cheats and real walking never contaminate each other — achieving a 'reopen and your walked steps are already there' UX with zero background execution and zero extra battery.",
          },
        },
        {
          heading: { ko: "6. 또 하나의 난관 — AI가 만든 그림 112장 다듬기", en: "6. Hard problem — refining 112 AI-generated assets in code" },
          body: {
            ko: "AI(Gemini)로 뽑은 그림은 배경색이 지저분하고, 1픽셀짜리 테두리 찌꺼기가 남고, 컷마다 여우 위치가 흔들렸습니다. 게다가 여우 외곽선이 짙은 보라색이라, 단순히 '보라색을 지우자'고 하면 여우가 통째로 뚫려 버렸습니다(실제로 한 번 그랬습니다). 그래서 파이썬으로 ① 배경을 덩어리째 찾아 지우고 ② '연보라만 지우고 진보라는 건드리지 않기' 같은 안전한 색 규칙을 만들고 ③ 컷마다 발끝·몸통 위치를 기준으로 정렬해서 흔들림을 없앴습니다. 그림을 직접 못 그리는 1인 개발자가 행동 76컷·표정 36컷·배경 4컷을 코드로 찍어내고 다듬은 셈입니다.",
            en: "Gemini's sprites came with green/magenta backgrounds, 1px border crud, and per-frame position jitter. Worse, the fox's outline is deep purple, so a naive 'remove purple' rule punches a hole through the fox (it actually did once). So a Python pipeline: ① extract the green screen via connected components, ② establish safe color rules ('remove light magenta only, never purple'), and ③ normalize an anchor per frame (median-x of paws and body) to floor-align frames on a per-stage canvas, eliminating the jitter. A solo dev who can't draw thus mass-produced and cleaned 76 behavior + 36 emotion + 4 background frames in code.",
          },
        },
        {
          heading: { ko: "7. 덜어낸 것, 그리고 배운 것", en: "7. Scope cuts & retrospective" },
          body: {
            ko: "서버·계정·랭킹·소셜 기능, 여러 종류의 결제, 프리미엄 꾸미기 그림은 일부러 덜어냈습니다. 혼자 만들 때의 힘은 '안 만든 것'에서 나오니까요. 다시 한다면 그림부터 다듬기 전에 도형만으로 게임 재미부터 확인하겠습니다(코드보다 그림 정리에 시간이 더 들었습니다). 하루 상한도 처음부터 좀 더 부드럽게 두고, 안드로이드 과거 걸음 연동도 더 일찍 잡았을 겁니다. 가장 크게 배운 건, '백그라운드처럼 보이지만 사실은 아닌' 설계가 배터리와 제약을 한 번에 푸는 열쇠라는 점입니다.",
            en: "I deliberately cut server/accounts/ranking/social, multiple IAP types, and premium accessory wear-art — a solo dev's leverage comes from what you don't build. If I did it again, I'd validate the game loop with placeholder shapes first and make art last (asset cleanup took longer than the code). I'd start the daily cap as a tapering soft cap and tackle Android historical steps (Health Connect) earlier. The lesson: a 'looks-like-background-but-isn't' design is the key pattern for solving battery and platform constraints at once on mobile.",
          },
        },
      ],
    },
  },
  {
    slug: "project-vellum",
    name: {
      ko: "project-vellum — 한국 민속 매치-3 로그라이크 (게임명 미정)",
      en: "project-vellum — Korean-folklore match-3 roguelike (title TBD)",
    },
    tagline: {
      ko: "수묵풍 한국 민속을 입힌 매치-3 로그라이크. 웹으로 재미를 먼저 확인한 뒤 Godot으로 옮겨, 실제 기기에 올리는 것까지 혼자 만들고 있습니다.",
      en: "An ink-wash, Korean-folklore match-3 roguelike. Validated the fun in a web prototype, then ported to Godot with on-device builds — built solo, full-stack.",
    },
    tags: ["Godot", "GDScript", "Game Design", "iOS/Android"],
    bullets: {
      ko: [
        "Phase 0 웹(HTML) 프로토타입으로 핵심 재미를 먼저 검증한 뒤 Godot 엔진으로 포팅 — 게임 첫 개발이지만 웹 프론트 경험(상태·렌더 루프)을 GDScript로 전이.",
        "직업·스킬·유물·시너지 밸런스를 헤드리스 시뮬레이션(직업별 승률·평균 도달 장수)으로 정량 검증하고 폰 실기 플레이로 교차 확인.",
        "한국 민속(품계·가호·업) 영구 진행 + 수묵풍 아트 디렉션으로 고유 IP 구축. Android 실기 빌드 성공, iOS 빌드 파이프라인 구성.",
        "스택: Godot · GDScript · 자체 콘텐츠/밸런스 도구 · AI 협업 워크플로우(설계·아트 파이프라인).",
      ],
      en: [
        "Validated the core fun in a Phase 0 web (HTML) prototype, then ported to Godot — a first game project that carried web-frontend instincts (state, render loop) over to GDScript.",
        "Quantified class/skill/relic/synergy balance with headless simulations (per-class win rate, average depth reached), cross-checked against on-device play.",
        "Built a distinct IP via Korean-folklore meta-progression and an ink-wash art direction. Android device builds shipping; iOS build pipeline set up.",
        "Stack: Godot · GDScript · custom content/balance tooling · AI-assisted workflow (design & art pipeline).",
      ],
    },
    links: [],
    status: "wip",
    publishedAt: "2026-04-19",
    detail: {
      tldr: {
        ko: "게임은 처음 만들어 보는 프론트엔드 개발자가, 먼저 웹 프로토타입으로 '이게 재밌나'를 확인한 뒤 Godot으로 옮기고, 끝내 사람 없이 밸런스를 검증하는 시뮬레이션까지 만든 한국 민속 매치-3 로그라이크입니다. 가장 자랑하고 싶은 건, 실제 게임을 화면 없이 자동으로 수천 판 돌려서 어떤 직업이 너무 세거나 안 쓰이는지를 사람 손 없이 잡아내는 시뮬레이션입니다. (아직 출시 전 v0.14.0이라, 아래 숫자는 코드와 콘텐츠에서 잰 값입니다.)",
        en: "A Korean-folklore match-3 roguelike by a first-time game dev (a frontend engineer) working with an AI pair: validate the fun in a web prototype, port to Godot, and ultimately build a headless simulation that verifies balance with no human in the loop. The part I'm proudest of: driving the real game scene in --headless and auto-playing it with 16 AI policies to surface win rates, dead/dominant picks, and divergence — no playtesters. (Unreleased, v0.14.0 — figures are measured from code, content, and process.)",
      },
      sections: [
        {
          heading: { ko: "1. 왜 만들었나", en: "1. Background — why build it" },
          body: {
            ko: "개인적으론 게임 개발 첫 도전이었습니다. 프론트엔드에서 익힌 사고방식(이벤트·상태·화면 그리기)이 게임에서도 통하는지 직접 확인해 보고 싶었어요. 제품으로는 고전 매치-3 RPG의 '타일을 맞추면 행동이 나가는' 재미와 로그라이크의 한 판 구조를 잇되, 시장의 매치-3가 대부분 서양 판타지거나 국적 없는 캐주얼이라 비어 있던 한국 민속(도깨비·구미호·이무기, 도사·무당·화랑)을 차별점으로 잡았습니다. 장르의 공통 규칙은 가져오되, 그림·이름·이야기는 100% 새로 만들 수 있는 빈 땅이었거든요.",
            en: "Personally it was my first attempt at game dev — a test of whether a frontend mental model (events, state, render loop) extends into the game domain. From a product angle, I kept the classic match-3 RPG 'tile = action' philosophy and the roguelike run structure, but differentiated on Korean folklore (dokkaebi, gumiho, imugi; Taoist/shaman/hwarang classes) — an open niche, since market match-3 is mostly Western/fantasy or culture-less casual. It's open ground where you borrow the genre's common rules but make the visuals, names, and narrative 100% your own.",
          },
        },
        {
          heading: { ko: "2. 첫 번째 결정 — 엔진은 Godot", en: "2. Decision A — engine: Godot 4.x, not a web wrapper" },
          body: {
            ko: "웹을 앱처럼 감싸는 방법, Unity, Cocos, Defold, Godot을 놓고 Godot을 골랐습니다. 웹을 감싸면 매치-3의 핵심인 '끌어서 맞추는 손맛'이 둔해져서 탈락, Unity는 이 규모엔 너무 무겁고(3~6GB) 라이선스 부담이 있었고, Cocos는 매치-3 실적은 최고지만 문서가 중국어 위주라 혼자 배우기 버거웠습니다. Godot은 가볍고, 쓰는 언어(GDScript)가 제가 쓰던 TypeScript와 닮아서 기존 지식이 그대로 옮겨졌고, 모바일로 내보내는 길도 분명했어요. 대신 웹 프로토타입 코드는 한 줄도 못 쓰고 전부 다시 짜야 했는데, 그 HTML을 '설계 문서'로 삼아 손해를 만회했습니다. 재미는 이미 확인한 채로 옮긴 거죠.",
            en: "Among web (HTML/JS) + Capacitor, Unity, Cocos, Defold, and Godot, I chose Godot 4.x / GDScript. Web wrapping was out because a WebView dulls the drag responsiveness that is match-3's core feel; Unity was overkill for the scope (3–6GB) with lingering license risk; Cocos has the best match-3 track record but Chinese-skewed docs make solo learning costly. Godot is lightweight, GDScript is adjacent to TypeScript/JS (so frontend knowledge transfers), and its mobile export path is clear. The trade-off was rewriting the web prototype (1,803 LOC) from scratch — recovered by demoting that HTML to a 'design spec,' so I entered the port with the fun already validated.",
          },
        },
        {
          heading: { ko: "3. 두 번째 결정 — 여러 테마를 버리고 한국 민속 하나로", en: "3. Decision B — drop multi-biome for a single Korean-folklore theme" },
          body: {
            ko: "처음엔 심해·균사·요괴 같은 여러 무대를 섞으려 했지만, 한국 민속 하나로 좁혔습니다(안개 산채·달빛 숲·구천의 문 3장). 무대를 여러 개 두면 그림 작업이 세 배라 혼자선 감당이 안 되고, 정체성도 흐려지니까요. 하나로 모으니 AI로 그림을 뽑아도 톤이 일관되고, 종족 시스템도 통째로 덜어내(사람 도술·무속 이야기라 필요 없어서) 복잡도를 한 겹 줄였습니다. 대신 AI가 자주 섞어 넣는 일본·중국풍(벚꽃·도리이 등)을 막으려고 '한국 어휘만 쓰고 일·중 도상은 금지'라는 구체적인 규칙을 문서로 정해 뒀습니다.",
            en: "The original plan was a 'Descent' multi-biome (deep sea / fungal / yokai); I narrowed it to a single Korean-folklore theme (three chapters: Misty Stronghold, Moonlit Forest, Gate of the Nine Springs). Multi-biome triples the art volume — collapsing a solo scope — and dilutes identity. A single theme makes AI image-generation consistency easier, and removing the race system entirely (unnecessary for a human Taoist/shaman setting) cut one axis of complexity. To stop the tone contamination AI tends to leak, I documented quantitative guardrails: 'hanja OK but Korean vocabulary only; no explicit Japanese/Chinese iconography (cherry blossoms, torii, five-clawed dragons, tangui).'",
          },
        },
        {
          heading: { ko: "4. 세 번째 결정 — 영구 강화는 '능력치'가 아니라 '선택지'로", en: "4. Decision C — meta-progression: no flat stats, only unlocks" },
          body: {
            ko: "흔한 방식인 '공격력·체력 영구 증가' 대신, 직업 등급이나 슬롯 같은 '선택지'만 풀리도록 했습니다. 능력치를 영구로 올려 주면 결국 '갈아서 세지는' 노가다가 되어, 매 판마다 머리 쓰는 재미가 사라지거든요. 선택지가 늘면 힘이 아니라 '고를 수 있는 폭'이 늘어, 다시 하고 싶은 마음과 실력 표현을 동시에 잡습니다. 대신 '많이 하면 세진다'는 직관적인 보상을 포기해 초심자가 떨어져 나갈 위험은 있는데, 한 판 15~20분에 뒤로 갈수록 어려워지는 곡선으로 그 보람을 한 판 안에 몰아넣었습니다.",
            en: "Instead of traditional meta-progression (+attack/+HP permanent boosts), I chose unlock-based progression (class ranks, blessing/karma slots, NG+ — a Monster Train mastery pattern). Flat stats are a 'grind your way stronger' loop that destroys the per-run decision value at the heart of a match-3 roguelike. Unlocks add options, not power, capturing retention and skill expression at once. The trade-off: giving up the intuitive 'play more, get stronger' carrot risks new-player churn — offset by a 15–20 minute run and a back-loaded difficulty curve that concentrates the sense of reward inside the run.",
          },
        },
        {
          heading: { ko: "5. 가장 까다로웠던 문제 — 사람 없이 밸런스 검증하기", en: "5. Hard problem — headless simulation that verifies balance without humans" },
          body: {
            ko: "실제 게임을 화면 없이 돌리면서 AI에게 자동으로 수십 판씩 플레이시켜, 직업별 승률·평균 도달 단계·너무 세거나 안 쓰이는 조합·무한루프나 멈춤을 사람 없이 뽑아내는 도구를 만들었습니다(약 960줄). 화면과 효과를 끄고 한 판을 수천 턴까지 빠르게 압축했고, AI 판단 방식을 16가지(단순히 가장 큰 매치만 노리는 것부터, '이번 턴은 손해지만 다음 턴에 터지는' 수까지 내다보는 것까지)로 두어 직업마다 성격을 따로 진단합니다. 같은 조건으로 두 번 돌리면 결과가 완전히 같아야 통과하는 검증 모드도 뒀어요. 까다로웠던 버그 둘은 원인을 코드에 적어 뒀습니다 — 객체 제거가 한 박자 늦어 이전 화면이 남는 바람에 선택이 흔들리던 문제, 그리고 메시지 저장 공간이 기본값에선 부족해 100판쯤부터 결과가 조용히 사라지던 문제(공간을 키워 해결).",
            en: "`sim_runner.gd` (961 LOC) drives the real main.tscn in --headless and auto-plays it many times under AI policies to extract win rate, average depth, dead/dominant pick rates, and divergence/crashes — with no humans. Skipping render/effects and blocking telemetry compresses a run to thousands of turns in a synchronous loop, and 16 AI policies (from pure max-match to 1-ply to a 2-ply lookahead that sees 'lose this turn, explode next' combos) diagnose class identity separately. It snapshots/restores the board to pick the best move, with a determinism mode that PASSes only if two runs of the same (class, difficulty, seed) are identical. Two debugging war stories are pinned as root-cause comments: a non-determinism where `queue_free()` deferred to frame-end left a stale modal that wobbled picks, and an OOM where the message queue silently dropped results past ~100 runs at the 32MB default (fixed by raising it to 256MB).",
          },
        },
        {
          heading: { ko: "6. 규모·덜어낸 것·회고", en: "6. Scale, scope cuts & retrospective" },
          body: {
            ko: "지금 Godot 코드가 약 25,000줄이고, 콘텐츠는 스킬 43종·직업 6종·유물 25종·시너지 11종을 한 파일에서 관리하며, 약 3,500개의 자동 점검을 매번 통과해야 다음으로 넘어갑니다. iOS 빌드(맥과 Xcode 필요)·후속 콘텐츠·능력치 영구 강화는 일부러 미뤘고, AI와 역할은 분명히 나눴습니다 — AI는 측정·진단·구현(시뮬과 점검 도구, 원인 추적)을, 저는 직접 플레이한 느낌과 최종 결정(밸런스 승인, 무엇을 먼저 할지)을 맡았습니다. 다시 한다면 '기능 그만 추가' 선을 더 일찍 그었을 거예요(검증 안 된 상태 위에 계속 쌓는 버릇을 스스로 경계로 적어 뒀습니다). 가장 크게 배운 건, 재미 확인과 엔진 선택을 따로 떼어 둔 것, 그리고 밸런스를 '코드로 잴 수 있게' 만든 것이 혼자 개발할 때의 진짜 힘이었다는 점입니다. (출시 목표는 2026년 3분기)",
            en: "Currently ~25,123 LOC of Godot script; content is 43 skills, 6 classes, 25 relics, 11 synergies (single source content.gd); a regression audit of ~3,500 checks is forced to PASS every cycle. I deliberately cut the iOS build (needs Mac + Xcode), Phase 4, and flat stats. The split with the AI is explicit — AI measures/diagnoses/implements (sim and audit infra, root-cause tracing), the human feels and decides (on-device feedback, final balance sign-off, scope priority). If I did it again I'd draw a feature-freeze line earlier (I documented the 'keep stacking changes on an unverified baseline' pattern as a self-warning). The biggest lesson: separating fun-validation from engine choice, and making balance measurable in code, were the real leverage of solo development. (Target launch 2026 Q3.)",
          },
        },
      ],
    },
  },
  {
    slug: "f1-instagram",
    image: "/projects/f1-instagram.png",
    imageOrientation: "portrait",
    name: {
      ko: "F1 Instagram — 기자회견 카드뉴스 자동화",
      en: "F1 Instagram — Press conference card-news automation",
    },
    tagline: {
      ko: "F1 기자회견을 한국어 인스타그램 카드뉴스로 자동화. 월 $10 Claude API 예산 안에서 운영.",
      en: "Turns F1 press conferences into Korean Instagram carousels — under a $10/month Claude API budget.",
    },
    tags: ["Python", "Claude Haiku", "Cost Engineering", "GitHub Actions"],
    bullets: {
      ko: [
        "Haiku 기본 + 조건부 Sonnet, '의미 판단만 LLM·결정적 변환은 코드'로 호출을 드라이버당 9콜로 고정(카드 17장 슬라이드 분할은 LLM 0콜). 1건 ~$0.04.",
        "CostGuard가 SDK 경계에서 호출별 비용을 JSONL에 적립·복원해 월 $10 하드캡 강제. 초과 시 BudgetExceededError로 차단(서버리스 재시작에도 누적 유지).",
        "GitHub Actions cron으로 연 23라운드만 트리거하는 서버 0대 자동화. 한글 카드는 HTML/CSS → Playwright 스크린샷(1080×1350), 팀컬러 자동 주입.",
        "스택: Python 3.12 · Claude Haiku · httpx/BeautifulSoup · Playwright · GitHub Actions.",
      ],
      en: [
        "Haiku-by-default with conditional Sonnet, and 'LLM only for judgment, deterministic code for transforms,' fixing calls at 9 per driver (slide-splitting a 17-card carousel uses 0 LLM calls). ~$0.04 per run.",
        "CostGuard logs and restores per-call spend in JSONL at the SDK boundary to enforce a $10/month hard cap, blocking via BudgetExceededError (cumulative survives serverless restarts).",
        "Zero-server automation via a GitHub Actions cron triggered only ~23 rounds/year. Korean cards render as HTML/CSS → Playwright screenshots (1080×1350) with team colors auto-injected.",
        "Stack: Python 3.12 · Claude Haiku · httpx/BeautifulSoup · Playwright · GitHub Actions.",
      ],
    },
    links: [{ type: "github", url: "https://github.com/qlemql/f1-instagram" }],
    publishedAt: "2026-03-01",
    detail: {
      tldr: {
        ko: "F1 기자회견(영어)을 한국어 인스타그램 카드뉴스로 자동으로 바꿔 줍니다. 시장의 진짜 걸림돌은 '한 건 만드는 데 드는 비용'이라, '한 달 $10을 넘기지 않는다'는 한 가지 원칙을 먼저 정하고 거기에 맞춰 모델·AI와 코드의 역할 분담·인프라를 전부 결정했습니다. 비용을 기준으로 정하니 오히려 설계가 단순해졌어요. (전체 흐름은 처음부터 끝까지 돌아가고, 인스타 정식 게시 전이라 팔로워 같은 지표는 아직 없습니다. 아래 숫자는 실제로 잰 값입니다.)",
        en: "It auto-converts (English) F1 press conferences into Korean Instagram carousels. The market's real bottleneck was per-post production cost, so I back-derived everything — model choice, the LLM/code boundary, infrastructure — from one constraint: a $10/month hard cap. Deciding model, line-wrapping, and server by cost made the design simpler. (Pipeline works end-to-end; pre-launch on Instagram — audience metrics are N/A, figures are measured.)",
      },
      sections: [
        {
          heading: { ko: "1. 배경 — 걸림돌은 만드는 비용", en: "1. Background — the bottleneck is ops cost" },
          body: {
            ko: "2024~25년 한국에 F1 팬이 크게 늘었지만 기자회견 발언은 영어로만 공개됩니다. 직접 5개 플랫폼과 한국 F1 계정 8곳을 살펴보니, '기자회견 발언을 번역해 카드로 만드는' 계정은 한 곳도 없었어요 — 비어 있는 시장이었죠. 비는 이유는 결국 사람이 일일이 번역하고 디자인하는 비용이라, '자동화로 그 비용을 0에 가깝게 만들면 이 빈자리를 채울 수 있다'가 가설이었습니다.",
            en: "Korean F1 fandom surged in 2024–25, but press-conference quotes are published only in English. Surveying 5 platforms and 8 Korean F1 accounts myself, I found zero accounts specializing in 'translated quote cards' — a supply gap. Its root cause is the per-post cost of manual translation + design, so the hypothesis was: drive that cost near zero with automation and you fill the gap.",
          },
        },
        {
          heading: { ko: "2. 첫 번째 결정 — 모델은 Haiku 기본, 필요할 때만 Sonnet", en: "2. Decision A — model: Haiku-by-default, conditional Sonnet" },
          body: {
            ko: "Sonnet만 쓰기, Haiku만 쓰기, 평소엔 Haiku·필요할 때만 Sonnet 중 세 번째를 골랐고 실제론 거의 100% Haiku로 돕니다. 직접 재 보니 드라이버 한 명 분량(입력 28,136·출력 4,672 토큰)이 Haiku로는 $0.0412, Sonnet으로는 $0.1545로 3.75배였고, Sonnet만 쓰면 경기 한 건이 $0.10 예산을 54%나 넘어 아예 불가능했거든요. '고르고 번역하고 요약하는 기계적인 일은 Haiku로 충분하다'고 보되, 점수가 크게 엇갈리는 경우에만 Sonnet으로 넘기도록 규칙으로 정해 사람 없이도 알아서 판단하게 했습니다.",
            en: "Among all-Sonnet, all-Haiku, and Haiku-by-default-with-conditional-Sonnet, I chose the third — and in practice calls are ~100% Haiku. Measured, one driver's workload (28,136 in / 4,672 out tokens) is $0.0412 on Haiku vs $0.1545 on Sonnet (3.75×); all-Sonnet would push a single GP 54% over the $0.10 budget, disallowed by policy. I hypothesized 'mechanical judgment (selection, translation, summary) is fine on Haiku,' but codified escalation to Sonnet only under conditions (e.g., score variance ≥ 4) so it's an automatic decision.",
          },
        },
        {
          heading: { ko: "3. 두 번째 결정 — AI가 할 일과 코드가 할 일 나누기", en: "3. Decision B — the boundary between LLM work and code work" },
          body: {
            ko: "수집부터 슬라이드 나누기까지 전부 AI에 맡기는 대신, '뜻을 판단하는 일만 AI, 정해진 변환은 코드'로 선을 그었습니다. 슬라이드 줄바꿈·나누기를 AI에 맡기면 카드 17장당 많게는 17번을 더 불러야 하고 결과도 매번 들쭉날쭉하니까요. 대신 번역문을 문장 단위로 나눈 뒤 글자 수(보통 200자, 최대 280, 최소 80)에 맞춰 슬라이드로 묶어, 슬라이드 배치에는 AI를 한 번도 안 쓰고 즉시·무료로 처리했습니다. 같은 원칙으로 1차 점수 매기기는 5개씩 묶어 부르고 번역은 고른 문답을 한 번에 처리해서, 호출 횟수를 '슬라이드 수'가 아니라 '드라이버당 9번'으로 고정했습니다.",
            en: "Instead of handing everything from ingest to slide-splitting to the LLM, I drew a boundary: 'LLM only for meaning, deterministic code for transforms.' Letting the LLM split slides would add up to 17 extra calls per 17-card carousel, with results that wobble each time. Instead I split the translation by regex sentence boundaries + a character budget (target 200 / max 280 / min 80), doing slide layout with zero LLM calls — fully deterministic, instant, free. By the same principle, first-pass scoring batches 5 at a time and translation does all selected Q&A in one call, fixing call count at 9 per driver rather than per slide.",
          },
        },
        {
          heading: { ko: "4. 가장 까다로웠던 문제 — 한 달 $10을 코드로 못 넘게 막기", en: "4. Hard problem — tracking & capping cost at the SDK boundary (CostGuard)" },
          body: {
            ko: "API 호출은 라이브러리 안에서 일어나는데 한 달 $10을 어떻게 못 넘게 막을까, 게다가 GitHub Actions는 실행할 때마다 완전히 새로 시작해서 그동안 쓴 금액이 메모리에 안 남습니다. 그래서 모든 호출을 얇게 감싸는 함수로 통과시켜 부르기 직전에 예산을 확인하고, 이번 달 누적이 $10을 넘으면 비용을 기록하기도 전에 에러를 일으켜 그 호출은 물론 이후까지 막습니다(프로그램은 그 에러를 받아 해당 건만 건너뛰고 이미 만든 결과물은 지킵니다). 핵심은 사용 금액을 메모리가 아니라 파일에 적어 둔 것 — 호출할 때마다 기록 파일에 한 줄씩 덧붙이고, 시작할 때 그 파일들을 다시 읽어 이번 달 누적을 복원합니다. 그래서 매번 새로 시작하는 환경에서도 상한이 어긋나지 않습니다.",
            en: "API calls happen inside the SDK — how do you enforce a $10/month hard cap? Worse, every GitHub Actions run is a new process, so cumulative state isn't in memory. So every call passes through a thin wrapper that checks the budget just before firing; if monthly cumulative ≥ $10 it raises BudgetExceededError before recording cost, blocking that call and all subsequent ones (the pipeline catches it, skips just that item, preserves prior output). The key is keeping state in logs, not memory — each call appends to `{gp}_cost.jsonl`, and on init it reads all logs to restore this month's cumulative, so the cap stays consistent even in a serverless environment.",
          },
        },
        {
          heading: { ko: "5. 또 하나의 난관 — 한글 글자 다루기 (직접 그리기에서 브라우저 렌더로)", en: "5. Hard problem — Korean typography (Pillow → HTML/Playwright)" },
          body: {
            ko: "처음엔 파이썬으로 카드 그림을 직접 그렸는데, 한글 줄바꿈·자간·폰트가 픽셀 단위로 너무 까다로웠습니다. 그래서 카드를 HTML/CSS로 만들고 화면 없는 크롬(Playwright)으로 1080×1350 크기 스크린샷을 찍는 방식으로 바꿨어요 — 한글 줄바꿈은 브라우저의 잘 다듬어진 처리에 맡겨 직접 구현을 없앴고, 폰트는 자유 라이선스(Pretendard·Bebas Neue)만 써서 저작권을 안전하게 했습니다. 답변 길이에 따라 본문 글자 크기를 42~58px로 자동 조절해 17장 어디서도 글자가 넘치지 않게 했고, 팀 색상 11가지를 파일에서 자동으로 넣어 드라이버 팀이 바뀌면 카드 색도 따라 바뀝니다.",
            en: "I first drew cards with Pillow, but Korean line-breaking, letter-spacing, and web-font rendering were pixel-level fiddly. So I switched to defining cards in HTML/CSS and screenshotting at 1080×1350 with Playwright (headless Chrome) — delegating Korean line-breaking to the browser's mature text engine (text-wrap), reducing custom work to zero, and using only OFL-licensed fonts (Pretendard, Bebas Neue) for copyright safety. Body font auto-adapts 42–58px by answer length so nothing overflows across 17 cards, and 11 team colors are auto-injected from JSON so the card recolors when the driver's team changes.",
          },
        },
        {
          heading: { ko: "6. 덜어낸 것, 그리고 배운 것", en: "6. Scope cuts & retrospective" },
          body: {
            ko: "'비용·저작권·운영 부담 중 하나라도 크면 초기 버전에서 뺀다'는 원칙을 정해 두고, 레이스 결과 인포그래픽·인스타 자동 게시(승인 위험)·실시간 알림을 잘랐습니다(지금은 텔레그램으로 받아 직접 올립니다). 다시 한다면 카드 디자인을 처음부터 브라우저 방식으로 갔을 거예요(직접 그리느라 쓴 시간을 아꼈겠죠). 가장 크게 배운 건 '비용도 설계의 일부'라는 점입니다 — '$10 넘지 않기'라는 원칙을 먼저 정하니 모델·역할 분담·서버 방식이 전부 거기서 따라 나와 설계가 단순해졌고, 코드로 정해 둘 수 있는 일은 AI에 맡기지 않는 게 비용·일관성·속도 모두에 이득이었습니다.",
            en: "The constitution (CLAUDE.md) pins 'if cost, copyright, or ops burden is high, cut it from the MVP,' so I dropped race-result infographics, automatic Instagram posting (API-approval risk), and real-time triggers (currently: send via Telegram, upload manually). If I did it again, I'd go HTML/Playwright from the start (saving the time spent on Pillow). The biggest lesson: cost is an architecture decision — pinning the single $10 constraint first made model, the LLM/code boundary, and serverless all back-derive from it, simplifying the design; and not handing the LLM anything deterministic code can do wins on cost, consistency, and speed at once.",
          },
        },
      ],
    },
  },
];

export function getSideProjectBySlug(slug: string): SideProject | undefined {
  return SIDE_PROJECTS.find((p) => p.slug === slug);
}

export function getLinkLabel(type: SideProjectLink["type"], locale: Locale): string {
  if (locale === "ko") {
    switch (type) {
      case "github":
        return "GitHub";
      case "website":
        return "사이트";
      case "app-store":
        return "App Store";
      case "play-store":
        return "Play Store";
    }
  }
  switch (type) {
    case "github":
      return "GitHub";
    case "website":
      return "Website";
    case "app-store":
      return "App Store";
    case "play-store":
      return "Play Store";
  }
}
