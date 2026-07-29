# 폰트

## 넣어야 할 파일

`PretendardVariable.woff2` (또는 서브셋)

Geist에는 한글 글리프가 없어 `/ko` 본문 전체가 OS 기본 폰트로 폴백된다.
자세한 배경은 `docs/visual-review-2026-07-29.md` 1번 항목 참고.

## 파일을 넣은 뒤 할 일

1. `src/app/[locale]/layout.tsx`에서 `next/font/local`로 로드

   ```ts
   import localFont from "next/font/local";

   const pretendard = localFont({
     src: "../../assets/fonts/PretendardVariable.woff2",
     weight: "45 920",
     variable: "--font-pretendard",
     display: "swap",
   });
   ```

2. `<body>` className에 `pretendard.variable` 추가
3. `globals.css`의 `--font-sans`를 `var(--font-pretendard), var(--font-geist-sans)`로

## 결정해야 할 것

- **Pretendard 단독 vs Geist 라틴 폴백 병용** — 일관성이면 단독, 숫자·영문 표현 유지면 병용
- **전체 variable(~1.2MB) vs 서브셋** — 현재 페이지당 JS가 200KB대라 1.2MB 폰트는
  이미지 최적화로 얻은 이득을 상쇄한다. 서브셋 권장
- 교체 후 `tabular-nums`가 유지되는지 확인 (지표 숫자 세로 정렬이 여기 의존)
