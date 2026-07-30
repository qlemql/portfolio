#!/usr/bin/env bash
#
# Pretendard Variable 서브셋 생성.
#
# 왜 필요한가: 원본 variable woff2가 2MB로 첫 화면 텍스트 페인트를 그만큼 잡아둔다.
# 왜 스크립트로 두는가: 콘텐츠에 새 글자가 들어올 때 재현 가능해야 한다.
#
# 사용법:  bash scripts/subset-font.sh
# 필요:    fonttools[woff]  (pip install 'fonttools[woff]')
#
set -euo pipefail
cd "$(dirname "$0")/.."

SRC="src/assets/fonts/PretendardVariable.woff2"
OUT="src/assets/fonts/PretendardVariable.subset.woff2"
UNICODES="$(mktemp)"
trap 'rm -f "$UNICODES"' EXIT

PY="${PYTHON:-python3}"
if ! "$PY" -c "import fontTools" 2>/dev/null; then
  echo "fontTools가 없습니다. 가상환경에서:" >&2
  echo "  python3 -m venv .venv && .venv/bin/pip install 'fonttools[woff]'" >&2
  echo "  PYTHON=.venv/bin/python bash scripts/subset-font.sh" >&2
  exit 1
fi

# 1) 서브셋에 넣을 코드포인트 수집
"$PY" - "$UNICODES" <<'PYEOF'
import sys, pathlib, re

cps = set()

# KS X 1001 한글 음절 2350자 — EUC-KR 한글 영역을 디코드해 그대로 얻는다.
for hi in range(0xB0, 0xC9):
    for lo in range(0xA1, 0xFF):
        try:
            ch = bytes([hi, lo]).decode("euc-kr")
        except UnicodeDecodeError:
            continue
        if "가" <= ch <= "힣":
            cps.add(ord(ch))

# 라틴·숫자·기본 구두점
cps |= set(range(0x0020, 0x007F))
# 라틴-1 보충에서 실제 쓰는 것 (× ÷ ° © ® 등)
cps |= {0x00A0, 0x00A9, 0x00AE, 0x00B0, 0x00B7, 0x00D7, 0x00F7}
# 일반 구두점 (– — ‘ ’ “ ” … ·)
cps |= set(range(0x2010, 0x2030)) | {0x2039, 0x203A, 0x2044}
# 통화 (₩ €)
cps |= {0x20A9, 0x20AC}
# 화살표 · 수학 (← ↑ → ↓ ↗ ↘ − ≈ ≤ ≥)
cps |= set(range(0x2190, 0x21A0)) | {0x2212, 0x2248, 0x2260, 0x2264, 0x2265}
# 기호 (✓ ▾ ▸ ● ○ ■ □)
cps |= {0x25A0, 0x25A1, 0x25B8, 0x25BE, 0x25CB, 0x25CF, 0x2713, 0x2714}
# 한글 호환 자모 · CJK 구두점 (「」 등)
cps |= set(range(0x3131, 0x318F)) | set(range(0x3000, 0x3040))

# 2) 저장소에 실제로 쓰인 문자 — KS X 1001 밖의 글자가 있으면 여기서 잡힌다.
ROOTS = ["src", "docs"]
EXTS = {".ts", ".tsx", ".json", ".css", ".md"}
used = set()
for root in ROOTS:
    for p in pathlib.Path(root).rglob("*"):
        if p.suffix in EXTS and p.is_file():
            used |= set(p.read_text(encoding="utf-8", errors="ignore"))

extra = {ord(c) for c in used if ord(c) > 0x7F and ord(c) not in cps}
# 이모지는 시스템 폰트가 받으므로 제외 (Pretendard에 글리프가 없다)
extra = {c for c in extra if not (0x1F000 <= c <= 0x1FAFF or 0x2600 <= c <= 0x27BF)}
if extra:
    print("KS X 1001 밖에서 추가된 문자: " + "".join(sorted(chr(c) for c in extra)), file=sys.stderr)
cps |= extra

pathlib.Path(sys.argv[1]).write_text(",".join(f"U+{c:04X}" for c in sorted(cps)), encoding="utf-8")
print(f"코드포인트 {len(cps)}개", file=sys.stderr)
PYEOF

# 2) 서브셋 실행
#
# --layout-features 를 명시하지 않으면 pyftsubset 기본값이 tnum 을 버려서
# tabular-nums 가 죽는다. 지표 숫자 세로 정렬이 여기 의존한다.
"$PY" -m fontTools.subset "$SRC" \
  --flavor=woff2 \
  --unicodes-file="$UNICODES" \
  --layout-features="kern,liga,clig,calt,tnum,case,locl,mark,mkmk,ccmp,ss01" \
  --name-IDs="1,2,3,4,5,6" \
  --output-file="$OUT"

echo
echo "원본:   $(du -h "$SRC" | cut -f1)"
echo "서브셋: $(du -h "$OUT" | cut -f1)"
echo
echo "확인할 것: 빌드 후 지표 카드에서 1과 4의 폭이 같은지 (tabular-nums 유지 여부)"
