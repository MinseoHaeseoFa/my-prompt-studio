/* ============================================================
   My Prompt Studio · data/zen.js
   ④ ZEN — 라인 아트 풍경형 (가는 먹선 · 은행잎 노랑)
   @zen.ai.kr(@Dhruv의 line-art-animation 스킬) 24초 은행나무길
   영상의 화면 언어를 분석해, 이미지/영상 × 영어/한국어 4종
   프롬프트로 다시 엮은 모듈. 날짜·서명·@핸들 워터마크는 금지.
   ============================================================ */

(function () {
  const H = MPS.helpers;

  /* ---------- 잎 (계절 · 색) ---------- */
  const FOLIAGE = {
    ginkgo: {
      label: "은행잎",
      hex: "#F3B70E",
      en: "a dense canopy of small fan-shaped ginkgo leaves",
      ko: "작은 부채꼴 은행잎이 빽빽하게 달린 수관",
      leafEn: "fan-shaped ginkgo leaf",
      leafPl: "ginkgo leaves",
      leafKo: "은행잎",
      toneEn: "golden yellow #F3B70E with warmer mustard #E09C15 and pale lemon #F8D45C mixed in clusters",
      toneKo: "금노랑 #F3B70E, 진한 머스터드 #E09C15, 옅은 레몬 #F8D45C가 무리마다 섞인",
      fallEn: "a wide carpet of fallen yellow ginkgo fans covering the ground",
      fallKo: "바닥을 가득 덮은 노란 은행잎 카펫"
    },
    maple: {
      label: "단풍",
      hex: "#D6412C",
      en: "a dense canopy of small five-pointed maple leaves",
      ko: "작은 다섯 갈래 단풍잎이 빽빽하게 달린 수관",
      leafEn: "five-pointed maple leaf",
      leafPl: "maple leaves",
      leafKo: "단풍잎",
      toneEn: "crimson #D6412C with coral #E4644B and deep brick #B8341F in clusters",
      toneKo: "진홍 #D6412C, 산호빛 #E4644B, 깊은 벽돌색 #B8341F가 무리마다 섞인",
      fallEn: "scattered fallen red maple leaves across the pale path",
      fallKo: "옅은 길 위에 흩어진 붉은 단풍잎"
    },
    cherry: {
      label: "벚꽃",
      hex: "#F4C2CE",
      en: "a dense canopy of soft cherry blossom clusters",
      ko: "연분홍 벚꽃 송이가 빽빽하게 달린 수관",
      leafEn: "cherry blossom petal",
      leafPl: "cherry petals",
      leafKo: "벚꽃잎",
      toneEn: "pale rose #F4C2CE with blush #FBE3E8 and warm white, petals in loose clusters",
      toneKo: "연분홍 #F4C2CE, 볼 터치 같은 분홍 #FBE3E8, 따뜻한 흰색이 느슨한 송이로 겹친",
      fallEn: "a soft drift of fallen petals on the paving stones",
      fallKo: "돌바닥 위에 부드럽게 쌓인 꽃잎"
    },
    green: {
      label: "초록 잎",
      hex: "#8FBF6B",
      en: "a dense canopy of small oval summer leaves",
      ko: "작은 타원형 여름잎이 빽빽하게 달린 수관",
      leafEn: "small oval leaf",
      leafPl: "green leaves",
      leafKo: "초록 잎",
      toneEn: "fresh green #8FBF6B with pale yellow-green #A9CF87 and deeper #6C9E52 in clusters",
      toneKo: "싱그러운 초록 #8FBF6B, 옅은 연둣빛 #A9CF87, 깊은 초록 #6C9E52가 무리마다 섞인",
      fallEn: "a few single leaves resting on the paving stones",
      fallKo: "돌바닥 위에 드문드문 놓인 잎 몇 장"
    },
    snow: {
      label: "눈 앉은 가지",
      hex: "#D7E3EC",
      en: "bare winter branches, each dusted with a thin line of snow along its top edge",
      ko: "앙상한 겨울 가지, 가지 위쪽 가장자리마다 얇게 눈이 앉은",
      leafEn: "snowflake",
      leafPl: "snowflakes",
      leafKo: "눈송이",
      toneEn: "soft white and pale blue-grey #D7E3EC, only where the snow rests",
      toneKo: "부드러운 흰색과 옅은 청회색 #D7E3EC, 눈이 앉은 곳에만",
      fallEn: "a thin layer of snow on the roof tiles, the wall coping and the stones",
      fallKo: "기와와 담장 위, 돌바닥에 얇게 앉은 눈"
    },
    bare: {
      label: "잎 없는 가지만",
      hex: "#C9BFAE",
      en: "bare slender branches and twigs with no leaves at all",
      ko: "잎이라고는 하나도 없는 가느다란 겨울 가지와 잔가지",
      leafEn: "single dry leaf",
      leafPl: "dry leaves",
      leafKo: "마른 잎",
      toneEn: "no colour in the trees at all — ink lines only",
      toneKo: "나무에는 색이 전혀 없이 먹선만",
      fallEn: "a bare pale path, one or two dry leaves on the stones",
      fallKo: "아무것도 덮이지 않은 옅은 길, 돌 위에 마른 잎 한두 장"
    }
  };

  /* ---------- 장소 (중간 구조물) ---------- */
  const PLACES = {
    palace: {
      label: "궁궐 담장길",
      en: "a low Korean palace stone wall of regular flat blocks running across the middle of the frame, a tiled hanok gate roof rising behind it, one thin line of distant hills to the left",
      ko: "화면 중간을 가로지르는, 네모난 돌이 규칙적으로 쌓인 낮은 궁궐 담장. 그 뒤로 기와를 얹은 한옥 대문 지붕이 솟고, 왼쪽 멀리 산 능선 한 줄",
      propEn: "one slim cast-iron street lamp with a small lantern head and one thin bench against the wall",
      propKo: "가느다란 주철 가로등 하나와 담장에 붙은 얇은 벤치 하나",
      propKo2: "가로등 하나와 얇은 벤치 하나"
    },
    hanok: {
      label: "한옥 골목",
      en: "a narrow hanok alley: low tiled roof eaves stepping down both sides, one stone-block wall on the right, a slim utility pole and a round street lamp, the lane narrowing to a lit opening far ahead",
      ko: "양옆으로 낮은 기와 처마가 계단처럼 이어지고, 오른쪽에 돌담, 가느다란 전신주와 둥근 가로등이 선 좁은 한옥 골목. 길은 멀리 밝은 틈으로 좁아집니다",
      propEn: "a stone step at the left door, one paper screen window, one bicycle leaning on the wall",
      propKo: "왼쪽 문가의 돌계단, 한 장의 창호지 창, 담장에 기대 둔 자전거 하나",
      propKo2: "돌계단과 자전거 하나"
    },
    riverside: {
      label: "강변 산책로",
      en: "a riverside promenade: a thin iron railing on the right, a low stone embankment below it, one simple bridge arch far in the distance and a single line for the far bank",
      ko: "오른쪽으로 가느다란 철제 난간이 이어지고, 그 아래 낮은 돌 제방, 멀리 다리 아치 하나와 건너편 강둑을 나타내는 선 하나가 있는 강변 산책로",
      propEn: "two short lamp posts on the railing and one long bench facing the water",
      propKo: "난간 위의 짧은 가로등 두 개와 강을 마주한 긴 벤치 하나",
      propKo2: "가로등 두 개와 긴 벤치 하나"
    },
    campus: {
      label: "캠퍼스 가로수길",
      en: "a wide campus walkway: a low brick building with regularly spaced windows behind the trees, one thin line of hills beyond it, a bicycle rack and a bench at the edge of the path",
      ko: "나무 뒤로 규칙적인 창이 늘어선 낮은 벽돌 건물, 그 너머 산 능선 한 줄, 길 가장자리에 자전거 거치대와 벤치가 있는 넓은 캠퍼스 가로수길",
      propEn: "a bicycle rack of three hoops and one slatted bench",
      propKo: "고리 세 개짜리 자전거 거치대와 판자 벤치 하나",
      propKo2: "자전거 거치대와 벤치"
    },
    park: {
      label: "공원 산책길",
      en: "a city park path: a low clipped hedge line on both sides, one round pond with a thin stone rim, two benches and, far off, a simple swing frame",
      ko: "양옆으로 낮게 다듬은 생울타리, 얇은 돌 테두리의 둥근 연못, 벤치 두 개, 멀리 그네틀 하나가 있는 도시 공원 산책길",
      propEn: "a round pond, two benches and a single swing frame in the distance",
      propKo: "둥근 연못과 벤치 두 개, 먼 곳의 그네틀",
      propKo2: "연못과 벤치"
    },
    courtyard: {
      label: "한옥 마당",
      en: "a small hanok courtyard: one long wall on the left, a wooden door frame, a low stone step and a paper lantern hanging under the eave, the yard opening to a thin line of rooftops",
      ko: "왼쪽으로 긴 담장 하나, 나무 문틀, 낮은 돌계단, 처마 아래 매달린 종이 등불이 있고, 마당 끝으로 기와지붕 선이 이어지는 작은 한옥 마당",
      propEn: "a paper lantern under the eave and a single clay pot by the step",
      propKo: "처마 아래 종이 등불 하나와 계단 옆의 작은 질그릇",
      propKo2: "등불과 질그릇"
    }
  };

  /* ---------- 인물 ---------- */
  const FIGURES = {
    dog: {
      label: "강아지와 산책",
      en: "one small figure walking a small dog on a thin leash, the dog trotting two steps ahead with its tail up, and one more walker far down the path",
      ko: "가는 목줄로 작은 강아지를 데리고 걷는 작은 인물 하나, 강아지는 꼬리를 세우고 두 걸음 앞서 종종걸음, 길 멀리 또 한 사람",
      short: "one walker with a small dog on a leash"
    },
    pair: {
      label: "나란히 두 사람",
      en: "two small figures walking side by side, one a little taller, their steps falling in the same rhythm",
      ko: "나란히 걷는 작은 인물 둘, 한 사람이 조금 크고, 걸음이 같은 리듬으로 떨어지는",
      short: "two walkers side by side"
    },
    solo: {
      label: "혼자 걷는 사람",
      en: "one small figure walking alone with both hands in its coat pockets, and a second figure standing still far off",
      ko: "코트 주머니에 두 손을 넣고 혼자 걷는 작은 인물 하나, 멀리 서 있는 또 한 사람",
      short: "one lone walker"
    },
    family: {
      label: "아이와 어른",
      en: "one adult and one child holding hands, the child about half the adult's height, taking two steps to every one",
      ko: "손을 잡은 어른 하나와 아이 하나, 아이는 어른의 절반 키로 한 걸음마다 두 걸음",
      short: "an adult and a child holding hands"
    },
    none: {
      label: "사람 없음",
      en: "no people at all — the path stays empty and the scene belongs to the trees",
      ko: "사람은 한 명도 없이 길이 비어 있고, 장면 전체가 나무의 것",
      short: "no people, an empty path"
    }
  };

  /* ---------- 움직임 ---------- */
  const MOTIONS = {
    drift: {
      label: "낙엽 흩날림",
      note: "잎만 천천히 흔들리고 떨어짐",
      en: "the leaves do the moving — the canopy sways and single leaves are released and fall",
      ko: "잎이 움직임을 맡습니다 — 수관이 흔들리고 잎이 하나씩 떨어집니다"
    },
    walk: {
      label: "걷기",
      note: "발이 미끄러지지 않는 보행",
      en: "the figures walk along the path at an even, unhurried pace",
      ko: "인물이 길을 따라 고르고 서두르지 않는 걸음으로 걷습니다"
    },
    look: {
      label: "멈춰 올려다봄",
      note: "걷다가 멈춰 수관을 봄",
      en: "the figures slow down, stop and lift their faces to the canopy",
      ko: "인물이 속도를 줄여 멈추고 수관을 올려다봅니다"
    },
    still: {
      label: "정지",
      note: "사람도 카메라도 거의 정지",
      en: "nothing travels — the frame holds still and only the air moves",
      ko: "지나가는 것 없이 화면이 멈춰 있고 공기만 움직입니다"
    }
  };

  const AIRS = {
    many: {
      label: "많이 흩날림",
      en: "a steady fall of twenty to thirty {} through the frame at different depths",
      ko: "스무에서 서른 개의 {}: 앞뒤 깊이를 달리해 화면을 가로질러 내려옵니다"
    },
    some: {
      label: "조금 흩날림",
      en: "six to ten {} drifting down, now and then",
      ko: "여섯에서 열 개의 {}: 이따금 화면을 가로질러 내려옵니다"
    },
    none: {
      label: "떨어지는 것 없음",
      en: "completely still air, nothing falling",
      ko: "아무것도 떨어지지 않는 정지된 공기"
    }
  };

  const LIGHTS = {
    afternoon: { label: "맑은 오후", en: "clear late afternoon; the paper stays warm ivory and no cast shadow falls anywhere", ko: "맑은 늦은 오후. 종이는 따뜻한 아이보리 그대로이고 어디에도 그림자가 지지 않습니다" },
    morning: { label: "이른 아침", en: "early morning light; the top of the paper cools very slightly toward pale blue", ko: "이른 아침 빛. 종이 위쪽이 아주 살짝 옅은 푸른빛으로 식습니다" },
    dusk: { label: "해 질 무렵", en: "dusk; the ivory paper warms to a faint peach and the ink stays black", ko: "해 질 무렵. 아이보리 종이가 옅은 살구빛으로 따뜻해지고 먹선은 검은 채로 남습니다" },
    overcast: { label: "흐린 날", en: "flat overcast light, no tint at all, the paper reading as slightly grey cream", ko: "평평한 흐린 빛, 색 기운 없이 종이가 조금 회끼 도는 크림색으로 읽힙니다" },
    snowlight: { label: "눈 내리는 빛", en: "snow light; the paper cools to pale blue-grey and everything goes quiet", ko: "눈 내리는 날의 빛. 종이가 옅은 청회색으로 식고 모든 것이 조용해집니다" }
  };

  /* 낙하 입자 문구의 {} 자리에 그 계절의 잎 이름을 넣습니다 */
  const fillAir = (tpl, word) => tpl.replace("{}", word);

  /* ---------- 프리셋 ---------- */
  const PRESETS = [
    {
      id: "ginkgo-palace",
      emoji: "🍂",
      label: "은행나무 궁 담장길",
      thumb: "zen/ginkgo-palace.jpg",
      thumbPos: "center 62%",
      caption: "가을은 담장 밖에서 먼저 온다.",
      captions: ["가을은 담장 밖에서 먼저 온다.", "노란 잎이 길을 먼저 밝힌다.", "한 해가 여기서 노랗게 익는다."],
      scene: {
        en: "two tall ginkgo trees at the left and right edges send their canopies out until they almost meet overhead, filling the upper half of the frame; a walker with a small dog crosses the leaf carpet below the palace wall",
        ko: "좌우 가장자리의 큰 은행나무 두 그루가 수관을 뻗어 머리 위에서 거의 만나며 화면 위 절반을 채우고, 담장 아래 낙엽 카펫 위로 강아지를 데리고 걷는 사람이 지나갑니다"
      },
      seed: { place: "palace", foliage: "ginkgo", figures: "dog", motion: "drift", air: "some", light: "afternoon", ratio: "9:16" }
    },
    {
      id: "cherry-hanok",
      emoji: "🌸",
      label: "벚꽃 한옥 골목",
      thumb: "zen/cherry-hanok.jpg",
      thumbPos: "center 58%",
      caption: "꽃잎이 길을 대신 밟아 준다.",
      captions: ["꽃잎이 길을 대신 밟아 준다.", "봄은 골목 끝에서 먼저 피었다.", "돌 위에 내려앉은 분홍."],
      scene: {
        en: "two cherry trees arch over a hanok alley, their blossom canopies meeting at the top of the frame while single petals drift down onto the paving stones; two figures walk away from the viewer side by side",
        ko: "한옥 골목 위로 벚나무 두 그루가 아치를 만들며 수관이 화면 위에서 만나고, 꽃잎 한 장씩 돌바닥으로 내려앉습니다. 두 사람이 나란히 걸어갑니다"
      },
      seed: { place: "hanok", foliage: "cherry", figures: "pair", motion: "walk", air: "many", light: "overcast", ratio: "9:16" }
    },
    {
      id: "maple-river",
      emoji: "🍁",
      label: "강변 단풍길",
      thumb: "zen/maple-river.jpg",
      thumbPos: "center 60%",
      caption: "붉은 잎이 강물보다 먼저 흐른다.",
      captions: ["붉은 잎이 강물보다 먼저 흐른다.", "난간을 따라 가을이 흐른다.", "강은 조용하고 잎은 시끄럽다."],
      scene: {
        en: "two crimson maples lean over a riverside promenade, their canopies covering the upper half while red leaves fall past the iron railing; one walker follows a small dog along the water",
        ko: "진홍 단풍나무 두 그루가 강변 산책로 위로 기울어 화면 위 절반을 덮고, 붉은 잎이 철제 난간 옆으로 떨어집니다. 강을 따라 사람 하나가 강아지를 데리고 걷습니다"
      },
      seed: { place: "riverside", foliage: "maple", figures: "dog", motion: "drift", air: "some", light: "dusk", ratio: "16:9" }
    },
    {
      id: "snow-hanok",
      emoji: "❄️",
      label: "첫눈 한옥길",
      thumb: "zen/snow-hanok.jpg",
      thumbPos: "center 58%",
      caption: "눈은 소리 없이 길을 새로 쓴다.",
      captions: ["눈은 소리 없이 길을 새로 쓴다.", "아직 아무도 밟지 않은 아침.", "가지마다 겨울이 앉았다."],
      scene: {
        en: "snow rests in thin lines on the roof tiles and the bare branches above a hanok alley; an adult and a child walk hand in hand down the untouched lane while the snow keeps falling",
        ko: "한옥 골목 위 기와와 앙상한 가지마다 눈이 얇게 앉아 있고, 아직 아무도 밟지 않은 길을 어른과 아이가 손을 잡고 걸어갑니다"
      },
      seed: { place: "hanok", foliage: "snow", figures: "family", motion: "walk", air: "many", light: "snowlight", ratio: "9:16" }
    },
    {
      id: "green-campus",
      emoji: "🌿",
      label: "여름 캠퍼스 가로수길",
      thumb: "zen/green-campus.jpg",
      thumbPos: "center 58%",
      caption: "그늘의 길이가 여름의 길이다.",
      captions: ["그늘의 길이가 여름의 길이다.", "가로수가 하루를 시원하게 만든다.", "걷기만 해도 여름이 지나간다."],
      scene: {
        en: "two rows of zelkova trees arch over a wide campus walkway, their green canopies closing at the top; students drift along the path, one pushing a bicycle, small patches of light on the stones",
        ko: "넓은 캠퍼스 가로수길 위로 느티나무 두 줄이 아치를 만들며 초록 수관이 위에서 닫히고, 학생들이 길을 따라 흩어져 걷습니다. 한 사람은 자전거를 끌고, 돌바닥에는 작은 빛 조각"
      },
      seed: { place: "campus", foliage: "green", figures: "solo", motion: "walk", air: "some", light: "afternoon", ratio: "9:16" }
    },
    {
      id: "courtyard-dusk",
      emoji: "🏮",
      label: "해 질 무렵의 마당",
      thumb: "zen/courtyard-dusk.jpg",
      thumbPos: "center 60%",
      caption: "해가 지면 선만 남는다.",
      captions: ["해가 지면 선만 남는다.", "등불 하나로 저녁이 시작된다.", "아무 일도 없는 마당이 제일 좋다."],
      scene: {
        en: "an empty hanok courtyard at dusk, one paper lantern hanging under the eave, a single clay pot by the stone step and a bare branch reaching in from the right, no people at all",
        ko: "해 질 무렵의 빈 한옥 마당. 처마 아래 종이 등불 하나, 돌계단 옆 질그릇 하나, 오른쪽에서 안으로 뻗은 앙상한 가지. 사람은 없습니다"
      },
      seed: { place: "courtyard", foliage: "bare", figures: "none", motion: "still", air: "some", light: "dusk", ratio: "4:5" }
    },
    {
      /* 굵은 먹붓 변형 — 가는 먹선 풍경과 같은 탭 안에 두는 손그림 인물 장면.
         bold: true 이면 below의 BOLD 빌더가 4종 프롬프트를 대신 씁니다. */
      id: "craft-kitchen",
      emoji: "🐟",
      label: "굵은 먹붓 · 생선 손질",
      thumb: "zen/kitchen-craft.jpg",
      thumbPos: "center 40%",
      caption: "손끝에서 저녁이 준비된다.",
      captions: ["손끝에서 저녁이 준비된다.", "칼 한 번에 하루가 정리된다.", "불 앞에 선 사람은 말이 없다."],
      bold: true,
      scene: {
        en: "a stout middle-aged cook in a flat cap and a heavy apron leans over a thick wooden cutting board, a short knife in his hand filleting one whole fish; a plain tiled wall of thin lines rises behind him, one round wood-fired oven with a dark mouth stands at the left, a steel bowl and a bunch of scallions sit at the counter edge, his sleeves rolled to the elbow and his eyes on the blade",
        ko: "납작모자에 두툼한 앞치마를 두른 중년의 요리사가 두꺼운 나무 도마 위로 몸을 숙여 짧은 칼로 생선 한 마리를 손질합니다. 뒤로는 가는 선으로 그린 타일 벽, 왼쪽에는 어두운 아궁이가 있는 둥근 화덕, 카운터 끝에는 놋그릇과 쪽파 한 단. 소매는 팔꿈치까지 걷어 올리고 눈은 칼날에 고정되어 있습니다"
      },
      seed: { motion: "still", light: "overcast", ratio: "4:5" }
    },
  ];

  /* 굵은 먹붓 변형 전용 빛 — 종이 색을 말하지 않고 대비만 말합니다 */
  const BOLD_LIGHTS = {
    afternoon: {
      en: "clear afternoon light, high contrast held by the ink alone, shadows crisp and whites left pure",
      ko: "맑은 오후 빛, 대비는 오직 먹이 만듭니다 — 그림자는 또렷하고 흰 곳은 순백"
    },
    morning: {
      en: "early morning light, a cool crisp contrast with sharp-edged shadows and clean white paper",
      ko: "이른 아침 빛, 서늘하고 또렷한 대비, 날카로운 그림자와 깨끗한 흰 종이"
    },
    dusk: {
      en: "late dusk, contrast pulled a little lower, the hatch shadows wide and soft while the whites stay clean",
      ko: "해 질 무렵, 대비를 조금 낮춰 해칭 그림자는 넓고 부드럽게, 흰 곳은 깨끗하게"
    },
    overcast: {
      en: "flat overcast light where the ink alone carries the contrast — no graded shadow, no grey tone",
      ko: "평평한 흐린 빛, 대비를 먹이 혼자 떠받칩니다 — 농담진 그림자도 회색 톤도 없이"
    },
    snowlight: {
      en: "snow light, cold and clean, the darker masses reading almost black against pure white",
      ko: "눈 내리는 빛, 차갑고 깨끗하게, 짙은 덩어리가 순백 위에서 거의 검정으로 읽히는"
    }
  };

  /* ---------- 굵은 먹붓 변형 (bold: true 프리셋 전용) ----------
     가는 먹선 · 아이보리 종이 대신, 순백 종이 위 굵고 균일한 검정 윤곽과
     교차 해칭으로 그린 손그림 인물 장면. 장소·잎·인물 칩은 쓰지 않고
     장면 · 빛 · 움직임 · 비율만으로 조립합니다. */
  const BOLD = {
    imageEn(ctx) {
      const light = BOLD_LIGHTS[ctx.get("light").id] || BOLD_LIGHTS.overcast;
      const ratio = ctx.get("ratio");
      const sceneEn = ctx.scene("en");

      if (ctx.brief) {
        return [
          `Hand-drawn black-and-white ink illustration on plain white paper, ${ratio.en}.`,
          `Thick even black contour lines (4–7 px), solid black masses, two-direction cross-hatching in the cloth and short parallel hatch in the shadows; everything else untouched white.`,
          `${H.cap(sceneEn)}.`,
          `Eye level, subject in the lower two thirds, high contrast, flat 2D, no colour, no grey tone, no text.`
        ].join(" ");
      }

      return [
        `A hand-drawn black-and-white ink illustration — a bold brush-pen drawing on plain white paper, with the weight of a printed comic panel or a woodcut. Not a photograph, not a digital painting, not a 3D render, not a pencil sketch.`,
        `Canvas: plain white paper (#FFFFFF) filling the whole frame, ${ratio.en}. Even and clean: no paper texture, no grey wash, no vignette, no border, no frame, no page edge, no drop shadow.`,
        `Ink: one black ink (#111111) and nothing else. Contours are thick, confident and of nearly even weight — 4 to 7 px at this scale — with the small rounded wobble of a line drawn by hand, never a perfect vector curve. Closing every shape so the drawing reads instantly, even from across the room.`,
        `Shading: three tools only. First, solid black masses — the cap, the apron, the hair, the dark mouth of the oven. Second, cross-hatching in two directions for the folds of cloth and the roundness of a forearm. Third, short parallel hatch lines for the shadow under the cutting board and along the counter edge. Everything else stays untouched white. No mid-grey tone, no ink wash, no airbrush, no gradient, no stipple, no halftone dots.`,
        `Scene: ${H.cap(sceneEn)}.`,
        `Figures: the person is drawn at natural, sturdy proportions — never chibi — with a face built from a few decisive lines: heavy brows, a moustache or a firm mouth, one line for the nose, a dot and a crescent for the eyes looking down at the work. Hands are large and simple, with each finger a single stroke.`,
        `Composition: eye level, close enough that the hands and the fish fill the middle of the frame; the subject occupies the lower two thirds and the upper third stays white or almost white. Objects sit on one clear ground line; nothing floats.`,
        `Light: ${light.en}. In practice this means the strongest black goes where the light does not reach, and one long hatch shadow anchors the subject to the surface it stands on.`,
        `Mood: warm, a little humorous, and full of the craft of the hands — the panel of a story where someone has done this work for thirty years.`,
        `Output: one still illustration, ${ratio.en}, crisp black ink on clean white, flat matte, no texture overlay.`,
        `Avoid: colour of any kind, grey tones, pencil or charcoal lines, watercolour, ink wash, etching-fine hatching over the entire surface, photo realism, 3D, CGI, anime eyes, chibi proportions, gradients, cast shadows in grey, halftone, paper grain, frames, and any lettering, caption, date, signature, watermark, logo or social handle anywhere in the image.`
      ].join("\n\n");
    },

    imageKo(ctx) {
      const light = BOLD_LIGHTS[ctx.get("light").id] || BOLD_LIGHTS.overcast;
      const ratio = ctx.get("ratio");
      const sceneKo = ctx.scene("ko");

      if (ctx.brief) {
        return [
          `순백 종이 위에 굵은 검정 먹으로 그린 손그림 흑백 일러스트, ${ratio.ko}.`,
          `4~7px 균일한 굵은 윤곽, 검은 면, 옷주름 교차 해칭과 그림자 짧은 평행획, 나머지는 순백.`,
          `${sceneKo}.`,
          `눈높이, 인물은 아래 2/3, 고대비, 평면 2D, 색·회색 톤·글자 없음.`
        ].join(" ");
      }

      return [
        `순백 종이 위에 굵은 붓펜으로 그린 흑백 먹 일러스트 — 인쇄된 만화 한 칸이나 목판화의 무게를 가진 손그림. 사진도, 디지털 페인팅도, 3D 렌더도, 연필 스케치도 아닙니다.`,
        `캔버스: 순백 종이(#FFFFFF)가 화면 전체를 채웁니다. ${ratio.ko}. 고르고 깨끗하게 — 종이 질감 없음, 회색 번짐 없음, 비네팅 없음, 테두리·액자·페이지 가장자리·드롭섀도 없음.`,
        `먹: 한 가지 검정(#111111)뿐입니다. 윤곽은 굵고 자신 있으며 굵기가 거의 변하지 않는 4~7px — 손으로 그은 선의 작고 둥근 떨림은 있되, 완벽한 벡터 곡선은 아닙니다. 모든 형태가 닫혀 있어 멀리서도 한눈에 읽힙니다.`,
        `명암: 세 가지 도구만 씁니다. 첫째, 검은 면 — 모자, 앞치마, 머리카락, 화덕의 어두운 아궁이. 둘째, 옷주름과 팔뚝의 둥근 면을 위한 두 방향 교차 해칭. 셋째, 도마 아래와 카운터 가장자리 그림자를 위한 짧은 평행획. 나머지는 손대지 않은 흰색으로 남깁니다. 중간 회색 톤, 먹 번짐, 에어브러시, 그라데이션, 점묘, 하프톤 점 모두 없습니다.`,
        `장면: ${sceneKo}.`,
        `인물: 자연스럽고 다부진 비례 — 절대 치비가 아닙니다. 얼굴은 몇 개의 단호한 선으로 만듭니다: 두꺼운 눈썹, 콧수염이나 굳은 입, 코는 선 하나, 눈은 일하는 손끝을 내려다보는 점과 초승달 하나. 손은 크고 단순하게, 손가락마다 획 하나씩.`,
        `구도: 눈높이, 손과 생선이 화면 가운데를 채울 만큼 가까이. 인물은 아래 2/3를 차지하고 위 1/3은 흰색이거나 거의 흰색입니다. 물건은 하나의 분명한 지면선 위에 놓이고, 떠 있는 것은 없습니다.`,
        `빛: ${light.ko}. 실제로는 빛이 닿지 않는 곳에 가장 진한 검정이 들어가고, 긴 해칭 그림자 하나가 인물을 딛고 선 면에 고정시킵니다.`,
        `분위기: 따뜻하고 조금 익살스러우며 손의 솜씨가 가득한 — 이 일을 삼십 년 해 온 사람의 이야기 한 칸.`,
        `출력: 정지 일러스트 한 장, ${ratio.ko}, 순백 위의 또렷한 검정 먹, 평면 무광, 질감 오버레이 없음.`,
        `금지: 어떤 색이든, 회색 톤, 연필·목탄선, 수채, 먹 번짐, 화면 전체를 덮는 판화식 잔해칭, 사실적 사진, 3D, CGI, 애니메이션 눈, 치비 비례, 그라데이션, 회색으로 드리운 그림자, 하프톤, 종이 그레인, 액자, 그리고 화면 어디에도 글자·캡션·날짜·서명·워터마크·로고·@계정명.`
      ].join("\n\n");
    },

    motionEn(ctx) {
      const motion = ctx.get("motion");
      const ratio = ctx.get("ratio");
      const still = motion.id === "still";

      if (ctx.brief) {
        return [
          `${ratio.en}, 6-second seamless loop at 24 fps, camera locked: the same bold black-ink drawing animated in flat 2D.`,
          still ? `Almost nothing moves; the frame holds like a printed panel.` : `The knife hand completes one slow stroke and a thin ribbon of smoke curls out of the oven mouth.`,
          `Ink lines, black masses and white paper never boil or flicker. First and last frame identical. No text, no watermark.`
        ].join(" ");
      }

      return [
        `Animate the bold ink drawing into a 6-second seamless loop at 24 fps — flat 2D line animation on clean white paper, never a 3D move and never a morph.`,
        `Camera: completely locked. No pan, no tilt, no zoom, no push-in, no parallax, no handheld shake, no focus change. The frame keeps the same crop from the first second to the last.`,
        still
          ? `Movement: the drawing holds like a printed panel. At most the ink breathes by half a pixel, and one thin ribbon of smoke from the oven mouth drifts upward and thins out over the six seconds.`
          : `Movement: one single, unhurried knife stroke — the blade travels forward two centimetres and stops, the wrist and forearm following on a two-frame delay — while one thin ribbon of smoke from the oven mouth curls upward and thins out. Nothing else in the scene moves.`,
        `Line behaviour: the contour lines do not boil, thicken, thin or wiggle. The cross-hatching stays exactly where it is drawn, and the solid black masses keep their edges sharp; no line redraws itself, no new line appears.`,
        `White paper: the background stays exactly #FFFFFF in every frame, so the picture never looks lit or graded. No shadows move, no vignette grows.`,
        `Loop: the action is timed so the last frame is identical to the first and the cut is invisible. No fade, no title card, no sound.`,
        `Guardrails: no 3D, no camera move, no morphing the drawing into a photograph, no colour, no added characters or objects, no text.`
      ].filter(Boolean).join("\n\n");
    },

    motionKo(ctx) {
      const motion = ctx.get("motion");
      const ratio = ctx.get("ratio");
      const still = motion.id === "still";

      if (ctx.brief) {
        return [
          `${ratio.ko}, 6초 무한 반복, 24fps, 카메라 고정: 같은 굵은 먹선 그림을 평면 2D로.`,
          still ? `거의 움직이지 않고 인쇄된 한 칸처럼 멈춰 있습니다.` : `칼을 쥔 손이 느린 획 한 번을 마치고, 화덕 아궁이에서 가느다란 연기 한 줄이 올라옵니다.`,
          `먹선·검은 면·흰 종이는 끓거나 깜빡이지 않습니다. 첫 프레임과 마지막 프레임 동일. 글자·워터마크 없음.`
        ].join(" ");
      }

      return [
        `굵은 먹선 그림을 6초 무한 반복 영상으로 만듭니다. 24fps, 깨끗한 흰 종이 위 평면 2D 선 애니메이션이며, 3D 이동도 모핑도 아닙니다.`,
        `카메라: 완전 고정. 팬·틸트·줌·푸시인·시차·핸드헬드 흔들림·포커스 변화 없음. 첫 초와 마지막 초의 화면 자르기가 정확히 같습니다.`,
        still
          ? `움직임: 인쇄된 한 칸처럼 그림이 멈춰 있습니다. 기껏해야 먹이 반 픽셀 숨 쉬는 정도이고, 화덕 아궁이에서 가느다란 연기 한 줄이 6초 동안 위로 흐르며 옅어집니다.`
          : `움직임: 서두르지 않는 칼 획 한 번 — 칼날이 앞으로 2cm 나아갔다 멈추고, 손목과 팔뚝이 두 프레임 늦게 따라옵니다. 그동안 화덕 아궁이에서 가느다란 연기 한 줄이 말려 올라가 옅어집니다. 장면의 다른 것은 움직이지 않습니다.`,
        `선의 성질: 윤곽선은 끓지도, 굵어지지도, 가늘어지지도, 흔들리지도 않습니다. 교차 해칭은 그려진 자리에 그대로 있고 검은 면의 가장자리는 또렷합니다. 선이 스스로 다시 그려지거나 새 선이 생기지 않습니다.`,
        `흰 종이: 배경은 모든 프레임에서 정확히 #FFFFFF — 조명이 비치거나 색이 보정된 느낌이 없습니다. 그림자가 움직이지 않고 비네팅이 자라지도 않습니다.`,
        `루프: 마지막 프레임이 첫 프레임과 같도록 동작을 맞춰 끊김이 보이지 않습니다. 페이드·타이틀 카드·소리는 없습니다.`,
        `가드레일: 3D·카메라 이동·그림이 사진으로 변하는 모핑·색·인물·소품 추가·글자를 금지합니다.`
      ].filter(Boolean).join("\n\n");
    }
  };

  MPS.register({
    id: "zen",
    order: 4,
    name: "ZEN",
    engName: "ZEN",
    tab: "라인 아트 풍경",
    tabSub: "가는 먹선 · 은행잎 노랑",
    accent: "#c98a12",
    accentSoft: "#f8ecc9",
    ink: "#20201e",
    tagline: "선은 검게, 계절은 노랗게",
    summary:
      "따뜻한 아이보리 종이에 0.6~0.9px의 균일한 먹선만으로 그린 풍경. 담장·기와·가로등·인물은 모두 채색 없는 선화이고, 색은 잎에만 — 은행잎 노랑, 단풍 진홍, 벚꽃 분홍이 화면 위 절반을 채웁니다. 영상은 카메라 고정, 잎이 흔들리고 떨어지며 사람과 강아지가 미끄러지지 않고 걷는 24초 무한 반복.",
    hero: { src: "zen/ginkgo-palace.jpg", alt: "은행나무 두 그루 사이, 궁궐 담장길을 걷는 사람과 강아지의 라인 아트", pos: "center 62%" },
    facts: [
      { k: "바탕", v: "아이보리 종이", d: "#FBF6EA · 질감 없음" },
      { k: "선", v: "0.6~0.9px", d: "균일 먹선 #20201E" },
      { k: "색", v: "잎에만", d: "은행 노랑 #F3B70E 계열" },
      { k: "영상", v: "24초 루프", d: "카메라 고정 · 잎 낙하" }
    ],
    dna: [
      { tag: "01 · 바탕", title: "한 장의 아이보리 종이", swatch: "#FBF6EA",
        body: "순백도 크림도 아닌 #F9F3E6~#FCF8EF 사이의 아이보리 한 판이 화면을 가득 채웁니다. 질감도, 그라데이션도, 비네팅도 없고, 하늘은 끝까지 뚫린 빈 종이로 남습니다. 이 여백이 있어야 가는 선이 살아납니다.",
        spec: "배경 #FBF6EA · 질감 0 · 그라데이션 0 · 하늘 여백 25% 이상" },
      { tag: "02 · 선", title: "굵기가 변하지 않는 먹선", swatch: "#20201E",
        body: "담장의 돌, 기와의 물결, 가로등의 팔, 난간의 세로살까지 모두 0.6~0.9px의 같은 굵은 검은 선 하나로 그립니다. 붓 터치도, 끝의 뾰족함도, 겹쳐 그은 스케치선도 없습니다. 선이 곧 형태이고, 형태는 규칙적입니다.",
        spec: "먹선 #20201E · 0.6~0.9px 균일 · 테이퍼 없음 · 해칭 금지(껍질 세로선만 성기게)" },
      { tag: "03 · 구조", title: "좌우 두 그루, 가운데 담장", swatch: "#C9BFAE",
        body: "화면 좌우 가장자리에서 큰 나무 두 그루가 수관을 뻗어 위에서 거의 만나고, 중간 높이(약 60~65%)에 담장·기와·교량·건물 같은 수평 구조물이 한 줄로 놓입니다. 아래 1/3은 바닥, 그 뒤로는 산 능선 한 줄. 정면을 바라보는 1점 구도입니다.",
        spec: "나무 2그루 · 수평 구조선 1줄 · 바닥 30% · 원경 능선 1줄" },
      { tag: "04 · 색", title: "잎에만 얹는 계절색", swatch: "#F3B70E",
        body: "색은 오직 잎에만 있습니다. 은행잎은 금노랑, 단풍은 진홍, 벚꽃은 연분홍, 여름잎은 초록, 눈은 설백과 청회색. 잎은 작은 모양 하나(부채꼴·다섯 갈래·타원)를 무리로 촘촘히 찍어 수관을 만들고, 색은 플랫하게 — 그라데이션도 수채 번짐도 없습니다.",
        spec: "잎 = 플랫 2~3색 · 면적의 35~45% · 번짐·그라데이션 0" },
      { tag: "05 · 인물", title: "작은 선화와 옷 색 한 가지", swatch: "#43536E",
        body: "사람은 화면 높이의 12~18%, 얼굴은 옆선과 점 하나로 끝내는 작은 선화입니다. 옷에만 무채색·저채도 한 색(네이비·올리브·더스티 로즈)을 플랫하게 넣고, 피부와 머리는 채색하지 않습니다. 강아지는 목줄로 이어지고 꼬리를 세운 채 두 걸음 앞섭니다.",
        spec: "키 12~18% · 옷 1색 플랫 · 얼굴 = 선 + 점 · 강아지 목줄 연결" },
      { tag: "06 · 공기", title: "천천히 내려오는 잎", swatch: "#F4C2CE",
        body: "수관에서 떨어진 잎·꽃잎·눈송이가 앞뒤 깊이를 달리하며 화면을 가로질러 내려옵니다. 6~30개, 크기 6~26px, 회전은 아주 느리게. 많이 뿌려도 시끄럽지 않게, 밀도는 위쪽이 높고 아래로 갈수록 성깁니다.",
        spec: "낙하 입자 6~30개 · 크기 6~26px · 위에서 아래로 · 회전 3°/초 이내" },
      { tag: "07 · 바닥", title: "낙엽이 덮은 길과 돌", swatch: "#EFE6D2",
        body: "아래 1/3은 바닥입니다. 은행잎·단풍은 길을 가득 덮고, 벚꽃은 돌바닥에 성기게 흩어지며, 눈은 기와·담장 위에 얇은 선으로 앉습니다. 돌바닥은 큰 판을 규칙적으로 나눈 선으로만 그리고, 그림자는 넣지 않습니다.",
        spec: "바닥 30% · 낙엽 밀도 (은행 70% / 단풍 40% / 벚꽃 20%) · 그림자 0" },
      { tag: "08 · 금기", title: "날짜도 서명도 @도 없다", swatch: "#A9483C",
        body: "원작 영상에는 날짜와 계정 표기가 없습니다. 생성 프롬프트에도 넣지 않고, 오히려 화면 안의 모든 글자·숫자·로고·서명·워터마크·@ 핸들을 금지합니다. 사진 질감, 3D, 수채 번짐, 두꺼운 외곽선, 채색된 얼굴도 함께 금지합니다.",
        spec: "텍스트 0 · 날짜 0 · 서명·워터마크 0 · @핸들 0 · 사진 질감 0" }
    ],

    controls: [
      { key: "scene", type: "text", label: "장면 직접 입력", placeholder: "예: 눈 그친 오후, 담장 아래에서 강아지가 잎을 밟고 걷는다",
        hint: "비우면 위에서 고른 프리셋의 장면을 씁니다" },
      { key: "place", type: "chips", label: "장소 · 구조물", hideIn: ["craft-kitchen"], options: Object.entries(PLACES).map(([id, v]) => ({ id, label: v.label })) },
      { key: "foliage", type: "swatch", label: "잎 · 계절색", hideIn: ["craft-kitchen"], options: Object.entries(FOLIAGE).map(([id, v]) => ({ id, label: v.label, hex: v.hex })) },
      { key: "figures", type: "chips", label: "인물", hideIn: ["craft-kitchen"], options: Object.entries(FIGURES).map(([id, v]) => ({ id, label: v.label })) },
      { key: "motion", type: "chips", label: "영상 움직임", options: Object.entries(MOTIONS).map(([id, v]) => ({ id, ...v })) },
      { key: "air", type: "chips", label: "떨어지는 잎", hideIn: ["craft-kitchen"], options: Object.entries(AIRS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "light", type: "chips", label: "빛", options: Object.entries(LIGHTS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "ratio", type: "chips", label: "화면 비율", options: MPS.RATIOS }
    ],

    defaults: {
      place: "palace",
      foliage: "ginkgo",
      figures: "dog",
      motion: "drift",
      air: "some",
      light: "afternoon",
      ratio: "9:16"
    },

    presets: PRESETS,

    samples: [
      { file: "zen/ginkgo-palace.jpg", title: "은행나무 궁 담장길", caption: "가을은 담장 밖에서 먼저 온다.", pos: "center 62%",
        preset: "ginkgo-palace", seed: { place: "palace", foliage: "ginkgo", figures: "dog", motion: "drift", air: "some", light: "afternoon", ratio: "9:16" } },
      { file: "zen/cherry-hanok.jpg", title: "벚꽃 한옥 골목", caption: "꽃잎이 길을 대신 밟아 준다.", pos: "center 58%",
        preset: "cherry-hanok", seed: { place: "hanok", foliage: "cherry", figures: "pair", motion: "walk", air: "many", light: "overcast", ratio: "9:16" } },
      { file: "zen/maple-river.jpg", title: "강변 단풍길", caption: "붉은 잎이 강물보다 먼저 흐른다.", pos: "center 60%",
        preset: "maple-river", seed: { place: "riverside", foliage: "maple", figures: "dog", motion: "drift", air: "some", light: "dusk", ratio: "16:9" } },
      { file: "zen/snow-hanok.jpg", title: "첫눈 한옥길", caption: "눈은 소리 없이 길을 새로 쓴다.", pos: "center 58%",
        preset: "snow-hanok", seed: { place: "hanok", foliage: "snow", figures: "family", motion: "walk", air: "many", light: "snowlight", ratio: "9:16" } },
      { file: "zen/green-campus.jpg", title: "여름 캠퍼스 가로수길", caption: "그늘의 길이가 여름의 길이다.", pos: "center 58%",
        preset: "green-campus", seed: { place: "campus", foliage: "green", figures: "solo", motion: "walk", air: "some", light: "afternoon", ratio: "9:16" } },
      { file: "zen/kitchen-craft.jpg", title: "굵은 먹붓 · 생선 손질", caption: "손끝에서 저녁이 준비된다.", pos: "center 40%",
        preset: "craft-kitchen", seed: { motion: "still", light: "overcast", ratio: "4:5" } },
      { file: "zen/courtyard-dusk.jpg", title: "해 질 무렵의 빈 마당", caption: "해가 지면 선만 남는다.", pos: "center 60%",
        preset: "courtyard-dusk", seed: { place: "courtyard", foliage: "bare", figures: "none", motion: "still", air: "some", light: "dusk", ratio: "4:5" } }
    ],

    /* ---------------- 프롬프트 빌더 ---------------- */
    build: {
      imageEn(ctx) {
        if (ctx.preset.bold) return BOLD.imageEn(ctx);
        const place = PLACES[ctx.get("place").id];
        const fol = FOLIAGE[ctx.get("foliage").id];
        const fig = FIGURES[ctx.get("figures").id];
        const light = LIGHTS[ctx.get("light").id];
        const air = AIRS[ctx.get("air").id];
        const ratio = ctx.get("ratio");
        const customScene = ctx.text("scene").trim();
        const sceneEn = customScene || ctx.preset.scene.en;
        const canopy = ctx.get("foliage").id === "bare" || ctx.get("foliage").id === "snow";

        if (ctx.brief) {
          return [
            `Flat hairline line-art landscape on warm ivory paper (#FBF6EA), ${ratio.en}.`,
            canopy
              ? `Two tall trees with ${fol.en} frame the left and right edges and arch over the top.`
              : `Two tall trees with ${fol.en} — ${fol.toneEn} — frame the left and right edges, canopies almost meeting overhead and filling the upper half.`,
            `Middle: ${place.en}.`,
            `Bottom third: ${fol.fallEn}.`,
            `Figures: ${fig.en} — tiny (12–18% of frame height), drawn in the same hairline ink, flat clothing colour only.`,
            `Everything except leaves and clothes is empty line art: uniform 0.6–0.9 px black ink (#20201E), no fill, no shading, no hatching, no texture, no gradients, no cast shadows.`,
            `${H.cap(air.en)}. ${H.cap(light.en)}.`,
            `${H.cap(sceneEn)}.`,
            `Flat 2D, calm, no text, no date, no watermark, no signature, no logo.`
          ].join(" ");
        }

        return [
          `A single-weight hairline ink drawing of a quiet street, made as a flat 2D picture-book illustration rather than a photograph — the look of an architectural pen and ink elevation, coloured only where the leaves are.`,
          `Canvas: warm ivory paper (#FBF6EA) filling the whole frame, ${ratio.en}. Perfectly flat tone, no paper texture, no gradient, no vignette, no border. The sky is left as empty paper and takes at least a quarter of the height.`,
          `Composition: two tall trees stand at the very left and right edges, their trunks rising out of the ground in the lower third and their ${canopy ? "bare crowns" : "canopies"} spreading inward until they almost meet at the top; the upper half of the frame belongs to them. At about 60–65% of the height a horizontal structure crosses the frame, and a single thin line of distant hills sits behind it. ${H.cap(place.en)}. ${H.cap(place.propEn)}.`,
          canopy
            ? `Trees: ${fol.en}, drawn as clean hairline ink lines with hardly any hatching — only a few sparse vertical strokes for the bark. ${H.cap(fol.fallEn)}.`
            : `Trees: ${fol.en}, drawn as clean hairline ink lines with hardly any hatching — only a few sparse vertical strokes for the bark. The leaves are ${fol.toneEn}. ${H.cap(fol.fallEn)}. The canopy sits in dense, small, irregular clusters along the twigs, with clear gaps of ivory paper showing through, and the same leaf shape repeats everywhere.`,
          `Ground: the bottom third is the path, its paving stones or dirt drawn with a few regular straight lines only — no texture, no pebbles, no speckle. ${H.cap(fol.fallEn)}.`,
          `Figures: ${fig.en}. They are small — 12 to 18% of the frame height — and drawn with exactly the same hairline ink as the architecture: a profile line, one dot or short stroke for the eye, no facial features, no shading. Their clothes carry one flat, muted colour each (navy, olive, charcoal, camel, dusty rose); skin and hair stay uncoloured, and the dog is white line art only.`,
          `Line: one uniform stroke, 0.6–0.9 px at this scale, in near-black ink (#20201E), with no taper, no pressure change, no double strokes, no scribble. All curves are smooth and deliberate; every repeated element (wall blocks, roof tiles, railing bars, window frames) is drawn with the same measurement, the way a drafting pen would draw them.`,
          `Colour: only two things are coloured — the foliage (${fol.toneEn}) and the tiny clothes. Everything else stays empty ivory and black line. Fills are flat and opaque; no watercolour bleed, no gradient, no highlight, no shadow, no cast shadow on the ground.`,
          `Air: ${fillAir(air.en, fol.leafPl)}, each ${fol.leafEn} drawn as a single clean shape in its own colour, some sharp and some small, never overlapping into a blur.`,
          `Light: ${light.en}.`,
          `Scene direction: ${H.cap(H.stripDot(sceneEn))}.`,
          `Mood: hushed and gently nostalgic, like a page from a thin picture book about walking home in the last good week of a season. Nothing dramatic, nothing busy.`,
          `Output: a single still image, ${ratio.en}, high resolution, flat matte finish, 2D only.`,
          `Avoid: photography, 3D render, CGI, painterly brushwork, watercolour blooms, pencil hatching over large areas, thick outlines, outlines that vary in weight, gradients, textures, grain, lens blur, drop shadows, coloured faces, anime eyes, realistic anatomy, crowded composition, floating logos, frames or borders.`
        ].join("\n\n");
      },

      imageKo(ctx) {
        if (ctx.preset.bold) return BOLD.imageKo(ctx);
        const place = PLACES[ctx.get("place").id];
        const fol = FOLIAGE[ctx.get("foliage").id];
        const fig = FIGURES[ctx.get("figures").id];
        const light = LIGHTS[ctx.get("light").id];
        const air = AIRS[ctx.get("air").id];
        const ratio = ctx.get("ratio");
        const customScene = ctx.text("scene").trim();
        const sceneKo = customScene || ctx.preset.scene.ko;
        const canopy = ctx.get("foliage").id === "bare" || ctx.get("foliage").id === "snow";

        if (ctx.brief) {
          return [
            `따뜻한 아이보리 종이(#FBF6EA) 위에 균일한 먹선으로 그린 평면 라인 아트 풍경, ${ratio.ko}.`,
            canopy
              ? `좌우 가장자리의 큰 나무 두 그루가 ${fol.ko}인 채 위에서 아치를 만듭니다.`
              : `좌우 가장자리의 큰 나무 두 그루가 ${fol.ko}인 채 위에서 거의 만나 화면 위 절반을 채웁니다 — ${fol.toneKo} 색.`,
            `중간: ${place.ko}.`,
            `아래 1/3: ${fol.fallKo}.`,
            `인물: ${fig.ko}. 화면 높이의 12~18%로 작게, 같은 먹선으로, 옷에만 플랫한 한 색.`,
            `잎과 옷을 뺀 모든 것은 채색 없는 선화입니다: 0.6~0.9px 균일 검은 먹선(#20201E), 면 채우기·명암·해칭·질감·그라데이션·바닥 그림자 없음.`,
            `${air.ko}. ${light.ko}.`,
            `${sceneKo}.`,
            `평면 2D, 조용한 분위기. 글자·날짜·워터마크·서명·로고 없음.`
          ].join(" ");
        }

        return [
          `가로 풍경을 한 가지 굵기의 먹선만으로 그린 평면 2D 그림책 일러스트. 사진이 아니라 건축 도면처럼 펜으로 그린 입면도에 가깝고, 색은 잎에만 얹습니다.`,
          `캔버스: 따뜻한 아이보리 종이(#FBF6EA)가 화면 전체를 채웁니다. ${ratio.ko}. 완전히 평평한 톤, 종이 질감 없음, 그라데이션 없음, 비네팅 없음, 테두리 없음. 하늘은 빈 종이로 남겨 화면 높이의 4분의 1 이상을 차지합니다.`,
          `구도: 큰 나무 두 그루가 화면 왼쪽과 오른쪽 가장자리에 서서 아래 1/3에서 줄기를 올리고 ${canopy ? "잎 없는 수관" : "수관"}을 안쪽으로 뻗어 꼭대기에서 거의 만납니다. 화면 위 절반은 나무의 것입니다. 높이 60~65% 지점에 수평 구조물이 한 줄로 지나가고, 그 뒤로 먼 산 능선 한 줄. ${place.ko}. ${place.propKo}.`,
          canopy
            ? `나무: ${fol.ko}. 깨끗한 먹선으로만 그리고 해칭은 거의 넣지 않습니다 — 껍질에 성긴 세로선 몇 개가 전부입니다. ${fol.fallKo}.`
            : `나무: ${fol.ko}. 깨끗한 먹선으로만 그리고 해칭은 거의 넣지 않습니다 — 껍질에 성긴 세로선 몇 개가 전부입니다. 잎은 ${fol.toneKo} 색. ${fol.fallKo}. 잎은 가지 끝을 따라 작고 불규칙한 무리로 촘촘히 앉고, 사이사이 아이보리 여백이 또렷하게 비치며, 같은 잎 모양이 화면 전체에서 반복됩니다.`,
          `바닥: 아래 1/3은 길입니다. 돌바닥이나 흙길을 규칙적인 직선 몇 개로만 나누고, 질감·자갈·점묘는 넣지 않습니다. ${fol.fallKo}.`,
          `인물: ${fig.ko}. 화면 높이의 12~18%로 작게, 건물과 똑같은 먹선으로 그립니다. 옆선 하나와 눈을 나타내는 점 하나 또는 짧은 획이 전부이고, 코·입·눈썹은 없습니다. 옷에만 무채색 또는 저채도 한 색(네이비·올리브·차콜·카멜·더스티 로즈)을 플랫하게 넣고, 피부와 머리는 채색하지 않습니다. 강아지는 흰 선화로만.`,
          `선: 한 가지 굵기 0.6~0.9px, 거의 검정인 먹색(#20201E). 끝이 가늘어지지 않고, 필압 변화도, 겹쳐 그은 선도, 낙서 같은 선도 없습니다. 모든 곡선은 매끄럽고 의도적이며, 반복되는 요소(담장 돌, 기와, 난간 살, 창틀)는 제도펜으로 그린 것처럼 같은 치수로 그립니다.`,
          `색: 색이 있는 것은 두 가지뿐입니다 — 잎(${fol.toneKo})과 인물의 작은 옷. 나머지는 모두 아이보리 여백과 검은 선으로 남깁니다. 채색은 플랫하고 불투명하며, 수채 번짐·그라데이션·하이라이트·그림자·바닥에 드리운 그림자 모두 없습니다.`,
          `공기: ${fillAir(air.ko, fol.leafKo)}. ${fol.leafKo} 하나하나를 깨끗한 모양 하나로 그리고, 어떤 것은 선명하고 어떤 것은 작게, 뭉개져 흐려지지 않게.`,
          `빛: ${light.ko}.`,
          `장면 지시: ${H.stripDot(sceneKo)}.`,
          `분위기: 숨을 죽인 듯 조용하고 조금은 그리운 — 한 계절의 마지막 좋은 주에 집으로 걸어가는 얇은 그림책 한 페이지 같은 느낌. 극적인 것도, 번잡한 것도 없습니다.`,
          `출력: 정지 이미지 한 장, ${ratio.ko}, 고해상도, 평면 무광, 2D만.`,
          `금지: 사진, 3D 렌더, CGI, 유화 붓터치, 수채 번짐, 넓은 면의 연필 해칭, 두꺼운 외곽선, 굵기가 변하는 선, 그라데이션, 질감, 그레인, 렌즈 블러, 드롭섀도, 채색된 얼굴, 애니메이션 눈, 사실적 해부, 빽빽한 구성, 떠 있는 로고, 액자·테두리.`
        ].join("\n\n");
      },

      motionEn(ctx) {
        if (ctx.preset.bold) return BOLD.motionEn(ctx);
        const place = PLACES[ctx.get("place").id];
        const fol = FOLIAGE[ctx.get("foliage").id];
        const fig = FIGURES[ctx.get("figures").id];
        const motion = ctx.get("motion");
        const air = AIRS[ctx.get("air").id];
        const ratio = ctx.get("ratio");
        const canopy = ctx.get("foliage").id === "bare" || ctx.get("foliage").id === "snow";
        const hasFigures = ctx.get("figures").id !== "none";
        const moves = hasFigures && (motion.id === "walk" || motion.id === "look");

        const walkBlock = `Walk cycle: a real eight-phase cycle — contact, down, passing, up, then contact on the other foot. Each heel plants and holds for two frames before the weight rolls forward, the toe peels off last, and the up-and-down of the body is no more than 2 px. Arms counter-swing, the coat hem and hair lag one frame behind, and the feet never slide: the planted foot is locked to the ground for the whole stance. The small dog trots with a four-beat gait, two beats behind the walker's feet, its tail lifted and its paws touching down cleanly.`;

        const lookBlock = `Look-up beat: the walkers slow with three shorter steps, come to a stop with both feet together, and then their faces lift toward the canopy over about a second and a half. A single leaf falls past the lifted face, the shoulders settle, and they stay there breathing until the loop ends. The camera does not follow the movement up.`;

        const stillBlock = `Held shot: nobody travels through the frame. The trees stay fixed, the architecture stays fixed, and the only things that move are the air and one or two far-off leaves letting go. The whole loop is one slow, quiet breath.`;

        if (ctx.brief) {
          return [
            `${ratio.en}, 24-second seamless loop, 24 fps, locked camera: the same ivory-paper hairline landscape, animated in 2D only.`,
            canopy
              ? `The bare crowns sway 1–2 px on a slow cycle. ${H.cap(fillAir(air.en, fol.leafPl))}.`
              : `The ${fol.leafPl} shiver in place (1–2 px, standing wave running from trunk to tip) and single ${fol.leafPl} are released and fall the full height of the frame, each with its own drift and slow spin; ${fillAir(air.en, fol.leafPl)}.`,
            moves
              ? `Figures: ${fig.en} — real eight-phase walk, heel plants and holds, feet never slide, body bob ≤2 px, dog trots two beats behind.`
              : `No walkers: the figures stay almost still, breathing only.`,
            `Everything else locked: no camera pan, zoom, push-in, parallax, shake, morph or parallax; the paper tone never changes.`,
            `First frame and last frame identical for an invisible loop. No text, no date, no watermark, no logo.`
          ].join(" ");
        }

        return [
          `Animate the still hairline illustration into a 24-second seamless loop at 24 fps — flat 2D line art on ivory paper, moving only as much as a sheet of paper and a light breeze would allow.`,
          `Camera: completely locked. No pan, no tilt, no zoom, no push-in, no parallax, no handheld shake, no rack focus, no morphing, no cross-dissolve. The frame keeps exactly the same size, crop and position from the first second to the last.`,
          `Canopy: ${canopy ? fol.en + ". " : fol.en + ", " + fol.toneEn + ". "}The crown sways as one soft mass — 1–2 px of lateral drift with a wave that travels slowly from the trunk out to the tips, about one full sway every eight seconds — while individual ${fol.leafPl} shiver by about 1 px on their own, slightly out of phase. No leaf shape changes and no cluster reshapes.`,
          `Falling: ${fillAir(air.en, fol.leafPl)}. Each one starts at a different height, drifts sideways with a slow lateral wobble, turns at no more than 30 degrees per second, and lands or leaves the frame without a bounce. The density stays higher at the top of the frame and thins toward the ground.`,
          moves ? walkBlock : stillBlock,
          motion.id === "look" && hasFigures ? lookBlock : "",
          `Architecture and ground: ${place.en} — ${place.propEn} — stay perfectly still, with no shimmer and no line boil beyond half a pixel. The ink lines may breathe by a fraction of a pixel, like a drawing held in the hand, which is the only sign of the hand behind it.`,
          `Colour: the foliage and the tiny clothing colours never flicker, brighten or shift hue. The ivory paper (#FBF6EA) holds exactly the same value in every frame, like a sheet lying on a table.`,
          `Loop: the action is built so that ${moves ? "twenty complete gait cycles and " : ""}a whole number of leaf drifts fit inside 24 seconds; the last frame is identical to the first, so the cut is invisible. No fade, no title card, no logo, no sound.`,
          `Guardrails: keep it flat and matte; no 3D, no lighting change, no shadows moving, no motion blur, no speed ramps, no scene change, no new characters, no added text.`
        ].filter(Boolean).join("\n\n");
      },

      motionKo(ctx) {
        if (ctx.preset.bold) return BOLD.motionKo(ctx);
        const place = PLACES[ctx.get("place").id];
        const fol = FOLIAGE[ctx.get("foliage").id];
        const fig = FIGURES[ctx.get("figures").id];
        const motion = ctx.get("motion");
        const air = AIRS[ctx.get("air").id];
        const ratio = ctx.get("ratio");
        const canopy = ctx.get("foliage").id === "bare" || ctx.get("foliage").id === "snow";
        const hasFigures = ctx.get("figures").id !== "none";
        const moves = hasFigures && (motion.id === "walk" || motion.id === "look");

        const walkBlock = `보행: 진짜 8동작 사이클 — contact, down, passing, up, 그리고 반대발 contact. 뒤꿈치가 땅에 닿으면 두 프레임을 그대로 붙어 있다가 무게가 앞으로 넘어가고, 발끝이 마지막에 떨어집니다. 몸의 상하 흔들림은 2px을 넘지 않고, 팔은 반대로 흔들리며, 코트 자락과 머리카락은 한 프레임 늦게 따라옵니다. 발은 절대 미끄러지지 않습니다 — 디딘 발은 딛는 동안 땅에 고정됩니다. 작은 강아지는 네 박자 걸음으로 사람 발보다 두 박자 뒤에서 걷고, 꼬리는 세운 채 발바닥이 또렷하게 닿습니다.`;

        const lookBlock = `올려다보는 순간: 걷던 인물이 세 걸음을 짧게 디뎌 속도를 줄이고 두 발을 모은 뒤, 약 1.5초에 걸쳐 얼굴을 수관 쪽으로 듭니다. 잎 한 장이 올려다보는 얼굴 옆을 지나 떨어지고, 어깨가 가라앉은 뒤 루프가 끝날 때까지 그대로 서 있습니다. 카메라는 그 움직임을 따라 올라가지 않습니다.`;

        const stillBlock = `머무는 화면: 화면을 가로지르는 사람은 없습니다. 나무와 구조물은 그대로 있고, 공기와 멀리서 하나둘 떨어지는 잎만 움직입니다. 루프 전체가 아주 느린 숨 한 번입니다.`;

        if (ctx.brief) {
          return [
            `${ratio.ko}, 24초 무한 반복, 24fps, 카메라 완전 고정: 같은 아이보리 종이 먹선 풍경을 2D로만 움직입니다.`,
            canopy
              ? `앙상한 가지가 느린 주기로 1~2px 흔들립니다. ${fillAir(air.ko, fol.leafKo)}.`
              : `${fol.leafKo}이 제자리에서 1~2px 떨리고(줄기에서 끝으로 흐르는 파동), 한 장씩 떨어져 화면 끝까지 내려오며 각자 옆으로 흔들리며 천천히 돕니다. ${fillAir(air.ko, fol.leafKo)}.`,
            moves
              ? `인물: ${fig.short} — 진짜 8동작 보행, 뒤꿈치가 딛고 버티며 발이 미끄러지지 않음, 몸 흔들림 2px 이내, 강아지는 두 박자 뒤에서 종종걸음.`
              : `지나가는 사람 없이 인물은 거의 정지, 숨만.`,
            `나머지는 완전 고정: 팬·줌·푸시인·시차·흔들림·모핑 없음, 종이 톤도 변하지 않음.`,
            `첫 프레임과 마지막 프레임이 같아 반복이 보이지 않습니다. 글자·날짜·워터마크·로고 없음.`
          ].join(" ");
        }

        return [
          `정지 라인 아트 일러스트를 24초 무한 반복 영상으로 만듭니다. 24fps, 아이보리 종이 위 평면 2D 선화이며, 종이 한 장과 약한 바람이 허락하는 만큼만 움직입니다.`,
          `카메라: 완전 고정. 팬·틸트·줌·푸시인·시차 이동·핸드헬드 흔들림·포커스 이동·모핑·디졸브 모두 없음. 첫 초와 마지막 초의 화면 크기·구도·위치가 정확히 같습니다.`,
          `수관: ${canopy ? fol.ko + ". " : fol.ko + ", " + fol.toneKo + " 색. "}수관 전체가 하나의 부드러운 덩어리로 흔들립니다 — 좌우 1~2px, 줄기에서 끝으로 천천히 흐르는 파동이 약 8초에 한 번. 그 위에서 잎 하나하나가 서로 조금씩 어긋난 위상으로 1px씩 떨립니다. 잎 모양이 바뀌거나 무리 자체가 변형되지는 않습니다.`,
          `낙하: ${fillAir(air.ko, fol.leafKo)}. 각각 시작 높이가 다르고, 옆으로 느리게 흔들리며, 회전은 초당 30도를 넘지 않고, 튀지 않은 채 바닥에 닿거나 화면 밖으로 나갑니다. 밀도는 화면 위쪽이 높고 아래로 갈수록 성깁니다.`,
          moves ? walkBlock : stillBlock,
          motion.id === "look" && hasFigures ? lookBlock : "",
          `구조물과 바닥: ${place.ko} — ${place.propKo2} — 은 완전히 정지해 있고, 반 픽셀을 넘는 선 떨림이나 일렁임은 없습니다. 다만 손에 든 그림처럼 선이 아주 미세하게 숨 쉬는 정도는 허용합니다.`,
          `색: 잎과 인물의 작은 옷 색은 깜빡이거나 밝아지거나 색상이 변하지 않습니다. 아이보리 종이(#FBF6EA)는 탁자 위에 놓인 종이처럼 모든 프레임에서 정확히 같은 밝기를 유지합니다.`,
          `루프: 24초 안에 ${moves ? "보행 사이클 20회와 " : ""}정수 개의 낙하 주기와 수관 흔들림 주기가 들어가도록 구성해, 마지막 프레임이 첫 프레임과 완전히 같습니다. 끊김이 보이지 않으며 페이드·타이틀 카드·로고·소리는 없습니다.`,
          `가드레일: 평면과 무광 유지. 3D·조명 변화·그림자 이동·모션 블러·속도 램프·장면 전환·새 인물·글자 추가는 모두 금지합니다.`
        ].filter(Boolean).join("\n\n");
      }
    },

    randomize(ctx) {
      const p = PRESETS[Math.floor(Math.random() * PRESETS.length)];
      const pick = (obj) => Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];
      return {
        preset: p.id,
        seed: Object.assign({}, p.seed, {
          place: p.seed.place,
          foliage: p.seed.foliage,
          figures: pick(FIGURES),
          air: pick(AIRS),
          light: pick(LIGHTS),
          ratio: ["9:16", "9:16", "4:5", "16:9", "1:1"][Math.floor(Math.random() * 5)]
        }),
        caption: p.captions ? p.captions[Math.floor(Math.random() * p.captions.length)] : p.caption
      };
    }
  });
})();
