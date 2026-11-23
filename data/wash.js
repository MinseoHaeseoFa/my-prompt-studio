/* ============================================================
   My Prompt Studio · data/wash.js
   ⑥ WASH — 전통 수채 초상형 (코튼지 · 젖은 번짐)
   @fran_co_657 스레드 「RAINY DAY LETTER — 비 오는 날의 수채화」의
   화면 언어를 분석해, 이미지/영상 × 영어/한국어 4종 프롬프트로
   다시 엮은 모듈. 고급 코튼지에 얇은 물감을 여러 겹, 젖은 종이에서
   번지는 색, 가장자리의 알갱이, 얼굴에만 남는 가는 연필선.
   원작 프롬프트의 @핸들 워터마크는 이 스튜디오 규칙대로 넣지 않는다.
   ============================================================ */

(function () {
  const H = MPS.helpers;

  /* ---------- 인물 ---------- */
  const SUBJECTS = {
    woman: {
      label: "여성",
      en: "a woman in her late twenties with soft features, her hair loosely gathered, a few damp strands lifting in the breeze",
      ko: "부드러운 이목구비의 20대 후반 여성, 머리는 느슨하게 묶고 몇 가닥이 젖은 채 바람에 흩날림",
      short: "a woman"
    },
    man: {
      label: "남성",
      en: "a man in his early thirties with a calm face and short hair, the shoulders relaxed under his coat",
      ko: "차분한 얼굴에 짧은 머리의 30대 초반 남성, 코트 아래 어깨는 힘을 뺀 채",
      short: "a man"
    },
    child: {
      label: "아이",
      en: "a child of about six, small and round-cheeked, one hand holding the umbrella handle with both fists",
      ko: "둥근 볼의 여섯 살쯤 아이, 양손으로 우산 손잡이를 꼭 쥐고",
      short: "a child"
    },
    elder: {
      label: "어르신",
      en: "an elderly person with fine lines around the eyes, a headscarf over grey hair and a slow, steady stance",
      ko: "눈가에 잔주름이 있는 어르신, 흰 머리 위로 스카프를 쓰고 천천히 서 있는",
      short: "an elderly person"
    },
    couple: {
      label: "두 사람",
      en: "two people walking shoulder to shoulder under one umbrella, one slightly taller, their steps matching",
      ko: "우산 하나 아래 어깨를 맞대고 걷는 두 사람, 한쪽이 조금 크고 걸음이 맞는",
      short: "two people under one umbrella"
    }
  };

  /* ---------- 날씨 ---------- */
  const WEATHERS = {
    drizzle: {
      label: "가는 비",
      en: "fine drizzle that reads as soft diagonal threads, more implied than drawn",
      ko: "그려졌다기보다 스며든 듯한 가는 사선의 이슬비",
      short: "fine drizzle",
      shortKo: "가는 이슬비"
    },
    downpour: {
      label: "쏟아지는 비",
      en: "heavy rain falling in long slanted streaks, water sheeting off the umbrella in a film",
      ko: "길게 비스듬히 쏟아지는 장대비, 우산에서 물이 막처럼 흘러내림",
      short: "heavy rain",
      shortKo: "쏟아지는 장대비"
    },
    afterRain: {
      label: "비 갠 뒤",
      en: "the rain has just stopped: mirror puddles, dripping eaves, low warm sun breaking through",
      ko: "비가 막 그친 순간 — 거울 같은 물웅덩이, 처마에서 떨어지는 물방울, 비껴드는 낮은 햇살",
      short: "just after the rain",
      shortKo: "비 갠 뒤의 거리"
    },
    snow: {
      label: "눈",
      en: "quiet snowfall, flakes caught on the shoulders and in the hair, the street hushed and pale",
      ko: "조용히 내리는 눈, 어깨와 머리카락에 앉은 눈송이, 소리 없이 옅어진 거리",
      short: "quiet snowfall",
      shortKo: "조용히 내리는 눈"
    },
    fog: {
      label: "안개",
      en: "thick morning fog with everything beyond ten paces dissolved into wet grey",
      ko: "열 걸음 너머가 젖은 회색으로 풀려버린 짙은 아침 안개",
      short: "thick fog",
      shortKo: "짙은 안개"
    }
  };

  /* ---------- 장소 ---------- */
  const PLACES = {
    alley: {
      label: "유럽풍 골목",
      en: "an old European alley: worn stone paving, shuttered windows, a small flower shop with warm light behind glass",
      ko: "오래된 유럽풍 골목 — 닳은 돌바닥, 덧문 창, 유리 뒤로 따뜻한 빛이 새는 작은 꽃집",
      propEn: "a small flower shop with warm amber light spilling onto the wet stones",
      propKo: "젖은 돌바닥 위로 따뜻한 호박빛을 흘리는 작은 꽃집"
    },
    hanok: {
      label: "한옥 담장길",
      en: "a low tiled hanok wall running across the frame, a paper lantern under the eave and a stone-paved lane",
      ko: "화면을 가로지르는 낮은 기와 담장, 처마 아래 종이 등불, 돌을 깐 좁은 길",
      propEn: "a paper lantern glowing softly under the eave and a wet stone wall",
      propKo: "처마 아래 은은하게 빛나는 종이 등불과 젖은 돌담"
    },
    riverside: {
      label: "강변 산책로",
      en: "a riverside promenade with a thin iron railing, a low stone embankment and the far bank lost in mist",
      ko: "가는 철제 난간과 낮은 돌 제방, 건너편 강둑이 안개에 잠긴 강변 산책로",
      propEn: "a single cast-iron lamp on the railing and the river dissolving into mist",
      propKo: "난간 위의 주철 가로등 하나와 안개로 풀리는 강"
    },
    market: {
      label: "시장 골목",
      en: "a narrow market alley with canvas awnings, crates of produce and bare bulbs hanging on cords",
      ko: "천막 차양과 채소 상자, 줄에 매달린 맨전구가 이어지는 좁은 시장 골목",
      propEn: "bare bulbs strung overhead and crates of vegetables blurred by the wash",
      propKo: "머리 위로 이어진 맨전구와 물감에 흐려진 채소 상자"
    },
    courtyard: {
      label: "작은 마당",
      en: "a small courtyard with a wooden doorframe, a low stone step and a single clay pot catching rain",
      ko: "나무 문틀과 낮은 돌계단, 빗물을 받는 질그릇 하나가 놓인 작은 마당",
      propEn: "a clay pot gathering rain beside the step and a paper screen door",
      propKo: "계단 옆에서 빗물을 받는 질그릇과 창호지 문"
    }
  };

  /* ---------- 팔레트 ---------- */
  const PALETTES = {
    cool: {
      label: "페인즈 그레이 · 세이지",
      hex: "#6E8792",
      en: "Payne grey, dusty blue and sage green, with warm amber and pale cream used only as small accents",
      ko: "페인즈 그레이, 더스티 블루, 세이지 그린 — 따뜻한 앰버와 옅은 크림은 작은 포인트로만",
      short: "Payne grey and sage with amber accents"
    },
    warm: {
      label: "앰버 · 크림",
      hex: "#C08A4E",
      en: "warm amber, ochre and cream, with a cool grey-blue kept for the wet shadows",
      ko: "따뜻한 앰버, 오커, 크림 — 젖은 그림자에만 차가운 회청색을 남겨 둔",
      short: "warm amber and cream"
    },
    rose: {
      label: "더스티 로즈 · 모브",
      hex: "#B08087",
      en: "dusty rose, mauve and warm grey, with one soft cream highlight",
      ko: "더스티 로즈, 모브, 따뜻한 회색 — 부드러운 크림색 하이라이트 하나",
      short: "dusty rose and mauve"
    },
    green: {
      label: "올리브 · 오커",
      hex: "#7E8A55",
      en: "olive green, ochre and stone grey, with a single muted blue for the rain",
      ko: "올리브 그린, 오커, 돌회색 — 비를 위해 낮춘 파랑 한 색",
      short: "olive and ochre"
    }
  };

  /* ---------- 옷 ---------- */
  const OUTFITS = {
    trench: {
      label: "트렌치코트",
      en: "a relaxed trench coat with the collar turned up, rain marks faint on the lapels and sleeves",
      ko: "깃을 세운 여유 있는 트렌치코트, 옷깃과 소매에 빗물 자국이 희미하게",
      short: "a trench coat"
    },
    knit: {
      label: "니트와 스카프",
      en: "a soft oatmeal knit sweater and a long wool scarf wound once around the neck",
      ko: "부드러운 오트밀 니트와 목에 한 번 감은 긴 울 스카프",
      short: "a knit sweater and long scarf"
    },
    longcoat: {
      label: "긴 코트",
      en: "a long charcoal wool coat that falls below the knee, the hem darkened where the rain reached it",
      ko: "무릎 아래까지 내려오는 긴 차콜 울 코트, 비에 젖은 밑단은 조금 어둡게",
      short: "a long charcoal coat"
    },
    raincoat: {
      label: "레인코트",
      en: "a short coral raincoat with the hood down and droplets clinging to the shoulders",
      ko: "후드를 내린 짧은 코랄색 레인코트, 어깨에 물방울이 맺힌",
      short: "a coral raincoat"
    },
    quilt: {
      label: "누빔 점퍼",
      en: "a pale quilted jacket buttoned to the collar, the quilting soft and slightly worn",
      ko: "깃까지 단추를 채운 옅은 누빔 점퍼, 누빔 선은 부드럽고 조금 닳은",
      short: "a pale quilted jacket"
    }
  };

  /* ---------- 우산 ---------- */
  const UMBRELLAS = {
    clear: {
      label: "투명 우산",
      en: "a clear vinyl umbrella, the whole canopy in frame, rain beads sitting on it as small transparent dots and fine brush marks",
      ko: "투명 비닐 우산 — 우산 전체가 화면 안에 들어오고, 물방울이 작은 투명 점과 섬세한 붓 자국으로 앉은",
      short: "a clear umbrella"
    },
    navy: {
      label: "남색 우산",
      en: "a small navy umbrella tilted slightly back, its rim dripping in single slow drops",
      ko: "살짝 뒤로 기울인 작은 남색 우산, 가장자리에서 물방울이 하나씩 떨어지는",
      short: "a navy umbrella"
    },
    folded: {
      label: "접은 우산",
      en: "a folded umbrella carried loosely at the side, still dripping, one hand wrapped around the middle",
      ko: "옆구리에 느슨하게 든 접은 우산, 아직 물이 떨어지고 한 손은 가운데를 감싼",
      short: "a folded umbrella at the side"
    },
    none: {
      label: "우산 없이",
      en: "no umbrella — the figure stands bareheaded in the weather, hands in pockets, collar up",
      ko: "우산 없이 — 두 손을 주머니에 넣고 깃을 세운 채 날씨를 그대로 맞는",
      short: "no umbrella"
    }
  };

  /* ---------- 구도 ---------- */
  const SHOTS = {
    medium: {
      label: "무릎 위 미디엄",
      en: "a natural medium-long shot cropped just above the knees, the figure placed slightly left of centre",
      ko: "무릎 바로 위까지 담은 자연스러운 미디엄 롱숏, 인물은 화면 중앙에서 살짝 왼쪽",
      short: "medium-long shot above the knees"
    },
    bust: {
      label: "상반신 클로즈업",
      en: "a bust portrait from the chest up, the face large and clear, the background fully dissolved",
      ko: "가슴 위 상반신 클로즈업 — 얼굴이 크고 선명하며 배경은 완전히 풀린",
      short: "bust close-up"
    },
    full: {
      label: "전신 작게",
      en: "a wide full-body shot with the figure small in the lower third and a great deal of wet street around them",
      ko: "전신이 아래 1/3에 작게 놓이고 젖은 거리가 넓게 둘러싼 와이드 숏",
      short: "wide full-body shot"
    },
    back: {
      label: "뒷모습",
      en: "a view from behind as the figure walks away, the umbrella a small shape against the wet street",
      ko: "걸어가는 뒷모습 — 우산이 젖은 거리 위 작은 형태로 남은",
      short: "view from behind"
    }
  };

  /* ---------- 빛 ---------- */
  const LIGHTS = {
    overcast: {
      label: "흐린 확산광",
      en: "soft cold diffuse light from an overcast sky, the face lit by a whisper of natural light and the background glow bleeding softly into the wet ground",
      ko: "흐린 하늘에서 내려오는 부드럽고 차가운 확산광, 얼굴에는 은은한 자연광만 닿고 배경의 불빛은 젖은 바닥으로 부드럽게 번짐",
      short: "soft overcast light"
    },
    lowSun: {
      label: "낮은 햇살",
      en: "low warm sun breaking under the clouds, long soft light across the wet stones and a gold rim on the shoulders",
      ko: "구름 아래로 비껴드는 낮고 따뜻한 햇살, 젖은 돌 위로 길게 누운 빛과 어깨의 금빛 테두리",
      short: "low warm sunlight"
    },
    lamp: {
      label: "밤 가로등",
      en: "night under a single lamp: warm amber pooling on the wet pavement, everything else cooling to indigo",
      ko: "가로등 하나 아래의 밤 — 젖은 바닥에 고이는 따뜻한 호박빛, 나머지는 남색으로 식은",
      short: "a single lamp at night"
    }
  };

  /* ---------- 영상 움직임 ---------- */
  const MOTIONS = {
    rain: {
      label: "빗줄기만",
      note: "사람은 정지, 비와 연기만 흐름",
      en: "the figure holds almost still and only the rain moves — threads sliding down, drops landing, one puddle breathing",
      ko: "인물은 거의 정지해 있고 비만 움직입니다 — 빗줄기가 흘러내리고, 물방울이 떨어지고, 물웅덩이가 숨을 쉬듯 흔들립니다"
    },
    walk: {
      label: "걷기",
      note: "발이 미끄러지지 않는 보행",
      en: "the figure walks slowly away through the weather, the coat hem swinging one beat behind",
      ko: "인물이 날씨 속을 천천히 걸어갑니다. 코트 자락이 한 박자 늦게 흔들립니다"
    },
    turn: {
      label: "돌아보기",
      note: "걷다가 멈춰 고개를 돌림",
      en: "the figure slows, stops and turns the head back over the shoulder, the umbrella tilting with the turn",
      ko: "인물이 속도를 줄여 멈추고 어깨 너머로 고개를 돌립니다. 우산도 그 회전을 따라 기웁니다"
    },
    still: {
      label: "정지",
      note: "숨과 물방울만",
      en: "nothing travels; only a slow breath and one drop falling from the umbrella rim",
      ko: "지나가는 움직임 없이 느린 숨과 우산 끝에서 떨어지는 물방울 하나"
    }
  };

  /* ---------- 프리셋 ---------- */
  const PRESETS = [
    {
      id: "rainy-letter",
      emoji: "☔",
      label: "비 오는 날의 편지",
      thumb: "wash/rainy-letter.jpg",
      thumbPos: "center 42%",
      caption: "비 오는 날은 수채화가 잘 어울린다.",
      captions: ["비 오는 날은 수채화가 잘 어울린다.", "빗방울이 글씨보다 먼저 말을 건다.", "젖은 골목에 불빛이 번진다."],
      scene: {
        en: "the subject stands under a clear umbrella on wet cobblestones, pausing mid-step and turning the head slightly toward something out of frame, a calm faint smile, warm flower-shop light bleeding across the wet ground",
        ko: "인물이 투명 우산을 들고 젖은 돌바닥 위에서 걸음을 멈춘 채 화면 밖을 살짝 돌아봅니다. 편안하고 차분한, 아주 희미한 미소. 꽃집의 따뜻한 불빛이 젖은 바닥으로 길게 번집니다"
      },
      seed: { subject: "woman", weather: "drizzle", place: "alley", palette: "cool", outfit: "trench", umbrella: "clear", shot: "medium", light: "overcast", motion: "turn", ratio: "4:5" }
    },
    {
      id: "flower-shop",
      emoji: "🌷",
      label: "꽃집 앞 오후",
      thumb: "wash/flower-shop.jpg",
      thumbPos: "center 42%",
      caption: "꽃은 늘 지나가는 사람을 붙잡는다.",
      captions: ["꽃은 늘 지나가는 사람을 붙잡는다.", "오늘은 꽃을 사 가는 날.", "유리창 안쪽이 조금 더 따뜻하다."],
      scene: {
        en: "the subject pauses in front of a small flower shop in soft afternoon light, one hand in a pocket, the shop's warm glow behind the glass and damp pavement reflecting it",
        ko: "인물이 부드러운 오후 빛 속 작은 꽃집 앞에 멈춰 섭니다. 한 손은 주머니에, 유리 뒤로는 따뜻한 불빛, 젖은 바닥이 그 빛을 되비춥니다"
      },
      seed: { subject: "man", weather: "afterRain", place: "alley", palette: "warm", outfit: "knit", umbrella: "folded", shot: "medium", light: "lowSun", motion: "still", ratio: "4:5" }
    },
    {
      id: "hanok-rain",
      emoji: "🏮",
      label: "한옥 담장 빗길",
      thumb: "wash/hanok-rain.jpg",
      thumbPos: "center 42%",
      caption: "담장을 따라 걸으면 비도 느려진다.",
      captions: ["담장을 따라 걸으면 비도 느려진다.", "등불 하나가 길을 대신 밝힌다.", "젖은 기와가 더 검게 빛난다."],
      scene: {
        en: "an elderly subject walks slowly along a low tiled hanok wall in fine rain, a small navy umbrella held low, a paper lantern glowing under the eave",
        ko: "어르신이 가는 비 속에서 낮은 기와 담장을 따라 천천히 걷습니다. 작은 남색 우산을 낮게 들고, 처마 아래 종이 등불이 은은하게 빛납니다"
      },
      seed: { subject: "elder", weather: "drizzle", place: "hanok", palette: "green", outfit: "quilt", umbrella: "navy", shot: "medium", light: "overcast", motion: "walk", ratio: "4:5" }
    },
    {
      id: "after-rain",
      emoji: "💧",
      label: "비 갠 뒤 웅덩이",
      thumb: "wash/after-rain.jpg",
      thumbPos: "center 42%",
      caption: "비가 그치면 세상이 두 겹이 된다.",
      captions: ["비가 그치면 세상이 두 겹이 된다.", "웅덩이마다 하늘이 하나씩.", "장화가 젖는 건 상관없다."],
      scene: {
        en: "right after the rain a child stands with both feet in a wide puddle, arms out, a tiny paper boat floating beside the boots, low warm sun breaking through",
        ko: "비가 막 그친 뒤, 아이가 넓은 물웅덩이에 두 발을 담그고 두 팔을 벌리고 섭니다. 장화 옆으로 작은 종이배가 떠 있고, 구름 사이로 낮은 햇살이 비껴듭니다"
      },
      seed: { subject: "child", weather: "afterRain", place: "courtyard", palette: "cool", outfit: "raincoat", umbrella: "none", shot: "full", light: "lowSun", motion: "still", ratio: "4:5" }
    },
    {
      id: "snow-alley",
      emoji: "❄️",
      label: "눈 내리는 골목",
      thumb: "wash/snow-alley.jpg",
      thumbPos: "center 42%",
      caption: "눈은 소리 없이 사람을 작게 만든다.",
      captions: ["눈은 소리 없이 사람을 작게 만든다.", "어깨에 눈이 앉아도 모른 척.", "희고 조용한 하루."],
      scene: {
        en: "snow falls steadily in a narrow alley while the subject walks with the collar up, flakes gathering on the shoulders and hair, warm window light behind frosted glass",
        ko: "좁은 골목에 눈이 꾸준히 내리고, 인물은 깃을 세운 채 걷습니다. 어깨와 머리카락에 눈송이가 앉고, 흐린 유리 뒤로 따뜻한 창문 빛"
      },
      seed: { subject: "woman", weather: "snow", place: "alley", palette: "rose", outfit: "longcoat", umbrella: "none", shot: "medium", light: "overcast", motion: "walk", ratio: "4:5" }
    },
    {
      id: "night-lantern",
      emoji: "🌙",
      label: "밤 가로등 아래",
      thumb: "wash/night-lantern.jpg",
      thumbPos: "center 42%",
      caption: "비 오는 밤엔 불빛만 남는다.",
      captions: ["비 오는 밤엔 불빛만 남는다.", "우산을 접고 잠깐 하늘을 본다.", "집에 가는 길이 제일 길다."],
      scene: {
        en: "at night under a single cast-iron lamp the subject stands with a folded umbrella, looking up into the rain, warm amber light pooling on the wet pavement while the rest of the street cools to indigo",
        ko: "밤, 가로등 하나 아래에서 인물이 접은 우산을 들고 비를 올려다봅니다. 젖은 바닥에는 따뜻한 호박빛이 고이고, 나머지 거리는 남색으로 식어 있습니다"
      },
      seed: { subject: "man", weather: "drizzle", place: "riverside", palette: "warm", outfit: "longcoat", umbrella: "folded", shot: "medium", light: "lamp", motion: "still", ratio: "4:5" }
    }
  ];

  MPS.register({
    id: "wash",
    order: 6,
    name: "WASH",
    engName: "WASH",
    tab: "수채 초상",
    tabSub: "코튼지 · 젖은 번짐",
    accent: "#5d7f87",
    accentSoft: "#e4ecec",
    ink: "#241f19",
    tagline: "비 오는 날은 수채가 잘 어울린다",
    summary:
      "고급 코튼 수채화지에 얇은 물감을 여러 겹 올린 전통 수채화 초상. 젖은 종이에서 번지는 색과 가장자리에 앉는 알갱이, 머리카락과 얼굴 윤곽에만 남는 가는 연필선. 비, 골목, 따뜻한 불빛, 낮은 채도. 영상은 빗줄기와 물방울만 움직이는 6초 루프.",
    hero: { src: "wash/rainy-letter.jpg", alt: "투명 우산을 든 인물과 비 내리는 골목의 수채화 초상", pos: "center 42%" },
    facts: [
      { k: "종이", v: "코튼 300g", d: "콜드프레스 · 물감 알갱이" },
      { k: "채색", v: "wet-on-wet 3~6겹", d: "경계 흐림 · 흰 종이 여백" },
      { k: "선", v: "연필 0.5mm", d: "얼굴·머리카락에만" },
      { k: "색", v: "저채도 3색", d: "페인즈 그레이 · 세이지 · 앰버" }
    ],
    dna: [
      { tag: "01 · 종이", title: "차가운 코튼지 한 장", swatch: "#F4F1E7",
        body: "바탕은 크림이 도는 흰 코튼 수채화지입니다. 표면의 미세한 요철이 물감을 머금어 알갱이를 만들고, 채색이 닿지 않은 종이 모서리는 그대로 흰색으로 남습니다. 하늘은 대개 비워 두거나 아주 옅은 한 겹으로만 덮습니다.",
        spec: "콜드프레스 코튼지 · 요철 살아있게 · 흰 여백 유지 · 디지털 화이트 금지" },
      { tag: "02 · 채색", title: "젖은 종이 위 세 겹", swatch: "#6E8792",
        body: "물감은 한 번에 칠하지 않고, 젖은 종이 위에 투명한 층을 세 번에서 여섯 번 얹습니다. 색이 만나는 곳에서는 경계가 풀리듯 번지고, 마른 뒤 가장자리에는 진한 물감이 앉아 가는 테두리를 만듭니다. 붓이 지나간 자국은 지우지 않습니다.",
        spec: "wet-on-wet 3~6겹 · 가장자리 침전 · 번짐 경계 · 붓 자국 유지" },
      { tag: "03 · 선", title: "연필선은 얼굴에만", swatch: "#5A5550",
        body: "머리카락 결, 얼굴 윤곽, 손가락, 옷깃에만 0.5mm 연필선이 가늘게 남습니다. 선은 채색 위에 다시 살짝 얹히고, 한 번에 긋지 않고 짧게 끊어 그립니다. 배경에는 선을 거의 쓰지 않고 물감의 형태로만 설명합니다.",
        spec: "연필 0.5mm · 얼굴·머리·손만 · 끊어 긋기 · 배경 선 0" },
      { tag: "04 · 초점", title: "얼굴은 선명, 배경은 번짐", swatch: "#8FA3A8",
        body: "얼굴과 손은 상대적으로 선명하게 남기고, 뒤쪽 건물과 나무는 물감이 물에 풀리듯 경계를 잃습니다. 사진의 아웃포커스가 아니라, 젖은 종이에서 색이 퍼지는 방식으로 거리를 만듭니다.",
        spec: "얼굴 = 선명 · 배경 = 번짐 · 사진식 보케 금지" },
      { tag: "05 · 색", title: "낮은 채도 세 가지 + 한 점", swatch: "#C08A4E",
        body: "주조색은 페인즈 그레이·더스티 블루·세이지 같은 낮은 채도의 세 색. 여기에 따뜻한 앰버나 옅은 크림을 작은 면적으로만 얹어 시선을 잡습니다. 형광색도, 지나치게 진한 원색도 없습니다.",
        spec: "주조 3색 · 채도 20~40% · 앰버 포인트 면적 10% 이하" },
      { tag: "06 · 빛", title: "흐린 하늘의 확산광", swatch: "#B9C6CB",
        body: "빛은 흐린 하늘에서 내려오는 부드러운 확산광이 기본입니다. 얼굴에는 은은한 자연광만 닿고, 배경의 등불은 젖은 바닥에 길게 번집니다. 강한 그림자나 반짝임 없이, 밝고 어두운 면이 물감의 농도로만 나뉩니다.",
        spec: "확산광 · 그림자 경계 부드럽게 · 반사광은 바닥에만" },
      { tag: "07 · 여백", title: "칠하지 않은 종이", swatch: "#FFFFFF",
        body: "화면 아래쪽과 위쪽 가장자리에는 채색이 닿지 않은 종이가 남습니다. 물감이 종이 밖으로 옅어지며 끝나는 이 여백이 수채화의 숨입니다. 테두리나 액자를 그려 넣지 않습니다.",
        spec: "상·하단 흰 여백 · 채색 페이드아웃 · 테두리 0" },
      { tag: "08 · 금기", title: "사진 피부도, 균일한 필터도 없다", swatch: "#A9483C",
        body: "사진 같은 피부 질감, 3D 렌더링, 애니메이션 셀 채색, 과도한 디지털 블러, 균일하게 덮은 수채화 필터, 네온 색, 얼굴 왜곡, 불가능한 우산 구조는 금지입니다. 화면 안에 날짜·서명·로고·워터마크·@계정명을 넣지 않습니다.",
        spec: "사진 피부 0 · 3D 0 · 필터 0 · 얼굴 왜곡 0 · 글자·워터마크 0" }
    ],

    controls: [
      { key: "scene", type: "text", label: "장면 직접 입력", placeholder: "예: 비 갠 새벽, 인물이 젖은 골목 끝에서 우산을 접는다",
        hint: "비우면 위에서 고른 프리셋의 장면을 씁니다" },
      { key: "subject", type: "chips", label: "인물", options: Object.entries(SUBJECTS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "weather", type: "chips", label: "날씨", options: Object.entries(WEATHERS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "place", type: "chips", label: "장소", options: Object.entries(PLACES).map(([id, v]) => ({ id, label: v.label })) },
      { key: "outfit", type: "chips", label: "옷", options: Object.entries(OUTFITS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "umbrella", type: "chips", label: "우산", options: Object.entries(UMBRELLAS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "shot", type: "chips", label: "구도", options: Object.entries(SHOTS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "palette", type: "swatch", label: "수채 팔레트", options: Object.entries(PALETTES).map(([id, v]) => ({ id, label: v.label, hex: v.hex })) },
      { key: "light", type: "chips", label: "빛", options: Object.entries(LIGHTS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "motion", type: "chips", label: "영상 움직임", options: Object.entries(MOTIONS).map(([id, v]) => ({ id, ...v })) },
      { key: "ratio", type: "chips", label: "화면 비율", options: MPS.RATIOS }
    ],

    defaults: {
      subject: "woman",
      weather: "drizzle",
      place: "alley",
      outfit: "trench",
      umbrella: "clear",
      shot: "medium",
      palette: "cool",
      light: "overcast",
      motion: "turn",
      ratio: "4:5"
    },

    presets: PRESETS,

    samples: [
      { file: "wash/rainy-letter.jpg", title: "비 오는 날의 편지 · 투명 우산", caption: "비 오는 날은 수채화가 잘 어울린다.", pos: "center 42%",
        preset: "rainy-letter", seed: { subject: "woman", weather: "drizzle", place: "alley", palette: "cool", outfit: "trench", umbrella: "clear", shot: "medium", light: "overcast", motion: "turn", ratio: "4:5" } },
      { file: "wash/flower-shop.jpg", title: "꽃집 앞 오후 · 니트", caption: "꽃은 늘 지나가는 사람을 붙잡는다.", pos: "center 42%",
        preset: "flower-shop", seed: { subject: "man", weather: "afterRain", place: "alley", palette: "warm", outfit: "knit", umbrella: "folded", shot: "medium", light: "lowSun", motion: "still", ratio: "4:5" } },
      { file: "wash/hanok-rain.jpg", title: "한옥 담장 빗길 · 어르신", caption: "담장을 따라 걸으면 비도 느려진다.", pos: "center 42%",
        preset: "hanok-rain", seed: { subject: "elder", weather: "drizzle", place: "hanok", palette: "green", outfit: "quilt", umbrella: "navy", shot: "medium", light: "overcast", motion: "walk", ratio: "4:5" } },
      { file: "wash/after-rain.jpg", title: "비 갠 뒤 웅덩이 · 아이", caption: "비가 그치면 세상이 두 겹이 된다.", pos: "center 42%",
        preset: "after-rain", seed: { subject: "child", weather: "afterRain", place: "courtyard", palette: "cool", outfit: "raincoat", umbrella: "none", shot: "full", light: "lowSun", motion: "still", ratio: "4:5" } },
      { file: "wash/snow-alley.jpg", title: "눈 내리는 골목 · 긴 코트", caption: "눈은 소리 없이 사람을 작게 만든다.", pos: "center 42%",
        preset: "snow-alley", seed: { subject: "woman", weather: "snow", place: "alley", palette: "rose", outfit: "longcoat", umbrella: "none", shot: "medium", light: "overcast", motion: "walk", ratio: "4:5" } },
      { file: "wash/night-lantern.jpg", title: "밤 가로등 아래 · 접은 우산", caption: "비 오는 밤엔 불빛만 남는다.", pos: "center 42%",
        preset: "night-lantern", seed: { subject: "man", weather: "drizzle", place: "riverside", palette: "warm", outfit: "longcoat", umbrella: "folded", shot: "medium", light: "lamp", motion: "still", ratio: "4:5" } }
    ],

    /* ---------------- 프롬프트 빌더 ---------------- */
    build: {
      imageEn(ctx) {
        const subj = SUBJECTS[ctx.get("subject").id];
        const weather = WEATHERS[ctx.get("weather").id];
        const place = PLACES[ctx.get("place").id];
        const outfit = OUTFITS[ctx.get("outfit").id];
        const umb = UMBRELLAS[ctx.get("umbrella").id];
        const shot = SHOTS[ctx.get("shot").id];
        const pal = PALETTES[ctx.get("palette").id];
        const light = LIGHTS[ctx.get("light").id];
        const ratio = ctx.get("ratio");
        const sceneEn = ctx.scene("en");

        if (ctx.brief) {
          return [
            `A traditional watercolor portrait on cold-pressed cotton paper, painted by hand: ${subj.en}, ${outfit.en}, ${umb.en}.`,
            `${H.cap(weather.en)} in ${place.en}.`,
            `Translucent wet-on-wet washes in three or four layers, pigment granulating at the edges, thin 0.5 mm pencil contours on the hair and face only, generous unpainted white paper at the top and bottom.`,
            `${H.cap(pal.en)}. ${H.cap(light.en)}.`,
            `${H.cap(shot.en)}, ${ratio.en}.`,
            `${H.cap(sceneEn)}.`,
            `Hand-painted watercolor only — no photograph, no 3D, no even filter, no text, no date, no watermark, no signature, no logo.`
          ].join(" ");
        }

        return [
          `A traditional watercolor portrait painted by hand on a sheet of cold-pressed cotton watercolor paper — a picture, not a photograph filtered to look painted.`,
          `Subject: ${subj.en}. ${H.cap(outfit.en)}. The figure keeps natural, believable proportions and anatomy; the face stays recognizable and calm, with a very faint smile and no beautifying or reshaping of the features.`,
          `Scene: ${place.en}. ${H.cap(weather.en)}. ${H.cap(umb.en)}.`,
          `Paper and paint: the surface is 300 g cold-pressed cotton paper whose tooth catches the pigment, so every wash carries a fine grain and small granulated specks settle where the water dried. Pigment is applied in three to six thin translucent layers, wet into wet, so colours meet in soft bleeding edges; where a wash dries, a darker line of pigment gathers at its border. Brush strokes are left visible and are never smoothed away.`,
          `Line: a single 0.5 mm graphite pencil draws only the hair strands, the face contour, the hands and the coat lapels — short broken strokes laid partly over the paint. The background is described by wash shapes alone, with almost no line.`,
          `Focus: the face and hands stay comparatively crisp while the buildings and trees behind lose their edges as if the colour were still wet. Distance is made by bleeding, not by photographic bokeh.`,
          `Colour and light: ${pal.en}. ${H.cap(light.en)}. Overall the value range stays low and gentle, with no neon, no pure black and no digital gradient.`,
          `Space: ${shot.en}, ${ratio.en}. The paint fades out toward the lower and upper edges of the sheet, leaving unpainted white paper there; no border is drawn, no frame is added.`,
          `Details worth having: a few drops falling from the umbrella rim, wet leaves shivering, the warm window light reflected in a puddle, the paper going paler toward the corners.`,
          `Scene direction: ${H.cap(H.stripDot(sceneEn))}.`,
          `Mood: quiet, delicate and a little melancholic — a letter written on a rainy afternoon, held with both hands.`,
          `Output: one finished watercolor painting, ${ratio.en}, high resolution, single person, natural paper texture, matte finish.`,
          `Avoid: photographic skin texture, 3D render, CGI, anime or cel shading, flat digital watercolor filter, uniform blur, neon or oversaturated colour, hard edges, distorted face, duplicated figures, impossible umbrella structure, malformed fingers, meaningless lettering, decorative clutter, and any date, signature, watermark, logo or @ handle.`
        ].join("\n\n");
      },

      imageKo(ctx) {
        const subj = SUBJECTS[ctx.get("subject").id];
        const weather = WEATHERS[ctx.get("weather").id];
        const place = PLACES[ctx.get("place").id];
        const outfit = OUTFITS[ctx.get("outfit").id];
        const umb = UMBRELLAS[ctx.get("umbrella").id];
        const shot = SHOTS[ctx.get("shot").id];
        const pal = PALETTES[ctx.get("palette").id];
        const light = LIGHTS[ctx.get("light").id];
        const ratio = ctx.get("ratio");
        const sceneKo = ctx.scene("ko");

        if (ctx.brief) {
          return [
            `콜드프레스 코튼 수채화지에 손으로 그린 전통 수채화 초상: ${subj.ko}, ${outfit.ko}, ${umb.ko}.`,
            `${place.ko}. ${weather.ko}.`,
            `투명한 수채를 3~4겹 wet-on-wet으로, 가장자리에 물감 알갱이, 머리카락과 얼굴에만 가는 0.5mm 연필선, 위아래 가장자리에 칠하지 않은 흰 종이.`,
            `${pal.ko}. ${light.ko}.`,
            `${shot.ko}, ${ratio.ko}.`,
            `${sceneKo}.`,
            `손으로 그린 수채화만 — 사진·3D·균일 필터 금지. 글자·날짜·워터마크·서명·로고 금지.`
          ].join(" ");
        }

        return [
          `콜드프레스 코튼 수채화지 위에 손으로 그린 전통 수채화 초상. 사진에 수채 필터를 씌운 것이 아니라, 실제로 그린 그림이어야 합니다.`,
          `인물: ${subj.ko}. ${outfit.ko}. 인체 비율과 해부는 자연스럽고 믿을 만하게 유지하고, 얼굴은 알아볼 수 있게 차분하게 — 아주 희미한 미소 한 점, 과도한 미화나 얼굴 재구성은 없습니다.`,
          `장면: ${place.ko}. ${weather.ko}. ${umb.ko}.`,
          `종이와 물감: 300g 콜드프레스 코튼지의 요철이 물감을 머금어 모든 채색에 고운 알갱이가 깔리고, 물이 마른 자리에는 작은 침전물이 앉습니다. 물감은 3~6겹의 얇고 투명한 층으로, 젖은 상태에서 겹쳐 칠해 색이 만나는 곳은 부드럽게 번지고, 한 겹이 마르면 가장자리에 진한 물감 테두리가 남습니다. 붓이 지나간 자국은 지우지 않고 그대로 둡니다.`,
          `선: 0.5mm 연필 하나로 머리카락 결, 얼굴 윤곽, 손, 옷깃에만 짧게 끊어 긋습니다. 일부는 채색 위에 살짝 얹힙니다. 배경은 거의 선 없이 물감의 형태로만 설명합니다.`,
          `초점: 얼굴과 손은 비교적 선명하게, 뒤쪽 건물과 나무는 색이 아직 젖어 있는 것처럼 경계를 잃습니다. 거리는 사진식 보케로가 아니라 번짐으로 만듭니다.`,
          `색과 빛: ${pal.ko}. ${light.ko}. 전체 명암 대비는 낮고 부드럽게, 형광색도 순수 검정도 디지털 그라데이션도 없습니다.`,
          `화면: ${shot.ko}, ${ratio.ko}. 물감은 종이 아래쪽과 위쪽 가장자리로 갈수록 옅어져 칠하지 않은 흰 종이가 남습니다. 테두리를 긋거나 액자를 넣지 않습니다.`,
          `있으면 좋은 디테일: 우산 가장자리에서 떨어지는 물방울 몇 개, 바람에 흔들리는 젖은 나뭇잎, 물웅덩이에 비치는 따뜻한 창문 빛, 모서리로 갈수록 옅어지는 채색.`,
          `장면 지시: ${H.stripDot(sceneKo)}.`,
          `분위기: 조용하고 섬세하며 조금은 쓸쓸한 — 비 오는 오후에 써 내려간 편지를 두 손으로 받쳐 든 듯한 느낌.`,
          `출력: 완성된 수채화 한 장, ${ratio.ko}, 고해상도, 단일 인물, 자연스러운 종이 질감, 무광 마감.`,
          `금지: 사진 같은 피부 질감, 3D 렌더, CGI, 애니메이션·셀 채색, 평면적인 디지털 수채 필터, 균일한 블러, 형광·과채도, 딱딱한 경계, 얼굴 왜곡, 인물 중복, 불가능한 우산 구조, 어색한 손가락, 의미 없는 글자, 과한 장식, 모든 날짜·서명·워터마크·로고·@ 계정명.`
        ].join("\n\n");
      },

      motionEn(ctx) {
        const weather = WEATHERS[ctx.get("weather").id];
        const umb = UMBRELLAS[ctx.get("umbrella").id];
        const motion = ctx.get("motion");
        const ratio = ctx.get("ratio");
        const hasUmbrella = ctx.get("umbrella").id !== "none";

        const walkBlock = `Walk: a slow, even six-phase cycle — the heel lands and stays planted through the stance, the toe peels off last, the body rises and falls no more than 1.5 px. The coat hem and the scarf lag one frame behind, the hair moves only a little, and the feet never slide on the wet stones.`;

        const turnBlock = `Turn: the figure slows over two shorter steps and stops, then the head turns back over the shoulder through about 60 degrees while the shoulders follow a frame later.${hasUmbrella ? " The umbrella tilts with the turn, the canopy rocking by a degree or two." : ""} The eyes find the viewer and stay.`;

        if (ctx.brief) {
          return [
            `6-second seamless loop at 24 fps, ${ratio.en}, the same hand-painted watercolor portrait animated as traditional 2D animation on paper.`,
            motion.id === "walk"
              ? `The figure walks slowly away, coat hem trailing, feet never sliding.`
              : motion.id === "turn"
                ? `The figure slows, stops and turns the head back over the shoulder.`
                : motion.id === "still"
                  ? `The figure holds still, breathing once; one drop falls from the umbrella rim.`
                  : `The figure almost holds still; only the rain moves.`,
            `${H.cap(weather.short)} throughout, wet paint bleeding and settling on the paper, brush texture fixed.`,
            `First and last frame identical, no morphing, no digital cross-fade, no text, no watermark.`
          ].join(" ");
        }

        return [
          `Animate the still watercolor into a 6-second seamless loop at 24 fps — traditional hand-painted 2D animation, painted on the same sheet of cotton paper, never a digital warp of a photograph.`,
          `Camera: completely locked. No pan, no zoom, no parallax, no push-in, no focus pull, no morphing.`,
          motion.id === "walk" ? walkBlock : motion.id === "turn" ? walkBlock + " " + turnBlock : motion.id === "still" ? `Stillness: the figure stands, and the only movement is one slow breath — the chest and shoulders rise about 1 px over three seconds — plus a single drop gathering under the umbrella rim and falling.` : `Rain only: the figure holds almost still while the weather moves around them.`,
          `Weather: ${weather.en}. The rain streaks drift downward at a steady rate with slight variation, drops land on the umbrella and burst into two or three tiny specks, puddles ripple in widening rings once every few seconds. The motion is soft and continuous, like paint running on wet paper.`,
          `Paint behaviour: where colours meet, edges bleed outward by one or two pixels and settle back, as if water were still moving in the paper. Granulation specks stay fixed. Brush strokes never slide or deform, and the pencil lines do not wobble.`,
          `Light and colour: the palette stays exactly as painted; no flicker, no brightening, no digital glow, no lighting change.`,
          `Loop: the rain cycle, the puddle ripples and the figure's movement are timed to whole numbers inside six seconds, so the last frame is identical to the first and the loop restarts invisibly. No fade, no title card, no logo, no sound.`,
          `Guardrails: keep the paper texture and the unpainted white margins locked; no 3D, no morphing, no cross-dissolve, no added characters, no camera shake, no text of any kind.`
        ].join("\n\n");
      },

      motionKo(ctx) {
        const weather = WEATHERS[ctx.get("weather").id];
        const umb = UMBRELLAS[ctx.get("umbrella").id];
        const motion = ctx.get("motion");
        const ratio = ctx.get("ratio");
        const hasUmbrella = ctx.get("umbrella").id !== "none";

        const walkBlock = `보행: 느리고 고른 6동작 사이클 — 뒤꿈치가 땅에 닿으면 딛는 동안 그대로 붙어 있고 발끝이 마지막에 떨어집니다. 몸의 상하 흔들림은 1.5px을 넘지 않으며, 코트 자락과 스카프는 한 프레임 늦게 따라오고 머리카락은 조금만 흔들립니다. 젖은 돌 위에서 발이 미끄러지지 않습니다.`;

        const turnBlock = `돌아보기: 두 걸음을 짧게 디뎌 멈춘 뒤, 고개가 어깨 너머로 약 60도 돌아가고 어깨가 한 프레임 늦게 따라갑니다.${hasUmbrella ? " 우산도 그 회전을 따라 기울며 우산 면이 1~2도 정도 흔들립니다." : ""} 눈이 시청자를 찾은 뒤 그대로 머뭅니다.`;

        if (ctx.brief) {
          return [
            `${ratio.ko}, 6초 무한 반복, 24fps. 같은 손그림 수채화를 종이 위 전통 2D 애니메이션으로.`,
            motion.id === "walk"
              ? `인물이 천천히 걸어가고 코트 자락이 따라옵니다. 발은 미끄러지지 않습니다.`
              : motion.id === "turn"
                ? `인물이 속도를 줄여 멈추고 어깨 너머로 고개를 돌립니다.`
                : motion.id === "still"
                  ? `인물은 서 있고 숨 한 번, 우산 끝에서 물방울 하나가 떨어집니다.`
                  : `인물은 거의 정지, 비만 움직입니다.`,
            `${weather.shortKo}${H.josa(weather.shortKo, "이", "가")} 계속되고, 젖은 물감이 종이 위에서 번지고 가라앉습니다. 붓 질감은 고정.`,
            `첫 프레임과 마지막 프레임 동일, 모핑·디지털 디졸브·글자·워터마크 금지.`
          ].join(" ");
        }

        return [
          `정지 수채화를 6초 무한 반복 영상으로 만듭니다. 24fps, 같은 코튼지 위에 그린 전통 2D 손그림 애니메이션이며, 사진을 디지털로 비트는 방식은 금지입니다.`,
          `카메라: 완전 고정. 팬·줌·시차 이동·푸시인·포커스 이동·모핑 모두 없습니다.`,
          motion.id === "walk" ? walkBlock : motion.id === "turn" ? walkBlock + " " + turnBlock : motion.id === "still" ? `정지: 인물은 서 있고, 움직임은 3초에 걸쳐 가슴과 어깨가 1px 오르는 느린 숨 한 번, 그리고 우산 끝에 맺힌 물방울 하나가 떨어지는 것뿐입니다.` : `비만: 인물은 거의 정지해 있고 날씨가 그 주위를 움직입니다.`,
          `날씨: ${weather.ko}. 빗줄기는 일정한 속도로 조금씩 흔들리며 내려오고, 우산에 닿은 물방울은 두세 개의 작은 점으로 터지며, 물웅덩이는 몇 초에 한 번 동심원으로 번집니다. 움직임은 젖은 종이 위로 물감이 흐르는 것처럼 부드럽고 연속적입니다.`,
          `물감의 거동: 색이 만나는 곳은 1~2px 바깥으로 번졌다가 다시 가라앉습니다. 마치 종이 속에서 물이 아직 움직이는 것처럼. 알갱이는 고정되고, 붓 자국은 미끄러지거나 변형되지 않으며 연필선은 떨리지 않습니다.`,
          `빛과 색: 팔레트는 그려진 그대로 유지됩니다. 깜빡임·밝아짐·디지털 글로우·조명 변화 없음.`,
          `루프: 빗줄기 주기, 물웅덩이 파문, 인물의 움직임이 6초 안에 정수로 들어가 마지막 프레임이 첫 프레임과 같습니다. 페이드·타이틀 카드·로고·소리는 없습니다.`,
          `가드레일: 종이 질감과 칠하지 않은 흰 여백을 고정하고, 3D·모핑·디졸브·새 인물·카메라 흔들림·모든 글자 추가를 금지합니다.`
        ].join("\n\n");
      }
    },

    randomize(ctx) {
      const p = PRESETS[Math.floor(Math.random() * PRESETS.length)];
      const pick = (obj) => Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];
      return {
        preset: p.id,
        seed: Object.assign({}, p.seed, {
          subject: pick(SUBJECTS),
          weather: pick(WEATHERS),
          place: pick(PLACES),
          outfit: pick(OUTFITS),
          umbrella: pick(UMBRELLAS),
          shot: pick(SHOTS),
          palette: pick(PALETTES),
          light: pick(LIGHTS),
          ratio: ["4:5", "4:5", "9:16", "1:1", "16:9"][Math.floor(Math.random() * 5)]
        }),
        caption: p.captions ? p.captions[Math.floor(Math.random() * p.captions.length)] : p.caption
      };
    }
  });

})();
