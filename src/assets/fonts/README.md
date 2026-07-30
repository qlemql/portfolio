# 폰트

본문은 **Pretendard 단독**이다. Geist는 라틴 전용이라 한글이 시스템 폰트로
떨어졌고, 두 폰트를 병용하면 x-height·굵기 축이 달라 단어 단위로 섞이는 줄에서
라틴이 크고 얇게 튄다. 축을 하나로 통일하는 게 해결이다.
Geist Mono는 숫자 지표의 의도적 대비용으로만 남겼다(`ProjectVisual/*`).

## 파일

| 파일 | 크기 | 용도 | git |
|---|---|---|---|
| `PretendardVariable.woff2` | 2.0MB | 서브셋 소스 | 제외(.gitignore) |
| `PretendardVariable.subset.woff2` | 428KB | 실제 사용 | 커밋 |

원본은 [Pretendard 릴리스](https://github.com/orioncactus/pretendard/releases)에서
받아 이 폴더에 두면 된다. 서브셋만 커밋하므로 원본이 없어도 빌드는 된다.

## 서브셋 재생성

콘텐츠에 새 글자가 들어왔을 때:

```bash
python3 -m venv .venv && .venv/bin/pip install 'fonttools[woff]'
PYTHON=.venv/bin/python bash scripts/subset-font.sh
```

스크립트가 하는 일:

1. **KS X 1001 한글 2350자**(EUC-KR 한글 영역 디코드) + 라틴·구두점·화살표·기호
2. **저장소에 실제로 쓰인 문자**를 스캔해 KS X 1001 밖의 글자를 자동 추가
   — 누락을 원천 차단한다. 추가된 문자는 실행 시 stderr로 출력된다
3. `--layout-features`에 `tnum`을 명시 — pyftsubset 기본값이 이걸 버려서
   **tabular-nums가 죽는다.** 지표 숫자 세로 정렬이 여기 의존한다

## 서브셋 후 확인

- `tnum` feature 유지 여부 (현재 확인됨: tabular 숫자 advance 전부 1258, 비례는 898~1278)
- 빌드 산출물에서 **지표 카드의 1과 4 폭이 같은지** 육안 확인
- preload 대상이 Pretendard 하나인지 (Geist Mono는 `preload: false`)
