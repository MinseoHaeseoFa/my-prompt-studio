/* ============================================================
   My Prompt Studio · data/poster.js
   ⑦ POSTER — 펜 앤 잉크 도시 포스터형 (순백 종이 · 플랫 채색)
   @ai_traveler_k 스레드 「한국 도시들을 펜 드로잉 & 채색으로」의
   화면 언어를 분석해, 이미지/영상 × 영어/한국어 4종 프롬프트로
   다시 엮은 모듈. 랜드마크 셋을 하나의 대로로 잇고, 짙은 남색
   펜선 위에 목적지에서 가져온 플랫 컬러를 아껴 얹는다.
   도시 이름 한 줄 말고는 글자를 넣지 않는다(날짜·서명·@ 금지).
   ============================================================ */

(function () {
  const H = MPS.helpers;

  /* ---------- 계절 (잎과 색) ---------- */
  const SEASONS = {
    spring: {
      label: "봄",
      hex: "#E9A9BC",
      canopyEn: "loose clusters of pale cherry blossom along the avenue, petals drifting onto the path",
      canopyKo: "대로를 따라 느슨하게 핀 연분홍 벚꽃, 길 위로 흩날리는 꽃잎",
      toneEn: "soft cherry pink, warm white and fresh sage green",
      toneKo: "부드러운 벚꽃 분홍, 따뜻한 흰색, 싱그러운 세이지 그린",
      short: "cherry blossom in bloom"
    },
    summer: {
      label: "여름",
      hex: "#6F9B6A",
      canopyEn: "dense summer canopies of zelkova and maple closing over the avenue in full leaf",
      canopyKo: "느티나무와 단풍나무의 짙은 여름 수관이 대로 위를 덮은",
      toneEn: "deep leafy green, warm sand and sea blue",
      toneKo: "짙은 초록, 따뜻한 모래색, 바다 파랑",
      short: "deep summer leaves"
    },
    autumn: {
      label: "가을",
      hex: "#C9642F",
      canopyEn: "autumn foliage in persimmon red and golden ginkgo yellow, leaves gathering along the kerb",
      canopyKo: "감빛 단풍과 노란 은행잎이 섞인 가을 수관, 길가에 쌓이는 낙엽",
      toneEn: "persimmon red, golden ochre and sage green",
      toneKo: "감색, 황금빛 오커, 세이지 그린",
      short: "autumn colour"
    },
    winter: {
      label: "겨울",
      hex: "#8FA6B8",
      canopyEn: "bare winter branches with thin lines of snow on their upper edges, a few evergreens holding their shape",
      canopyKo: "가지 위쪽에 눈이 얇게 앉은 앙상한 겨울 가지, 형태를 지킨 몇 그루의 상록수",
      toneEn: "slate blue, deep pine green and pale cream",
      toneKo: "슬레이트 블루, 짙은 소나무 초록, 옅은 크림",
      short: "bare winter branches"
    }
  };

  /* ---------- 팔레트 (플랫 채색) ---------- */
  const PALETTES = {
    indigo: {
      label: "인디고 · 골드",
      hex: "#3F5D93",
      en: "restrained flat indigo blue, warm gold and soft stone grey",
      ko: "절제된 플랫 인디고 블루, 따뜻한 골드, 부드러운 돌회색",
      short: "indigo and gold"
    },
    coral: {
      label: "틸 · 코랄",
      hex: "#2F7E86",
      en: "flat teal, coral and warm sand",
      ko: "플랫 틸, 코랄, 따뜻한 모래색",
      short: "teal and coral"
    },
    ochre: {
      label: "오커 · 감색",
      hex: "#B0722F",
      en: "flat ochre, persimmon red and sage green",
      ko: "플랫 오커, 감색, 세이지 그린",
      short: "ochre and persimmon"
    },
    sage: {
      label: "세이지 · 먹청",
      hex: "#5C7D74",
      en: "flat sage green, ink blue and warm cream",
      ko: "플랫 세이지 그린, 먹청색, 따뜻한 크림",
      short: "sage and ink blue"
    }
  };

  /* ---------- 지면 ---------- */
  const GROUNDS = {
    avenue: {
      label: "가로수 대로",
      en: "one continuous leafy civic avenue with a low stone kerb, a curved garden path leading the eye toward the focal entrance",
      ko: "낮은 돌 턱이 이어지는 하나의 가로수 대로, 시선을 중심 입구로 끌고 가는 곡선 정원길",
      short: "a leafy civic avenue"
    },
    riverside: {
      label: "강변 산책로",
      en: "a riverside promenade with a thin railing and a low embankment, the water drawn with a few rhythmic horizontal strokes",
      ko: "가는 난간과 낮은 제방이 있는 강변 산책로, 물은 리듬 있는 가로획 몇 줄로",
      short: "a riverside promenade"
    },
    plaza: {
      label: "광장",
      en: "a broad paved plaza of regular stone joints, planters and low bollards keeping the scale",
      ko: "규칙적인 돌 이음선이 깔린 넓은 광장, 화분과 낮은 볼라드가 규모를 잡아 주는",
      short: "a broad stone plaza"
    },
    alley: {
      label: "골목길",
      en: "a narrow old alley whose stone paving and low walls step down between the buildings",
      ko: "건물 사이로 낮은 담장과 돌바닥이 계단처럼 이어지는 좁은 옛 골목",
      short: "a narrow old alley"
    }
  };

  /* ---------- 인물 ---------- */
  const FIGURES = {
    four: {
      label: "행인 네 명",
      en: "four small contemporary pedestrians walking away along the path, drawn at about 8% of the frame height, in simple flat-coloured coats",
      ko: "길을 따라 걸어가는 작은 현대 행인 네 명, 화면 높이의 8% 정도, 단순한 플랫 컬러 코트",
      short: "four small pedestrians"
    },
    couple: {
      label: "나란히 두 사람",
      en: "two pedestrians walking side by side at about 9% of the frame height, one a little taller",
      ko: "나란히 걷는 두 행인, 화면 높이의 9% 정도, 한쪽이 조금 큰",
      short: "two pedestrians side by side"
    },
    family: {
      label: "아이와 어른",
      en: "an adult and a child holding hands at about 8% of the frame height, the child taking two steps to every one",
      ko: "손을 잡은 어른과 아이, 화면 높이의 8% 정도, 아이는 한 걸음마다 두 걸음",
      short: "an adult and a child"
    },
    none: {
      label: "사람 없이",
      en: "no people at all — the avenue belongs to the buildings and the trees",
      ko: "사람 없이 — 대로가 건물과 나무의 것이 되는",
      short: "no people"
    }
  };

  /* ---------- 하늘 ---------- */
  const SKIES = {
    white: {
      label: "순백 하늘",
      en: "a generous pure-white sky taking at least 35% of the frame, no gradient, no clouds, no sun",
      ko: "화면의 35% 이상을 차지하는 넉넉한 순백 하늘, 그라데이션도 구름도 해도 없이",
      short: "a pure-white sky"
    },
    cream: {
      label: "옅은 크림",
      en: "a very faint warm cream sky with no cloud shapes, only the paper warmed a shade",
      ko: "구름 형태 없이 종이를 한 톤만 따뜻하게 데운 아주 옅은 크림 하늘",
      short: "a faint cream sky"
    },
    pale: {
      label: "옅은 하늘색",
      en: "a pale flat sky-blue wash behind the landmarks, still completely even and untextured",
      ko: "랜드마크 뒤로 옅게 깔린 플랫 하늘색, 끝까지 고르고 질감 없이",
      short: "a pale flat sky-blue"
    }
  };

  /* ---------- 영상 움직임 ---------- */
  const MOTIONS = {
    leaves: {
      label: "잎만 흔들림",
      note: "카메라 고정, 잎과 연기만",
      en: "the camera holds still while the foliage stirs and a few leaves or petals drift down across the white sky",
      ko: "카메라는 고정, 수관만 흔들리고 잎·꽃잎 몇 장이 흰 하늘을 가로질러 내려옵니다"
    },
    pan: {
      label: "저속 팬",
      note: "화면이 천천히 옆으로",
      en: "the whole poster slides sideways by a few percent, like a camera gliding past a printed board, while the linework stays perfectly rigid",
      ko: "인쇄된 포스터 앞을 카메라가 지나가듯 화면 전체가 몇 퍼센트 옆으로 흐릅니다. 선화는 완전히 고정"
    },
    breathe: {
      label: "미세 호흡",
      note: "아주 느린 줌 인",
      en: "an almost imperceptible slow push-in of two percent while one pedestrian takes a single step",
      ko: "거의 느껴지지 않는 2퍼센트의 느린 푸시인, 행인 하나가 한 걸음 딛는 동안"
    },
    still: {
      label: "정지",
      note: "인쇄물처럼 고정",
      en: "the poster stays completely still, like a print on a wall, with only the faintest paper breath",
      ko: "벽에 걸린 인쇄물처럼 완전히 고정, 아주 미세한 종이의 숨결만"
    }
  };

  /* ---------- 프리셋 ---------- */
  const PRESETS = [
    {
      id: "seoul",
      emoji: "🏯",
      label: "서울 · 궁궐 대로",
      thumb: "poster/seoul.jpg",
      thumbPos: "center 40%",
      caption: "한 도시를, 한 장의 선으로.",
      captions: ["한 도시를, 한 장의 선으로.", "가을은 궁 담장에서 먼저 익는다.", "걷다 보면 도시가 포스터가 된다."],
      scene: {
        en: "the palace gate and its long stone wall dominate the right, Gwanghwamun plaza and N Seoul Tower hold the distance, four walkers head up the curved path between autumn shrubs",
        ko: "오른쪽을 궁궐 대문과 긴 돌담이 차지하고, 멀리 광화문 광장과 남산서울타워가 자리합니다. 가을 관목 사이 곡선 길로 행인 네 명이 걸어갑니다"
      },
      seed: { city: "SEOUL", landmark: "Gyeongbokgung Palace main gate", season: "autumn", palette: "ochre", ground: "avenue", figures: "four", sky: "white", label: "cityTop", motion: "leaves", ratio: "4:5" }
    },
    {
      id: "busan",
      emoji: "🌉",
      label: "부산 · 바다 대로",
      thumb: "poster/busan.jpg",
      thumbPos: "center 40%",
      caption: "바다가 있는 도시는 걷는 것만으로 좋다.",
      captions: ["바다가 있는 도시는 걷는 것만으로 좋다.", "다리 하나가 도시의 등뼈가 된다.", "여름은 해안도로에서 가장 길다."],
      scene: {
        en: "the suspension towers of Gwangan Bridge dominate over calm water, Haeundae beach and Busan Tower hold the distance, walkers follow a seaside promenade",
        ko: "잔잔한 바다 위로 광안대교의 주탑이 자리하고, 멀리 해운대 해변과 부산타워가 보입니다. 행인들이 바닷가 산책로를 따라 걷습니다"
      },
      seed: { city: "BUSAN", landmark: "Gwangan Bridge", season: "summer", palette: "coral", ground: "riverside", figures: "couple", sky: "pale", label: "cityTop", motion: "breathe", ratio: "4:5" }
    },
    {
      id: "gyeongju",
      emoji: "🏛️",
      label: "경주 · 천년의 길",
      thumb: "poster/gyeongju.jpg",
      thumbPos: "center 40%",
      caption: "천 년은 아직도 길 위에 있다.",
      captions: ["천 년은 아직도 길 위에 있다.", "돌계단 하나에 시간이 앉아 있다.", "봄이 오면 절집도 들뜬다."],
      scene: {
        en: "the stone stairway and gate of Bulguksa dominate, Cheomseongdae observatory and the pavilion of Donggung Palace rise behind, cherry trees line the lane",
        ko: "불국사의 돌계단과 대문이 중심을 잡고, 뒤로 첨성대와 동궁과 월지의 누각이 솟습니다. 길 양옆으로 벚나무가 늘어섭니다"
      },
      seed: { city: "GYEONGJU", landmark: "Bulguksa temple gate and stone stairway", season: "spring", palette: "sage", ground: "alley", figures: "four", sky: "cream", label: "cityTop", motion: "leaves", ratio: "4:5" }
    },
    {
      id: "jeonju",
      emoji: "🏘️",
      label: "전주 · 한옥 골목",
      thumb: "poster/jeonju.jpg",
      thumbPos: "center 40%",
      caption: "기와지붕이 겹치면 골목이 깊어진다.",
      captions: ["기와지붕이 겹치면 골목이 깊어진다.", "한옥의 처마가 길을 대신 덮는다.", "돌담을 따라 걷는 오후."],
      scene: {
        en: "the tiled gate of Gyeonggijeon dominates, hanok roof eaves step down the alley and Omokdae pavilion sits on the hill behind, a stone lane leads through",
        ko: "경기전의 기와 대문이 중심을 잡고, 한옥의 처마가 골목을 따라 계단처럼 이어지며, 뒤 언덕에는 오목대가 앉아 있습니다. 돌길이 그 사이를 지납니다"
      },
      seed: { city: "JEONJU", landmark: "Gyeonggijeon shrine gate", season: "autumn", palette: "ochre", ground: "alley", figures: "couple", sky: "white", label: "cityTop", motion: "pan", ratio: "4:5" }
    },
    {
      id: "jeju",
      emoji: "🌋",
      label: "제주 · 돌담 해안길",
      thumb: "poster/jeju.jpg",
      thumbPos: "center 40%",
      caption: "돌담은 바람이 만든 글씨다.",
      captions: ["돌담은 바람이 만든 글씨다.", "섬의 길은 바다를 따라 휜다.", "노란 꽃이 돌담을 이긴다."],
      scene: {
        en: "the Seongsan Ilchulbong tuff cone dominates across the water, a dol hareubang stone figure stands in the left foreground and the coastal grass of Seopjikoji sweeps the right, a low stone wall follows the path",
        ko: "바다 건너 성산일출봉이 자리하고, 왼쪽 앞에는 돌하르방이 서 있으며, 오른쪽으로 섭지코지의 해안 풀이 길게 휩니다. 낮은 돌담이 길을 따라 이어집니다"
      },
      seed: { city: "JEJU", landmark: "Seongsan Ilchulbong tuff cone", season: "summer", palette: "coral", ground: "riverside", figures: "four", sky: "pale", label: "cityTop", motion: "leaves", ratio: "4:5" }
    },
    {
      id: "gangneung",
      emoji: "🌲",
      label: "강릉 · 소나무 호수길",
      thumb: "poster/gangneung.jpg",
      thumbPos: "center 40%",
      caption: "겨울 호수는 조용히 도시를 품는다.",
      captions: ["겨울 호수는 조용히 도시를 품는다.", "소나무 길은 계절을 모른다.", "눈 앉은 기와가 제일 예쁘다."],
      scene: {
        en: "Gyeongpodae pavilion sits above its lake in the middle distance, the gate of Ojukheon holds the left and a pine-lined beach road runs to the right, thin snow on the roofs",
        ko: "중간 거리 호수 위로 경포대가 앉아 있고, 왼쪽에는 오죽헌의 대문, 오른쪽으로는 소나무가 늘어선 해변길이 이어집니다. 지붕에는 얇은 눈"
      },
      seed: { city: "GANGNEUNG", landmark: "Gyeongpodae pavilion", season: "winter", palette: "indigo", ground: "avenue", figures: "family", sky: "white", label: "cityTop", motion: "still", ratio: "4:5" }
    }
  ];

  /* 도시 이름 표기: 라틴 문자는 대문자로 */
  function labelText(city) {
    const s = String(city || "").trim();
    if (!s) return "";
    return /^[\x20-\x7E]+$/.test(s) ? s.toUpperCase() : s;
  }

  MPS.register({
    id: "poster",
    order: 7,
    name: "POSTER",
    engName: "POSTER",
    tab: "도시 포스터",
    tabSub: "펜 선화 · 플랫 채색",
    accent: "#3f5d93",
    accentSoft: "#e6eaf4",
    ink: "#241f19",
    tagline: "한 도시를, 한 장의 선으로",
    summary:
      "순백 종이 위에 짙은 남색 펜선으로 그린 도시 포스터. 랜드마크 셋을 하나의 가로수 대로로 이어 붙이고, 그 도시에서 가져온 플랫 컬러를 아껴 얹습니다. 하늘은 종이 그대로 비우고, 도시 이름만 좌상단에 작은 대문자로. 영상은 잎이 흔들리는 6초 루프.",
    hero: { src: "poster/seoul.jpg", alt: "경복궁과 남산서울타워를 한 대로로 이은 서울 펜 드로잉 포스터", pos: "center 40%" },
    facts: [
      { k: "종이", v: "순백 #FFFFFF", d: "하늘 여백 35% 이상" },
      { k: "선", v: "남색 펜 0.4~0.8px", d: "건축 장식은 리듬 있게" },
      { k: "색", v: "플랫 2~3색", d: "면적 25~35% · 번짐 없음" },
      { k: "글자", v: "도시명 1줄", d: "좌상단 · 대문자 산세리프" }
    ],
    dna: [
      { tag: "01 · 종이", title: "순백, 그림자 없이", swatch: "#FFFFFF",
        body: "바탕은 크림이 섞이지 않은 순백입니다. 하늘은 화면의 3분의 1 이상을 아무것도 없이 비우고, 어디에도 종이 질감이나 비네팅, 바닥 그림자를 넣지 않습니다. 이 여백이 선화를 포스터처럼 만듭니다.",
        spec: "배경 #FFFFFF · 하늘 여백 35% 이상 · 질감 0 · 그림자 0" },
      { tag: "02 · 선", title: "짙은 남색 펜 하나", swatch: "#334C7A",
        body: "모든 형태는 0.4~0.8px의 짙은 남색 펜선 하나로 그립니다. 선 굵기는 거의 변하지 않고, 기와의 물결·창살·난간·돌 이음선은 같은 치수로 반복해 그립니다. 넓은 면의 해칭은 피하고, 명암은 선의 밀도로만 냅니다.",
        spec: "남색 #334C7A · 0.4~0.8px · 굵기 일정 · 넓은 해칭 금지" },
      { tag: "03 · 구도", title: "랜드마크 셋, 한 줄 대로", swatch: "#5C7D74",
        body: "중심 랜드마크 하나를 크게 두고, 도시에서 알아볼 만한 두 곳을 자동으로 골라 옆에 세웁니다. 셋은 하나의 대로와 공유 지면으로 이어지고, 높이·간격·겹침을 조금씩 달리해 리듬을 만듭니다. 하늘에 스카이라인을 층층이 쌓지 않습니다.",
        spec: "중심 1 + 보조 2 · 공유 지면 1 · 스카이라인 적층 금지" },
      { tag: "04 · 시점", title: "눈높이의 비대칭", swatch: "#B0722F",
        body: "시점은 사람의 눈높이, 구도는 좌우 비대칭입니다. 중심 랜드마크는 한쪽으로 치우쳐 크게 앉고, 곡선 정원길 하나가 시선을 중심 입구로 끌고 갑니다. 원근은 살짝 눌러 평면에 가깝게 하되, 건물은 믿을 만하게 남깁니다.",
        spec: "눈높이 · 좌우 비대칭 · 곡선 유도선 1개 · 원근 완만하게" },
      { tag: "05 · 채색", title: "목적지에서 온 플랫 컬러", swatch: "#C9642F",
        body: "색은 물감이 아니라 인쇄 잉크처럼 플랫합니다. 그 도시에서 연상되는 두세 색만, 면적의 4분의 1에서 3분의 1 정도에 얹습니다. 그라데이션도 번짐도 없고, 색과 색 사이는 선으로 끊습니다.",
        spec: "플랫 2~3색 · 면적 25~35% · 그라데이션·번짐 0" },
      { tag: "06 · 식생", title: "장식적인 보태니컬", swatch: "#6F9B6A",
        body: "나무는 사실적 묘사가 아니라 장식적인 도형입니다. 잎은 동그라미·타원·작은 다발의 반복으로, 관목은 물결 모양 덩어리로 그립니다. 계절에 따라 벚꽃·여름잎·단풍·눈 앉은 가지만 바뀝니다.",
        spec: "잎 = 도형 반복 · 관목 = 덩어리 · 계절색 1색" },
      { tag: "07 · 글자", title: "도시명 한 줄, 그뿐", swatch: "#3F5D93",
        body: "글자는 오직 도시 이름 하나. 좌상단에 작게, 대문자 산세리프, 자간을 조금 벌리고 주변에 넉넉한 여백을 둡니다. 그 밖의 표지판·간판·설명 글자는 비워 두고, 로고·테두리·서명·날짜·@계정명은 넣지 않습니다.",
        spec: "도시명 1줄 좌상단 · 작은 대문자 산세리프 · 그 외 글자 0" },
      { tag: "08 · 금기", title: "사진도, 스카이라인 적층도 없다", swatch: "#A9483C",
        body: "사진, 3D, 수채 번짐, 두꺼운 외곽선, 과한 해칭, 형광색, 지나치게 선명한 디지털 광택은 금지입니다. 랜드마크를 위로 층층이 쌓아 올리는 스카이라인 구성도 이 포스터의 언어가 아닙니다.",
        spec: "사진·3D·번짐·두꺼운 선 0 · 스카이라인 적층 0 · 형광색 0" }
    ],

    controls: [
      { key: "scene", type: "text", label: "장면 직접 입력", placeholder: "예: 비 갠 오후, 대로 끝에서 시청사가 보인다",
        hint: "비우면 위에서 고른 프리셋의 장면을 씁니다" },
      { key: "city", type: "text", label: "도시 이름 (그림에 들어갑니다)", placeholder: "예: SEOUL",
        hint: "영문 대문자를 권합니다. 비우면 글자를 넣지 않습니다" },
      { key: "landmark", type: "text", label: "중심 랜드마크", placeholder: "예: Gyeongbokgung Palace main gate",
        hint: "영문 표기를 권합니다. 나머지 두 곳은 도시에 맞춰 자동으로 고릅니다" },
      { key: "season", type: "chips", label: "계절", options: Object.entries(SEASONS).map(([id, v]) => ({ id, label: v.label, hex: v.hex })) },
      { key: "palette", type: "swatch", label: "플랫 팔레트", options: Object.entries(PALETTES).map(([id, v]) => ({ id, label: v.label, hex: v.hex })) },
      { key: "ground", type: "chips", label: "지면", options: Object.entries(GROUNDS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "figures", type: "chips", label: "행인", options: Object.entries(FIGURES).map(([id, v]) => ({ id, label: v.label })) },
      { key: "sky", type: "chips", label: "하늘", options: Object.entries(SKIES).map(([id, v]) => ({ id, label: v.label })) },
      { key: "label", type: "chips", label: "글자",
        options: [
          { id: "cityTop", label: "도시명 좌상단" },
          { id: "none", label: "글자 없이" }
        ] },
      { key: "motion", type: "chips", label: "영상 움직임", options: Object.entries(MOTIONS).map(([id, v]) => ({ id, ...v })) },
      { key: "ratio", type: "chips", label: "화면 비율", options: MPS.RATIOS }
    ],

    defaults: {
      city: "SEOUL",
      landmark: "Gyeongbokgung Palace main gate",
      season: "autumn",
      palette: "ochre",
      ground: "avenue",
      figures: "four",
      sky: "white",
      label: "cityTop",
      motion: "leaves",
      ratio: "4:5"
    },

    presets: PRESETS,

    samples: [
      { file: "poster/seoul.jpg", title: "서울 · 궁궐 대로", caption: "한 도시를, 한 장의 선으로.", pos: "center 40%",
        preset: "seoul", seed: { city: "SEOUL", landmark: "Gyeongbokgung Palace main gate", season: "autumn", palette: "ochre", ground: "avenue", figures: "four", sky: "white", label: "cityTop", motion: "leaves", ratio: "4:5" } },
      { file: "poster/busan.jpg", title: "부산 · 바다 대로", caption: "바다가 있는 도시는 걷는 것만으로 좋다.", pos: "center 40%",
        preset: "busan", seed: { city: "BUSAN", landmark: "Gwangan Bridge", season: "summer", palette: "coral", ground: "riverside", figures: "couple", sky: "pale", label: "cityTop", motion: "breathe", ratio: "4:5" } },
      { file: "poster/gyeongju.jpg", title: "경주 · 천년의 길", caption: "천 년은 아직도 길 위에 있다.", pos: "center 40%",
        preset: "gyeongju", seed: { city: "GYEONGJU", landmark: "Bulguksa temple gate and stone stairway", season: "spring", palette: "sage", ground: "alley", figures: "four", sky: "cream", label: "cityTop", motion: "leaves", ratio: "4:5" } },
      { file: "poster/jeonju.jpg", title: "전주 · 한옥 골목", caption: "기와지붕이 겹치면 골목이 깊어진다.", pos: "center 40%",
        preset: "jeonju", seed: { city: "JEONJU", landmark: "Gyeonggijeon shrine gate", season: "autumn", palette: "ochre", ground: "alley", figures: "couple", sky: "white", label: "cityTop", motion: "pan", ratio: "4:5" } },
      { file: "poster/jeju.jpg", title: "제주 · 돌담 해안길", caption: "돌담은 바람이 만든 글씨다.", pos: "center 40%",
        preset: "jeju", seed: { city: "JEJU", landmark: "Seongsan Ilchulbong tuff cone", season: "summer", palette: "coral", ground: "riverside", figures: "four", sky: "pale", label: "cityTop", motion: "leaves", ratio: "4:5" } },
      { file: "poster/gangneung.jpg", title: "강릉 · 소나무 호수길", caption: "겨울 호수는 조용히 도시를 품는다.", pos: "center 40%",
        preset: "gangneung", seed: { city: "GANGNEUNG", landmark: "Gyeongpodae pavilion", season: "winter", palette: "indigo", ground: "avenue", figures: "family", sky: "white", label: "cityTop", motion: "still", ratio: "4:5" } }
    ],

    /* ---------------- 프롬프트 빌더 ---------------- */
    build: {
      imageEn(ctx) {
        const season = SEASONS[ctx.get("season").id];
        const pal = PALETTES[ctx.get("palette").id];
        const ground = GROUNDS[ctx.get("ground").id];
        const figs = FIGURES[ctx.get("figures").id];
        const sky = SKIES[ctx.get("sky").id];
        const ratio = ctx.get("ratio");
        const sceneEn = ctx.scene("en");
        const city = labelText(ctx.text("city"));
        const landmark = ctx.text("landmark").trim() || "the city's best-known landmark";
        const showLabel = ctx.get("label").id === "cityTop" && city;

        const labelLine = showLabel
          ? `Lettering: set the word "${city}" in small uppercase sans-serif at the upper left, Regular or Medium weight, with restrained letter-spacing and generous clear space around it. That one word is the only lettering on the whole sheet — every other inscription, sign, plaque and shopfront stays blank.`
          : `Lettering: none at all. Keep every sign, plaque and shopfront blank; the sheet carries no words.`;

        if (ctx.brief) {
          return [
            `A decorative contemporary pen-and-ink city poster of ${city || "the city"}, ${ratio.en}, pure-white paper.`,
            `${H.cap(landmark)} dominant, plus two recognizable supporting landmarks automatically chosen for the city, united along ${ground.en}.`,
            season.canopyEn + ".",
            `Supple dark-blue pen contours, rhythmic architectural linework, gentle flattening of perspective, generous white sky. ${H.cap(pal.en)} as flat colour on 25–35% of the area, stylized botanical shapes.`,
            `${H.cap(figs.en)}.`,
            `${H.cap(sceneEn)}.`,
            showLabel ? `Small uppercase "${city}" at the upper left, and no other lettering, logos, borders, signatures or watermarks.` : `No lettering, logos, borders, signatures or watermarks.`
          ].join(" ");
        }

        return [
          `A decorative contemporary pen-and-ink city poster — a printed travel poster, drawn entirely by hand in ink on pure-white paper, not a photograph and not a 3D render.`,
          `Subject: ${city ? `the city of ${city}` : "a city"}. Make ${landmark} dominant, and automatically choose two further landmarks that people would recognize this city by, placing them as distinct supporting shapes rather than a dense skyline.`,
          `Composition: unite the three along ${ground.en}. Use an asymmetric eye-level approach, let one curved path guide the eye toward the focal entrance, and connect all buildings through one shared ground plane and a single horizontal flow. Vary height, spacing and gentle overlaps; keep each supporting silhouette clearly readable; avoid stacked skyline tiers.`,
          `Line: every form is drawn with the same supple dark-blue pen (#334C7A), a contour of 0.4–0.8 px whose weight barely changes. Draw architectural rhythm — roof tiles, window mullions, railings, stone joints — as evenly repeated linework at the same measurement. Add selective decorative patterning: dots for stone, short parallel strokes for shadow, water drawn as a few rhythmic horizontals. No wide-area cross-hatching.`,
          `Foliage: ${season.canopyEn}. Draw the leaves as decorative shapes repeated in small clusters, shrubs as soft scalloped masses, trunks and branches as clean tapering lines.`,
          `Colour: ${pal.en}. The colour is flat printing ink, laid only on 25 to 35 percent of the area — roofs, foliage, ground pattern, a few coat sleeves. No gradients, no watercolour bleed, no rendering, no highlight; colour fields are separated from one another by the ink line.`,
          `Sky and paper: ${sky.en}. The paper's edge is nowhere drawn: no border, no frame, no vignette, no paper texture.`,
          `Figures: ${figs.en}. Faces are left blank — posture and coat colour carry them. Four or fewer, small in the composition, walking along the path.`,
          `Lettering: ${showLabel ? `set the word "${city}" in small uppercase sans-serif at the upper left, Regular or Medium weight, restrained letter-spacing, ample clearance; keep every other inscription blank.` : `none at all; keep every sign and plaque blank.`}`,
          `Scene direction: ${H.cap(H.stripDot(sceneEn))}.`,
          `Mood: calm, optimistic, a little nostalgic — the poster you would buy at the city's own museum shop, printed in two or three inks.`,
          `Output: one finished poster, ${ratio.en}, high resolution, crisp ink linework, flat matte print finish.`,
          `Avoid: photography, photorealistic rendering, 3D, thick or variable outlines, large-area hatching, painterly texture, watercolour bleed, gradients, neon or oversaturated colour, stacked skyline tiers, crowded composition, distorted architecture, floating UI elements, borders, frames, logos, signatures, watermarks, and any lettering other than the single city name.`
        ].join("\n\n");
      },

      imageKo(ctx) {
        const season = SEASONS[ctx.get("season").id];
        const pal = PALETTES[ctx.get("palette").id];
        const ground = GROUNDS[ctx.get("ground").id];
        const figs = FIGURES[ctx.get("figures").id];
        const sky = SKIES[ctx.get("sky").id];
        const ratio = ctx.get("ratio");
        const sceneKo = ctx.scene("ko");
        const city = labelText(ctx.text("city"));
        const landmark = ctx.text("landmark").trim() || "그 도시에서 가장 잘 알려진 랜드마크";
        const showLabel = ctx.get("label").id === "cityTop" && city;

        const labelLine = showLabel
          ? `글자: "${city}"${H.josa(city, "을", "를")} 좌상단에 작은 대문자 산세리프, Regular 또는 Medium 굵기로, 자간을 조금 벌리고 주변에 넉넉한 여백을 두고 넣습니다. 이 한 단어 말고 다른 글자는 넣지 않습니다 — 모든 표지판·현판·간판은 비워 둡니다.`
          : `글자: 전혀 넣지 않습니다. 모든 표지판·현판·간판을 비워 두고, 종이 위에는 아무 글자도 없습니다.`;

        if (ctx.brief) {
          return [
            `순백 종이 위에 짙은 남색 펜으로 그린 현대적 장식 도시 포스터, ${city || "한 도시"}, ${ratio.ko}.`,
            `${landmark} 중심, 도시에 맞춰 자동으로 고른 보조 랜드마크 두 곳, ${ground.ko}.`,
            `${season.canopyKo}.`,
            `유연한 남색 펜선, 리듬 있는 건축 선화, 완만하게 눌러 평면화한 원근, 넉넉한 흰 하늘. ${pal.ko}을 면적의 25~35%에 플랫하게, 장식적인 보태니컬 도형.`,
            `${figs.ko}.`,
            `${sceneKo}.`,
            showLabel ? `좌상단에 작은 대문자 "${city}", 그 외 글자·로고·테두리·서명·워터마크 금지.` : `글자·로고·테두리·서명·워터마크 금지.`
          ].join(" ");
        }

        return [
          `순백 종이 위에 펜으로 그린 현대적 장식 도시 포스터 — 사진도 3D도 아닌, 손으로 그린 인쇄용 여행 포스터입니다.`,
          `주제: ${city || "그 도시"}. ${landmark}${H.josa(landmark, "을", "를")} 중심으로 크게 두고, 그 도시에서 사람들이 알아볼 만한 랜드마크 두 곳을 자동으로 골라 옆에 배치합니다. 빽빽한 스카이라인 대신 각각 또렷한 형태로 세웁니다.`,
          `구도: 셋을 ${ground.ko}로 이어 붙입니다. 눈높이의 비대칭 구도를 쓰고, 곡선길 하나가 시선을 중심 입구로 끌고 가게 합니다. 모든 건물은 하나의 공유 지면과 하나의 수평 흐름으로 연결합니다. 높이·간격·겹침을 조금씩 달리하고, 보조 실루엣은 서로 구분되게 두며, 스카이라인을 층층이 쌓지 않습니다.`,
          `선: 모든 형태를 같은 짙은 남색 펜(#334C7A) 하나로, 굵기가 거의 변하지 않는 0.4~0.8px 윤곽선으로 그립니다. 기와·창살·난간·돌 이음선 같은 건축의 리듬은 같은 치수로 반복해 그립니다. 장식적인 패턴을 절제해 더합니다 — 돌에는 점, 그림자에는 짧은 평행획, 물에는 리듬 있는 가로획 몇 줄. 넓은 면의 해칭은 넣지 않습니다.`,
          `식생: ${season.canopyKo}. 잎은 작은 무리로 반복되는 장식 도형으로, 관목은 부드러운 물결 덩어리로, 줄기와 가지는 깔끔하게 가늘어지는 선으로 그립니다.`,
          `색: ${pal.ko}. 색은 물감이 아니라 플랫한 인쇄 잉크이며, 면적의 25~35%에만 — 지붕, 잎, 바닥 패턴, 몇 벌의 코트 소매 — 얹습니다. 그라데이션도 수채 번짐도 명암 묘사도 하이라이트도 없고, 색면은 펜선으로 서로 끊깁니다.`,
          `하늘과 종이: ${sky.ko}. 종이의 경계는 어디에도 그리지 않습니다 — 테두리도 액자도 비네팅도 종이 질감도 없습니다.`,
          `인물: ${figs.ko}. 얼굴은 비워 두고 자세와 코트 색으로만 표현합니다. 네 명 이하로 작게, 길을 따라 걷게 합니다.`,
          labelLine,
          `장면 지시: ${H.stripDot(sceneKo)}.`,
          `분위기: 차분하고 밝으며 조금은 그리운 — 그 도시 미술관 상점에서 두세 가지 잉크로 찍어 팔 법한 포스터.`,
          `출력: 완성된 포스터 한 장, ${ratio.ko}, 고해상도, 또렷한 펜선, 플랫 무광 인쇄 마감.`,
          `금지: 사진, 사실적 렌더링, 3D, 두껍거나 굵기가 변하는 외곽선, 넓은 면의 해칭, 회화적 질감, 수채 번짐, 그라데이션, 형광·과채도, 스카이라인 적층, 빽빽한 구성, 왜곡된 건축, 떠 있는 UI 요소, 테두리·액자, 로고·서명·워터마크, 그리고 도시 이름 한 줄 외의 모든 글자.`
        ].join("\n\n");
      },

      motionEn(ctx) {
        const season = SEASONS[ctx.get("season").id];
        const motion = ctx.get("motion");
        const ratio = ctx.get("ratio");
        const city = labelText(ctx.text("city"));

        if (ctx.brief) {
          return [
            `6-second seamless loop at 24 fps, ${ratio.en}, the same pen-and-ink city poster animated in flat 2D on white paper.`,
            motion.id === "pan"
              ? `The whole poster slides sideways a few percent like a camera passing a printed board; the linework stays rigid.`
              : motion.id === "breathe"
                ? `An almost imperceptible 2% push-in while one pedestrian takes a single step.`
                : motion.id === "still"
                  ? `The poster stays completely still, like a print on a wall.`
                  : `Locked camera; only the foliage stirs and a few leaves drift across the white sky.`,
            `Ink lines, flat fills and the white paper never shift or flicker. First and last frame identical.`,
            city ? `The only lettering is the city name already in the artwork; no other text, no watermark.` : `No text, no watermark.`
          ].join(" ");
        }

        return [
          `Animate the still poster into a 6-second seamless loop at 24 fps — flat 2D motion applied to a printed ink drawing on white paper, never a 3D camera move and never a morph.`,
          motion.id === "pan"
            ? `Camera: the whole sheet slides sideways by about 4 percent of the frame width across the loop, perfectly even, as if a camera were gliding past a poster fixed to a wall. Nothing inside the drawing moves independently except a few leaves.`
            : motion.id === "breathe"
              ? `Camera: an extremely slow push-in of about two percent over the whole loop, with no zoom snap and no drift off centre.`
              : `Camera: completely locked. No pan, no tilt, no zoom, no parallax, no focus change.`,
          motion.id === "still"
            ? `Movement: the drawing holds still like a print on a wall — at most a pressure shift of half a pixel in the ink, like paper breathing in a frame.`
            : `Movement: ${season.canopyEn} — the foliage stirs by one or two pixels in a slow wave, and three to eight leaves or petals drift down across the white sky, each turning slowly and landing or leaving the frame without a bounce.${motion.id === "breathe" ? " One pedestrian takes a single unhurried step." : ""}`,
          `Figures and architecture: the buildings, railings, paths and people stay rigid — no line boil beyond half a pixel, no flicker in the ink.`,
          `Colour: the flat fills do not brighten, shift hue or bleed, and the white paper stays exactly #FFFFFF in every frame so the poster never looks lit.`,
          `Loop: the leaf drifts and the ground movement are timed to whole numbers inside six seconds; the last frame is identical to the first and the loop restarts invisibly. No fade, no title card, no logo, no sound.`,
          `Guardrails: no 3D, no lighting change, no shadows moving, no camera shake, no speed ramps, no new elements, and no added text beyond the single city name already drawn.`
        ].join("\n\n");
      },

      motionKo(ctx) {
        const season = SEASONS[ctx.get("season").id];
        const motion = ctx.get("motion");
        const ratio = ctx.get("ratio");
        const city = labelText(ctx.text("city"));

        if (ctx.brief) {
          return [
            `${ratio.ko}, 6초 무한 반복, 24fps. 같은 펜 선화 도시 포스터를 흰 종이 위 평면 2D로.`,
            motion.id === "pan"
              ? `포스터 전체가 인쇄판 앞을 지나가는 카메라처럼 몇 퍼센트 옆으로 흐르고, 선화는 단단히 고정됩니다.`
              : motion.id === "breathe"
                ? `거의 느껴지지 않는 2퍼센트 푸시인, 행인 하나가 한 걸음 딛는 동안.`
                : motion.id === "still"
                  ? `벽에 걸린 인쇄물처럼 완전히 고정됩니다.`
                  : `카메라 고정, 수관만 흔들리고 잎 몇 장이 흰 하늘을 가로질러 내려옵니다.`,
            `펜선·플랫 채색·흰 종이는 흔들리거나 깜빡이지 않습니다. 첫 프레임과 마지막 프레임 동일.`,
            city ? `글자는 그림 안의 도시 이름 하나뿐, 그 외 텍스트와 워터마크는 없습니다.` : `글자·워터마크 없음.`
          ].join(" ");
        }

        return [
          `정지 포스터를 6초 무한 반복 영상으로 만듭니다. 24fps, 흰 종이 위 펜 인쇄물에 평면 2D 움직임만 얹으며, 3D 카메라 이동도 모핑도 아닙니다.`,
          motion.id === "pan"
            ? `카메라: 루프 전체에서 종이가 화면 폭의 약 4퍼센트만큼 고르게 옆으로 흐릅니다. 벽에 붙은 포스터 앞을 카메라가 지나가는 것처럼 완전히 일정하게. 그림 안에서는 잎 몇 장만 따로 움직입니다.`
            : motion.id === "breathe"
              ? `카메라: 루프 전체에서 약 2퍼센트의 아주 느린 푸시인. 줌이 튀지 않고 중심에서 벗어나지도 않습니다.`
              : `카메라: 완전 고정. 팬·틸트·줌·시차 이동·포커스 변화 없음.`,
          motion.id === "still"
            ? `움직임: 벽에 걸린 인쇄물처럼 그림이 멈춰 있습니다. 액자 속 종이가 숨 쉬듯 잉크가 반 픽셀 이내로 아주 미세하게 흔들리는 정도.`
            : `움직임: ${season.canopyKo} — 수관이 1~2px의 느린 파동으로 흔들리고, 잎·꽃잎 서너 장에서 여덟 장이 흰 하늘을 가로질러 내려옵니다. 각각 천천히 돌며 튀지 않고 바닥에 닿거나 화면 밖으로 나갑니다.${motion.id === "breathe" ? " 행인 하나가 서두르지 않고 한 걸음 딛습니다." : ""}`,
          `인물과 건축: 건물·난간·길·사람은 단단히 고정됩니다. 선이 반 픽셀 넘게 끓거나 잉크가 깜빡이지 않습니다.`,
          `색: 플랫 채색은 밝아지거나 색상이 변하거나 번지지 않고, 흰 종이는 모든 프레임에서 정확히 #FFFFFF — 포스터에 조명이 비치는 느낌이 없습니다.`,
          `루프: 낙엽의 흐름과 지면의 움직임이 6초 안에 정수로 들어가 마지막 프레임이 첫 프레임과 같고, 반복이 보이지 않습니다. 페이드·타이틀 카드·로고·소리는 없습니다.`,
          `가드레일: 3D·조명 변화·그림자 이동·카메라 흔들림·속도 램프·새 요소·추가 글자를 금지합니다. 이미 그려진 도시 이름 한 줄 외에는 아무 글자도 넣지 않습니다.`
        ].join("\n\n");
      }
    },

    randomize(ctx) {
      const p = PRESETS[Math.floor(Math.random() * PRESETS.length)];
      const pick = (obj) => Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];
      return {
        preset: p.id,
        seed: Object.assign({}, p.seed, {
          palette: pick(PALETTES),
          figures: pick(FIGURES),
          sky: pick(SKIES),
          ratio: ["4:5", "4:5", "9:16", "16:9", "1:1"][Math.floor(Math.random() * 5)]
        }),
        caption: p.captions ? p.captions[Math.floor(Math.random() * p.captions.length)] : p.caption
      };
    }
  });
})();
