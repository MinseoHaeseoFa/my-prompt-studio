/* ============================================================
   My Prompt Studio · data/calli.js
   ⑧ CALLI — 캘리그라피 10종 (문구 · 작가명 낙관)
   손글씨가 놓인 바탕과 도구, 손의 결, 낙관의 자리까지 열 가지로
   나눠 담았습니다. 문구와 작가명만 바꾸면 같은 결의 새 작품이
   나오도록, 이미지/영상 × 영어/한국어 4종 프롬프트로 엮습니다.
   ============================================================ */

(function () {
  const H = MPS.helpers;

  /* ---------- 먹빛 ---------- */
  const INKS = {
    black: {
      label: "순흑",
      hex: "#17130F",
      en: "deep lamp-black ink — opaque through the body of each stroke, thinning to a dry grey where the brush lifts",
      ko: "진한 등유 먹 — 획의 몸통은 불투명하고 붓이 들리는 끝은 건조하게 옅어지는"
    },
    sepia: {
      label: "세피아",
      hex: "#6E4A2A",
      en: "warm sepia-brown ink, like a letter found in a drawer after many years",
      ko: "서랍에서 오래 만에 꺼낸 편지 같은 따뜻한 세피아 갈색 잉크"
    },
    indigo: {
      label: "청먹",
      hex: "#26384A",
      en: "blue-black ink with a faint indigo gathering where the stroke pools",
      ko: "획이 고이는 곳에 옅은 쪽빛이 모이는 청흑색 잉크"
    },
    grey: {
      label: "회먹",
      hex: "#5B5751",
      en: "soft grey ink, as if the brush were half dry and the paper drank most of it",
      ko: "붓이 반쯤 마른 듯 종이가 대부분을 빨아들인 부드러운 회먹"
    }
  };

  /* ---------- 곁들이는 색 ---------- */
  const ACCENTS = {
    yellow: {
      label: "노란 꽃",
      hex: "#E3B93E",
      en: "soft butter-yellow, appearing only in a few small watercolour petals",
      ko: "작은 수채 꽃잎 몇 장에만 쓰인 부드러운 버터 노랑"
    },
    peach: {
      label: "복숭아빛",
      hex: "#E1A48D",
      en: "a warm peach wash, the only colour besides the ink",
      ko: "먹빛 말고는 유일한 색인 따뜻한 복숭아빛 수채"
    },
    sage: {
      label: "세이지",
      hex: "#8FA083",
      en: "a quiet sage green, kept to one small leaf or one thin wash",
      ko: "작은 잎 하나, 얇은 수채 한 번에만 머무는 조용한 세이지 그린"
    },
    rose: {
      label: "연분홍",
      hex: "#E7B9BC",
      en: "a pale rose tint, used in a single petal or a hairline of colour",
      ko: "꽃잎 한 장 혹은 가는 색선 하나에 쓰인 옅은 분홍"
    },
    none: {
      label: "색 없이",
      hex: "#FFFFFF",
      en: "no colour at all — ink, paper and light only",
      ko: "색을 전혀 더하지 않은, 먹과 종이와 빛뿐인"
    }
  };

  /* ---------- 문구 줄나눔 ---------- */
  const LINE_MODES = [
    { id: "one", label: "한 줄로 크게", en: "set as a single line, deliberately large", ko: "한 줄로 크게" },
    { id: "two", label: "두 줄", en: "broken into two lines, the second a little shorter than the first", ko: "두 줄, 두 번째 줄이 조금 짧게" },
    { id: "block", label: "네 줄 블록", en: "stacked as a four-line block, each line shorter than the one above, the gathering held together as one mass", ko: "네 줄 블록, 위에서 아래로 조금씩 짧아지며 한 덩어리로 모이게" },
    { id: "vertical", label: "세로쓰기", en: "written vertically in a single column, read from top to bottom", ko: "위에서 아래로 읽는 세로 한 줄" },
    { id: "scatter", label: "자유 배치", en: "placed loosely by hand — lines drift, their right edges ragged, one or two characters slightly larger than the rest", ko: "손 가는 대로 놓은 자유 배치 — 줄이 조금씩 흐르고 오른쪽 끝이 들쭉날쭉하며 한두 글자가 조금 크게" }
  ];

  /* ---------- 문구 자리 ---------- */
  const LAYOUTS = {
    top: { label: "위쪽", en: "in the upper third of the sheet, the lower part left open", ko: "지면 위쪽 3분의 1에, 아래는 비워 둔" },
    center: { label: "가운데", en: "in the middle of the sheet with a wide empty margin on all four sides", ko: "사방으로 넓은 여백을 두고 지면 가운데에" },
    left: { label: "왼쪽에 붙여", en: "hugging the left third, the right side breathing empty", ko: "왼쪽 3분의 1에 붙여, 오른쪽을 비워 둔" },
    side: { label: "세로로 한쪽", en: "running down one side of the sheet, leaving the rest of the surface open", ko: "지면 한쪽을 세로로 따라 내려가며 나머지를 비워 둔" },
    bottom: { label: "아래쪽", en: "toward the lower third, the upper part left open", ko: "지면 아래쪽 3분의 1에, 위를 비워 둔" }
  };

  /* ---------- 낙관 ---------- */
  const SEALS = {
    square: {
      label: "정방 낙관",
      en: (name) =>
        `a small square cinnabar-red seal — a hand-carved stamp about 3 percent of the frame width, its edges slightly uneven, carrying the artist name "${name}" cut in Korean characters as a raised white line inside the red field`,
      ko: (name) =>
        `화면 폭의 3퍼센트 남짓한 작은 정방형 주홍 낙관 — 손으로 새겨 가장자리가 조금 삐뚤고, 붉은 바탕 안에 작가명 "${name}"이 하얀 양각 한글로 들어간 도장`
    },
    round: {
      label: "둥근 낙관",
      en: (name) =>
        `a small round cinnabar-red seal about 3 percent of the frame width, stamped once by hand, carrying the artist name "${name}" in Korean characters`,
      ko: (name) =>
        `화면 폭의 3퍼센트 남짓한 작은 둥근 주홍 낙관 — 손으로 한 번 찍었고, 작가명 "${name}"이 한글로 들어간`
    },
    none: {
      label: "낙관 없이",
      en: () => "",
      ko: () => ""
    }
  };

  const SEAL_POS = {
    end: { label: "문구 끝", en: "stamped just after the last character of the phrase", ko: "문구 마지막 글자 바로 뒤에" },
    br: { label: "오른쪽 아래", en: "set in the lower right, a little apart from the writing", ko: "오른쪽 아래, 글씨에서 조금 떨어져" },
    bl: { label: "왼쪽 아래", en: "set at the lower left, a little apart from the writing", ko: "왼쪽 아래, 글씨에서 조금 떨어져" }
  };

  /* ---------- 영상 움직임 ---------- */
  const MOTIONS = {
    brush: {
      label: "붓이 지나감",
      note: "획이 그려지는 동안",
      en: "the writing appears as if being written — each stroke drawn in from its start to its end at a natural hand speed, the brush tip wet where it lands and dry where it lifts",
      ko: "실제로 쓰는 것처럼 획이 시작점에서 끝점으로 손의 속도대로 그려지고, 붓끝이 닿은 곳은 젖고 들린 곳은 마르는"
    },
    breathe: {
      label: "종이 호흡",
      note: "아주 느린 푸시인",
      en: "the sheet itself holds still while the camera pushes in by about two percent, the paper surface shifting minutely as if breathing in daylight",
      ko: "지면은 고정된 채 카메라가 2퍼센트쯤 천천히 다가가고, 종이 표면이 낮빛에 숨 쉬듯 아주 미세하게 흔들리는"
    },
    light: {
      label: "빛 흐름",
      note: "오후 빛이 천천히",
      en: "a slow band of afternoon light travels across the paper from one side to the other, and the ink's sheen follows it while nothing in the drawing moves",
      ko: "오후 빛 한 줄기가 종이를 한쪽에서 다른 쪽으로 천천히 지나가고, 먹의 윤기가 그 빛을 따라가며 그림 자체는 움직이지 않는"
    },
    drift: {
      label: "꽃잎·눈 내림",
      note: "작은 입자만",
      en: "a few small petals or snowflakes drift down through the frame at different speeds, while the paper and the writing stay perfectly still",
      ko: "작은 꽃잎이나 눈송이 몇 개가 서로 다른 속도로 화면을 가로질러 내리고, 종이와 글씨는 완전히 멈춰 있는"
    },
    still: {
      label: "정지",
      note: "사진처럼 고정",
      en: "the frame holds completely still, like a photograph, with only the faintest grain moving",
      ko: "사진처럼 완전히 멈춰 있고 아주 미세한 입자만 흐르는"
    }
  };

  /* ---------- 프리셋 (10종) ---------- */
  const PRESETS = [
    {
      id: "postcard",
      emoji: "💌",
      label: "엽서 손글씨",
      thumb: "calli/postcard.jpg",
      thumbPos: "center 42%",
      caption: "바라건대 오늘은 조금 가벼운 하루이기를",
      captions: [
        "바라건대 오늘은 조금 가벼운 하루이기를",
        "사소한 하루에도 고마움 하나쯤은 피어난다",
        "잘 견뎌 낸 나에게 먼저 안부를 묻는다"
      ],
      paper: {
        en: "one butter-cream postcard of card stock with a faint fibre tooth, lying alone on a plain cream table, the card's edge visible",
        ko: "연한 버터빛이 도는 크림 카드지 엽서 한 장, 아무것도 없는 크림 탁자 위에 홀로 놓여 카드의 윤곽이 보이는"
      },
      medium: {
        en: "everyday brush-pen handwriting — warm and slightly rounded, the pressure light, more a person's own hand than formal calligraphy",
        ko: "붓펜으로 쓴 생활 손글씨 — 따뜻하고 조금 둥글며 힘이 가볍고, 격식 있는 서예보다 사람의 손끝에 가까운"
      },
      props: {
        en: "in the lower third, one grey onggi jar drawn in loose ink outline over a faint grey wash, with five soft yellow petals resting on its belly",
        ko: "아래 3분의 1에, 옅은 회색 수채 위에 먹선 윤곽으로 느슨하게 그린 회색 항아리 하나, 그 배 위에 노란 꽃잎 다섯 장"
      },
      finish: {
        en: "a flat overhead photograph, soft daylight from the left, the shadow just a shade darker than the paper",
        ko: "위에서 내려다본 평면 사진, 왼쪽에서 드는 부드러운 낮빛, 그림자는 종이보다 한 톤만 진한"
      },
      scene: {
        en: "the phrase fills the upper half in a calm hand and the jar holds the lower third, a wide quiet margin around everything",
        ko: "문구가 위 절반을 차분하게 채우고 항아리가 아래 3분의 1을 잡으며, 사방에 넓고 조용한 여백"
      },
      seed: { captionMode: "scatter", ink: "black", accent: "yellow", layout: "top", seal: "square", sealPos: "end", motion: "breathe", ratio: "4:5" }
    },
    {
      id: "dippen",
      emoji: "🖋️",
      label: "딥펜 필사",
      thumb: "calli/dippen.jpg",
      thumbPos: "center 45%",
      caption: "하루의 끝에서 나를 다독인다",
      captions: [
        "하루의 끝에서 나를 다독인다",
        "한 문장이 하루를 버티게 한다",
        "천천히 쓴 한 줄이 내일의 힘"
      ],
      paper: {
        en: "one sheet of cream hanji with a cool grey cast, its fibres catching the light",
        ko: "회색기가 도는 크림 한지 한 장, 섬유가 빛을 받아 보이는"
      },
      medium: {
        en: "a steel dip pen with a flexible point — hairline upstrokes against heavy downstrokes, ink pooling darkly at the end of each thick stroke and lifting the nib marks of pressure",
        ko: "촉이 유연한 강철 딥펜 — 올라가는 획은 머리카락처럼 가늘고 내려가는 획은 무겁게, 두꺼운 획 끝마다 먹이 진하게 고이며 힘을 준 자리가 남는"
      },
      props: {
        en: "no props at all; only the paper and a faint desk shadow along one edge",
        ko: "소품은 전혀 없이, 종이와 한쪽 가장자리에 옅은 책상 그림자뿐인"
      },
      finish: {
        en: "a straight high-resolution scan with the paper very slightly off-square, the ink swelling a little through the fibre",
        ko: "지면이 아주 조금 비뚤어진 고해상도 스캔, 먹이 섬유를 따라 살짝 번진"
      },
      scene: {
        en: "the lines drift in the middle of the sheet, one character or two set larger, the last stroke of the last line pulled out into a long thin sweep that leaves the frame",
        ko: "문구가 지면 가운데에서 조금씩 흐르고 한두 글자가 크게, 마지막 줄의 마지막 획은 길고 가는 선으로 화면 밖까지 뽑혀 나가는"
      },
      seed: { captionMode: "scatter", ink: "black", accent: "none", layout: "center", seal: "square", sealPos: "end", motion: "light", ratio: "4:5" }
    },
    {
      id: "muk",
      emoji: "🖌️",
      label: "먹 서예",
      thumb: "calli/muk.jpg",
      thumbPos: "center 45%",
      caption: "지나가는 것들이 오히려 오래 남는다",
      captions: [
        "지나가는 것들이 오히려 오래 남는다",
        "마음이 숨 쉬는 자리가 내 삶이다",
        "흔들려도 다시 중심을 잡는다"
      ],
      paper: {
        en: "the whole frame is ivory woven hanji or silk with a visible warp and weft, no table edge, no prop",
        ko: "화면 전체가 날실과 씨실이 보이는 아이보리 직조 한지, 탁자도 소품도 없이"
      },
      medium: {
        en: "a thick brush fully loaded with ink — strokes wide and heavy, edges splitting into paper fibres, the ends of strokes shearing dry as the ink runs out",
        ko: "먹을 흠뻑 먹인 두꺼운 붓 — 획이 넓고 무거우며 가장자리가 종이 섬유로 갈라지고, 먹이 마르는 끝은 건필로 갈라지는"
      },
      props: {
        en: "no props; the brushwork itself is the picture",
        ko: "소품 없이, 붓글씨 자체가 그림인"
      },
      finish: {
        en: "photographed straight on under soft daylight so the weave of the cloth shows through the ink",
        ko: "정면에서 부드러운 낮빛으로 촬영해 먹 아래로 천의 직조가 비치는"
      },
      scene: {
        en: "the characters gather into a dense square mass slightly right of centre, the first line smaller, the middle lines enormous, the last line settling back to a middle size — a solid block of writing with wide margins around it",
        ko: "글자가 중앙에서 조금 오른쪽에 빽빽한 사각 덩어리로 모이고, 첫 줄은 작게, 가운데 줄은 크게, 끝 줄은 다시 중간 크기로 내려앉은 단단한 글씨 덩어리와 그 둘레의 넓은 여백"
      },
      seed: { captionMode: "block", ink: "black", accent: "none", layout: "center", seal: "square", sealPos: "bl", motion: "still", ratio: "4:5" }
    },
    {
      id: "desk",
      emoji: "📎",
      label: "데스크 플랫레이",
      thumb: "calli/desk.jpg",
      thumbPos: "center 45%",
      caption: "애쓴 만큼 마음이 자란다",
      captions: [
        "애쓴 만큼 마음이 자란다",
        "어제의 나보다 한 뼘 나아지기",
        "조금 서툰 오늘을 기록해 둔다"
      ],
      paper: {
        en: "a torn rectangle of thick cream paper, its edges ripped by hand and showing long brown fibres, laid on a linen table",
        ko: "손으로 찢은 두꺼운 크림 종이 사각형, 가장자리에 갈색 섬유가 길게 드러나고 리넨 탁자 위에 놓인"
      },
      medium: {
        en: "a fine steel dip pen, black ink, small precise letters with a slow and even rhythm",
        ko: "가는 강철 딥펜에 검정 먹, 작고 정확한 글자에 느리고 고른 리듬"
      },
      props: {
        en: "one small brass binder clip and one dip-pen nib set down at the lower right of the paper, out of focus, plus a soft natural shadow under the torn edge",
        ko: "종이 오른쪽 아래에 작은 황동 클립 하나와 딥펜 촉 하나가 초점 밖으로 놓이고, 찢긴 가장자리 아래로 부드러운 자연 그림자"
      },
      finish: {
        en: "an overhead flat-lay photograph in warm afternoon light, shallow depth of field at the props, real texture and real paper shadow",
        ko: "따뜻한 오후 빛의 위에서 내려다본 플랫레이 사진, 소품 쪽은 얕은 심도, 실제 질감과 실제 종이 그림자"
      },
      scene: {
        en: "the torn sheet holds the centre of the frame, the writing filling its middle in tidy rows",
        ko: "찢긴 종이가 화면 가운데를 잡고, 그 안쪽 가운데를 단정한 줄로 채운 글씨"
      },
      seed: { captionMode: "block", ink: "black", accent: "none", layout: "center", seal: "square", sealPos: "end", motion: "still", ratio: "4:5" }
    },
    {
      id: "mono",
      emoji: "🎞️",
      label: "흑백 필기",
      thumb: "calli/mono.jpg",
      thumbPos: "center 45%",
      caption: "손 잡고 천천히",
      captions: ["손 잡고 천천히", "그래도 같이 가자", "오늘도 해냈다"],
      paper: {
        en: "a clean pure-white field with nothing else in it — no table, no prop, no texture gradient",
        ko: "아무것도 없는 깨끗한 순백 바탕 — 탁자도 소품도 질감 그라데이션도 없는"
      },
      medium: {
        en: "a wide flat brush loaded with black ink, only two or three characters and each one enormous, the stroke edges crisp against the white",
        ko: "검정 먹을 든 넓고 평평한 붓, 두세 글자만 크게, 획의 가장자리가 흰 바탕에서 또렷한"
      },
      props: {
        en: "the writer's fingertips and the black brush handle enter from the lower edge of the frame, holding the brush mid-stroke",
        ko: "화면 아래 가장자리에서 쓴 사람의 손끝과 검정 붓대가 들어와 붓을 든 채 획 중간에 있는"
      },
      finish: {
        en: "high-contrast black-and-white film photography with fine grain, the white blown to pure paper white, no grey cast",
        ko: "고대비 흑백 필름 사진, 고운 입자, 흰색은 종이처럼 순백으로 날아가고 회색 기운이 없는"
      },
      scene: {
        en: "a mostly empty white frame with the few characters large at the centre",
        ko: "거의 비어 있는 흰 화면 가운데에 큰 글자 몇 자"
      },
      seed: { captionMode: "one", ink: "black", accent: "none", layout: "center", seal: "square", sealPos: "end", motion: "brush", ratio: "9:16" }
    },
    {
      id: "aqua",
      emoji: "🌊",
      label: "수채 풍경",
      thumb: "calli/aqua.jpg",
      thumbPos: "center 45%",
      caption: "오늘은 웃는 쪽으로 걸어요",
      captions: [
        "오늘은 웃는 쪽으로 걸어요",
        "바다는 늘 같은 자리에서 기다린다",
        "멀리 있어도 마음은 같은 방향"
      ],
      paper: {
        en: "one warm cream sheet, its tone even and its margins plain, nothing else on the table",
        ko: "한 톤 고른 따뜻한 크림 종이 한 장, 여백은 아무것도 없이 단정한"
      },
      medium: {
        en: "brush calligraphy in the upper part and, below it, a loose watercolour seascape painted with a wide wet brush",
        ko: "위쪽은 붓 캘리그라피, 그 아래는 넓은 젖은 붓으로 그린 느슨한 수채 바다 풍경"
      },
      props: {
        en: "a small sailing boat on the horizon, three gulls as quick grey strokes, reeds at the left corner, a shell and a starfish on the near sand, all in soft watercolour with the paper left showing",
        ko: "수평선 위 작은 범선, 빠른 회색 획 세 줄기로 그린 갈매기, 왼쪽 모서리의 갈대, 앞쪽 모래 위 조개와 불가사리 — 모두 종이가 비치는 부드러운 수채"
      },
      finish: {
        en: "a scan of real watercolour on paper, the wash edges drying darker, the paper's warmth holding through",
        ko: "실제 수채를 종이째 스캔한 듯, 수채 가장자리가 마르며 조금 진해지고 종이의 따뜻함이 배어 있는"
      },
      scene: {
        en: "the lettering sits in the upper third, wide margins around it, and the sunset sea fills the lower half, the horizon a little above the middle",
        ko: "문구가 위 3분의 1에 앉고 그 둘레는 넓게 비어 있으며, 아래 절반은 노을 바다가 채우며 수평선은 가운데보다 조금 위인"
      },
      seed: { captionMode: "block", ink: "black", accent: "peach", layout: "top", seal: "square", sealPos: "end", motion: "light", ratio: "4:5" }
    },
    {
      id: "mood",
      emoji: "🌸",
      label: "무드 콜라주",
      thumb: "calli/mood.jpg",
      thumbPos: "center 45%",
      caption: "단단한 마음으로 겨울을 건넌다",
      captions: [
        "단단한 마음으로 겨울을 건넌다",
        "눈이 그치면 다시 걸어보자",
        "우리는 서로의 온기로 겨울을 난다"
      ],
      paper: {
        en: "no paper at all — the background is a painted dusk sky over a snowfield",
        ko: "종이가 아니라, 설원 위로 번지는 노을 하늘을 그린 배경"
      },
      medium: {
        en: "black brush script written straight over the painted background, wet and confident, the last character's final stroke pulled down long",
        ko: "그림 위에 바로 쓴 검정 붓글씨 — 젖고 자신 있게, 마지막 글자의 끝획이 길게 아래로 뽑힌"
      },
      props: {
        en: "far below the writing, a tiny vintage car parked in the snow with two small figures standing on its roof, looking away, and thin bare trees at the horizon",
        ko: "글씨에서 한참 아래, 눈밭에 세워 둔 작은 빈티지 자동차와 그 지붕 위에 올라선 두 사람의 작은 실루엣, 수평선의 앙상한 나무들"
      },
      finish: {
        en: "a soft digital painting with visible brush texture, snow falling as small bright particles, no photographic grain",
        ko: "붓 질감이 보이는 부드러운 디지털 회화, 밝은 작은 입자로 내리는 눈, 사진 입자 없이"
      },
      scene: {
        en: "a pink and lilac dusk sky occupies the upper two thirds, the lettering floats in its middle, and the snowfield with the car and the two figures fills the bottom third",
        ko: "분홍과 라일락 노을 하늘이 위 2/3를 차지하고 그 가운데에 문구가 떠 있으며, 자동차와 두 사람이 있는 설원이 아래 1/3을 채우는"
      },
      seed: { captionMode: "block", ink: "black", accent: "rose", layout: "center", seal: "square", sealPos: "end", motion: "drift", ratio: "9:16" }
    },
    {
      id: "minim",
      emoji: "⬜",
      label: "미니멀 카드",
      thumb: "calli/minim.jpg",
      thumbPos: "center 45%",
      caption: "모르는 길이 나를 데려간다",
      captions: [
        "모르는 길이 나를 데려간다",
        "낯선 곳에서 다시 나를 만난다",
        "한 걸음씩이면 충분하다"
      ],
      paper: {
        en: "one sheet of off-white handmade cotton paper, slightly cockled, its tone shifting by a shade across the surface",
        ko: "살짝 물결진 오프화이트 수제 면지 한 장, 표면을 따라 한 톤씩 미묘하게 달라지는"
      },
      medium: {
        en: "a fine brush with ink, characters small and gathered, the strokes quiet and a little dry at the tips",
        ko: "가는 붓에 먹, 글자는 작게 모이고 획은 조용하며 끝이 조금 건조한"
      },
      props: {
        en: "nothing but the paper — no prop, no table edge, no shadow other than the paper's own cockling",
        ko: "종이 말고는 아무것도 — 소품도 탁자 윤곽도 없이, 종이가 물결진 자리의 그림자뿐인"
      },
      finish: {
        en: "a straight-on scan, the sheet filling the frame edge to edge, its fibres and low cockling visible in raking light",
        ko: "정면 스캔, 지면이 화면을 가장자리까지 채우고 비스듬한 빛에 섬유와 낮은 물결이 보이는"
      },
      scene: {
        en: "the characters gather into a small four-line block at the centre, the first line small, the middle lines large, the last settling — enormous margin on every side",
        ko: "글자가 가운데에 작은 네 줄 덩어리로 모이고 첫 줄은 작게, 가운데 줄은 크게, 끝 줄은 다시 내려앉으며 사방에 아주 넓은 여백"
      },
      seed: { captionMode: "block", ink: "black", accent: "none", layout: "center", seal: "square", sealPos: "br", motion: "breathe", ratio: "4:5" }
    },
    {
      id: "tag",
      emoji: "🎀",
      label: "크라프트 태그",
      thumb: "calli/tag.jpg",
      thumbPos: "center 45%",
      caption: "이미 지나간 일에 마음을 쓰지 않기",
      captions: [
        "이미 지나간 일에 마음을 쓰지 않기",
        "오늘 쓸 에너지는 오늘의 일에",
        "어제는 어제로 두고 오늘을 산다"
      ],
      paper: {
        en: "a tan kraft tag with torn, deckled edges lying on a softly crumpled cream paper background",
        ko: "살짝 구겨진 크림 종이 바탕 위에 놓인, 가장자리를 손으로 뜯은 황갈색 크라프트 태그"
      },
      medium: {
        en: "sepia-brown brush ink, small and warm, the lines leaning gently as a hand naturally does",
        ko: "세피아 갈색 붓 잉크, 작고 따뜻하며 손이 자연스럽게 기우는 만큼 줄이 조금씩 기운"
      },
      props: {
        en: "a brass eyelet at the top of the tag with a twine bow threaded through it, and a dried flower sprig taped to the left with translucent tape, casting a soft shadow",
        ko: "태그 위쪽 황동 구멍에 매듭지어 단 삼베끈 리본, 왼쪽에는 반투명 테이프로 붙인 마른 꽃다발이 부드러운 그림자를 드리운"
      },
      finish: {
        en: "an overhead photograph in warm late-afternoon light, real depth of field: the tag sharp, the background falling softly away",
        ko: "따뜻한 늦은 오후 빛의 위에서 내려다본 사진, 태그는 선명하고 배경은 부드럽게 흐려지는 실제 심도"
      },
      scene: {
        en: "the tag sits square in the middle of the frame holding a four-line block of writing",
        ko: "태그가 화면 가운데에 반듯하게 놓여 네 줄 글씨를 담고"
      },
      seed: { captionMode: "block", ink: "sepia", accent: "yellow", layout: "center", seal: "square", sealPos: "end", motion: "still", ratio: "4:5" }
    },
    {
      id: "seal",
      emoji: "🔴",
      label: "낙관 붓글씨",
      thumb: "calli/seal.jpg",
      thumbPos: "center 45%",
      caption: "서로의 어둠을 비추는 사람",
      captions: [
        "서로의 어둠을 비추는 사람",
        "빛이 되어 주는 마음",
        "조용히 곁을 지키는 사람"
      ],
      paper: {
        en: "the whole frame is fine white linen cloth, its weave soft and even, wrinkles kept to one or two gentle lines",
        ko: "화면 전체가 잔 결이 고른 흰 무명천, 주름은 부드러운 한두 줄뿐인"
      },
      medium: {
        en: "a large brush in black ink writing downward, the characters confident and unequal in size, the final word set largest with a long descending stroke",
        ko: "큰 붓으로 검정 먹을 찍어 아래로 내려 쓰는 글씨, 글자 크기가 고르지 않고 자신 있게, 끝 단어를 가장 크게 길게 내려 뽑은"
      },
      props: {
        en: "no prop at all — only the cloth and one soft fold of shadow",
        ko: "소품 없이 천과 부드러운 그림자 한 겹뿐인"
      },
      finish: {
        en: "photographed from above under even daylight, the cloth weave and a faint sheen on the ink",
        ko: "고른 낮빛 아래 위에서 촬영해 천의 결과 먹의 옅은 윤기가 보이는"
      },
      scene: {
        en: "the writing runs down the middle as a loose column, opening with smaller characters and closing on one large word, and the seal sits alone at the bottom right",
        ko: "글씨가 가운데를 세로로 따라 느슨하게 내려가며 처음은 작게, 끝은 큰 한 단어로 맺고, 오른쪽 아래에 낙관만 놓인"
      },
      seed: { captionMode: "vertical", ink: "black", accent: "none", layout: "center", seal: "square", sealPos: "br", motion: "breathe", ratio: "4:5" }
    }
  ];

  /* ---------- 문구 다듬기 ---------- */
  function clean(str) {
    return String(str || "").replace(/[\n\r"]+/g, " ").replace(/\s+/g, " ").trim();
  }

  MPS.register({
    id: "calli",
    order: 8,
    name: "CALLI",
    engName: "CALLIGRAPHY",
    tab: "캘리그라피",
    tabSub: "손글씨 · 낙관",
    accent: "#b4342c",
    accentSoft: "#f7e3df",
    ink: "#241f19",
    tagline: "한 문장을, 손끝으로",
    summary:
      "손글씨가 놓인 자리부터 열 가지로 나눈 캘리그라피 스타일. 붓펜 엽서, 딥펜 필사, 두꺼운 먹 붓, 찢은 종이 위 데스크 사진, 흑백 필기 영상, 수채 풍경, 무드 콜라주, 미니멀 카드, 크라프트 태그, 흰 천 위 낙관까지 — 문구와 작가명을 적으면 그 결에 맞는 캘리그라피 작품 프롬프트가 이미지·영상 4종으로 나옵니다. 작가명은 붉은 낙관에 새겨집니다.",
    hero: { src: "calli/seal.jpg", alt: "흰 무명천 위에 세로로 내려 쓴 검정 붓글씨와 붉은 정방 낙관", pos: "center 45%" },
    facts: [
      { k: "바탕", v: "종이 · 천 · 그림", d: "스타일마다 다른 지면" },
      { k: "도구", v: "붓펜 · 딥펜 · 붓", d: "굵기 대비와 건필" },
      { k: "문구", v: "직접 입력", d: "기본 글귀 3종 제공" },
      { k: "낙관", v: "벼리 (붉은 인주)", d: "정방 · 둥근 · 없이" }
    ],
    dna: [
      {
        tag: "01 · 바탕", swatch: "#F4E7C6", title: "작품이 놓인 자리",
        body: "캘리그라피는 글씨만으로 완성되지 않습니다. 연노랑 엽서지, 회색기 도는 한지, 물결진 수제지, 뜯은 크라프트, 흰 무명천, 혹은 그림이 깔린 바탕 — 카드마다 바탕이 먼저 정해지고 그 위에 글씨가 앉습니다.",
        spec: "바탕 고정 · 탁자·접시 등 다른 사물 배제 · 가장자리까지 지면"
      },
      {
        tag: "02 · 손", swatch: "#17130F", title: "폰트가 아닌 손",
        body: "획의 굵기는 힘에 따라 숨을 쉬고, 글자 사이 간격은 고르지 않으며, 가로선은 몇 도씩 흔들립니다. 획 끝은 붓이 들리며 마르고 갈라집니다. 완벽하게 반듯한 글리프나 활자처럼 인쇄된 느낌은 이 스타일의 반대편입니다.",
        spec: "필압 변화 · 고르지 않은 자간 · 살짝 흔들리는 기준선 · 건필 끝"
      },
      {
        tag: "03 · 도구", swatch: "#6E4A2A", title: "붓펜 · 딥펜 · 붓",
        body: "붓펜은 생활 손글씨의 가벼운 힘, 딥펜은 머리카락 같은 업스트로크와 무거운 다운스트로크, 큰 붓은 넓고 무거운 획과 섬유로 갈라지는 가장자리를 만듭니다. 카드가 정한 도구를 그대로 따릅니다.",
        spec: "붓펜 = 가벼움 · 딥펜 = 굵기 대비 · 붓 = 넓은 획과 건필"
      },
      {
        tag: "04 · 구도", swatch: "#8FA083", title: "덩어리와 여백",
        body: "글씨는 화면 어딘가에 한 덩어리로 모이고, 나머지는 비웁니다. 네 줄 블록은 위에서 아래로 조금씩 짧아지며 사각형에 가까운 덩어리를 만들고, 자유 배치는 줄이 흐르며 오른쪽 끝이 들쭉날쭉해집니다.",
        spec: "한 덩어리 · 사방 여백 · 줄 길이 변화 · 가운데 정렬 또는 왼쪽 붙임"
      },
      {
        tag: "05 · 먹빛", swatch: "#26384A", title: "한 가지 먹, 한 가지 온도",
        body: "먹은 한 색만 씁니다. 순흑은 대비가 세고, 세피아는 오래된 편지처럼 따뜻하고, 청먹은 고이는 자리에 쪽빛이 돌며, 회먹은 종이가 대부분을 빨아들인 듯 부드럽습니다. 색을 더할 때도 꽃잎 한 장, 수채 한 번 정도로 아낍니다.",
        spec: "단색 먹 · 곁들이는 색 1 · 그라데이션 없음"
      },
      {
        tag: "06 · 낙관", swatch: "#B4342C", title: "벼리, 붉은 인주 한 점",
        body: "작품의 끝에는 작가명을 새긴 붉은 낙관이 놓입니다. 기본값은 '벼리', 정방형 또는 둥근 도장, 화면 폭의 3퍼센트 남짓. 문구의 마지막 글자 뒤나 오른쪽 아래에 조금 떨어져 찍히고, 낙관을 빼면 서명도 남기지 않습니다.",
        spec: "작가명 기본 '벼리' · 주홍 인주 · 폭 3% · 문구 끝 또는 아래 모서리"
      },
      {
        tag: "07 · 사진과 그림", swatch: "#E1A48D", title: "실사인지 회화인지 먼저",
        body: "데스크·태그·흑백·낙관 카드는 실사 사진입니다. 클립·펜촉·삼베끈·마른 꽃이 실제 소품으로 놓이고 빛과 그림자가 진짜입니다. 수채·무드 카드는 그림이며, 수채는 종이가 비치고 디지털 회화는 붓 질감이 보입니다.",
        spec: "사진 카드 = 실제 소품·심도·그림자 · 그림 카드 = 수채 번짐·붓 질감"
      },
      {
        tag: "08 · 금기", swatch: "#A9483C", title: "글자와 장식을 더하지 않는다",
        body: "요청한 문구와 낙관의 작가명 말고는 글자를 넣지 않습니다. 날짜·숫자·영문 캡션·로고·워터마크·@계정명, 그리고 낙관 밖의 서명은 모두 금지입니다. 형광색, 3D, 과한 광택, 액자나 테두리도 이 스타일의 언어가 아닙니다.",
        spec: "문구 + 낙관 작가명 외 글자 0 · 날짜·로고·@ 0 · 3D·형광 0"
      }
    ],

    controls: [
      {
        key: "scene", type: "text", label: "장면 직접 입력", placeholder: "예: 창가에 놓인 엽서, 오후 네 시의 빛",
        hint: "비우면 위에서 고른 카드의 장면을 씁니다"
      },
      {
        key: "caption", type: "caption", label: "캘리그라피 문구", placeholder: "예: 오늘도 잘 견뎌 낸 나에게",
        modes: LINE_MODES
      },
      {
        key: "artist", type: "text", label: "작가명 (낙관에 새깁니다)", placeholder: "벼리",
        hint: "기본값 '벼리'. 이 이름이 붉은 낙관에 한글로 들어갑니다"
      },
      { key: "seal", type: "chips", label: "낙관", options: Object.entries(SEALS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "sealPos", type: "chips", label: "낙관 자리", options: Object.entries(SEAL_POS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "ink", type: "swatch", label: "먹빛", options: Object.entries(INKS).map(([id, v]) => ({ id, label: v.label, hex: v.hex })) },
      { key: "accent", type: "swatch", label: "곁들이는 색", options: Object.entries(ACCENTS).map(([id, v]) => ({ id, label: v.label, hex: v.hex })) },
      { key: "layout", type: "chips", label: "문구 자리", options: Object.entries(LAYOUTS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "motion", type: "chips", label: "영상 움직임", options: Object.entries(MOTIONS).map(([id, v]) => ({ id, ...v })) },
      { key: "ratio", type: "chips", label: "화면 비율", options: MPS.RATIOS }
    ],

    defaults: {
      captionMode: "scatter",
      artist: "벼리",
      seal: "square",
      sealPos: "end",
      ink: "black",
      accent: "yellow",
      layout: "top",
      motion: "breathe",
      ratio: "4:5"
    },

    presets: PRESETS,

    samples: PRESETS.map((p) => ({
      file: p.thumb,
      title: p.label,
      caption: p.caption,
      pos: p.thumbPos,
      preset: p.id,
      seed: Object.assign({}, p.seed)
    })),

    /* 캘리그라피는 문구와 낙관의 작가명이 곧 작품이므로, 엔진의 기본 워터마크
       가드('서명 금지')를 그대로 쓰면 의도한 글씨까지 막습니다. 이 스타일만
       '문구 + 낙관 작가명'을 허용하고 그 밖의 글자를 금하는 전용 가드를 씁니다. */
    textGuard: {
      en:
        "Text rule for this piece: the only writing in the frame is the calligraphy phrase given above and the artist name carved into the red seal. Add no other words, no Latin caption, no date, no number, no logo, no watermark, no signature outside the seal, and no @ username or social media handle.",
      ko:
        "글자 규칙: 화면 안의 글자는 위에서 지정한 캘리그라피 문구와, 붉은 낙관에 새긴 작가명뿐입니다. 그 밖의 다른 글자·영문 캡션·날짜·숫자·로고·워터마크·낙관 밖의 서명·@ 계정명은 넣지 않습니다."
    },

    /* ---------------- 프롬프트 빌더 ---------------- */
    build: {
      imageEn(ctx) {
        const p = ctx.preset;
        const ink = INKS[ctx.get("ink").id];
        const accent = ACCENTS[ctx.get("accent").id];
        const lines = ctx.get("captionMode");
        const layout = LAYOUTS[ctx.get("layout").id];
        const sealOpt = ctx.get("seal");
        const seal = SEALS[sealOpt.id];
        const sealPos = SEAL_POS[ctx.get("sealPos").id];
        const artist = clean(ctx.text("artist")) || "벼리";
        const phrase = clean(ctx.text("caption")) || p.caption;
        const ratio = ctx.get("ratio");
        const sceneEn = clean(ctx.scene("en"));

        const sealLine =
          sealOpt.id === "none"
            ? "Seal: none. With no seal, leave no signature, monogram or mark of the artist anywhere in the frame."
            : `Seal: ${seal.en(artist)}, ${sealPos.en}. It is the only signature in the piece.`;

        const accentLine =
          accent.id === "none"
            ? "Colour: none beyond the ink — no coloured prop, no tint on the paper."
            : `Colour: ${accent.en}. Keep it to that one small area; everything else is ink and the paper's own tone.`;

        if (ctx.brief) {
          return [
            `A hand-lettered Korean calligraphy piece, ${ratio.en}.`,
            `Surface: ${p.paper.en}.`,
            `Tool: ${p.medium.en}.`,
            `Write exactly this Korean text and nothing else: "${phrase}" — ${lines.en}, ${layout.en}, ${ink.en}.`,
            `A human hand, not a font: pressure varies, spacing is uneven, stroke ends dry out.`,
            p.props.en ? `Props: ${p.props.en}.` : "",
            `${accentLine}`,
            `${sealLine}`,
            `${sceneEn ? sceneEn + ". " : ""}${p.finish.en}.`
          ]
            .filter(Boolean)
            .join(" ");
        }

        return [
          `A hand-lettered Korean calligraphy piece — one finished work of handwriting, photographed or scanned as a real object, not a graphic design, not a poster mockup and not a 3D render.`,
          `Surface: ${p.paper.en}.`,
          `Tool and hand: ${p.medium.en}. The writing is made by a trained human hand in one sitting: the stroke weight swells and thins with pressure, the spacing between characters is never perfectly even, the baseline drifts by a degree or two, the ends of strokes taper and split into dry fibres where the tool lifts. Never a font, never mechanically identical glyphs, never a printed or typeset look.`,
          `Lettering: write exactly this Korean text — Hangul, not Chinese characters — and copy it character for character with no additions, no omissions and no repetition: "${phrase}". Layout of the writing: ${lines.en}; placement on the surface: ${layout.en}. Ink: ${ink.en}.`,
          p.props.en ? `Props and supporting marks: ${p.props.en}.` : "",
          accentLine,
          sealLine,
          sceneEn ? `Composition: ${sceneEn}.` : "",
          `Light and finish: ${p.finish.en}. The whole piece feels quiet, warm and unhurried, made to be kept in a drawer or pinned above a desk.`,
          `Output: one finished piece, ${ratio.en}, high resolution, true texture — paper fibre, ink sheen and a natural soft shadow where the surface lifts.`,
          `Avoid: typed fonts, printed text, calligraphic computer lettering, fake or gibberish Hangul, Chinese or Japanese characters, any extra words or letters, Latin captions, dates, numbers, logos, watermarks, borders, frames, stickers, emoji, 3D rendering, neon or oversaturated colour, glossy plastic look, duplicated or mirrored text, and any @ username or social media handle.`
        ]
          .filter(Boolean)
          .join("\n\n");
      },

      imageKo(ctx) {
        const p = ctx.preset;
        const ink = INKS[ctx.get("ink").id];
        const accent = ACCENTS[ctx.get("accent").id];
        const lines = ctx.get("captionMode");
        const layout = LAYOUTS[ctx.get("layout").id];
        const sealOpt = ctx.get("seal");
        const seal = SEALS[sealOpt.id];
        const sealPos = SEAL_POS[ctx.get("sealPos").id];
        const artist = clean(ctx.text("artist")) || "벼리";
        const phrase = clean(ctx.text("caption")) || p.caption;
        const ratio = ctx.get("ratio");
        const sceneKo = clean(ctx.scene("ko"));

        const sealLine =
          sealOpt.id === "none"
            ? "낙관: 없음. 낙관을 빼면 작가의 서명·이니셜·표식을 화면 어디에도 남기지 않습니다."
            : `낙관: ${seal.ko(artist)}, ${sealPos.ko} 찍습니다. 이 작품의 서명은 이 낙관 하나뿐입니다.`;

        const accentLine =
          accent.id === "none"
            ? "색: 먹 말고는 더하지 않습니다. 색을 띤 소품도, 종이에 깔린 색조도 없습니다."
            : `색: ${accent.ko}. 그 작은 면적 하나에만 머물고, 나머지는 먹과 종이 본래의 빛입니다.`;

        if (ctx.brief) {
          return [
            `손으로 쓴 한글 캘리그라피 작품, ${ratio.ko}.`,
            `바탕: ${p.paper.ko}.`,
            `도구: ${p.medium.ko}.`,
            `이 문구를 글자 그대로, 다른 글자 없이 씁니다: "${phrase}" — ${lines.ko}, ${layout.ko}, ${ink.ko}.`,
            `폰트가 아닌 사람의 손: 필압이 변하고 자간이 고르지 않으며 획 끝이 마릅니다.`,
            p.props.ko ? `소품: ${p.props.ko}.` : "",
            accentLine,
            sealLine,
            `${sceneKo ? sceneKo + ". " : ""}${p.finish.ko}.`
          ]
            .filter(Boolean)
            .join(" ");
        }

        return [
          `손으로 쓴 한글 캘리그라피 작품 한 점 — 실제로 존재하는 물건을 찍거나 스캔한 사진이며, 그래픽 디자인도 포스터 시안도 3D 렌더도 아닙니다.`,
          `바탕: ${p.paper.ko}.`,
          `도구와 손: ${p.medium.ko}. 글씨는 훈련된 사람의 손이 한자리에서 한 번에 쓴 것입니다 — 필압에 따라 획의 굵기가 부풀고 가늘어지며, 글자 사이 간격은 완벽하게 고르지 않고, 가로 기준선은 한두 도씩 흔들리며, 도구가 들리는 획 끝은 가늘어지며 건조한 섬유로 갈라집니다. 폰트도, 기계적으로 똑같은 글리프도, 활자처럼 인쇄된 느낌도 절대 아닙니다.`,
          `문구: 아래 한글 문장을 글자 하나까지 그대로 씁니다 — 한자나 일본어 문자가 아니라 한글입니다. 더하지도 빼지도 반복하지도 않습니다: "${phrase}". 줄 나눔은 ${lines.ko}, 지면에서의 자리는 ${layout.ko}. 먹빛은 ${ink.ko}.`,
          p.props.ko ? `소품과 곁들이는 표시: ${p.props.ko}.` : "",
          accentLine,
          sealLine,
          sceneKo ? `구도: ${sceneKo}.` : "",
          `빛과 마감: ${p.finish.ko}. 전체가 조용하고 따뜻하며 서두르지 않은, 서랍에 넣어 두거나 책상 위에 붙여 두고 싶은 작품.`,
          `출력: 완성된 작품 한 점, ${ratio.ko}, 고해상도, 진짜 질감 — 종이 섬유, 먹의 윤기, 지면이 떠 있는 자리의 자연스러운 부드러운 그림자까지.`,
          `금지: 활자·인쇄된 글자·컴퓨터 캘리그라피 서체, 가짜이거나 깨진 한글, 한자·일본어 문자, 요청 밖의 추가 글자, 영문 캡션, 날짜·숫자, 로고·워터마크, 테두리·액자, 스티커·이모지, 3D 렌더, 형광·과채도, 광택 나는 플라스틱 질감, 글자의 중복·좌우 반전, @ 계정명이나 SNS 핸들.`
        ]
          .filter(Boolean)
          .join("\n\n");
      },

      motionEn(ctx) {
        const p = ctx.preset;
        const motion = ctx.get("motion");
        const ratio = ctx.get("ratio");
        const phrase = clean(ctx.text("caption")) || p.caption;

        if (ctx.brief) {
          return [
            `6-second seamless loop, 24 fps, ${ratio.en}, the same calligraphy piece animated in place.`,
            `${H.cap(motion.en)}.`,
            `The paper, the ink and every character stay identical from first frame to last; nothing re-flows or re-writes. First and last frame identical, no fade, no sound.`,
            `Only the phrase "${phrase}" and the red seal are lettering; no other text, no watermark.`
          ].join(" ");
        }

        const brushMotion =
          motion.id === "brush"
            ? `Timing: the writing is drawn in over the first four seconds at a natural hand speed and then rests. Each stroke lands wet and lifts dry, and the finished characters are exactly the ones in the prompt.`
            : `Timing: the writing is already finished in the first frame; do not re-write it, do not reveal it stroke by stroke, do not let characters flicker between frames.`;

        return [
          `Animate the finished calligraphy piece into a 6-second seamless loop at 24 fps, ${ratio.en} — a real object filmed in place, never a 3D camera move and never a morph.`,
          `Motion: ${motion.en}.`,
          brushMotion,
          `Stability: the paper, its fibre and its shadow hold still; the ink's edges do not boil, bloom or crawl between frames, and no character shifts position or changes shape.`,
          `Colour: ink density and paper tone stay constant — no brightness pulse, no colour shift, no vignette breathing.`,
          `Text: the only writing in frame is the phrase "${phrase}" and the artist name inside the red seal; no other words appear at any point in the loop.`,
          `Loop: last frame identical to the first, restart invisible. No fade in or out, no title card, no logo, no sound, no speed ramp, no added elements.`
        ]
          .filter(Boolean)
          .join("\n\n");
      },

      motionKo(ctx) {
        const p = ctx.preset;
        const motion = ctx.get("motion");
        const ratio = ctx.get("ratio");
        const phrase = clean(ctx.text("caption")) || p.caption;

        if (ctx.brief) {
          return [
            `${ratio.ko}, 6초 무한 반복, 24fps. 같은 캘리그라피 작품을 그 자리에서 움직입니다.`,
            `${H.cap(motion.ko)}.`,
            `종이·먹·모든 글자는 첫 프레임과 마지막 프레임이 같고, 글씨가 다시 쓰이거나 흐트러지지 않습니다. 첫 프레임과 마지막 프레임 동일, 페이드·소리 없음.`,
            `글자는 "${phrase}"와 붉은 낙관의 작가명뿐, 그 밖의 텍스트·워터마크는 없습니다.`
          ].join(" ");
        }

        const brushMotion =
          motion.id === "brush"
            ? `타이밍: 첫 4초 동안 손의 자연스러운 속도로 글씨가 써지고 그 뒤로는 멈춰 있습니다. 획은 닿을 때 젖고 들릴 때 마르며, 완성된 글자는 프롬프트의 문구와 정확히 같습니다.`
            : `타이밍: 첫 프레임에서 글씨는 이미 완성되어 있습니다. 다시 쓰지 말고, 획 단위로 나타나게 하지 말고, 프레임 사이에 글자가 깜빡이지 않게 합니다.`;

        return [
          `완성된 캘리그라피 작품을 ${ratio.ko} 6초 무한 반복 영상으로 만듭니다. 24fps, 실제 물건을 그 자리에서 촬영한 움직임이며 3D 카메라 이동도 모핑도 아닙니다.`,
          `움직임: ${motion.ko}.`,
          brushMotion,
          `고정: 종이와 섬유, 그림자는 멈춰 있고, 먹의 가장자리가 프레임마다 끓거나 번지거나 기어가지 않습니다. 어떤 글자도 위치가 바뀌거나 형태가 변하지 않습니다.`,
          `색: 먹의 농도와 종이의 빛이 일정합니다 — 밝기가 맥동하지 않고, 색이 변하지 않으며, 비네팅이 숨 쉬지 않습니다.`,
          `글자: 화면 안의 글자는 "${phrase}"와 붉은 낙관 속 작가명뿐이며, 반복 재생 중에 다른 글자가 나타나지 않습니다.`,
          `루프: 마지막 프레임이 첫 프레임과 같고 반복이 보이지 않습니다. 페이드 인·아웃, 타이틀 카드, 로고, 소리, 속도 램프, 새 요소는 없습니다.`
        ]
          .filter(Boolean)
          .join("\n\n");
      }
    },

    randomize(ctx) {
      const p = PRESETS[Math.floor(Math.random() * PRESETS.length)];
      const pick = (obj) => Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];
      return {
        preset: p.id,
        seed: Object.assign({}, p.seed, {
          ink: pick(INKS),
          accent: pick(ACCENTS),
          motion: pick(MOTIONS),
          ratio: ["4:5", "4:5", "9:16", "1:1", "16:9"][Math.floor(Math.random() * 5)]
        }),
        caption: p.captions[Math.floor(Math.random() * p.captions.length)]
      };
    }
  });
})();
