/* ============================================================
   My Prompt Studio · data/linni.js
   ① 린니 — 에세이 시퀀스형 (종이 · 잉크 펜선)
   linni-prompt-studio/ 의 스타일 DNA · 프리셋 8종 · 샘플을 계승해
   이미지/영상 × 영어/한국어 4종 프롬프트로 다시 엮은 모듈.
   ============================================================ */

(function () {
  const H = MPS.helpers;

  /* ---------- 프리셋 (상황) ---------- */
  const PRESETS = [
    {
      id: "comfort",
      emoji: "🌱",
      label: "위로 · 회복",
      thumb: "linni/sample-fall.jpg",
      thumbPos: "center 55%",
      caption: "넘어진 자리에도 꽃은 피어난다.",
      captions: ["넘어진 자리에도 꽃은 피어난다.", "오늘은 여기까지 해도 괜찮아.", "다시 일어나면 그만이야."],
      object: "flower",
      color: "rose",
      scene: {
        en: "a small figure sits on the ground with its knees drawn up, a single tiny flower already sprouting beside its foot, a few short motion dashes above its head",
        ko: "작은 인물이 무릎을 끌어안고 땅에 앉아 있고, 발치에는 이미 작은 꽃 한 송이가 피어 있다. 머리 위로 짧은 움직임 표시 두세 개"
      },
      beats: {
        en: [
          "the figure lies flat on the ground, one arm stretched out, three short dust lines",
          "it pushes itself up on one hand, hair falling over its face",
          "it sits with knees up and finds a small flower beside its foot",
          "it stands, still a little bent, holding the flower up like a small flag",
          "it walks off to the right, the flower in hand and a sprout at its heel"
        ],
        ko: [
          "인물이 땅에 납작하게 누워 한 팔을 뻗고 있고, 흙먼지 표시 세 개",
          "한 손으로 몸을 일으키며 머리카락이 얼굴로 흘러내린다",
          "무릎을 세우고 앉아 발치에서 작은 꽃 한 송이를 발견한다",
          "아직 조금 굽은 채로 일어나 꽃을 작은 깃발처럼 들어 올린다",
          "오른쪽으로 걸어가고, 손에는 꽃, 발뒤꿈치에는 새싹"
        ]
      }
    },
    {
      id: "growth",
      emoji: "📈",
      label: "성장 · 도전",
      thumb: "linni/sample-sprout.jpg",
      thumbPos: "center 50%",
      caption: "오늘 심은 한 알이 내일의 그늘을 만든다.",
      captions: ["오늘 심은 한 알이 내일의 그늘을 만든다.", "시작은 늘 작고 초라하다.", "한 뼘씩, 조금씩."],
      object: "sprout",
      color: "sage",
      scene: {
        en: "a small figure kneels in front of a chipped watering can and a tiny sprout in a clay pot, one leaf waving",
        ko: "작은 인물이 이가 빠진 물조리개와 흙 화분의 새싹 앞에 무릎을 꿇고 있고, 잎 하나가 흔들린다"
      },
      beats: {
        en: [
          "a seed rests in the open palm, drawn with three lines",
          "a green sprout breaks the soil of a small pot",
          "the figure waters it with a chipped watering can, leaning in",
          "the sprout reaches the figure's knee and one leaf waves",
          "it stands beside the taller plant, one hand shading its eyes, looking up"
        ],
        ko: [
          "손바닥 위에 놓인 씨앗 한 알, 세 획으로 그려진다",
          "작은 화분의 흙을 뚫고 새싹이 올라온다",
          "인물이 이가 빠진 물조리개로 물을 주려 몸을 숙인다",
          "새싹이 무릎 높이까지 자라고 잎 하나가 흔들린다",
          "키가 큰 새싹 옆에 서서 한 손으로 볕을 가리며 올려다본다"
        ]
      }
    },
    {
      id: "rest",
      emoji: "🛏️",
      label: "일상 · 쉼",
      thumb: "linni/sample-bed.jpg",
      thumbPos: "center 62%",
      caption: "아무것도 안 한 하루도 잘 보낸 하루.",
      captions: ["아무것도 안 한 하루도 잘 보낸 하루.", "이불 밖은 아직 조금 춥다.", "오늘은 나를 먼저 챙긴다."],
      object: "cup",
      color: "sage",
      scene: {
        en: "a small figure stretches its arms wide while sitting on the edge of a low bed, wearing round earmuffs, a soft blanket bunched behind, a tiny alarm clock ringing with three short lines",
        ko: "작은 인물이 낮은 침대 끝에 앉아 두 팔을 쭉 뻗어 기지개를 켠다. 동그란 귀마개를 쓰고, 뒤에는 뭉친 이불, 옆에는 세 줄의 울림 표시가 붙은 작은 자명종"
      },
      beats: {
        en: [
          "the figure is buried under a blanket, only the round head showing",
          "it sits up with hair standing in two tufts, eyes still two dots",
          "it stretches both arms wide while the alarm clock rings",
          "it walks to the kitchen holding a warm cup with both hands",
          "it sits by the window with the cup, the blanket folded neatly behind it"
        ],
        ko: [
          "이불 속에 파묻혀 동그란 머리만 보인다",
          "머리카락 두 갈래가 서고 눈은 여전히 점 두 개인 채로 일어난다",
          "자명종이 울리는 동안 두 팔을 쭉 뻗어 기지개를 켠다",
          "두 손으로 따뜻한 컵을 감싸고 부엌으로 걸어간다",
          "이불을 반듯하게 개어 두고 창가에 앉아 컵을 든다"
        ]
      }
    },
    {
      id: "love",
      emoji: "💗",
      label: "관계 · 사랑",
      thumb: "linni/thumb-love.jpg",
      thumbPos: "center 55%",
      caption: "말하지 않아도 통하는 사이.",
      captions: ["말하지 않아도 통하는 사이.", "네가 있어 오늘도 괜찮았다.", "같이 있으면 조금 더 나아진다."],
      object: "heart",
      color: "rose",
      scene: {
        en: "two small figures of the same design sit side by side on a bench with a wide gap of paper between them, one small heart floating above the gap, their little fingers barely touching",
        ko: "같은 디자인의 작은 인물 둘이 벤치에 나란히 앉아 있고, 사이에는 종이 여백이 넓게 남는다. 그 사이 위로 작은 하트 하나가 떠 있고, 새끼손가락이 겨우 닿는다"
      },
      beats: {
        en: [
          "two figures stand far apart, each looking the other way",
          "one takes a single step closer, hands behind its back",
          "they sit on a bench with one small heart floating between them",
          "they walk off in the same direction, shoulders almost touching",
          "they stop and look at each other, one small heart still floating above"
        ],
        ko: [
          "두 인물이 멀리 떨어져 서로 반대쪽을 본다",
          "한쪽이 두 손을 뒤로 감춘 채 한 걸음 다가간다",
          "벤치에 나란히 앉고 그 사이에 작은 하트 하나가 떠 있다",
          "같은 방향으로 걸어가고, 어깨가 거의 닿을 듯하다",
          "걸음을 멈추고 서로를 바라본다. 작은 하트 하나가 아직 떠 있다"
        ]
      }
    },
    {
      id: "gratitude",
      emoji: "☀️",
      label: "감사 · 행복",
      thumb: "linni/sample-window.jpg",
      thumbPos: "center 60%",
      caption: "오늘 아침, 그 자체가 행복이다.",
      captions: ["오늘 아침, 그 자체가 행복이다.", "별일 없이 지나간 하루가 제일 좋다.", "고마운 건 자주 말해야 한다."],
      object: "cup",
      color: "butter",
      scene: {
        en: "a small figure stands at a sunlit window holding a steaming cup, eyes closed as two short lines, a warm square of light on the floor and one small plant on the sill",
        ko: "작은 인물이 볕 드는 창가에 서서 김이 오르는 컵을 들고 있고, 눈은 짧은 두 획으로 감겨 있다. 바닥에는 따뜻한 네모의 빛, 창턱에는 작은 화분"
      },
      beats: {
        en: [
          "a hand pulls a curtain aside, light falls on the floor",
          "the figure stands at the window with a steaming cup",
          "it closes its eyes and tilts its face up into the light",
          "it leaves the cup on the sill and steps out, one tiny heart above",
          "it looks back at the window from the doorway, the cup still steaming"
        ],
        ko: [
          "손 하나가 커튼을 젖히고 바닥으로 빛이 떨어진다",
          "인물이 김이 오르는 컵을 들고 창가에 선다",
          "눈을 감고 얼굴을 빛 쪽으로 살짝 든다",
          "컵을 창턱에 두고 밖으로 나서고, 위로 작은 하트 하나",
          "문가에서 창가를 돌아보고, 컵에서는 아직 김이 오른다"
        ]
      }
    },
    {
      id: "work",
      emoji: "💻",
      label: "업무 · 집중",
      thumb: "linni/thumb-desk.jpg",
      thumbPos: "center 55%",
      caption: "오늘의 한 줄이 내일의 나를 만든다.",
      captions: ["오늘의 한 줄이 내일의 나를 만든다.", "잘하고 있다. 조금 느려도.", "끝까지 가 보자."],
      object: "book",
      color: "sky",
      scene: {
        en: "a small figure sits at a low desk with a thin laptop and three stacked books, shoulders rounded, one small plant and a cooling cup beside it",
        ko: "작은 인물이 얇은 노트북과 책 세 권이 놓인 낮은 책상에 앉아 어깨를 둥글게 말고 있다. 옆에는 작은 화분과 식은 커피잔"
      },
      beats: {
        en: [
          "the figure sits down and opens a thin laptop, one small sigh line",
          "it leans in, forehead almost touching the screen",
          "it pushes the books aside and writes one line on a small note",
          "it stands up and stretches while the desk lamp is still on",
          "it turns the laptop screen toward the window, one line written on the note"
        ],
        ko: [
          "인물이 앉아 얇은 노트북을 열고, 작은 한숨 표시 하나",
          "몸을 숙여 이마가 화면에 거의 닿는다",
          "책을 옆으로 밀고 작은 메모지에 한 줄을 적는다",
          "책상 스탠드가 켜진 채로 일어나 기지개를 켠다",
          "노트북 화면을 창 쪽으로 돌리고, 메모지에는 한 줄이 적혀 있다"
        ]
      }
    },
    {
      id: "season",
      emoji: "☔",
      label: "계절 · 날씨",
      thumb: "linni/sample-umbrella.jpg",
      thumbPos: "center 62%",
      caption: "비가 와도 우산은 하나면 충분하다.",
      captions: ["비가 와도 우산은 하나면 충분하다.", "이 계절도 언젠가 지나간다.", "춥다고 말해도 괜찮다."],
      object: "umbrella",
      color: "sky",
      scene: {
        en: "a small figure walks under a large umbrella in fine diagonal rain, one puddle at its feet reflecting a tiny version of itself, a single fallen leaf on the umbrella",
        ko: "작은 인물이 큰 우산을 쓰고 가는 빗줄기 속을 걷는다. 발치의 물웅덩이에는 자신의 작은 모습이 비치고, 우산 위에는 낙엽 한 장"
      },
      beats: {
        en: [
          "rain begins as thin diagonal lines while the figure looks up",
          "it opens a large umbrella that covers most of its body",
          "it walks through a puddled street, a tiny reflection following",
          "the rain stops and the umbrella closes, one leaf left on it",
          "it shakes the water off the umbrella and walks on"
        ],
        ko: [
          "가는 사선의 빗줄기가 시작되고 인물이 위를 올려다본다",
          "몸을 거의 다 덮는 큰 우산을 편다",
          "물웅덩이 진 길을 걷고, 작은 그림자가 따라온다",
          "비가 그치고 우산이 접힌다. 우산 위에 낙엽 한 장이 남는다",
          "우산의 물을 털고 다시 걷는다"
        ]
      }
    },
    {
      id: "night",
      emoji: "🌙",
      label: "밤 · 명상",
      thumb: "linni/sample-lantern.jpg",
      thumbPos: "center 60%",
      caption: "불을 낮추면 마음이 잘 들린다.",
      captions: ["불을 낮추면 마음이 잘 들린다.", "오늘 하루도 여기서 마무리.", "조용한 밤이 나를 다독인다."],
      object: "lantern",
      color: "amber",
      scene: {
        en: "a small figure sits on the floor beside a lantern, its round head tipped back, one star and a thin crescent moon drawn above with the faintest amber glow",
        ko: "작은 인물이 등불 옆 바닥에 앉아 동그란 머리를 뒤로 젖히고 있고, 위로는 별 하나와 가는 초승달이 흐릿한 호박빛으로 번진다"
      },
      beats: {
        en: [
          "a hand lights a small lantern and the room dims",
          "the figure sits beside it, knees hugged, eyes as two dots",
          "it leans back and closes its eyes",
          "the lantern is turned low, one star left above",
          "it lies on its side beside the lantern, eyes closed, one star still above"
        ],
        ko: [
          "손 하나가 작은 등불을 켜고 방이 어두워진다",
          "인물이 등불 옆에 앉아 무릎을 안고, 눈은 점 두 개",
          "뒤로 기대어 눈을 감는다",
          "등불이 낮아지고, 위에 별 하나만 남는다",
          "등불 옆에 옆으로 누워 눈을 감는다. 별 하나가 아직 떠 있다"
        ]
      }
    }
  ];

  /* ---------- 빌더 선택지 ---------- */
  const COMPOSITIONS = [
    { id: "single", label: "단일 컷", note: "한 장에 한 장면", panels: 0,
      en: "one full frame", ko: "단일 컷 한 장" },
    { id: "seq3", label: "3단 시퀀스", note: "시작 · 중간 · 마무리", panels: 3,
      en: "three panels in one horizontal strip, read left to right", ko: "가로 3칸 연속" },
    { id: "seq5", label: "5단 시퀀스", note: "한 걸음씩 이어지는 전개", panels: 5,
      en: "five panels in one wide horizontal strip, read left to right", ko: "가로 5칸 연속" },
    { id: "beforeafter", label: "전후 2컷", note: "전 · 후 대비", panels: 2,
      en: "two panels side by side with a thin hand-drawn vertical divider", ko: "좌우 2칸 대비" }
  ];

  const CASTS = [
    { id: "solo", label: "혼자", en: "one small figure", ko: "혼자 있는 작은 인물" },
    { id: "duo", label: "둘", en: "two figures of the same design, one a little taller", ko: "같은 디자인의 인물 둘(한쪽이 조금 큼)" },
    { id: "pet", label: "반려동물", en: "the figure with a small round-bodied animal companion drawn with three lines and two dot eyes", ko: "작은 동물 친구와 함께(세 획 몸통, 점 눈 두 개)" },
    { id: "mini", label: "작은 자아", en: "the figure with a palm-sized miniature copy of itself standing on its shoulder", ko: "어깨 위에 손바닥만 한 작은 자기 자신이 서 있음" }
  ];

  const OBJECTS = [
    { id: "sprout", label: "새싹", en: "a two-leaf sprout", ko: "두 잎 새싹" },
    { id: "heart", label: "하트", en: "a small lopsided heart", ko: "삐뚤빼뚤한 작은 하트" },
    { id: "lantern", label: "등불", en: "a small paper lantern", ko: "작은 종이 등불" },
    { id: "umbrella", label: "우산", en: "a large round umbrella", ko: "큼직한 둥근 우산" },
    { id: "plane", label: "종이비행기", en: "a folded paper plane", ko: "접은 종이비행기" },
    { id: "book", label: "책", en: "a thin open book", ko: "얇게 펼친 책" },
    { id: "star", label: "별", en: "a five-point star drawn in one stroke", ko: "한 획으로 그린 다섯 꼭지 별" },
    { id: "pig", label: "돼지", en: "a round flying pig with pink cheeks", ko: "볼이 분홍인 둥근 돼지" },
    { id: "cup", label: "커피잔", en: "a warm cup with two steam lines", ko: "김이 두 줄 오르는 따뜻한 컵" },
    { id: "flower", label: "꽃", en: "a small five-petal flower", ko: "작은 다섯 잎 꽃" }
  ];

  const COLORS = [
    { id: "rose", label: "더스티 로즈", hex: "#D98E86", en: "dusty rose", ko: "더스티 로즈" },
    { id: "sage", label: "세이지", hex: "#8FA98B", en: "sage green", ko: "세이지 그린" },
    { id: "butter", label: "버터", hex: "#E9C97A", en: "soft butter yellow", ko: "부드러운 버터 옐로" },
    { id: "sky", label: "스카이", hex: "#9EB9CE", en: "faded sky blue", ko: "바랜 하늘색" },
    { id: "lav", label: "라벤더", hex: "#A9A0C8", en: "muted lavender", ko: "은은한 라벤더" },
    { id: "amber", label: "앰버", hex: "#E0A45E", en: "warm amber", ko: "따뜻한 앰버" },
    { id: "ink", label: "먹 단색", hex: "#3A342E", en: "no colour at all, ink only", ko: "색 없이 먹선만" }
  ];

  const TIMES = [
    { id: "any", label: "상관없음", en: "soft even daylight", ko: "부드럽고 고른 빛" },
    { id: "morning", label: "아침", en: "morning light, a warm square of sun on the floor", ko: "아침 볕, 바닥에 따뜻한 네모의 빛" },
    { id: "noon", label: "낮", en: "flat noon light, almost no shadow", ko: "그림자 거의 없는 정오의 평평한 빛" },
    { id: "evening", label: "저녁", en: "low evening light, one long soft shadow", ko: "낮게 깔린 저녁 빛, 길게 늘어진 부드러운 그림자" },
    { id: "night", label: "밤", en: "night, one small warm lamp as the only light source", ko: "밤, 작은 등 하나만 빛을 낸다" }
  ];

  const CAPTION_MODES = [
    { id: "canvas", label: "그림 안에 손글씨", en: "hand-lettered inside the artwork", ko: "그림 안에 손글씨" },
    { id: "below", label: "그림 아래 캡션", en: "kept out of the artwork for a caption below", ko: "그림 아래 캡션" },
    { id: "none", label: "글귀 없이", en: "no lettering at all", ko: "글귀 없이" }
  ];

  /* ---------- 스타일 등록 ---------- */
  MPS.register({
    id: "linni",
    order: 1,
    name: "린니",
    engName: "LINNI",
    tab: "에세이 시퀀스",
    tabSub: "종이 · 잉크 펜선",
    accent: "#c9776e",
    accentSoft: "#f6e2dd",
    ink: "#3a342e",
    tagline: "한 장의 종이에 다정한 선 하나",
    summary:
      "크림색 스케치북 종이, 0.8~1.2px의 떨리는 잉크선, 동그란 머리의 작은 인물, 60~70%의 여백. 감정을 이어 보여줄 때는 3~5칸 시퀀스로 한 걸음씩 전개합니다.",
    hero: { src: "linni/sample-fall.jpg", alt: "크림색 종이 위 연속 그림 — 넘어짐에서 회복까지 이어지는 장면", pos: "center 55%" },
    facts: [
      { k: "기본 캔버스", v: "크림 종이", d: "#F6EEE0 · 섬유 결 3~6%" },
      { k: "선", v: "0.8~1.2px", d: "흑연 먹색 #3A342E" },
      { k: "여백", v: "60~70%", d: "피사체 점유율 20~35%" },
      { k: "포인트", v: "1~2색", d: "채도 25~45% · 면적 10% 이하" }
    ],
    dna: [
      { tag: "01 · 종이", title: "크림빛 종이 한 장", swatch: "#F6EEE0",
        body: "순백이 아닌 #F4EBDA~#FAF4E8 사이의 크림·아이보리. 미세한 섬유 결이 보이는 두꺼운 스케치북 종이 질감이 화면 전체를 채우고, 배경에는 어떤 사물도 놓지 않습니다.",
        spec: "배경 #F6EEE0 · 종이 그레인 3~6% · 비네팅 없음" },
      { tag: "02 · 선", title: "떨리는 잉크 펜선", swatch: "#3A342E",
        body: "자로 그은 듯 반듯하지 않고 손끝의 떨림과 압력 차이가 남습니다. 선이 살짝 끊기거나 겹쳐 다시 그은 자국이 보이고, 채색은 선 아래에서 은은하게 번지는 연필·수채 톤입니다.",
        spec: "먹색 #3A342E · 선 굵기 0.8~1.2px · 흔들림 2~4%" },
      { tag: "03 · 캐릭터", title: "동그란 머리, 점 두 개", swatch: "#FFFFFF",
        body: "얼굴은 큰 동그라미 하나에 점 눈 두 개, 코는 없거나 짧은 획 하나, 입은 거의 생략. 목 없이 몸통으로 이어지고 팔다리는 가는 막대기. 머리 대 몸 비율 1 : 2~2.5, 표정은 눈과 눈썹 한 획으로만 만듭니다.",
        spec: "머리 1 : 몸 2.5 · 볼 터치 한 점 · 눈썹 획 1개" },
      { tag: "04 · 여유", title: "비워둔 60~70%", swatch: "#FBF6EC",
        body: "피사체는 화면 아래 1/3의 조용한 수평선 위에 작게 놓이고 나머지는 종이로 남깁니다. 좌우 여백이 넉넉해 한 컷이 포스터처럼 숨을 쉬고, 인물은 정중앙보다 살짝 치우쳐 섭니다.",
        spec: "피사체 점유율 20~35% · 하단 1/3 배치 · 상단 여백 30% 이상" },
      { tag: "05 · 색", title: "한두 방울의 파스텔", swatch: "#D98E86",
        body: "화면 대부분은 종이색과 먹색 두 가지. 포인트 컬러는 채도 낮은 파스텔 한두 색만, 의미 있는 곳에만 얹습니다 — 볼, 리본, 넥타이, 돼지의 뺨, 이불. 색은 칠하는 것이 아니라 스며들 듯.",
        spec: "주조 2색 + 포인트 1~2색 · 면적 10% 이하" },
      { tag: "06 · 전개", title: "왼쪽에서 오른쪽으로 한 걸음씩", swatch: "#8FA98B",
        body: "기본은 단일 컷. 감정을 이어 보여줄 때 넓은 캔버스를 3~5칸으로 나눠 같은 인물이 자세만 바꾸며 이어지는 시퀀스를 씁니다. 칸 경계에 테두리를 긋지 않고 여백으로 구분하며, 마지막 칸에서 오브젝트가 감정을 맺습니다.",
        spec: "3~5칸 · 16:9 가로 스트립 · 칸 사이 여백 4~6% · 프레임리스" },
      { tag: "07 · 글씨", title: "손글씨 한 줄과 작은 날짜", swatch: "#A9A0C8",
        body: "글귀는 활자가 아닌 손글씨. 크기는 작고 자간이 들쭉날쭉하며 화면 위쪽이나 아래쪽에 조용히 놓입니다. 우측 하단에 작은 날짜, 하단에 핸들. 가끔 고무도장 같은 원형 테두리 안에 글씨를 넣습니다.",
        spec: "손글씨 12~20px 상당 · 날짜 7~9px · 워터마크 8~10px" },
      { tag: "08 · 말", title: "짧게, 다정하게, 반말로", swatch: "#E9C97A",
        body: "한 문장에서 두 문장. 단정한 반말이 기본이고 마침표로 또박또박 끊습니다. 위로는 달래지 않고 인정하는 방식, 기쁨은 아이처럼. 10~30자, 이모지는 0~1개.",
        spec: "10~30자 · 반말 단정문 · 마침표 · 이모지 0~1개" }
    ],

    controls: [
      { key: "scene", type: "text", label: "상황 직접 입력", placeholder: "예: 이사 간 날, 빈 방 가운데 앉아 문을 바라보는 장면",
        hint: "비우면 위에서 고른 프리셋의 장면을 씁니다" },
      { key: "composition", type: "chips", label: "구도", options: COMPOSITIONS },
      { key: "cast", type: "chips", label: "등장인물", options: CASTS },
      { key: "objects", type: "chips", label: "상징 오브젝트", multi: true, max: 2, options: OBJECTS },
      { key: "color", type: "swatch", label: "포인트 컬러", options: COLORS },
      { key: "ratio", type: "chips", label: "화면 비율", options: MPS.RATIOS },
      { key: "time", type: "chips", label: "빛 · 시간대", options: TIMES },
      { key: "caption", type: "caption", label: "글귀", placeholder: "짧고 다정한 한 문장", modes: CAPTION_MODES }
    ],

    defaults: {
      composition: "seq5",
      cast: "solo",
      objects: ["flower"],
      color: "rose",
      ratio: "16:9",
      time: "any",
      captionMode: "canvas"
    },

    presets: PRESETS,

    samples: [
      { file: "linni/sample-fall.jpg", title: "넘어짐과 회복 · 5단", caption: "넘어진 자리에도 꽃은 피어난다.", pos: "center 55%",
        preset: "comfort", seed: { composition: "seq5", cast: "solo", objects: ["flower"], color: "rose", ratio: "16:9", time: "any" } },
      { file: "linni/sample-umbrella.jpg", title: "비 오는 날 · 단일 컷", caption: "비가 와도 우산은 하나면 충분하다.",
        preset: "season", seed: { composition: "single", cast: "solo", objects: ["umbrella"], color: "sky", ratio: "16:9", time: "noon" } },
      { file: "linni/sample-lantern.jpg", title: "밤 등불 · 단일 컷", caption: "불을 낮추면 마음이 잘 들린다.",
        preset: "night", seed: { composition: "single", cast: "solo", objects: ["lantern", "star"], color: "amber", ratio: "16:9", time: "night" } },
      { file: "linni/sample-sprout.jpg", title: "새싹 물주기 · 3단", caption: "오늘 심은 한 알이 내일의 그늘을 만든다.",
        preset: "growth", seed: { composition: "seq3", cast: "solo", objects: ["sprout"], color: "sage", ratio: "16:9", time: "morning" } },
      { file: "linni/sample-love.jpg", title: "벤치의 두 사람 · 9:16", caption: "말하지 않아도 통하는 사이.", pos: "center 70%",
        preset: "love", seed: { composition: "single", cast: "duo", objects: ["heart"], color: "rose", ratio: "9:16", time: "evening" } },
      { file: "linni/sample-desk.jpg", title: "책상 · 4:5", caption: "오늘의 한 줄이 내일의 나를 만든다.", pos: "center 74%",
        preset: "work", seed: { composition: "single", cast: "solo", objects: ["book", "cup"], color: "sky", ratio: "4:5", time: "any" } }
    ],

    /* ---------------- 프롬프트 빌더 ---------------- */
    build: {
      imageEn(ctx) {
        const comp = ctx.get("composition");
        const cast = ctx.get("cast");
        const color = ctx.get("color");
        const ratio = ctx.get("ratio");
        const time = ctx.get("time");
        const cap = ctx.text("caption").trim().replace(/\.+$/, "");
        const mood = ctx.preset.label;
        const n = comp.panels;
        const objects = ctx.list("objects");
        const customObj = ctx.text("customObject").trim();
        const objEn = H.joinEn(objects.map((o) => o.en).concat(customObj ? "a " + customObj : []));
        const colorLine =
          color.id === "ink"
            ? "Palette: warm cream paper (#F6EEE0) and graphite ink (#3A342E) only — no colour at all."
            : `Palette: warm cream paper (#F6EEE0) and graphite ink (#3A342E) for 90% of the image, plus one soft watercolour accent — ${color.en} (${color.hex}) — covering at most 10% of the area: a touch on the cheek, the symbolic object and one small detail of clothing. The accent is washed in, translucent, never flat or saturated.`;

        const customScene = ctx.text("scene").trim();
        const sceneLine = n
          ? `Composition: ${comp.en}. Keep the gutters as empty paper — no drawn frames or borders. The same character repeats in every panel, changing only pose and position. ` +
            (customScene
              ? `Panel 1: ${H.stripDot(customScene)}. Panels 2–${n}: the same moment carried one small step further — a shift of posture, a hand moving, the expression changing — with no new characters and no new props.`
              : ctx.pick(ctx.preset.beats.en, n).map((b, i) => `Panel ${i + 1}: ${b}.`).join(" "))
          : `Composition: ${comp.en}. ${H.cap(ctx.scene("en"))}. The subject sits on a quiet horizontal line in the lower third, off-centre, with generous empty paper above and to the sides.`;

        let typeLine;
        if (ctx.get("captionMode").id === "canvas") {
          typeLine = cap
            ? `Lettering: the Korean line "${cap}" is hand-lettered inside the paper in loose, uneven pen writing — small, off-baseline, slightly wobbly, as if written by the same hand that drew the figure. Place it in the upper third or just under the scene with plenty of air. Lower right: a tiny hand-lettered date "2026.11.22" and a faint pencil signature "@your_handle". No other text anywhere.`
            : `Lettering: only a tiny hand-lettered date "2026.11.22" and a faint pencil signature "@your_handle" at the lower right. No other text anywhere.`;
        } else if (ctx.get("captionMode").id === "below") {
          typeLine = `Lettering: keep the artwork free of text and leave a clean paper margin at the bottom for a caption added later; only a tiny date "2026.11.22" and a faint pencil signature "@your_handle" at the lower right.`;
        } else {
          typeLine = `Lettering: none at all. Keep the paper completely clean.`;
        }

        if (ctx.brief) {
          return [
            `Minimal hand-drawn Korean picture-book illustration on warm cream paper (#F6EEE0): a small figure with an oversized round head, two dot eyes and stick-thin limbs (1:2.5 head-to-body), thin wobbly graphite ink with faint coloured-pencil shading.`,
            n ? `${n === 5 ? "Five" : n === 3 ? "Three" : "Two"} panels left to right: ${ctx.pick(ctx.preset.beats.en, n).map((b) => H.stripDot(b)).join(" → ")}.` : `Scene: ${ctx.scene("en")}.`,
            `60–70% empty paper, subject small in the lower third, off centre.`,
            objEn ? `Only ${objEn} as the symbol.` : "",
            color.id === "ink" ? "Ink only, no colour." : `One soft ${color.en} (${color.hex}) watercolour accent on at most 10% of the area.`,
            ctx.get("captionMode").id === "canvas" && cap ? `Hand-lettered Korean caption "${cap}".` : "",
            `${H.cap(time.en)}. ${ratio.en}. No 3D, no gradients, no photorealism, no vector-clean edges, no extra text.`
          ].filter(Boolean).join(" ");
        }

        return [
          `A minimalist hand-drawn storybook illustration, quiet and deliberately unfinished — the visual language of a Korean diary comic drawn with a fine pen on thick sketchbook paper.`,
          sceneLine + ` Light: ${time.en}.`,
          `Medium: warm cream paper (#F6EEE0) with a faint visible fibre grain filling the whole frame. Lines are thin graphite ink (#3A342E), 0.8–1.2 px, drawn by hand with uneven pressure, tiny gaps where the pen lifted and the occasional double stroke. Shading is a whisper of coloured pencil under the line — never a gradient, never a hard shadow.`,
          `Character: ${cast.en}. Oversized round head, two dot eyes, no nose or one short stroke, a mouth reduced to a speck or nothing, no neck, slim body, stick-thin arms and legs, mitten hands. Head-to-body ratio about 1 : 2.5. Expression is built only from the eyes and one eyebrow stroke.`,
          objEn
            ? `Only these symbolic objects appear: ${objEn}. Each is drawn with the same thin, slightly shaky ink line and a single wash of colour.`
            : `No props. Nothing else on the paper.`,
          colorLine,
          `Space: 60–70% of the frame stays empty paper. The subject occupies 20–35% and sits low, on a single quiet horizon line, with wide margins left and right. No background scenery, no borders, no frames.`,
          typeLine,
          `Mood: ${mood} — tender, a little lonesome and kind at the same time. Gentle humour, no melodrama, no gloss.`,
          `Output: a single still image, ${ratio.en}, high resolution, flat 2D artwork, matte paper surface.`,
          `Avoid: 3D render, CGI, plastic or glossy surfaces, smooth vector edges, gradient meshes, heavy shadows, cross-hatching, saturated or neon colours, busy backgrounds, symmetry, perfectly straight lines, realistic anatomy, extra fingers, stickers, glow effects, duplicated watermarks, any text other than the one caption and the small signature.`
        ].join("\n\n");
      },

      imageKo(ctx) {
        const comp = ctx.get("composition");
        const cast = ctx.get("cast");
        const color = ctx.get("color");
        const ratio = ctx.get("ratio");
        const time = ctx.get("time");
        const cap = ctx.text("caption").trim().replace(/\.+$/, "");
        const n = comp.panels;
        const objects = ctx.list("objects");
        const customObj = ctx.text("customObject").trim();
        const objKo = H.joinKo(objects.map((o) => o.ko).concat(customObj ? [customObj] : []));
        const colorLine =
          color.id === "ink"
            ? `색: 따뜻한 크림색 종이(#F6EEE0)와 흑연 먹색(#3A342E)만 씁니다. 채색은 전혀 넣지 않습니다.`
            : `색: 화면의 90%는 크림색 종이(#F6EEE0)와 흑연 먹색(#3A342E). 포인트 컬러는 ${color.ko}(${color.hex}) 한 색만, 면적의 10% 이하로 — 볼 한 점, 상징 오브젝트, 옷의 작은 디테일 하나에만 물처럼 번지게. 채도 높은 원색이나 꽉 채운 면은 금지합니다.`;

        const customScene = ctx.text("scene").trim();
        const sceneLine = n
          ? `구도: ${comp.ko}. 칸을 나누는 선은 긋지 않고 종이 여백으로만 구분합니다. 같은 인물이 칸마다 자세와 위치만 바꿔 반복됩니다. ` +
            (customScene
              ? `1칸: ${H.stripDot(customScene)}. 2~${n}칸: 같은 순간을 한 걸음 더 이어 가며 자세만 조금씩, 손이 움직이고 표정이 바뀌는 정도로 전개합니다. 새 인물이나 새 소품은 넣지 않습니다.`
              : ctx.pick(ctx.preset.beats.ko, n).map((b, i) => `${i + 1}칸: ${b}.`).join(" "))
          : `구도: ${comp.ko}. ${ctx.scene("ko")}. 피사체는 화면 아래 1/3의 조용한 수평선 위, 정중앙에서 살짝 비껴 서고, 위쪽과 좌우에는 넉넉한 종이 여백을 남깁니다.`;

        let typeLine;
        if (ctx.get("captionMode").id === "canvas") {
          typeLine = cap
            ? `글씨: 한국어 글귀 "${cap}"${H.josa(cap, "을", "를")} 그림 속 종이 위에 손글씨로 넣습니다. 크기는 작게, 자간과 기준선은 조금씩 어긋나게, 그림을 그린 같은 손이 쓴 것처럼 삐뚤빼뚤하게. 위치는 화면 위쪽 1/3 또는 장면 바로 아래, 주변에 여백을 넉넉히. 우측 하단에는 아주 작은 날짜 "2026.11.22"와 흐린 연필 서명 "@your_handle". 그 밖의 글자는 넣지 않습니다.`
            : `글씨: 우측 하단에 아주 작은 날짜 "2026.11.22"와 흐린 연필 서명 "@your_handle"만. 다른 글자는 없습니다.`;
        } else if (ctx.get("captionMode").id === "below") {
          typeLine = `글씨: 그림 안에는 글자를 넣지 않고, 아래에 캡션을 붙일 수 있도록 종이 여백을 깨끗하게 남깁니다. 우측 하단의 작은 날짜 "2026.11.22"와 흐린 연필 서명 "@your_handle"만 허용합니다.`;
        } else {
          typeLine = `글씨: 전혀 넣지 않습니다. 종이는 완전히 깨끗하게 남깁니다.`;
        }

        if (ctx.brief) {
          return [
            `따뜻한 크림색 종이(#F6EEE0) 위에 그린 미니멀 손그림 동화 일러스트. 큰 동그란 머리에 점 눈 두 개, 가는 막대기 팔다리(머리:몸 = 1:2.5), 가늘고 떨리는 흑연 잉크선과 흐린 색연필 음영.`,
            n ? `${n}칸 연속(왼쪽→오른쪽): ${ctx.pick(ctx.preset.beats.ko, n).map((b) => H.stripDot(b)).join(" → ")}.` : `장면: ${ctx.scene("ko")}.`,
            `화면의 60~70%는 빈 종이, 피사체는 아래 1/3에 작게, 살짝 비껴서.`,
            objKo ? `상징은 ${objKo}뿐.` : "",
            color.id === "ink" ? `먹색만, 채색 없음.` : `포인트 컬러는 ${color.ko}(${color.hex}) 한 색, 면적 10% 이하.`,
            ctx.get("captionMode").id === "canvas" && cap ? `손글씨 한국어 글귀 "${cap}".` : "",
            `빛은 ${time.ko}. ${ratio.ko}. 3D·그라데이션·사실적 묘사·벡터 같은 매끈한 선 금지, 지정한 글자 외 텍스트 금지.`
          ].filter(Boolean).join(" ");
        }

        return [
          `미니멀한 손그림 동화 일러스트. 조용하고, 일부러 덜 그린 듯한 느낌 — 두꺼운 스케치북 종이에 가는 펜으로 그린 한국 일기툰의 시각 언어.`,
          sceneLine + ` 빛은 ${time.ko}.`,
          `재질: 화면 전체를 따뜻한 크림색 종이(#F6EEE0)가 채우고, 미세한 종이 섬유 결이 보입니다. 선은 가는 흑연 잉크(#3A342E), 0.8~1.2px. 손으로 그은 듯 압력이 고르지 않고, 펜이 살짝 떨어져 선이 끊긴 자리와 두 번 그은 자국이 남습니다. 채색은 선 아래로 아주 옅게 스민 색연필 톤이며, 그라데이션이나 진한 그림자는 없습니다.`,
          `캐릭터: ${cast.ko}. 큰 동그란 머리, 점 눈 두 개, 코는 없거나 짧은 획 하나, 입은 점 하나 또는 생략, 목 없이 이어지는 몸통, 가는 막대기 팔다리, 오므린 손. 머리 대 몸 비율은 약 1:2.5. 표정은 눈과 눈썹 한 획으로만 만듭니다.`,
          objKo
            ? `상징 오브젝트: ${objKo}만 등장합니다. 모두 같은 가는 잉크선으로 그리고, 색은 한 번만 은은하게 스며들게 합니다.`
            : `소품은 두지 않습니다. 종이 위에는 인물 외에 아무것도 없습니다.`,
          colorLine,
          `여백: 화면의 60~70%는 빈 종이로 남깁니다. 피사체는 20~35%만 차지하며 아래쪽 1/3의 조용한 수평선 위에 놓이고, 좌우 여백이 넓습니다. 배경 풍경, 테두리, 액자는 없습니다.`,
          typeLine,
          `분위기: ${ctx.preset.label} — 다정하고, 조금 쓸쓸하고, 동시에 따뜻합니다. 과장된 감정이나 번들거리는 마감은 없습니다.`,
          `출력: 정지 이미지 한 장, ${ratio.ko}, 고해상도, 평면 2D 일러스트, 무광 종이 질감.`,
          `금지: 3D 렌더, CGI, 플라스틱 같은 광택, 매끈한 벡터 선, 그라데이션 메시, 진한 그림자, 촘촘한 해칭, 채도 높은 원색·형광색, 복잡한 배경, 완벽한 대칭, 반듯한 직선, 사실적 해부, 손가락 개수 오류, 스티커·글로우 효과, 중복 워터마크, 지정한 글귀와 서명 외의 모든 글자.`
        ].join("\n\n");
      },

      motionEn(ctx) {
        const comp = ctx.get("composition");
        const color = ctx.get("color");
        const time = ctx.get("time");
        const n = comp.panels;
        const objects = ctx.list("objects");
        const objEn = H.joinEn(objects.map((o) => o.en));
        const motionBit = objEn
          ? `the ${objEn.replace(/^a /, "")} sways just enough to catch the eye (about 2 px, once per loop)`
          : "one corner of the paper lifts and settles again";

        if (ctx.brief) {
          return `6-second seamless loop, 24 fps, locked camera (no pan, zoom or morph) of the same cream-paper ink illustration: one breath, one blink, ${objEn ? objEn + " sways" : "a paper corner shifts"}, ink lines boil ≤1 px, paper grain fixed, first and last frame identical, 2D cel animation only, no 3D, no morphing.`;
        }

        const panelsLine = n
          ? `Panel choreography: the strip itself never moves and the gutters never shift. Each panel animates inside its own frame, one after another from left to right — panel 1 breathes and settles in the first 2 seconds, panel 2 picks up, and so on until panel ${n} holds at the end. Nothing crosses a gutter.`
          : `Single frame: the whole scene breathes as one; there is no second scene and no transition.`;

        return [
          `Animate the still illustration into a 6-second seamless loop at 24 fps — 2D hand-drawn cel animation on real paper, nothing else.`,
          `Camera: completely locked. No pan, no zoom, no parallax, no push-in, no morphing, no cross-dissolve. The frame is identical in size and position from first to last.`,
          panelsLine,
          `Micro-motion, and only this: the figure breathes once (shoulders rise 1–2 px over 2.5 s and settle), blinks once around the 2-second mark, and the mouth corner lifts by a single pixel; ${motionBit}; ${time.id === "morning" || time.id === "evening" ? "the square of light on the floor slides 2–3 px as the day moves" : "a single dust mote drifts through the light"}.`,
          `Texture: the paper grain and the cream tone (#F6EEE0) stay perfectly fixed, like a photographed sheet of paper. The ink lines may "boil" — redrawn on twos with a jitter of no more than one pixel — which is the only thing that proves it is hand-drawn. The ${color.id === "ink" ? "ink-only" : color.en + " accent"} area does not flicker or brighten.`,
          `Ending: the last frame is identical to the first frame, so the loop restarts invisibly. No fade, no title card, no logo.`,
          `Style guardrails: keep it flat and matte; no 3D, no lighting changes, no shadows moving, no camera shake, no speed ramps, no added text, no extra characters, no scene change.`
        ].join("\n\n");
      },

      motionKo(ctx) {
        const comp = ctx.get("composition");
        const color = ctx.get("color");
        const time = ctx.get("time");
        const n = comp.panels;
        const objects = ctx.list("objects");
        const objKo = H.joinKo(objects.map((o) => o.ko));
        const motionBit = objKo
          ? `${objKo}가 눈에 겨우 띌 만큼(약 2px, 한 번) 흔들립니다`
          : "종이 모서리 하나가 살짝 들렸다 내려옵니다";

        if (ctx.brief) {
          return `6초 무한 반복, 24fps, 카메라 완전 고정(팬·줌·모핑 없음). 크림 종이 잉크 일러스트 그대로: 숨 한 번, 눈 깜빡임 한 번, ${objKo ? objKo + " 흔들림" : "종이 모서리 미세 움직임"}, 잉크선 1px 이내 보일링, 종이 질감 고정, 첫 프레임과 마지막 프레임 동일. 2D 셀 애니메이션만, 3D·모핑 금지.`;
        }

        const panelsLine = n
          ? `칸 연출: 스트립 자체는 움직이지 않고 칸 경계도 고정입니다. 각 칸이 자기 프레임 안에서만, 왼쪽에서 오른쪽으로 차례로 살아납니다 — 1칸이 처음 2초 동안 숨을 쉬고 가라앉으면 2칸이 이어받고, 마지막 ${n}칸에서 멈춰 머뭅니다. 어떤 요소도 칸 경계를 넘지 않습니다.`
          : `단일 프레임: 화면 전체가 하나의 호흡으로 움직입니다. 다른 장면이나 전환은 없습니다.`;

        return [
          `정지 일러스트를 6초 무한 반복 영상으로 만듭니다. 24fps, 실제 종이 위에 그린 2D 셀 애니메이션만 사용합니다.`,
          `카메라: 완전 고정. 팬·줌·시차 이동·푸시인·모핑·디졸브 모두 없음. 첫 프레임과 마지막 프레임의 화면 크기와 위치가 같습니다.`,
          panelsLine,
          `미세 움직임은 이것뿐입니다: 인물이 한 번 숨을 쉽니다(어깨가 2.5초에 걸쳐 1~2px 올라갔다 내려옴), 2초 부근에서 한 번 눈을 깜빡이고, 입꼬리가 1px 올라갑니다. ${motionBit}. ${time.id === "morning" || time.id === "evening" ? "바닥의 네모난 빛이 2~3px 미끄러집니다" : "빛 속 먼지 한 점이 천천히 흘러갑니다"}.`,
          `질감: 종이 섬유 결와 크림색(#F6EEE0)은 실제 종이를 촬영한 것처럼 완전히 고정됩니다. 잉크선만 2프레임 간격으로 다시 그려져 1px 이내로 미세하게 떨립니다(보일링). ${color.id === "ink" ? "먹색" : color.ko + " 포인트"} 면적은 깜빡이거나 밝아지지 않습니다.`,
          `마무리: 마지막 프레임은 첫 프레임과 완전히 같아 반복이 보이지 않습니다. 페이드·타이틀 카드·로고는 없습니다.`,
          `스타일 가드레일: 평면과 무광을 유지하고, 3D·조명 변화·그림자 이동·카메라 흔들림·속도 램프·글자 추가·인물 추가·장면 전환은 모두 금지합니다.`
        ].join("\n\n");
      }
    },

    randomize(ctx) {
      const presets = PRESETS;
      const p = presets[Math.floor(Math.random() * presets.length)];
      return {
        preset: p.id,
        seed: {
          composition: ["single", "seq3", "seq5", "beforeafter"][Math.floor(Math.random() * 4)],
          cast: ["solo", "solo", "duo", "pet", "mini"][Math.floor(Math.random() * 5)],
          objects: [p.object].concat(Math.random() < 0.4 ? [["sprout", "heart", "star", "flower", "book", "cup"][Math.floor(Math.random() * 6)]] : []),
          color: p.color,
          ratio: ["16:9", "16:9", "9:16", "4:5", "1:1"][Math.floor(Math.random() * 5)],
          time: ["any", "any", "morning", "evening", "night"][Math.floor(Math.random() * 5)]
        },
        caption: p.captions[Math.floor(Math.random() * p.captions.length)]
      };
    }
  });
})();
