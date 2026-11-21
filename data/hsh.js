/* ============================================================
   My Prompt Studio · data/hsh.js
   ② HSH — 수채 여백 산책형
   순백 여백 + 상단 30% 수채화 자연물 커튼 + 하단 흑백 펜 선화,
   지면 패닝 전진감과 8동작 보행 → 멈춤 → 마주봄 전환을
   이미지/영상 × 영어/한국어 4종 프롬프트로 만든다.
   ============================================================ */

(function () {
  const H = MPS.helpers;

  const CURTAINS = {
    maple: {
      label: "단풍",
      hex: "#D6293B",
      en: "a dense hanging curtain of soft red maple leaves",
      ko: "진홍 단풍잎이 빽빽하게 매달린 수채 커튼",
      petalEn: "maple leaf",
      petalPl: "maple leaves",
      petalKo: "단풍잎",
      washEn: "crimson to translucent coral, some leaves still pale pink where the paper shows through",
      washKo: "진홍에서 투명한 산호빛까지, 종이가 비치는 곳은 연분홍으로 남은"
    },
    cherry: {
      label: "벚꽃",
      hex: "#EFAFC0",
      en: "a dense hanging curtain of soft pale-pink cherry blossoms",
      ko: "연분홍 벚꽃이 빽빽하게 매달린 수채 커튼",
      petalEn: "cherry petal",
      petalPl: "cherry petals",
      petalKo: "벚꽃잎",
      washEn: "pale rose to warm white, petals overlapping in loose wet clusters",
      washKo: "연분홍에서 따뜻한 흰색까지, 꽃잎이 느슨한 물방울 덩어리로 겹친"
    },
    ginkgo: {
      label: "은행잎",
      hex: "#E8B53A",
      en: "a dense hanging curtain of golden ginkgo leaves",
      ko: "노란 은행잎이 빽빽하게 매달린 수채 커튼",
      petalEn: "ginkgo leaf",
      petalPl: "ginkgo leaves",
      petalKo: "은행잎",
      washEn: "golden yellow to pale butter, fan-shaped leaves fanning out in loose clusters",
      washKo: "황금빛 노랑에서 옅은 버터색까지, 부채꼴 잎이 느슨하게 펼쳐진"
    },
    snow: {
      label: "첫눈",
      hex: "#B9CDDA",
      en: "a soft watercolour canopy of bare winter branches dusted with snow",
      ko: "눈이 앉은 앙상한 겨울 가지의 수채 캐노피",
      petalEn: "snowflake",
      petalPl: "snowflakes",
      petalKo: "눈송이",
      washEn: "pale blue-grey shadows and white, with soft granulated edges",
      washKo: "옅은 청회색 그림자와 흰색, 가장자리가 부드럽게 알갱이진"
    },
    wisteria: {
      label: "등나무꽃",
      hex: "#B9A5D8",
      en: "a dense hanging curtain of soft lilac wisteria clusters",
      ko: "연보라 등나무꽃 송이가 길게 매달린 수채 커튼",
      petalEn: "wisteria blossom",
      petalPl: "wisteria blossoms",
      petalKo: "등나무꽃잎",
      washEn: "lilac to lavender, long drooping clusters fading into white",
      washKo: "라일락에서 라벤더까지, 긴 송이가 흰색으로 사라지는"
    },
    none: {
      label: "커튼 없음",
      hex: "#E7E2D8",
      en: "no canopy — the top of the frame stays as pure white paper",
      ko: "커튼 없이 위쪽을 순백 종이로 비워 둔",
      petalEn: "petal",
      petalPl: "petals",
      petalKo: "꽃잎 한 장",
      washEn: "no colour at all",
      washKo: "색 없이 순백"
    }
  };

  const CASTS = {
    girl: {
      label: "소녀",
      en: "a little girl in a knee-length dress with her hair tied in a small bun",
      ko: "무릎 길이 원피스를 입고 머리를 조그맣게 묶은 여자아이",
      height: "about 20% of the canvas height"
    },
    boy: {
      label: "소년",
      en: "a little boy in shorts and a duffle coat with a short bowl cut",
      ko: "반바지에 더플 코트를 입고 짧은 보브 머리를 한 남자아이",
      height: "about 20% of the canvas height"
    },
    adult: {
      label: "어른",
      en: "a young woman in a long coat with her hair loose",
      ko: "긴 코트를 입고 머리를 푼 젊은 여성",
      height: "about 30% of the canvas height"
    },
    kids: {
      label: "아이 둘",
      en: "two children holding hands, one a little shorter, both in padded coats",
      ko: "손을 잡은 아이 둘, 한 아이가 조금 작고 둘 다 패딩 점퍼를 입음",
      height: "about 20% of the canvas height"
    }
  };

  const COMPANIONS = {
    puppy: { label: "강아지", en: "a small white puppy trotting beside her", ko: "옆에서 종종걸음치는 작은 흰 강아지" },
    cat: { label: "고양이", en: "a slim grey cat walking with its tail up", ko: "꼬리를 세우고 함께 걷는 가느다란 회색 고양이" },
    none: { label: "없음", en: "", ko: "" }
  };

  const GROUNDS = {
    leaf: { label: "낙엽 길", en: "a leaf-strewn dirt path, single fallen leaves lying flat along it", ko: "낙엽이 흩어진 흙길, 떨어진 잎이 납작하게 놓인" },
    dirt: { label: "흙길", en: "a plain packed-earth path with a few grass tufts at the edges", ko: "가장자리에 풀 몇 포기만 난 다져진 흙길" },
    snow: { label: "눈길", en: "a soft snow-covered path with faint footprints", ko: "옅은 발자국이 남은 부드러운 눈길" },
    puddle: { label: "물웅덩이", en: "a wet path with one shallow puddle reflecting the sky", ko: "얕은 물웅덩이 하나가 하늘을 비추는 젖은 길" },
    grass: { label: "풀밭", en: "a soft grass path with thin blades bending in the wind", ko: "바람에 가느다란 풀이 휘는 부드러운 풀길" },
    gravel: { label: "자갈길", en: "a pale gravel path with small pebbles scattered along it", ko: "작은 자갈이 흩어진 옅은 자갈길" }
  };

  const PALETTES = {
    auto: { label: "커튼 색 그대로", hex: "#D6293B", en: "the curtain's own colour", ko: "커튼의 색 그대로" },
    red: { label: "진홍", hex: "#D6293B", en: "crimson red", ko: "진홍" },
    pink: { label: "벚꽃 분홍", hex: "#EFAFC0", en: "pale cherry pink", ko: "연분홍" },
    gold: { label: "은행 노랑", hex: "#E8B53A", en: "ginkgo gold", ko: "은행 노랑" },
    snow: { label: "설백", hex: "#B9CDDA", en: "snow white and pale blue-grey", ko: "설백과 옅은 청회색" },
    lilac: { label: "라일락", hex: "#B9A5D8", en: "soft lilac", ko: "연보라 라일락" },
    teal: { label: "청록", hex: "#5E9C99", en: "muted teal", ko: "차분한 청록" }
  };

  const MOTIONS = {
    turn: { label: "멈춤 → 마주봄", note: "전진 보행 뒤 돌아보며 미소", en: "walk, stop, turn to the viewer", ko: "걷다가 멈춰 돌아보고 마주 웃기" },
    walk: { label: "전진 트래킹", note: "지면이 옆으로 흐르는 산책", en: "continuous forward tracking walk", ko: "지면이 옆으로 흐르는 전진 산책" },
    lookup: { label: "멈춰 올려다봄", note: "커튼을 올려다보는 정지", en: "stop and look up into the canopy", ko: "멈춰 서서 커튼을 올려다보기" },
    still: { label: "정지 구도", note: "카메라도 인물도 거의 정지", en: "a still portrait with only breath", ko: "숨만 쉬는 정지 구도" }
  };

  const LIGHTS = {
    overcast: { label: "흐린 날", en: "soft overcast light, no cast shadows, paper glowing faintly", ko: "그림자 없는 흐린 빛, 종이가 은은하게 빛나는" },
    morning: { label: "아침 볕", en: "early morning light from the upper left, very soft and warm", ko: "왼쪽 위에서 드는 이른 아침의 아주 부드럽고 따뜻한 빛" },
    dusk: { label: "황혼", en: "low dusk light, the white paper cooling to a faint blue", ko: "낮게 깔린 황혼 빛, 흰 종이가 옅은 푸른빛으로 식는" },
    snow: { label: "눈 내리는 빛", en: "flat snow light, everything slightly blue and very quiet", ko: "눈 내리는 날의 평평한 빛, 모든 것이 조금 푸르고 고요한" }
  };

  const PARTICLES = {
    many: { label: "많이", en: "a steady drift of falling particles", ko: "쉬지 않고 흩날리는 낙하 입자" },
    some: { label: "조금", en: "a few particles drifting down now and then", ko: "이따금 흩날리는 몇 개의 입자" },
    none: { label: "없음", en: "completely still air, nothing falling", ko: "아무것도 흩날리지 않는 정지된 공기" }
  };

  /* ---------- 프리셋 ---------- */
  const PRESETS = [
    {
      id: "maple-turn",
      emoji: "🍁",
      label: "단풍길에서 돌아보기",
      thumb: "hsh/maple-smile.jpg",
      thumbPos: "center 70%",
      caption: "가을이 나를 불러 세웠다.",
      scene: {
        en: "she has stopped on the maple path and turned her head over her shoulder toward the viewer, a small smile, one hand still holding the hem of her dress",
        ko: "단풍길에서 걸음을 멈추고 어깨 너머로 이쪽을 돌아보며 작게 웃는 모습, 한 손은 아직 원피스 자락을 잡고 있다"
      },
      seed: { motion: "turn", curtain: "maple", cast: "girl", companion: "puppy", ground: "leaf", palette: "auto", ratio: "9:16", light: "morning", particle: "some" }
    },
    {
      id: "maple-walk",
      emoji: "🍂",
      label: "단풍나무 아래 산책",
      thumb: "hsh/maple-lookup.jpg",
      thumbPos: "center 78%",
      caption: "고개를 들면 계절이 온다.",
      scene: {
        en: "she walks along the path in three-quarter back view, chin lifted toward the canopy, the puppy at her side",
        ko: "커튼 쪽으로 턱을 살짝 들고 뒤에서 비스듬히 보이는 각도로 걷는 모습, 옆에 강아지"
      },
      seed: { motion: "walk", curtain: "maple", cast: "girl", companion: "puppy", ground: "leaf", palette: "auto", ratio: "9:16", light: "morning", particle: "many" }
    },
    {
      id: "cherry-walk",
      emoji: "🌸",
      label: "벚꽃 커튼 아래 산책",
      thumb: "hsh/cherry-walk.jpg",
      thumbPos: "center 82%",
      caption: "꽃잎이 눈처럼 내리는 길.",
      scene: {
        en: "she walks to the right in side profile, one petal caught in her hair, the puppy trotting beside her",
        ko: "오른쪽으로 옆모습을 보이며 걷고, 머리카락에 꽃잎 하나가 앉은 모습, 옆에서 걷는 강아지"
      },
      seed: { motion: "walk", curtain: "cherry", cast: "girl", companion: "puppy", ground: "dirt", palette: "auto", ratio: "9:16", light: "overcast", particle: "many" }
    },
    {
      id: "ginkgo-walk",
      emoji: "🍃",
      label: "은행잎 아래 산책",
      thumb: "hsh/ginkgo-walk.jpg",
      thumbPos: "center 82%",
      caption: "노란 잎이 발밑에서 소리 낸다.",
      scene: {
        en: "she walks to the left in side profile wearing a duffle coat, the puppy beside her, dry leaves under their feet",
        ko: "더플 코트를 입고 왼쪽으로 옆모습으로 걷고, 옆에 강아지, 발밑에는 마른 잎"
      },
      seed: { motion: "walk", curtain: "ginkgo", cast: "boy", companion: "puppy", ground: "leaf", palette: "auto", ratio: "9:16", light: "overcast", particle: "some" }
    },
    {
      id: "snow-lookup",
      emoji: "❄️",
      label: "첫눈 아래 올려다보기",
      thumb: "hsh/snow-lookup.jpg",
      thumbPos: "center 82%",
      caption: "첫눈은 늘 고개를 들게 한다.",
      scene: {
        en: "two children stand hand in hand seen from behind, faces tilted up, a puppy sitting beside them, snow settling on their shoulders",
        ko: "아이 둘이 손을 잡고 뒤에서 보이는 모습으로 서서 얼굴을 들어 올리고, 옆에 강아지가 앉아 있고, 어깨에 눈이 앉는다"
      },
      seed: { motion: "lookup", curtain: "snow", cast: "kids", companion: "puppy", ground: "snow", palette: "snow", ratio: "9:16", light: "snow", particle: "many" }
    },
    {
      id: "wisteria-walk",
      emoji: "💜",
      label: "등나무꽃 아래 산책",
      thumb: "hsh/wisteria-walk.jpg",
      thumbPos: "center 82%",
      caption: "보랏빛 그늘 아래로 걸어간다.",
      scene: {
        en: "she walks to the right from behind in a light summer dress, one hand brushing the hanging clusters, the puppy at her heels",
        ko: "가벼운 여름 원피스를 입고 오른쪽으로 뒷모습을 보이며 걷고, 한 손이 매달린 꽃송이를 스치고, 발치에 강아지"
      },
      seed: { motion: "walk", curtain: "wisteria", cast: "girl", companion: "puppy", ground: "gravel", palette: "auto", ratio: "9:16", light: "overcast", particle: "some" }
    }
  ];

  MPS.register({
    id: "hsh",
    order: 2,
    name: "HSH",
    engName: "HSH",
    tab: "수채 여백 산책",
    tabSub: "순백 · 수채 커튼",
    accent: "#c0554c",
    accentSoft: "#f7e0dc",
    ink: "#2a2a2a",
    tagline: "위에는 계절, 아래에는 걸음",
    summary:
      "순백 여백 위에 상단 30%만 수채화 자연물 커튼, 하단에는 흑백 펜 선화의 작은 인물. 지면이 옆으로 흐르는 전진 트래킹과 8동작 보행, 멈춰 서서 돌아보는 전환까지 영상 프롬프트에 시간 단위로 담습니다.",
    hero: { src: "hsh/maple-smile.jpg", alt: "단풍 커튼 아래에서 돌아보는 소녀와 강아지", pos: "center 72%" },
    facts: [
      { k: "여백", v: "순백 60%", d: "#FFFFFF · 질감 없는 종이" },
      { k: "커튼", v: "상단 30%", d: "젖은 수채 · 흘러내리는 경계" },
      { k: "인물", v: "흑백 펜선", d: "0.5~0.8px 잉크 · 색 없음" },
      { k: "움직임", v: "15초 · 30fps", d: "지면 패닝 + 8동작 보행" }
    ],
    dna: [
      { tag: "01 · 여백", title: "아무것도 없는 순백", swatch: "#FFFFFF",
        body: "배경은 크림이 아닌 순백(#FFFFFF). 종이 질감도, 비네팅도, 배경 풍경도 없습니다. 화면의 절반 이상이 아무것도 그려지지 않은 흰 공간으로 남아 그림이 숨을 쉽니다.",
        spec: "배경 #FFFFFF · 여백 55~70% · 텍스처 없음" },
      { tag: "02 · 커튼", title: "상단 30%의 수채 자연물", swatch: "#D6293B",
        body: "화면 위쪽 30%만 자연물이 빽빽하게 매달린 커튼이 됩니다. 젖은 수채(wet-on-wet)로 번지고 가장자리가 흰 종이로 사라지며, 아래로 갈수록 옅어지고 일부 송이는 더 낮게 처집니다.",
        spec: "상단 30% · wet-on-wet · 경계 흐림 · 불규칙한 송이" },
      { tag: "03 · 인물", title: "흑백 펜 선화", swatch: "#2A2A2A",
        body: "인물과 동물은 색이 전혀 없는 가는 잉크 선화. 0.5~0.8px의 가는 펜선, 옷 주름에만 아주 옅은 연필 음영. 얼굴은 옆모습 위주로, 눈·코·입은 두세 획이면 충분합니다.",
        spec: "먹선 #2A2A2A · 0.5~0.8px · 색 없음 · 옅은 연필 음영만" },
      { tag: "04 · 지면", title: "단 하나의 지면선", swatch: "#B9B2A6",
        body: "인물은 화면 아래쪽, 대략 높이의 85~90% 지점에 그은 가느다란 수평선 하나 위에 섭니다. 발밑에는 짧은 그림자 획 두세 개, 길 가장자리에는 풀 몇 포기. 원근법을 설명하지 않습니다.",
        spec: "지면선 1개 · 화면 높이 88% · 발밑 그림자 2~3획" },
      { tag: "05 · 낙하", title: "흩날리는 입자", swatch: "#EFAFC0",
        body: "커튼에서 떨어진 꽃잎·낙엽·눈송이가 흰 여백을 천천히 가로질러 내려옵니다. 많이 뿌리지 않고 다섯에서 열 개 남짓, 크기도 제각각. 공기가 살아 있다는 표시일 뿐입니다.",
        spec: "입자 5~10개 · 크기 3~12px · 불규칙한 방향" },
      { tag: "06 · 움직임", title: "지면이 흐르는 전진감", swatch: "#8FA9B8",
        body: "영상에서는 인물이 화면 같은 자리에 있고 지면과 앞쪽 풀이 오른쪽에서 왼쪽으로 흘러갑니다. 카메라는 옆으로 트래킹하지만 인물은 고정된 것처럼 보여, 걷는 속도만큼 세상이 지나갑니다.",
        spec: "지면 스크롤 8~10px/frame · 3중 레이어 시차 · 인물 고정" },
      { tag: "07 · 보행", title: "8동작 걷기", swatch: "#C9A227",
        body: "contact → down → passing → up 을 좌우로 두 번, 모두 여덟 동작. 팔은 반대로 흔들리고 머리는 2px 정도만 위아래로, 치맛자락과 머리카락은 몸보다 한 프레임 늦게 따라옵니다. 미끄러지듯 걷지 않습니다.",
        spec: "8-phase cycle · 동작당 8~10프레임 · 반동 3px 이내" },
      { tag: "08 · 전환", title: "멈춰 서서 마주 봄", swatch: "#E0A45E",
        body: "걷던 인물이 속도를 줄여 마지막 세 걸음을 짧게 딛고, 두 발을 모은 뒤 몸통이 60~70도 돌아갑니다. 고개는 두 프레임 늦게 따라오고, 턱을 살짝 들어 눈이 카메라를 찾은 뒤 입꼬리가 작게 올라갑니다.",
        spec: "감속 2초 · 몸통 회전 → 고개 2프레임 지연 · 미소 2초" }
    ],

    controls: [
      { key: "scene", type: "text", label: "장면 직접 입력", placeholder: "예: 눈 덮인 길에서 강아지가 먼저 뛰어가고, 아이가 뒤따라간다",
        hint: "비우면 프리셋 장면을 씁니다" },
      { key: "motion", type: "chips", label: "영상 움직임", options: Object.entries(MOTIONS).map(([id, v]) => ({ id, ...v })) },
      { key: "curtain", type: "chips", label: "수채 커튼 (상단 30%)", options: Object.entries(CURTAINS).map(([id, v]) => ({ id, label: v.label, hex: v.hex })) },
      { key: "cast", type: "chips", label: "등장인물", options: Object.entries(CASTS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "companion", type: "chips", label: "동반 동물", options: Object.entries(COMPANIONS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "ground", type: "chips", label: "지면", options: Object.entries(GROUNDS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "palette", type: "swatch", label: "수채 팔레트", options: Object.entries(PALETTES).map(([id, v]) => ({ id, label: v.label, hex: v.hex, en: v.en, ko: v.ko })) },
      { key: "particle", type: "chips", label: "낙하 입자", options: Object.entries(PARTICLES).map(([id, v]) => ({ id, label: v.label })) },
      { key: "ratio", type: "chips", label: "화면 비율", options: MPS.RATIOS },
      { key: "light", type: "chips", label: "빛", options: Object.entries(LIGHTS).map(([id, v]) => ({ id, label: v.label })) }
    ],

    defaults: {
      motion: "turn",
      curtain: "maple",
      cast: "girl",
      companion: "puppy",
      ground: "leaf",
      palette: "auto",
      ratio: "9:16",
      light: "morning",
      particle: "some"
    },

    presets: PRESETS,

    samples: [
      { file: "hsh/maple-smile.jpg", title: "멈춤 → 마주봄 · 단풍", caption: "가을이 나를 불러 세웠다.", pos: "center 72%",
        preset: "maple-turn", seed: { motion: "turn", curtain: "maple", cast: "girl", companion: "puppy", ground: "leaf", palette: "auto", ratio: "9:16", light: "morning", particle: "some" } },
      { file: "hsh/maple-lookup.jpg", title: "단풍 커튼 · 올려다봄", caption: "고개를 들면 계절이 온다.", pos: "center 78%",
        preset: "maple-walk", seed: { motion: "walk", curtain: "maple", cast: "girl", companion: "puppy", ground: "leaf", palette: "auto", ratio: "9:16", light: "morning", particle: "many" } },
      { file: "hsh/cherry-walk.jpg", title: "벚꽃 커튼 · 산책", caption: "꽃잎이 눈처럼 내리는 길.", pos: "center 82%",
        preset: "cherry-walk", seed: { motion: "walk", curtain: "cherry", cast: "girl", companion: "puppy", ground: "dirt", palette: "auto", ratio: "9:16", light: "overcast", particle: "many" } },
      { file: "hsh/ginkgo-walk.jpg", title: "은행잎 커튼 · 산책", caption: "노란 잎이 발밑에서 소리 낸다.", pos: "center 82%",
        preset: "ginkgo-walk", seed: { motion: "walk", curtain: "ginkgo", cast: "boy", companion: "puppy", ground: "leaf", palette: "auto", ratio: "9:16", light: "overcast", particle: "some" } },
      { file: "hsh/snow-lookup.jpg", title: "첫눈 · 올려다봄", caption: "첫눈은 늘 고개를 들게 한다.", pos: "center 82%",
        preset: "snow-lookup", seed: { motion: "lookup", curtain: "snow", cast: "kids", companion: "puppy", ground: "snow", palette: "snow", ratio: "9:16", light: "snow", particle: "many" } },
      { file: "hsh/wisteria-walk.jpg", title: "등나무꽃 · 산책", caption: "보랏빛 그늘 아래로 걸어간다.", pos: "center 82%",
        preset: "wisteria-walk", seed: { motion: "walk", curtain: "wisteria", cast: "girl", companion: "puppy", ground: "gravel", palette: "auto", ratio: "9:16", light: "overcast", particle: "some" } }
    ],

    build: {
      imageEn(ctx) {
        const cur = ctx.get("curtain");
        const cast = ctx.get("cast");
        const comp = ctx.get("companion");
        const ground = ctx.get("ground");
        const pal = ctx.get("palette");
        const ratio = ctx.get("ratio");
        const light = ctx.get("light");
        const part = ctx.get("particle");
        const curData = CURTAINS[cur.id];
        const castData = CASTS[cast.id];
        const compData = COMPANIONS[comp.id];
        const groundData = GROUNDS[ground.id];
        const palData = PALETTES[pal.id];
        const lightData = LIGHTS[light.id];
        const partData = PARTICLES[part.id];
        const paletteEn = pal.id === "auto" ? "the curtain's own colour" : palData.en;
        const paletteHex = pal.id === "auto" ? curData.hex : palData.hex;
        const tend = cur.id === "none" ? 0 : 32;

        if (ctx.brief) {
          return [
            `Korean picture-book illustration, ${ratio.en}, pure white background (55–70% empty).`,
            tend ? `Top ${tend}%: ${curData.en} in loose wet-on-wet watercolour, ${curData.washEn}, edges bleeding into white; ${partData.en} of single ${curData.petalPl}.` : `No canopy, all white.`,
            `Bottom: ${castData.en} (${castData.height}) on one thin hand-drawn ground line, ${compData.en ? compData.en + ", " : ""}drawn in fine black ink (0.5–0.8 px), no colour on the figures. ${H.cap(groundData.en)}.`,
            `Colour only in the canopy: ${paletteEn} (${paletteHex}). ${lightData.en}.`,
            `No text, no frame, no 3D, no gradients, no saturated colour on the figures.`
          ].join(" ");
        }

        return [
          `A quiet Korean picture-book illustration built in two layers: loose watercolour above, bare ink line below, with a great deal of untouched white paper between them.`,
          `Canvas: pure white (#FFFFFF), ${ratio.en}, no paper texture, no vignette, no border. The empty white space is the main subject — it must occupy 55–70% of the frame.`,
          cur.id === "none"
            ? `Upper band: left completely empty. Only a faint hint of the season in the light, nothing drawn.`
            : `Upper band (top ${tend}%): ${curData.en}, painted wet-on-wet with visible bleed and soft, irregular edges that dissolve into the white page — ${curData.washEn}. Clusters hang at uneven lengths, some reaching lower than others, a few small gaps of white showing through the canopy. Colour lives only here.`,
          `Air: ${H.cap(partData.en)} — single ${curData.petalPl}, each 3–12 px, at different depths, some sharp and some blurred, falling slowly through the empty middle. Never more than ten.`,
          `Lower band: a single thin hand-drawn ground line at about 88% of the height with ${groundData.en}. Standing on it, ${castData.en} (${castData.height}), ${compData.en ? compData.en + "," : ""} seen in three-quarter view. ${H.cap(ctx.scene("en"))}.`,
          `Figure rendering: a fine black ink line drawing only — 0.5–0.8 px, slightly uneven pressure, hair drawn as a few flowing strokes, clothing folds suggested with the faintest graphite shading. No colour, no fill, no outlines thicker than a pencil. Faces are built from a profile line, one eye stroke, a small nose and a single mouth curve.`,
          `Palette: white paper, black ink, and one watercolour family in the canopy — ${paletteEn} (${paletteHex}). The figure never receives colour, not even on the cheeks.`,
          `Light: ${lightData.en}. No cast shadows on the ground; the figure's feet touch the line with two or three tiny shadow strokes.`,
          `Composition: symmetrical enough to feel calm, but the figure stands slightly off-centre (about 40% from the left) with more white space on the side they walk toward.`,
          `Mood: tender, unhurried, a little nostalgic — the feeling of a children's book page that lets you breathe.`,
          `Output: one still image, ${ratio.en}, high resolution, flat matte finish.`,
          `No text, no letters, no watermark, no signature, no frame, no border. Avoid 3D, gradients, glossy surfaces, saturated colour on the figures, busy backgrounds, extra props, realistic anatomy, anime eyes, harsh shadows.`
        ].join("\n\n");
      },

      imageKo(ctx) {
        const cur = ctx.get("curtain");
        const cast = ctx.get("cast");
        const comp = ctx.get("companion");
        const ground = ctx.get("ground");
        const pal = ctx.get("palette");
        const ratio = ctx.get("ratio");
        const light = ctx.get("light");
        const part = ctx.get("particle");
        const curData = CURTAINS[cur.id];
        const castData = CASTS[cast.id];
        const compData = COMPANIONS[comp.id];
        const groundData = GROUNDS[ground.id];
        const palData = PALETTES[pal.id];
        const lightData = LIGHTS[light.id];
        const partData = PARTICLES[part.id];
        const paletteKo = pal.id === "auto" ? "커튼의 색 그대로" : palData.ko;
        const paletteHex = pal.id === "auto" ? curData.hex : palData.hex;
        const tend = cur.id === "none" ? 0 : 32;

        if (ctx.brief) {
          return [
            `한국 동화 삽화, ${ratio.ko}, 순백 배경(여백 55~70%).`,
            tend ? `상단 ${tend}%는 ${curData.ko}. 젖은 수채로 번지고 가장자리가 흰 종이로 사라짐. ${partData.ko}.` : `커튼 없이 전부 흰 여백.`,
            `하단에는 가는 지면선 하나 위에 ${castData.ko}(${castData.height}), ${compData.ko ? compData.ko + ", " : ""}0.5~0.8px 검은 잉크 선화로만, 인물에는 색 없음. ${groundData.ko}.`,
            `색은 커튼에만: ${paletteKo}(${paletteHex}). ${lightData.ko}.`,
            `글자·액자·3D·그라데이션 금지, 인물 채색 금지.`
          ].join(" ");
        }

        return [
          `조용한 한국 동화 삽화. 위에는 수채, 아래에는 잉크 선, 그 사이는 아무것도 그리지 않은 흰 종이 — 두 겹으로만 이루어진 그림입니다.`,
          `캔버스: 순백(#FFFFFF), ${ratio.ko}. 종이 질감 없음, 비네팅 없음, 테두리 없음. 비어 있는 흰 공간이 이 그림의 주인공이며 화면의 55~70%를 차지해야 합니다.`,
          cur.id === "none"
            ? `상단: 완전히 비워 둡니다. 계절은 빛으로만 아주 옅게 암시합니다.`
            : `상단 밴드(위에서 ${tend}%): ${curData.ko}. 젖은 수채(wet-on-wet)로 그려 물이 번진 자국과 불규칙한 경계가 흰 종이로 스며들 듯 사라집니다 — ${curData.washKo} 색. 송이는 길이가 제각각이라 일부는 더 낮게 처지고, 드문드문 흰 틈이 보입니다. 색은 오직 이곳에만 있습니다.`,
          `공기: ${partData.ko} — ${curData.petalKo} 한 장 한 장이 3~12px, 앞뒤 깊이가 달라 어떤 것은 선명하고 어떤 것은 흐릿하며 흰 여백을 천천히 가로질러 내려옵니다. 열 개를 넘지 않습니다.`,
          `하단: 화면 높이 약 88% 지점에 가는 손그림 수평선 하나, 그 위에 ${groundData.ko} 길. 그 선 위에 ${castData.ko}(화면 높이의 ${castData.height === "about 20% of the canvas height" ? "약 20%" : castData.height === "about 30% of the canvas height" ? "약 30%" : "약 20%"}), ${compData.ko ? compData.ko + ", " : ""}비스듬한 각도로 서 있습니다. ${ctx.scene("ko")}.`,
          `인물 묘사: 검은 잉크 선화만 — 0.5~0.8px, 압력이 조금씩 다른 가는 펜선. 머리카락은 흐르는 몇 획, 옷 주름은 아주 옅은 연필 음영으로만. 채색 없음, 면 채우기 없음, 연필보다 굵은 외곽선 없음. 얼굴은 옆선 하나, 눈 한 획, 작은 코, 입꼬리 한 획으로 만듭니다.`,
          `팔레트: 흰 종이, 검은 잉크, 그리고 커튼의 한 가지 수채 색 — ${paletteKo}(${paletteHex}). 인물에는 볼조차 색을 넣지 않습니다.`,
          `빛: ${lightData.ko}. 지면에 진 그림자는 없고, 발이 선 자리에 짧은 그림자 획 두세 개만.`,
          `구도: 고요하게 느껴질 만큼 균형 잡혀 있되, 인물은 정중앙에서 살짝 벗어나(왼쪽에서 약 40% 지점) 걸어가는 쪽에 더 많은 흰 여백을 남깁니다.`,
          `분위기: 다정하고 서두르지 않으며 조금은 그리운 — 아이 그림책 한 페이지처럼 숨을 쉬게 하는 느낌.`,
          `출력: 정지 이미지 한 장, ${ratio.ko}, 고해상도, 평면 무광.`,
          `글자·레터링·워터마크·서명·액자·테두리 없음. 3D, 그라데이션, 광택 표면, 인물 채색, 복잡한 배경, 여분의 소품, 사실적 해부, 애니메이션 눈, 강한 그림자는 금지합니다.`
        ].join("\n\n");
      },

      motionEn(ctx) {
        const cur = ctx.get("curtain");
        const motion = ctx.get("motion");
        const cast = ctx.get("cast");
        const comp = ctx.get("companion");
        const ground = ctx.get("ground");
        const part = ctx.get("particle");
        const ratio = ctx.get("ratio");
        const curData = CURTAINS[cur.id];
        const castData = CASTS[cast.id];
        const compData = COMPANIONS[comp.id];
        const groundData = GROUNDS[ground.id];
        const partData = PARTICLES[part.id];
        const isWalk = motion.id === "walk" || motion.id === "turn" || motion.id === "lookup";

        const walkBlock = `Forward tracking (the core of the shot): the character stays at the same point on screen while the ground scrolls past from right to left beneath the feet. The path itself (${groundData.en}), its pebbles, grass tufts and fallen leaves all slide past at 8–10 px per frame in a 9:16 frame. Build it in three layers with different speeds — blades of grass nearest the camera fastest, mid-ground path and leaves at 60%, distant ground marks at 30% — so the forward motion has depth. ${cur.id === "none" ? "" : `The watercolour canopy drifts only 2–3 px sideways and sways gently, like parallax against the moving ground.`}

Gait: a genuine 8-phase walk cycle, never a slide — contact, down, passing, up, contact (opposite leg), down, passing, up. Eight to ten frames per phase at 30 fps, arms counter-swinging, shoulders rotating 3°, the head bobbing no more than 2 px, hair and dress hem trailing one frame behind the body. Feet plant firmly; the heel lands first and the toe peels off last.`;

        const turnBlock = `Timeline (15 seconds, 30 fps):

0.0–6.0 s — she is already walking, three-quarter back view, the ground sliding right to left at full speed. ${compData.en ? H.cap(compData.en) + " keeps pace, two beats behind her feet." : ""}

6.0–8.0 s — she slows down: three shorter steps, the last one a half-step. The ground scroll decelerates with her and stops exactly as her foot plants; a single leaf settles on the path.

8.0–9.5 s — she plants both feet together, her torso rotates 60–70° toward camera while her head stays a moment longer, then follows two frames later — the tiny delay is what makes it feel human. Hair, hem and the hanging sleeve swing through the turn and settle.

9.5–11.5 s — she lifts her chin, her eyes find the lens, and the corners of her mouth curve into a small, shy smile. One slow blink at the end of the movement.

11.5–15.0 s — hold. Only breathing, one petal crossing the frame, the canopy swaying and ${compData.en ? "the puppy looking up at her, then to camera, tail wagging twice" : "her sleeve settling"}. No zoom, no push-in.`;

        const lookupBlock = `Timeline (15 seconds, 30 fps): 0–6 s walking with the ground panning right to left; 6–8 s she stops, feet together, the ground scroll easing to stillness; 8–10 s her chin tilts up toward the canopy, her eyes follow one falling ${curData.petalEn}, the corners of her mouth lift; 10–15 s hold — breathing, canopy sway, particles drifting down around her upturned face. The camera never moves except for a 1–2 px settle when she stops.`;

        const stillBlock = `This is a held portrait, not a walk. The camera is locked and the ground never scrolls. For 8 seconds the character simply stands there in three-quarter view: one breath (shoulders rise 1–2 px and settle), one blink, a small shift of weight, ${compData.en ? "the puppy's ear twitching and tail wagging once" : "the sleeve moving faintly"}. The canopy sways slowly, one or two ${curData.petalEn}s drift down. Nothing else moves; the loop is seamless.`;

        if (ctx.brief) {
          return [
            `${ratio.en}, 15 s, 30 fps, 2D animation: watercolour canopy on pure white above, black ink ${castData.label.toLowerCase()} below.`,
            isWalk
              ? `Ground pans right-to-left at 8–10 px/frame in three parallax layers, character stays fixed in frame; true 8-phase walk cycle, arms counter-swinging, head bob ≤2 px.`
              : `Camera locked, no ground movement, only breath and blink.`,
            motion.id === "turn"
              ? `0–6 s walk, 6–8 s slow to a stop, 8–9.5 s torso turns 60–70° to camera with the head two frames late, 9.5–11.5 s eyes find the lens and a small smile forms, 11.5–15 s hold with breathing, one petal and a tail wag.`
              : motion.id === "lookup"
              ? `Walk 0–6 s, stop 6–8 s, look up into the canopy 8–10 s following one falling ${curData.petalEn}, hold to 15 s.`
              : motion.id === "walk"
              ? `Continuous walk for the full 15 s, never stopping; ${partData.en}.`
              : `Still portrait, subtle breathing only, seamless 8 s loop.`,
            `Canopy sways 2–3 px for parallax, ${partData.en} falling; no zoom, no shake, no morphing, no text, no 3D, no colour on the figure.`
          ].join(" ");
        }

        return [
          `A 15-second ${ratio.en} animation at 30 fps, drawn in exactly the same two-layer style as the still: loose watercolour canopy on pure white above, a black ink line drawing of ${castData.en} below, and a large field of untouched white between them. Only these elements exist — no background scenery, no text, no logos.`,
          `Camera: locked at the child's eye level, no zoom, no roll, no handheld shake, no rack focus. Its only allowance is a 1–2 px settle at the moment the character stops.`,
          `Canopy: ${curData.en}. It sways very slowly (2–3 px of lateral drift over several seconds), a few clusters lifting and settling as if in a light breeze, while its lower edge keeps dissolving into the white page. ${H.cap(partData.en)} — each ${curData.petalEn} falls at 1–3 px per frame with its own lateral drift and slow rotation, and is recycled at the top of the frame so the air is never empty.`,
          isWalk ? walkBlock : "",
          motion.id === "turn" ? turnBlock : motion.id === "lookup" ? lookupBlock : motion.id === "still" ? stillBlock : `Continuous walk: the shot never stops, the ground scrolls for the full 15 seconds at a constant pace, the character's stride stays even, and the loop can be cut anywhere because the pose repeats every cycle.`,
          `Character motion detail: breathing continues underneath the walk (a 1 px rise at the chest), blinking every 3–4 seconds, and the mouth stays soft. The ink lines may boil by no more than one pixel — enough to feel hand-drawn, never enough to wobble the figure.`,
          `Style guardrails: keep the white empty; never fill the background, never add a horizon, never colour the figure, never let the watercolour creep down past the upper third. No 3D, no gradients, no motion blur, no speed ramps, no text, no transitions between shots.`,
          `Sound is not required; if the tool adds audio, none.`
        ].filter(Boolean).join("\n\n");
      },

      motionKo(ctx) {
        const cur = ctx.get("curtain");
        const motion = ctx.get("motion");
        const cast = ctx.get("cast");
        const comp = ctx.get("companion");
        const ground = ctx.get("ground");
        const part = ctx.get("particle");
        const ratio = ctx.get("ratio");
        const curData = CURTAINS[cur.id];
        const castData = CASTS[cast.id];
        const compData = COMPANIONS[comp.id];
        const groundData = GROUNDS[ground.id];
        const partData = PARTICLES[part.id];
        const isWalk = motion.id === "walk" || motion.id === "turn" || motion.id === "lookup";

        const walkBlock = `전진 트래킹(이 영상의 핵심): 인물은 화면의 같은 자리에 머물고, 지면과 발밑의 풀·자갈이 오른쪽에서 왼쪽으로 흘러갑니다. 지면선, 자갈, 풀 포기, ${groundData.ko}가 9:16 기준 프레임당 8~10px 속도로 미끄러집니다. 카메라에 가까운 풀은 가장 빠르게, 중간의 길과 낙엽은 60%, 먼 지면 표시는 30% 속도로 세 겹을 만들어 깊이를 줍니다. ${cur.id === "none" ? "" : `수채 커튼은 좌우로 2~3px만 흔들리며, 움직이는 지면과 반대로 미세한 시차를 만듭니다.`}

보행: 미끄러지지 않는 진짜 8동작 걷기 — contact, down, passing, up, 반대발 contact, down, passing, up. 30fps에서 동작당 8~10프레임, 팔은 몸과 반대로 흔들리고 어깨는 3도 회전, 머리는 위아래 2px 이내로만 흔들립니다. 머리카락과 치맛자락은 몸보다 한 프레임 늦게 따라옵니다. 발은 뒤꿈치부터 딛고 발끝이 마지막에 떨어집니다.`;

        const turnBlock = `타임라인(15초, 30fps):

0.0~6.0초 — 이미 걷고 있는 상태. 뒤에서 비스듬히 본 각도, 지면이 최고 속도로 오른쪽에서 왼쪽으로 흐릅니다. ${compData.ko ? compData.ko + "가 발보다 두 박자 늦게 따라 걸어옵니다." : ""}

6.0~8.0초 — 속도를 줄입니다. 세 걸음을 짧게, 마지막은 반걸음. 지면 스크롤도 함께 느려지다가 발이 땅에 닿는 순간 정확히 멈추고, 낙엽 한 장이 길 위에 내려앉습니다.

8.0~9.5초 — 두 발을 나란히 모으고 몸통이 카메라 쪽으로 60~70도 돌아갑니다. 고개는 몸보다 두 프레임 늦게 따라오는데, 이 작은 지연이 사람처럼 보이게 합니다. 머리카락과 치맛자락, 소매가 회전을 따라 휘었다가 가라앉습니다.

9.5~11.5초 — 턱을 살짝 들어 눈이 렌즈를 찾고, 입꼬리가 작고 수줍게 올라갑니다. 동작 끝에 느린 눈 깜빡임 한 번.

11.5~15.0초 — 정지. 숨쉬기, 화면을 가로지르는 꽃잎 하나, 커튼의 흔들림, ${compData.ko ? "강아지가 그녀를 올려다보다가 카메라를 보고 꼬리를 두 번 젓는 것" : "소매가 가라앉는 것"}뿐입니다. 줌인도 푸시인도 없습니다.`;

        const lookupBlock = `타임라인(15초, 30fps): 0~6초 지면이 흐르는 가운데 걷기, 6~8초 두 발을 모으고 멈추며 지면 스크롤이 정지, 8~10초 턱을 커튼 쪽으로 들어 올리고 떨어지는 ${curData.petalKo} 하나를 눈으로 따라가며 입꼬리가 올라감, 10~15초 정지 — 숨쉬기, 커튼의 흔들림, 올려다보는 얼굴 주위로 내려오는 입자뿐. 멈출 때 1~2px 가라앉는 것 외에 카메라는 움직이지 않습니다.`;

        const stillBlock = `이것은 걷는 영상이 아니라 머무는 인물화입니다. 카메라는 고정되고 지면은 흐르지 않습니다. 8초 동안 인물은 비스듬한 각도로 서서 숨을 한 번 쉬고(어깨가 1~2px 올라갔다 내려옴) 눈을 한 번 깜빡이며 무게 중심을 아주 조금 옮깁니다. ${compData.ko ? "강아지는 귀를 한 번 씻고 꼬리를 한 번 젓습니다." : "소매가 아주 조금 움직입니다."} 커튼이 천천히 흔들리고 ${curData.petalKo} 한두 장이 내려옵니다. 그 밖에는 아무것도 움직이지 않으며 반복이 매끄럽습니다.`;

        if (ctx.brief) {
          return [
            `${ratio.ko}, 15초, 30fps, 2D 애니메이션: 위는 순백 위 수채 커튼, 아래는 흑백 잉크 ${castData.ko}.`,
            isWalk ? `지면이 프레임당 8~10px로 오른쪽→왼쪽 흐름(3중 시차), 인물은 화면 고정, 진짜 8동작 보행, 팔 반대 흔들림, 머리 흔들림 2px 이내.` : `카메라 고정, 지면 이동 없음, 숨과 깜빡임만.`,
            motion.id === "turn"
              ? `0~6초 걷기, 6~8초 감속 정지, 8~9.5초 몸통 60~70도 회전(고개 2프레임 지연), 9.5~11.5초 눈 맞춤과 작은 미소, 11.5~15초 숨쉬기·꽃잎 하나·꼬리 두 번.`
              : motion.id === "lookup"
              ? `0~6초 걷기, 6~8초 정지, 8~10초 커튼 올려다보며 ${curData.petalKo} 하나 추적, 15초까지 유지.`
              : motion.id === "walk"
              ? `15초 내내 멈추지 않고 걷기, ${partData.ko}.`
              : `정지 인물화, 미세한 숨쉬기만, 8초 매끄러운 루프.`
            ,
            `커튼은 시차를 위해 2~3px 흔들리고 ${partData.ko}가 내려옴. 줌·흔들림·모핑·글자·3D·인물 채색 금지.`
          ].join(" ");
        }

        return [
          `정지 이미지와 똑같은 두 겹 스타일로 만든 15초 세로 ${ratio.ko} 애니메이션, 30fps. 위에는 순백 위에 번지는 수채 커튼, 아래에는 검은 잉크 선화의 ${castData.ko}, 그 사이는 아무것도 그리지 않은 흰 공간입니다. 배경 풍경·글자·로고는 없습니다.`,
          `카메라: 아이 눈높이에 고정. 줌·롤·핸드헬드 흔들림·포커스 이동 없음. 인물이 멈추는 순간 1~2px 가라앉는 것만 허용합니다.`,
          `커튼: ${curData.ko}. 몇 초에 걸쳐 좌우로 2~3px만 흔들리고, 송이 몇 개가 바람에 살짝 들렸다 내려오며, 아래 가장자리는 계속 흰 종이로 사라집니다. ${partData.ko} — ${curData.petalKo}은 각자 프레임당 1~3px로, 제각기 옆으로 흔들리며 천천히 회전하다 화면 위에서 다시 나타나 공기가 비지 않게 합니다.`,
          isWalk ? walkBlock : "",
          motion.id === "turn" ? turnBlock : motion.id === "lookup" ? lookupBlock : motion.id === "still" ? stillBlock : `끊김 없는 걷기: 15초 내내 멈추지 않고, 지면은 일정한 속도로 계속 흐르며, 보폭도 일정합니다. 자세가 한 주기마다 반복되므로 어디서 잘라도 이어집니다.`,
          `인물의 미세 동작: 걷는 동안에도 숨이 이어지고(가슴이 1px 올라감), 3~4초마다 눈을 깜빡이며, 입은 부드럽게 유지됩니다. 잉크선은 1px 이내로만 떨려 손으로 그린 느낌을 남깁니다.`,
          `스타일 가드레일: 흰 여백을 반드시 유지하고, 배경을 채우거나 수평선을 추가하거나 인물에 색을 넣지 않습니다. 수채가 위쪽 3분의 1 아래로 내려오면 안 됩니다. 3D·그라데이션·모션 블러·속도 램프·글자·장면 전환은 모두 금지합니다.`,
          `소리는 필요하지 않습니다. 도구가 임의로 넣는다면 무음으로 둡니다.`
        ].filter(Boolean).join("\n\n");
      }
    },

    randomize(ctx) {
      const p = PRESETS[Math.floor(Math.random() * PRESETS.length)];
      const pick = (obj) => Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];
      return {
        preset: p.id,
        seed: Object.assign({}, p.seed, {
          motion: p.seed.motion,
          ratio: ["9:16", "9:16", "4:5", "16:9"][Math.floor(Math.random() * 4)],
          light: pick(LIGHTS),
          particle: pick(PARTICLES)
        }),
        caption: p.caption
      };
    }
  });
})();
