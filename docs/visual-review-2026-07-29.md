# 시각 리뷰 — 색 · 타이포그래피 · 간격 (2026-07-29)

> 대상: `qlemql/portfolio@master`, A–H 구조 개선안이 구현된 이후 상태
> 앞선 A–H 리뷰는 **정보 구조** 문제였고, 이 문서는 **시각 레이어** 문제다.
> 각 항목의 `검증` 줄은 리뷰를 받은 뒤 실제 소스와 대조한 결과다.

## 우선순위

1. 폰트 — 한글 폴백 (압도적으로 큼)
2. 대비 실패 1건
3. `bg-accent` 3중 사용
4. `text-[11px]` 제거 · 타입 스케일 정리
5. 간격 · radius 토큰화
6. 히어로 애니메이션 순서
7. 헤더 터치 타깃

---

## 1. 🔴 폰트 — 한국어 본문이 OS에 따라 달라진다

**위치** `src/app/globals.css`

```css
@theme inline {
  --font-sans: var(--font-geist-sans);
}
```

Geist에는 한글 글리프가 없다. 따라서 **한국어 본문 전체가 OS 기본 한글 폰트로 폴백**된다.

| 환경 | 실제 렌더 폰트 |
|---|---|
| macOS | Apple SD Gothic Neo |
| Windows | 맑은 고딕 |
| Android | Noto Sans KR 계열 |

`/ko`가 주 언어인 사이트인데 방문자가 무엇을 보는지 통제하지 못한다.

**부작용**

1. **혼용 시 어긋남** — 라틴(Geist)과 한글(폴백)의 x-height·굵기·자간이 다르다. 스킬 칩(`React 18/19 · Next.js`), 지표 라벨(`3.2× 가입 전환`)처럼 한 줄에 섞이는 곳에서 드러난다.
2. **Windows에서 제목이 뭉갬** — 맑은 고딕은 600 웨이트가 없어 브라우저가 faux bold로 합성한다. `font-semibold`·`font-bold` 제목 전부 해당.
3. **`tabular-nums` 무효화 가능** — 폴백 폰트가 지원하지 않으면 지표 숫자 정렬이 흔들린다. 히어로·이력서 지표 칩에 해당.

**권장 — Pretendard 명시.** Geist와 형태 계열(그로테스크)이 유사하고 한글·라틴을 한 폰트로 덮으며 가변 웨이트를 지원한다.

```ts
// src/app/[locale]/layout.tsx
const pretendard = localFont({
  src: "../../assets/fonts/PretendardVariable.woff2",
  weight: "45 920",
  variable: "--font-pretendard",
  display: "swap",
});
```

```css
--font-sans: var(--font-pretendard), var(--font-geist-sans);
```

Geist를 라틴 폴백으로 남기면 숫자·영문은 유지되고 한글만 Pretendard가 받는다. 일관성을 우선하면 Pretendard 단독이 더 안전하다.

> 서브셋 주의: `pretendardvariable-dynamic-subset`은 CDN 전제다. 셀프 호스팅 시 전체 variable woff2(약 1.2MB)가 되므로 `display: swap` + preload로 체감 지연을 줄이거나 필요한 서브셋만 잘라 쓴다.

**검증 ✅ 사실.** `globals.css:32`가 `--font-sans: var(--font-geist-sans)`, `[locale]/layout.tsx`가 `next/font/google`의 Geist만 로드한다. 한글 폰트 지정 없음.

---

## 2. 🟡 컬러 — accent가 색이 아니다

```css
:root      { --accent: #18181b; }  /* 근검정 */
:root.dark { --accent: #fafafa; }  /* 근흰색 */
```

모노크롬 자체는 정당한 선택이고 톤에 맞는다. 문제는 결과다.

### 2-1. 지표가 색으로 구분되지 않는다

`text-accent`를 지표 숫자에 쓰면 제목 색과 **완전히 동일**해진다. `3.2×`가 크기·굵기만으로 구분된다. 히어로(40px)에서는 충분하지만 이력서 지표 칩(20px)에서는 본문과 구분이 약해진다.

색을 도입할지는 취향이지만, 도입한다면 **지표 숫자 한 곳에만** 쓰는 게 효율적이다. 회색조 사이트에 색이 딱 한 군데면 그 자리가 자동으로 최상위 위계가 된다.

### 2-2. 🔴 `bg-accent`가 히어로에서 3중으로 쓰인다

솔리드 근검정 채움이 세 곳에 동시에 나타난다 — 주 CTA, 기둥 1 태그, 기둥 2 태그. 가장 무거운 처리가 3개면 **주 행동이 어느 것인지 흐려진다.** CTA는 클릭 대상이고 태그는 라벨인데 형태가 같아 어포던스가 잘못 전달된다.

**수정** — 태그는 `bg-accent-soft` + `text-accent`로. `--accent-soft`가 이미 정의돼 있어 토큰 추가가 필요 없다. 솔리드 채움은 주 CTA 하나만.

**검증 ✅ 사실.** `Hero.tsx:60`(CTA), `:82`, `:118`(태그 2개)에서 `bg-accent` 확인. `--accent-soft: #f4f4f5` 존재.
`ProjectVisual/*`의 `bg-accent`는 장식 바·점이라 다른 층위 — 해당 없음.

---

## 3. 🔴 대비 실패 1건 (WCAG AA 미달)

**위치** `Hero.tsx` — `moreApps` 칩의 `text-zinc-400 dark:text-zinc-400`

| 모드 | 조합 | 대비 | 판정 |
|---|---|---|---|
| 라이트 | `#a1a1aa` on `#ffffff` | **2.9:1** | ❌ AA 미달 |
| 다크 | `#a1a1aa` on `#18181b` | 6.5:1 | ✅ |

**수정** — 라이트만 한 단계: `text-zinc-500 dark:text-zinc-400` (`#71717a` on white = 4.8:1).

나머지 `zinc-500`/`zinc-600`(라이트), `zinc-300`/`zinc-400`(다크)은 전부 AA 통과. 위 한 곳만 예외다.

**검증 ✅ 사실.** `Hero.tsx`의 moreApps 칩이 `text-zinc-400 dark:border-white/10 dark:text-zinc-400`.

---

## 4. 🟡 타입 스케일 7단계 + 스케일 밖 값

관찰된 값: `11 · 12 · 14 · 16 · 20 · 30 · 36px`

### 4-1. `text-[11px]`는 스케일 밖 일회성 값

한글은 획이 많아 같은 px에서 라틴보다 작게 읽힌다. 라틴 11px는 한글 체감 10px 수준으로 판독 한계에 가깝다. **12px(`text-xs`)로 올릴 것.**

### 4-2. h2(20px)와 본문(16px)의 차이가 4px

섹션 제목이 본문보다 4px 큰 것만으로는 "여기서 새 섹션이 시작된다"는 신호가 약하다.

선택지(택 1): `text-xl` → `text-2xl`(24px) **권장** / 본문을 15px로(밀도 상승이라 비권장) / 위쪽 여백으로 위계 만들기(5번과 함께).

### 4-3. 14px 이하 비중이 크다

히어로 지표 카드 하나에 14/12/11px이 섞여 있다. 정보량은 많아 보이지만 **어느 것도 우선순위를 주장하지 못한다.** 채용 담당자 연령대(30~40대 이상)를 고려하면 밀도를 한 단계 낮추는 쪽이 안전하다.

최소치 기준: **본문 16px, 보조 14px, 최소 12px**, 그 아래 금지.

### 4-4. 잘 된 것

지표의 `tabular-nums`는 정확하다. 숫자 폭이 고정돼 `62%`·`−70%`·`−75%`가 세로 정렬된다. **1번 폰트 교체 시 이 기능이 유지되는지 확인할 것** — 폴백 폰트에서는 무시될 수 있다.

**검증 ✅ 사실.** `text-[11px]`가 `Hero.tsx` 4곳, `CaseStudyCard.tsx` 2곳. `Section.tsx:19`가 `text-xl font-semibold`.

---

## 5. 🟡 세로 리듬 · radius에 기준값이 없다

### 5-1. 섹션 간격

```
Hero        pt-12 pb-10 sm:pt-16 sm:pb-20
Skills      py-7  sm:py-12
ContactCard pt-10 sm:pt-16
```

7 / 10 / 12 / 16 / 20이 조합별로 다르다. 스크롤할 때 **"새 섹션인지 같은 섹션의 다음 블록인지" 판단이 매번 새로 필요**하다.

**권장** — `Section.tsx`에 기본 간격을 두고 예외만 오버라이드. 지금은 예외가 기본값보다 많다.

### 5-2. radius

히어로 지표 카드 `rounded-2xl` / 스킬 카드 `rounded-xl` / ContactCard `rounded-2xl`. 같은 층위인데 스킬만 다르다 → `rounded-2xl`로 통일.

칩·배지·버튼의 `rounded-full`은 별개 층위이므로 유지.

---

## 6. 🟡 히어로 등장 애니메이션 순서가 뒤섞인다

```
role       delay 0    duration 600
h1         delay 150  duration 600
desc       delay 300  duration 600
CTA        delay 450  duration 600
지표 카드   delay 200  duration 800   ← CTA보다 250ms 먼저
```

1. **순서가 시각 위계와 어긋난다.** 지표 카드가 CTA보다 먼저 등장해 위→아래 스태거 리듬이 중간에 깨진다.
2. **주 CTA가 약 1초간 없다.** `450 + 600 = 1050ms`. 스크롤이 빠른 방문자는 CTA를 보지 못하고 지나칠 수 있다.

**수정(택 1)** — 지표를 `delay 600`으로 뒤로 보내기 / **스태거 전체 압축**(`0/80/160/240`, duration `400`, 총 640ms) ← 권장

**검증 ✅ 사실.** `Hero.tsx` 40·44·50·56행이 0/150/300/450, 74행 지표 카드가 `delay 200 duration 800`.
`prefers-reduced-motion`은 **이미 처리돼 있음**(`useScrollReveal.ts:31-32`) — 리뷰의 "확인 필요"는 해소된 상태.

---

## 7. 🟡 헤더 터치 타깃이 44px 미달

`Header.tsx`의 링크가 `px-3 py-2 text-sm` → `14px × 1.5 + 16px ≈ 37px`. 모바일 권장 최소 44px 미달.

**수정** — 링크를 `py-2.5`로, 헤더를 `py-3` → `py-2`로 상쇄하면 헤더 높이를 유지하면서 타깃만 키울 수 있다. `EN` 링크(`px-2.5`)와 `ThemeToggle`도 함께.

**검증 ✅ 사실.** `Header.tsx:23`이 헤더 `py-3`, 링크 `py-2`.

---

## ✅ 유지할 것 (건드리지 말 것)

- **`word-break: keep-all`** — 한국어 필수. `overflow-wrap: break-word` 폴백까지 정확.
- **print CSS 전반** — `break-inside: avoid`, `orphans/widows: 2`, 다크모드 강제 해제, `@page A4`, `min-h-screen` 무효화.
- **`.print-only-phone::after`로 번호 주입** — HTML 소스에 남기지 않는 접근이 맞다.
  단, CSS 번들은 공개되므로 "크롤러가 절대 못 본다"는 아니다. 실용적으로 충분하지만 완전 차단이 필요하면 인쇄 시점 JS 주입이나 PDF 별도 배포가 필요하다.
- **`aria-current="page"` + 색 + 밑줄 3중 표시** — 색각 이상 대응까지 고려됨.
- **언어·테마를 구분선 뒤 유틸리티 그룹으로 분리** — 층위 구분이 정확.
- **`tabular-nums`** — 폰트 교체 시 유지 여부만 확인.

---

## 작업 순서

| 순서 | 항목 | 파일 | 규모 | 상태 |
|---|---|---|---|---|
| 1 | 폰트 — Pretendard 도입 | `layout.tsx`, `globals.css`, `assets/fonts/` | 중 | ⬜ |
| 2 | 대비 — `text-zinc-400` → `zinc-500` | `Hero.tsx` | 1줄 | ⬜ |
| 3 | `bg-accent` → `bg-accent-soft` (태그 2곳) | `Hero.tsx` | 2줄 | ⬜ |
| 4 | `text-[11px]` → `text-xs` 전량 | `Hero.tsx`, `CaseStudyCard.tsx` | 소 | ⬜ |
| 5 | h2 `text-xl` → `text-2xl` | `Section.tsx` | 1줄 | ⬜ |
| 6 | 섹션 간격 기본값 · radius 통일 | `Section.tsx`, `Skills.tsx` | 소 | ⬜ |
| 7 | 애니메이션 스태거 압축 | `Hero.tsx` | 소 | ⬜ |
| 8 | 헤더 터치 타깃 44px | `Header.tsx` | 소 | ⬜ |

2–8은 합쳐서 30분 이내. **1번이 체감 차이의 대부분을 만든다.**

### 1번 진행 시 결정할 것

- **Pretendard 단독 vs Geist 라틴 폴백 병용** — 일관성이면 단독, 숫자·영문 표현 유지면 병용
- **폰트 파일 확보 방식** — 전체 variable woff2(~1.2MB) 셀프 호스팅 vs 서브셋 생성
- 현재 `next/font/google`의 Geist는 preload 2개로 잡혀 있으므로, 교체 시 preload 대상도 함께 바뀐다
