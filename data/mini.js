/* ============================================================
   My Prompt Studio · data/mini.js
   ⑤ MINI — 미니어처 피규어형 (무광 점토 · 시네마틱 매크로)
   @sibal.kirok 스레드 「월요일의 김씨 (feat.연차)」의 화면 언어를
   분석해, 이미지/영상 × 영어/한국어 4종 프롬프트로 다시 엮은 모듈.
   손바닥만 한 점토 인형을 실제로 찍은 듯한 매크로 사진 —
   짧은 팔다리·둥근 볼·유리알 눈·실제 천으로 지은 미니 옷,
   배경은 어두운 실루엣과 얕은 심도, 따뜻한 역광, 필름 그레인.
   날짜·서명·@핸들 워터마크는 금지.
   ============================================================ */

(function () {
  const H = MPS.helpers;

  /* ---------- 인형 (누구를 빚었는가) ---------- */
  const FIGURES = {
    child: {
      label: "아이",
      en: "a small child figurine about three and a half heads tall, with a round face, softly rounded cheeks and short, stubby limbs",
      ko: "머리 3.5등신 정도의 작은 아이 인형 — 둥근 얼굴, 볼록한 볼, 짧고 통통한 팔다리",
      short: "a child figurine",
      shortKo: "아이 인형"
    },
    adult: {
      label: "어른",
      en: "a grown adult figurine about four heads tall, with a calm face, softly rounded cheeks and short, compact limbs",
      ko: "머리 4등신 정도의 어른 인형 — 차분한 얼굴, 부드럽게 둥근 볼, 짧고 단단한 팔다리",
      short: "an adult figurine",
      shortKo: "어른 인형"
    },
    elder: {
      label: "어르신",
      en: "an elderly figurine about three and a half heads tall, with fine sculpted wrinkles, softly rounded cheeks, grey hair and short limbs",
      ko: "머리 3.5등신 정도의 어르신 인형 — 잔잔하게 조각된 주름, 둥근 볼, 흰 머리, 짧은 팔다리",
      short: "an elderly figurine",
      shortKo: "어르신 인형"
    },
    pair: {
      label: "두 사람",
      en: "two figurines of the same sculpted language standing side by side, one a little taller, short limbs and rounded cheeks",
      ko: "같은 조형 언어로 빚은 인형 둘이 나란히 — 한쪽이 조금 크고, 짧은 팔다리와 둥근 볼",
      short: "two figurines side by side",
      shortKo: "나란히 선 인형 둘"
    }
  };

  /* ---------- 동반 동물 ---------- */
  const COMPANIONS = {
    kitten: {
      label: "새끼 고양이",
      en: "a much smaller baby kitten trotting seriously beside the figure on all fours, its tail up and its glass eyes wide",
      ko: "인형 옆에서 네 발로 진지하게 종종걸음하는 훨씬 작은 새끼 고양이 — 꼬리는 세우고 유리알 눈은 동그랗게",
      short: "a baby kitten trotting alongside",
      shortKo: "옆에서 종종걸음하는 새끼 고양이"
    },
    puppy: {
      label: "강아지",
      en: "a much smaller puppy keeping pace beside the figure on all fours, ears lifted and tail wagging once per step",
      ko: "인형 옆에서 보폭을 맞춰 걷는 훨씬 작은 강아지 — 귀를 세우고 한 걸음마다 꼬리를 한 번씩",
      short: "a puppy keeping pace",
      shortKo: "보폭을 맞춰 걷는 강아지"
    },
    duckling: {
      label: "새끼 오리",
      en: "a tiny duckling following two steps behind on webbed feet, its little head bobbing with each step",
      ko: "두 걸음 뒤에서 물갈퀴 발로 따라오는 아주 작은 새끼 오리 — 걸음마다 머리를 까딱",
      short: "a duckling following behind",
      shortKo: "뒤따라오는 새끼 오리"
    },
    none: {
      label: "혼자",
      en: "no animal companion at all — the figure walks alone",
      ko: "동물 친구 없이 인형 혼자",
      short: "no companion",
      shortKo: "동물 친구 없이 혼자"
    }
  };

  /* ---------- 배경 군중 ---------- */
  const CROWDS = {
    opposite: {
      label: "반대 방향 행인",
      en: "everyone else in the street moves in the opposite direction as dark, softly blurred silhouettes with no faces and no detail",
      ko: "거리의 다른 사람들은 모두 반대 방향으로 흐르는, 얼굴도 세부도 없는 어둡게 흐려진 실루엣",
      short: "a crowd flowing the other way, blurred dark",
      shortKo: "반대 방향으로 흐르는 군중"
    },
    horde: {
      label: "몰려오는 무리",
      en: "a horde of grey-faced figures lurches toward the character from both sides, all of them dark, soft and out of focus, like extras in a quiet zombie comedy",
      ko: "양옆에서 잿빛 얼굴의 무리가 인형을 향해 비틀거리며 몰려옵니다. 모두 어둡고 흐릿한 초점 밖 존재 — 조용한 좀비 코미디의 조연처럼",
      short: "a blurred horde lurching toward her",
      shortKo: "몰려오는 잿빛 무리"
    },
    same: {
      label: "같은 방향 행인",
      en: "a few blurred pedestrians walk in the same direction, half a step behind, their shapes softened by the shallow focus",
      ko: "몇몇 흐린 행인이 반 걸음 뒤에서 같은 방향으로 걷습니다. 얕은 심도에 형태가 부드럽게 풀립니다",
      short: "a few blurred walkers going the same way",
      shortKo: "같은 방향으로 걷는 흐린 행인"
    },
    empty: {
      label: "아무도 없이",
      en: "the street is completely empty — no other people at all, only the set and the light",
      ko: "거리에는 아무도 없습니다. 사람 없이 세트와 빛만 남습니다",
      short: "an empty street",
      shortKo: "텅 빈 거리"
    }
  };

  /* ---------- 옷 ---------- */
  const OUTFITS = {
    hoodie: {
      label: "오버사이즈 후드",
      en: "a cream oversized hoodie with real knitted jersey texture, its sleeves a little too long, and loose olive-brown trousers",
      ko: "크림색 오버사이즈 후드 — 실제 니트 원단의 결이 보이고 소매가 조금 길며, 아래는 헐렁한 올리브브라운 바지",
      short: "a cream oversized hoodie"
    },
    trench: {
      label: "트렌치코트",
      en: "a camel trench coat with a real woven twill, a small collar and a tiny leather satchel strap across the body",
      ko: "카멜색 트렌치코트 — 실제 능직 원단, 작은 깃, 몸을 가로지르는 가느다란 가죽 가방끈",
      short: "a camel trench coat"
    },
    knit: {
      label: "니트와 스카프",
      en: "a thick charcoal knit cardigan with visible cable stitches and a soft grey wool scarf looped once",
      ko: "굵은 차콜색 니트 가디건 — 꽈배기 짜임이 또렷하고, 회색 울 스카프를 한 번 둘러",
      short: "a thick charcoal knit and scarf"
    },
    raincoat: {
      label: "레인코트",
      en: "a mustard-yellow raincoat with a slightly stiff waterproof surface, the hood up, and matching rubber boots",
      ko: "겨자색 레인코트 — 살짝 뻣뻣한 방수 표면, 후드를 쓰고, 같은 색 고무장화",
      short: "a mustard raincoat and boots"
    },
    apron: {
      label: "앞치마",
      en: "a faded floral apron over a beige cardigan, the apron ties knotted at the back and the pockets sagging a little",
      ko: "베이지 카디건 위에 두른 빛바랜 꽃무늬 앞치마 — 뒤에서 묶은 끈, 조금 축 처진 주머니",
      short: "a faded floral apron"
    }
  };

  /* ---------- 소품 ---------- */
  const PROPS = {
    headphones: {
      label: "헤드폰",
      en: "large over-ear headphones whose cushions dent the hair just slightly",
      ko: "머리카락을 살짝 눌러 자국을 남기는 큼직한 오버이어 헤드폰",
      short: "large over-ear headphones"
    },
    umbrella: {
      label: "투명 우산",
      en: "a transparent vinyl umbrella with real water beads on the canopy and a thin metal shaft",
      ko: "우산 면에 물방울이 맺힌 투명 비닐 우산과 가는 금속 대",
      short: "a clear vinyl umbrella"
    },
    basket: {
      label: "장바구니",
      en: "a small woven straw market basket with two green onions and a green pepper poking out",
      ko: "대파 두 줄기와 고추 하나가 삐죽 나온 작은 짚 장바구니",
      short: "a small straw market basket"
    },
    mug: {
      label: "머그컵",
      en: "a small ceramic mug held in both hands with one thin thread of steam rising",
      ko: "두 손으로 감싸 쥔 작은 도자기 머그컵, 가는 김 한 줄기",
      short: "a warm ceramic mug"
    },
    none: {
      label: "소품 없음",
      en: "no prop in hand — the hands stay in pockets or swing empty",
      ko: "손에 든 소품 없이, 두 손은 주머니에 있거나 비어 있습니다",
      short: "no prop"
    }
  };

  /* ---------- 배경 팔레트 ---------- */
  const PALETTES = {
    olive: {
      label: "딥 올리브",
      hex: "#4A4F33",
      en: "a seamless deep olive-green backdrop (#4A4F33) that falls off into darkness at the edges",
      ko: "가장자리로 갈수록 어둠에 잠기는, 이음새 없는 딥 올리브그린 배경(#4A4F33)",
      short: "deep olive backdrop"
    },
    cream: {
      label: "크림 스튜디오",
      hex: "#E8DFC8",
      en: "a seamless warm cream studio backdrop (#E8DFC8) with soft shadow under the feet",
      ko: "발밑에 부드러운 그림자가 앉는 크림색 스튜디오 배경(#E8DFC8)",
      short: "warm cream backdrop"
    },
    midnight: {
      label: "미드나잇",
      hex: "#22303F",
      en: "a seamless midnight-blue backdrop (#22303F) with one warm lamp glow somewhere behind",
      ko: "뒤편 어딘가 따뜻한 등 하나가 번지는 미드나잇 블루 배경(#22303F)",
      short: "midnight-blue backdrop"
    },
    terracotta: {
      label: "테라코타",
      hex: "#9C5B3C",
      en: "a warm terracotta backdrop (#9C5B3C) with hanging bulbs blooming into bokeh behind",
      ko: "뒤로 매달린 전구들이 보케 꽃처럼 번지는 따뜻한 테라코타 배경(#9C5B3C)",
      short: "terracotta backdrop with bokeh lamps"
    },
    fog: {
      label: "안개 회색",
      hex: "#B9BBB4",
      en: "a soft fog-grey backdrop (#B9BBB4) that swallows the far distance completely",
      ko: "먼 거리를 통째로 삼키는 안개 회색 배경(#B9BBB4)",
      short: "fog-grey backdrop"
    }
  };

  /* ---------- 빛 ---------- */
  const LIGHTS = {
    rim: {
      label: "따뜻한 역광",
      en: "one soft warm rim light from behind the shoulder, a gentle fill from the front, and the background falling two stops darker",
      ko: "어깨 뒤에서 들어오는 부드럽고 따뜻한 역광 하나, 앞쪽의 은은한 반사광, 배경은 두 스톱 어둡게",
      short: "soft warm rim light"
    },
    overcast: {
      label: "흐린 확산광",
      en: "flat overcast daylight, almost no shadow, the surface reading as evenly lit clay",
      ko: "평평한 흐린 자연광, 그림자가 거의 없이 점토 표면이 고르게 읽힙니다",
      short: "flat overcast light"
    },
    neon: {
      label: "밤 네온",
      en: "night light from a teal shop sign on one side and a warm amber lamp on the other, both soft and reflected in the wet ground",
      ko: "한쪽은 청록 간판, 다른 쪽은 따뜻한 앰버 등 — 둘 다 부드럽게 젖은 바닥에 반사되는 밤의 빛",
      short: "night neon and warm lamp"
    },
    window: {
      label: "창가 오후",
      en: "low afternoon light through a window on the left, one long soft falloff across the scene, dust visible in the beam",
      ko: "왼쪽 창으로 들어오는 낮은 오후 빛, 화면을 가로지르는 길고 부드러운 감광, 빛줄기 속 먼지",
      short: "low afternoon window light"
    }
  };

  /* ---------- 앵글 ---------- */
  const SHOTS = {
    fullLow: {
      label: "로우 3/4 전신",
      en: "full-body low three-quarter side view, camera slightly below eye level, the figure standing in the lower middle of the frame with generous space above",
      ko: "로우 앵글의 3/4 측면 전신 — 카메라는 눈높이보다 조금 아래, 인형은 화면 아래쪽 중앙에 서고 위로 여백이 넉넉합니다",
      short: "full-body low three-quarter view"
    },
    medium: {
      label: "눈높이 미디엄",
      en: "eye-level medium shot from the waist up, the figure turned three-quarters toward the lens",
      ko: "허리 위 눈높이 미디엄 숏, 인형은 렌즈 쪽으로 3/4쯤 돌아섬",
      short: "eye-level medium shot"
    },
    close: {
      label: "로우 클로즈업",
      en: "tight low-angle close-up on the face and shoulders, the chin lifted, background completely dissolved",
      ko: "얼굴과 어깨를 담은 타이트한 로우 앵글 클로즈업 — 턱을 살짝 들고 배경은 완전히 풀어짐",
      short: "low-angle close-up"
    },
    back: {
      label: "뒷모습",
      en: "view from behind at shoulder height, the figure walking away down the middle of the frame",
      ko: "어깨 높이에서 본 뒷모습 — 인형이 화면 가운데로 걸어갑니다",
      short: "view from behind"
    }
  };

  /* ---------- 영상 움직임 ---------- */
  const MOTIONS = {
    tracking: {
      label: "저속 트래킹",
      note: "카메라가 인형과 같은 속도로 옆으로",
      en: "the camera tracks sideways at exactly the figure's walking pace, so the character stays in the same spot while the set slides past behind",
      ko: "카메라가 인형의 보행 속도와 정확히 같은 속도로 옆으로 따라갑니다. 인형은 화면 같은 자리에 있고 배경 세트가 뒤로 흘러갑니다"
    },
    walk: {
      label: "제자리 걷기",
      note: "카메라 고정, 인형만 걷기",
      en: "the camera is locked and only the figure walks, the ground and the crowd sliding behind in shallow focus",
      ko: "카메라는 고정, 인형만 걷습니다. 바닥과 군중은 얕은 심도 뒤로 흘러갑니다"
    },
    turn: {
      label: "돌아보기",
      note: "걷다가 멈춰 카메라를 봄",
      en: "the figure slows, stops, and turns the head and shoulders back toward the lens, the crowd still moving the other way behind",
      ko: "인형이 속도를 줄여 멈추고 고개와 어깨를 렌즈 쪽으로 돌립니다. 뒤에서는 군중이 여전히 반대쪽으로 흐릅니다"
    },
    still: {
      label: "정지",
      note: "숨과 빛만 움직임",
      en: "nothing travels through the frame — only a breath and the light change",
      ko: "화면을 지나가는 움직임 없이 숨과 빛만 아주 조금 변합니다"
    }
  };

  /* ---------- 프리셋 ---------- */
  const PRESETS = [
    {
      id: "monday-leave",
      emoji: "🎧",
      label: "월요일의 연차",
      thumb: "mini/headphones-cat.jpg",
      thumbPos: "center 45%",
      caption: "오늘만큼은 세상이 반대로 흘러도 좋다.",
      captions: ["오늘만큼은 세상이 반대로 흘러도 좋다.", "연차 낸 사람의 걸음은 가볍다.", "아무도 나를 부르지 않는 아침."],
      scene: {
        en: "the figure walks calmly through a busy crowd, head slightly raised and eyes closed behind large headphones, a baby kitten trotting beside her, everyone else moving the opposite way",
        ko: "인형이 붐비는 거리 한가운데를, 큰 헤드폰 뒤로 눈을 감은 채 고개를 살짝 들어 조용히 걷습니다. 새끼 고양이가 옆에서 종종걸음, 다른 사람들은 모두 반대 방향"
      },
      seed: { figure: "child", companion: "kitten", crowd: "opposite", outfit: "hoodie", prop: "headphones", shot: "fullLow", palette: "olive", light: "rim", motion: "walk", ratio: "4:5" }
    },
    {
      id: "commute-trench",
      emoji: "🚃",
      label: "출근길 트렌치",
      thumb: "mini/commute-trench.jpg",
      thumbPos: "center 42%",
      caption: "월요일은 늘 같은 얼굴로 온다.",
      captions: ["월요일은 늘 같은 얼굴로 온다.", "횡단보도 위에서 잠깐, 숨을 고른다.", "다들 바쁜데 나만 천천히."],
      scene: {
        en: "the figure crosses a wide crosswalk in thin morning light, one hand in a coat pocket, the crowd around him blurred and moving the other way",
        ko: "인형이 옅은 아침 빛 속에서 넓은 횡단보도를 건넙니다. 한 손은 코트 주머니에, 주변 사람들은 흐려진 채 반대 방향으로"
      },
      seed: { figure: "adult", companion: "none", crowd: "opposite", outfit: "trench", prop: "none", shot: "fullLow", palette: "cream", light: "overcast", motion: "tracking", ratio: "4:5" }
    },
    {
      id: "rain-umbrella",
      emoji: "☔",
      label: "비 오는 골목",
      thumb: "mini/rain-umbrella.jpg",
      thumbPos: "center 40%",
      caption: "비 오는 날엔 우산이 집이 된다.",
      captions: ["비 오는 날엔 우산이 집이 된다.", "물웅덩이마다 불빛이 하나씩 산다.", "젖어도 괜찮은 날."],
      scene: {
        en: "the figure stands still under a clear vinyl umbrella on wet asphalt, water beading on the canopy, warm lamp light pooling in the puddles, a kitten sitting dry at her feet",
        ko: "인형이 젖은 아스팔트 위에서 투명 비닐 우산을 쓰고 멈춰 섭니다. 우산 면에는 물방울, 물웅덩이에는 따뜻한 등불이 고이고, 발치에는 비를 피한 새끼 고양이"
      },
      seed: { figure: "child", companion: "kitten", crowd: "opposite", outfit: "raincoat", prop: "umbrella", shot: "fullLow", palette: "midnight", light: "neon", motion: "still", ratio: "4:5" }
    },
    {
      id: "zombie-street",
      emoji: "🧟",
      label: "좀비 거리 산책",
      thumb: "mini/zombie-walk.jpg",
      thumbPos: "center 45%",
      caption: "세상이 다 미쳐도 나는 음악을 듣는다.",
      captions: ["세상이 다 미쳐도 나는 음악을 듣는다.", "무리에 섞이지 않는 연습.", "오늘 출근길은 조금 무서웠다."],
      scene: {
        en: "the figure strolls on, headphones on and eyes closed, as a horde of grey-faced blurry figures lurches toward her from both sides, a kitten trotting at her heel",
        ko: "인형은 헤드폰을 쓴 채 눈을 감고 유유히 걷습니다. 양옆에서 잿빛 얼굴의 무리가 흐릿하게 몰려오지만, 발치의 새끼 고양이는 태연히 따라옵니다"
      },
      seed: { figure: "child", companion: "kitten", crowd: "horde", outfit: "hoodie", prop: "headphones", shot: "fullLow", palette: "olive", light: "rim", motion: "walk", ratio: "4:5" }
    },
    {
      id: "market-alley",
      emoji: "🧺",
      label: "시장 골목",
      thumb: "mini/market-alley.jpg",
      thumbPos: "center 40%",
      caption: "오늘 저녁은 이 장바구니가 정한다.",
      captions: ["오늘 저녁은 이 장바구니가 정한다.", "골목마다 불이 하나씩 켜진다.", "느린 걸음이 제일 빠르다."],
      scene: {
        en: "the figure walks a narrow traditional market alley with a straw basket of green onions, warm bulbs hanging above the stalls and shoppers softened to dark shapes behind",
        ko: "인형이 대파를 담은 짚 장바구니를 들고 좁은 전통시장 골목을 걷습니다. 좌판 위로 따뜻한 전구가 매달리고, 뒤쪽 사람들은 어두운 형태로만 흐려집니다"
      },
      seed: { figure: "elder", companion: "none", crowd: "same", outfit: "apron", prop: "basket", shot: "fullLow", palette: "terracotta", light: "rim", motion: "tracking", ratio: "4:5" }
    },
    {
      id: "snow-window",
      emoji: "🌨️",
      label: "눈 오는 창가",
      thumb: "mini/snow-window.jpg",
      thumbPos: "center 40%",
      caption: "창밖이 하얘지면 방은 더 따뜻해진다.",
      captions: ["창밖이 하얘지면 방은 더 따뜻해진다.", "눈 오는 밤엔 아무 데도 안 간다.", "머그 하나로 충분한 저녁."],
      scene: {
        en: "the figure sits on a windowsill holding a steaming mug, a warm amber lamp beside him, the snowy street outside blurred to blue bokeh",
        ko: "인형이 창턱에 앉아 김 나는 머그컵을 두 손으로 감쌉니다. 옆에는 따뜻한 앰버 램프, 창밖 눈 내리는 거리는 파란 보케로 풀려 있습니다"
      },
      seed: { figure: "elder", companion: "none", crowd: "empty", outfit: "knit", prop: "mug", shot: "medium", palette: "midnight", light: "window", motion: "still", ratio: "4:5" }
    }
  ];

  MPS.register({
    id: "mini",
    order: 5,
    name: "MINI",
    engName: "MINI",
    tab: "미니어처 피규어",
    tabSub: "점토 인형 · 시네마틱",
    accent: "#8d6244",
    accentSoft: "#f0e3d3",
    ink: "#241f19",
    tagline: "손바닥만 한 인생을, 영화처럼",
    summary:
      "무광 점토로 빚은 손바닥 크기 인형을 매크로로 찍은 듯한 화면. 짧은 팔다리와 둥근 볼, 유리알 같은 눈, 실제 천으로 지은 미니 옷. 배경 사람은 초점 밖 어두운 실루엣으로만 흐르고, 따뜻한 역광과 얕은 심도, 필름 그레인이 얹힙니다. 영상은 인형의 보행에 카메라가 같은 속도로 따라가는 6초 루프.",
    hero: { src: "mini/headphones-cat.jpg", alt: "헤드폰을 쓰고 새끼 고양이와 걷는 점토 인형 미니어처", pos: "center 45%" },
    facts: [
      { k: "소재", v: "무광 점토", d: "유리알 눈 · 광택 0" },
      { k: "비율", v: "머리 1 : 3.5", d: "짧은 팔다리 · 둥근 볼" },
      { k: "심도", v: "f/2.8 매크로", d: "배경 완전 아웃포커스" },
      { k: "영상", v: "6초 루프", d: "저속 트래킹 · 보행 동기" }
    ],
    dna: [
      { tag: "01 · 무대", title: "이음새 없는 한 겹 배경", swatch: "#4A4F33",
        body: "배경은 종이처럼 이음새 없는 한 가지 색이고, 지평선도 벽 모서리도 보이지 않습니다. 가장자리로 갈수록 어둠이 스며들고, 발밑에는 아주 짧고 부드러운 그림자 하나. 무대는 조용하고, 인형만 또렷합니다.",
        spec: "단색 배경 · 지평선 0 · 가장자리 감광 · 발밑 그림자 1개" },
      { tag: "02 · 조형", title: "짧은 팔다리의 점토 인형", swatch: "#C9A98B",
        body: "머리 하나에 몸 서너 개가 들어가는 비율. 목은 거의 없고, 팔과 다리는 짧고 통통하며, 손은 오므린 덩어리에 가깝습니다. 볼은 둥글게 부풀고 턱선은 부드럽게 깎여, 사람이라기보다 정성껏 빚은 인형입니다.",
        spec: "머리:몸 = 1:3~4 · 목 최소 · 팔다리 짧게 · 손 = 덩어리" },
      { tag: "03 · 얼굴", title: "광택 없는 얼굴, 유리알 눈", swatch: "#2B2622",
        body: "얼굴은 사람의 피부가 아니라 매끈하게 다듬은 무광 점토입니다. 모공도 잔털도 없고, 눈·코·입의 윤곽만 또렷하게 조각되어 있습니다. 눈은 자연 크기의 유리알 — 한 점의 반사광만 들어가고, 눈동자 테두리는 아주 진합니다.",
        spec: "무광 점토 · 모공 0 · 유리알 눈 + 반사광 1점 · 애니 눈 금지" },
      { tag: "04 · 옷", title: "실제 천으로 지은 미니 옷", swatch: "#E8DFC8",
        body: "옷은 점토로 칠한 것이 아니라, 실제 원단을 축소해 지은 것처럼 보입니다. 니트의 짜임, 능직의 대각선 결, 꿰맨 실밥과 작은 단추까지. 주름은 힘을 받는 곳에만 자연스럽게 잡히고, 옷이 몸을 조금 크게 감쌉니다.",
        spec: "원단 결 살아있게 · 실밥·단추 디테일 · 주름은 자연스럽게 · 인쇄 질감 금지" },
      { tag: "05 · 빛", title: "따뜻한 역광 한 줄", swatch: "#E3A857",
        body: "주광은 인형 뒤 어깨 쪽에서 들어와 머리카락과 볼 가장자리, 어깨선에 따뜻한 테두리를 만듭니다. 앞쪽은 약한 반사광으로만 채우고, 배경은 두 스톱쯤 어둡게 떨어집니다. 전체 색온도는 따뜻하지만 피부는 붉게 뜨겁지 않습니다.",
        spec: "역광 1 · 약한 반사광 · 배경 2스톱 다운 · 색온도 따뜻하게" },
      { tag: "06 · 심도", title: "얼굴에만 맞춘 초점", swatch: "#8A8578",
        body: "초점면은 얼굴과 손끝에만 놓입니다. 배경은 완전히 풀려 형태만 남고, 뒤쪽 등·전구·사람은 동그란 보케로 번집니다. 인형의 발끝도 살짝 흐려질 만큼 얕습니다 — 그래서 장면이 실제 세트처럼 느껴집니다.",
        spec: "f/2.8 상당 · 초점면 3~5cm · 배경 완전 아웃포커스 · 보케 원형" },
      { tag: "07 · 군중", title: "반대 방향으로 흐르는 실루엣", swatch: "#3A3B36",
        body: "다른 사람은 얼굴도 옷도 없는 어두운 덩어리입니다. 대부분 인형과 반대 방향으로 걷고, 흐릿함 속에서도 걸음의 방향만은 읽힙니다. 이 반대 흐름이 인형을 화면의 중심으로 밀어냅니다.",
        spec: "군중 = 실루엣 · 얼굴 0 · 반대 방향 · 보케 속에 반쯤 가림" },
      { tag: "08 · 금기", title: "사람 피부도, 인형 광택도 없다", swatch: "#A9483C",
        body: "사람의 피부 질감, 윤기 나는 플라스틱, 펠트·벨벳 솜인형, 애니메이션 얼굴, 과장된 큰 눈은 모두 금지입니다. 화면 안에는 날짜·서명·로고·워터마크·@계정명을 넣지 않습니다.",
        spec: "사람 피부 0 · 플라스틱 광택 0 · 펠트 0 · 애니 눈 0 · 글자·워터마크 0" }
    ],

    controls: [
      { key: "scene", type: "text", label: "장면 직접 입력", placeholder: "예: 눈 그친 오후, 인형이 물웅덩이를 피해 걷는다",
        hint: "비우면 위에서 고른 프리셋의 장면을 씁니다" },
      { key: "figure", type: "chips", label: "인형", options: Object.entries(FIGURES).map(([id, v]) => ({ id, label: v.label })) },
      { key: "companion", type: "chips", label: "동반 동물", options: Object.entries(COMPANIONS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "outfit", type: "chips", label: "옷", options: Object.entries(OUTFITS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "prop", type: "chips", label: "소품", options: Object.entries(PROPS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "crowd", type: "chips", label: "배경 사람", options: Object.entries(CROWDS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "shot", type: "chips", label: "앵글", options: Object.entries(SHOTS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "palette", type: "swatch", label: "배경 팔레트", options: Object.entries(PALETTES).map(([id, v]) => ({ id, label: v.label, hex: v.hex })) },
      { key: "light", type: "chips", label: "빛", options: Object.entries(LIGHTS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "motion", type: "chips", label: "영상 움직임", options: Object.entries(MOTIONS).map(([id, v]) => ({ id, ...v })) },
      { key: "ratio", type: "chips", label: "화면 비율", options: MPS.RATIOS }
    ],

    defaults: {
      figure: "child",
      companion: "kitten",
      outfit: "hoodie",
      prop: "headphones",
      crowd: "opposite",
      shot: "fullLow",
      palette: "olive",
      light: "rim",
      motion: "walk",
      ratio: "4:5"
    },

    presets: PRESETS,

    samples: [
      { file: "mini/headphones-cat.jpg", title: "월요일의 연차 · 헤드폰", caption: "오늘만큼은 세상이 반대로 흘러도 좋다.", pos: "center 45%",
        preset: "monday-leave", seed: { figure: "child", companion: "kitten", crowd: "opposite", outfit: "hoodie", prop: "headphones", shot: "fullLow", palette: "olive", light: "rim", motion: "walk", ratio: "4:5" } },
      { file: "mini/commute-trench.jpg", title: "출근길 트렌치 · 아침", caption: "월요일은 늘 같은 얼굴로 온다.", pos: "center 42%",
        preset: "commute-trench", seed: { figure: "adult", companion: "none", crowd: "opposite", outfit: "trench", prop: "none", shot: "fullLow", palette: "cream", light: "overcast", motion: "tracking", ratio: "4:5" } },
      { file: "mini/rain-umbrella.jpg", title: "비 오는 골목 · 우산", caption: "비 오는 날엔 우산이 집이 된다.", pos: "center 40%",
        preset: "rain-umbrella", seed: { figure: "child", companion: "kitten", crowd: "opposite", outfit: "raincoat", prop: "umbrella", shot: "fullLow", palette: "midnight", light: "neon", motion: "still", ratio: "4:5" } },
      { file: "mini/zombie-walk.jpg", title: "좀비 거리 산책 · 무리", caption: "세상이 다 미쳐도 나는 음악을 듣는다.", pos: "center 45%",
        preset: "zombie-street", seed: { figure: "child", companion: "kitten", crowd: "horde", outfit: "hoodie", prop: "headphones", shot: "fullLow", palette: "olive", light: "rim", motion: "walk", ratio: "4:5" } },
      { file: "mini/market-alley.jpg", title: "시장 골목 · 장바구니", caption: "오늘 저녁은 이 장바구니가 정한다.", pos: "center 40%",
        preset: "market-alley", seed: { figure: "elder", companion: "none", crowd: "same", outfit: "apron", prop: "basket", shot: "fullLow", palette: "terracotta", light: "rim", motion: "tracking", ratio: "4:5" } },
      { file: "mini/snow-window.jpg", title: "눈 오는 창가 · 미디엄", caption: "창밖이 하얘지면 방은 더 따뜻해진다.", pos: "center 40%",
        preset: "snow-window", seed: { figure: "elder", companion: "none", crowd: "empty", outfit: "knit", prop: "mug", shot: "medium", palette: "midnight", light: "window", motion: "still", ratio: "4:5" } }
    ],

    /* ---------------- 프롬프트 빌더 ---------------- */
    build: {
      imageEn(ctx) {
        const fig = FIGURES[ctx.get("figure").id];
        const comp = COMPANIONS[ctx.get("companion").id];
        const outfit = OUTFITS[ctx.get("outfit").id];
        const prop = PROPS[ctx.get("prop").id];
        const crowd = CROWDS[ctx.get("crowd").id];
        const shot = SHOTS[ctx.get("shot").id];
        const pal = PALETTES[ctx.get("palette").id];
        const light = LIGHTS[ctx.get("light").id];
        const ratio = ctx.get("ratio");
        const sceneEn = ctx.scene("en");

        if (ctx.brief) {
          return [
            `Macro photograph of a handcrafted miniature figurine: ${fig.en}, smooth matte sculpted face, natural-sized glass eyes, ${outfit.en}.`,
            `Tiny scale with real fabric and real light — ${comp.en}. ${H.cap(crowd.en)}.`,
            `${H.cap(pal.en)}. ${H.cap(light.en)}.`,
            `${H.cap(shot.en)}.`,
            `${H.cap(sceneEn)}.`,
            `Shallow depth of field, face-only focus, soft bokeh, fine film grain, premium handcrafted miniature realism, quiet comedy, ${ratio.en}.`,
            `No human skin texture, no plastic gloss, no felt, no anime eyes, no text, no date, no watermark, no signature, no logo.`
          ].join(" ");
        }

        return [
          `A macro photograph of a handcrafted miniature figurine standing in a tabletop set — it should look like a real object, sculpted by hand and photographed with a macro lens, not like a 3D render of a cartoon character.`,
          `The figure: ${fig.en}. The whole body is smooth matte clay or resin with no gloss, no human pores, no stubble and no skin texture; the surface reads as finely sanded sculpture. The face carries crisp but soft contours — a defined brow, a small nose, a sculpted mouth with a faint closed smile — and the eyes are natural-sized glass beads with one tiny catchlight each and a distinctly dark iris rim. Hair is sculpted strand by strand and reads slightly matte, never shiny plastic.`,
          `Clothing: ${outfit.en}. The fabric must look like real cloth shrunk to miniature — visible knit or twill weave, tiny stitched seams, small buttons, natural creases only where the body bends, and sleeves or hems a touch too big. No printed texture, no painted-on stripes, no fuzzy felt.`,
          `Prop: ${prop.en}. Companion: ${comp.en}. Crowd: ${crowd.en}.`,
          `Set and light: ${pal.en} ${H.cap(light.en)}. The set is a seamless tabletop sweep with no horizon line, no visible wall seam, no floor texture and one short soft shadow under the feet. Background objects fall away into darkness or bloom into round bokeh.`,
          `Lens and framing: ${shot.en}, ${ratio.en}. Shot on a 90–100 mm macro lens at about f/2.8, focus plane on the eyes and hands only, the rest of the figure softening by the feet and the background dissolving completely. A little chromatic warmth, gentle highlight roll-off, and fine 35 mm film grain over the whole frame.`,
          `Scene direction: ${H.cap(H.stripDot(sceneEn))}.`,
          `Mood: a quiet, slightly comic human moment told with a tiny handmade object — tender, cinematic, never cute for its own sake and never toy-advertising shiny.`,
          `Output: one still photograph, ${ratio.en}, high resolution, natural photographic finish, no illustration line, no painterly strokes.`,
          `Avoid: human skin texture, plastic or vinyl gloss, felt or velvet plush, anime eyes, oversized manga eyes, doll-joint seams, 3D CGI look, cartoon outlines, flat vector shading, neon oversaturation, motion blur, heavy vignette, dust or scratches, extra limbs, distorted hands, any lettering, and any date, signature, watermark, logo or @ handle.`
        ].join("\n\n");
      },

      imageKo(ctx) {
        const fig = FIGURES[ctx.get("figure").id];
        const comp = COMPANIONS[ctx.get("companion").id];
        const outfit = OUTFITS[ctx.get("outfit").id];
        const prop = PROPS[ctx.get("prop").id];
        const crowd = CROWDS[ctx.get("crowd").id];
        const shot = SHOTS[ctx.get("shot").id];
        const pal = PALETTES[ctx.get("palette").id];
        const light = LIGHTS[ctx.get("light").id];
        const ratio = ctx.get("ratio");
        const sceneKo = ctx.scene("ko");

        if (ctx.brief) {
          return [
            `손으로 빚은 미니어처 인형을 매크로 렌즈로 찍은 사진. ${fig.ko}, 매끈한 무광 점토 얼굴, 자연 크기 유리알 눈, ${outfit.ko}.`,
            `실제 천과 실제 빛으로 만든 작은 세트 — ${comp.ko}. ${crowd.ko}.`,
            `${pal.ko}. ${light.ko}.`,
            `${shot.ko}.`,
            `${sceneKo}.`,
            `얕은 심도, 얼굴에만 초점, 부드러운 보케, 고운 필름 그레인, 프리미엄 수제 미니어처 리얼리즘, 조용한 코미디, ${ratio.ko}.`,
            `사람 피부 질감·플라스틱 광택·펠트·애니 눈 금지. 글자·날짜·워터마크·서명·로고 금지.`
          ].join(" ");
        }

        return [
          `탁자 위 세트에 세워 둔 수제 미니어처 인형을 매크로 렌즈로 찍은 사진. 3D로 렌더링한 만화 캐릭터가 아니라, 손으로 빚어 실제로 촬영한 사물처럼 보여야 합니다.`,
          `인형: ${fig.ko}. 몸 전체는 광택 없는 무광 점토나 레진이며, 사람의 모공·수염자국·피부 결이 전혀 없고 곱게 사포질한 조각처럼 읽힙니다. 얼굴은 또렷하되 부드러운 윤곽 — 눈썹 능선, 작은 코, 살짝 다문 입과 희미한 미소 — 이고, 눈은 자연 크기의 유리알로 각각 작은 반사광 한 점과 진한 홍채 테두리가 있습니다. 머리카락은 한 올씩 조각되어 살짝 무광이며 플라스틱처럼 번들거리지 않습니다.`,
          `옷: ${outfit.ko}. 옷감은 실제 천을 축소해 지은 것처럼 보여야 합니다 — 니트·능직의 결, 작은 꿰맨 실밥, 작은 단추, 몸이 굽는 곳에만 자연스럽게 잡힌 주름, 몸보다 살짝 큰 소매와 기장. 인쇄한 질감, 칠해 넣은 줄무늬, 보송한 펠트는 금지입니다.`,
          `소품: ${prop.ko}. 동반 동물: ${comp.ko}. 배경 사람: ${crowd.ko}.`,
          `세트와 빛: ${pal.ko}. ${light.ko}. 세트는 지평선도 벽 이음새도 바닥 질감도 없는 이음새 없는 배경이고, 발밑에는 짧고 부드러운 그림자 하나뿐입니다. 뒤쪽 사물은 어둠으로 가라앉거나 동그란 보케로 번집니다.`,
          `렌즈와 구도: ${shot.ko}. ${ratio.ko}. 90~100mm 매크로 렌즈, f/2.8 정도 — 초점면은 눈과 손끝에만 맞고 발끝부터 조금씩 풀리며 배경은 완전히 사라집니다. 따뜻한 색 편향, 부드러운 하이라이트 롤오프, 화면 전체에 고운 35mm 필름 그레인.`,
          `장면 지시: ${H.stripDot(sceneKo)}.`,
          `분위기: 작은 수제 인형으로 말하는 조용하고 약간 웃긴 사람의 순간 — 다정하고 영화 같되, 귀여움만 앞세우지 않고 장난감 광고처럼 번들거리지 않습니다.`,
          `출력: 정지 사진 한 장, ${ratio.ko}, 고해상도, 자연스러운 사진 마감. 일러스트 선이나 붓터치는 없습니다.`,
          `금지: 사람 피부 질감, 플라스틱·비닐 광택, 펠트·벨벳 솜인형, 애니메이션 눈, 과장되게 큰 눈, 인형 관절 이음선, 3D CGI 느낌, 만화 외곽선, 평면 벡터 셰이딩, 형광 과채도, 모션 블러, 과한 비네팅, 먼지·스크래치, 팔다리 개수 오류, 손 왜곡, 모든 글자, 그리고 날짜·서명·워터마크·로고·@ 계정명.`
        ].join("\n\n");
      },

      motionEn(ctx) {
        const fig = FIGURES[ctx.get("figure").id];
        const comp = COMPANIONS[ctx.get("companion").id];
        const crowd = CROWDS[ctx.get("crowd").id];
        const motion = ctx.get("motion");
        const ratio = ctx.get("ratio");
        const hasCompanion = ctx.get("companion").id !== "none";

        const walkBlock = `Gait: a real eight-phase walk — contact, down, passing, up, then contact on the other foot. The heel plants and stays locked to the ground through the whole stance, the toe peels off last, and the body bobs no more than 1.5 px. Arms counter-swing, the coat hem and hair lag a frame behind.${hasCompanion ? ` The companion keeps a four-beat trot one beat behind the figure's feet, paws landing cleanly and never sliding.` : ""}`;

        const turnBlock = `Turn: the figure slows over three shorter steps, stops with both feet together, and then the shoulders rotate about 70 degrees while the head follows two frames later. The chin lifts slightly, the glass eyes find the lens, and the mouth corner rises by a single pixel. Nothing else in the frame turns.`;

        if (ctx.brief) {
          return [
            `6-second seamless loop at 24 fps, ${ratio.en}, macro photograph of the same handmade miniature figurine — real object, real light, shallow depth of field.`,
            motion.id === "tracking"
              ? `Camera trucks sideways at the figure's walking pace; the figure stays centred while the set slides past behind.`
              : motion.id === "walk"
                ? `Locked camera; only the figure walks, the ground and the blurred crowd sliding behind.`
                : motion.id === "turn"
                  ? `Locked camera; the figure walks, slows, stops and turns its head to the lens.`
                  : `Locked camera; the figure barely moves, only breathing and light.`,
            `${H.cap(crowd.short)} in soft bokeh.`,
            `First frame identical to the last, no morphing, no zoom snap, no text, no watermark.`
          ].join(" ");
        }

        return [
          `Animate the still macro photograph into a 6-second seamless loop at 24 fps — a real handcrafted figurine on a tabletop set, lit and shot like a tiny film.`,
          motion.id === "tracking"
            ? `Camera: a slow lateral truck at exactly the figure's walking speed, about 1.2 frame-widths across the whole loop, perfectly steady on a slider with no handheld sway. The figure stays centred; the backdrop and the blurred crowd slide past behind it.`
            : `Camera: completely locked on a tripod. No pan, no tilt, no zoom, no rack focus, no parallax drift, no handheld sway.`,
          motion.id === "still"
            ? `Figure: standing still, only a slow breath — the chest rises about 1 px over three seconds and settles. One blink around the two-second mark, the eyelids closing over the glass eyes in four frames.`
            : walkBlock,
          motion.id === "turn" ? turnBlock : "",
          `Background: ${crowd.en}. They move in slow, continuous parallax, already soft and out of focus, never resolving into faces, never crossing in front of the figure's face.`,
          `Focus and optics: the focus plane stays locked on the eyes with no hunting. Background bokeh circles may drift by a few pixels as the set moves; the exposure and colour temperature stay absolutely constant.`,
          `Texture and light: keep the matte clay surface, the fabric weave and the fine film grain identical in every frame. The rim light does not flicker, the shadows do not crawl, and no specular plastic highlight appears.`,
          `Loop: the walk cycle and the crowd drift are timed to whole numbers inside six seconds, so the last frame matches the first exactly. No fade, no title card, no logo, no sound.`,
          `Guardrails: no morphing between poses, no 3D CG smoothness, no lighting change, no new characters, no camera shake, no speed ramps, no text of any kind.`
        ].filter(Boolean).join("\n\n");
      },

      motionKo(ctx) {
        const comp = COMPANIONS[ctx.get("companion").id];
        const crowd = CROWDS[ctx.get("crowd").id];
        const motion = ctx.get("motion");
        const ratio = ctx.get("ratio");
        const hasCompanion = ctx.get("companion").id !== "none";

        const walkBlock = `보행: 진짜 8동작 사이클 — contact, down, passing, up, 그리고 반대발 contact. 뒤꿈치가 땅에 닿으면 딛는 동안 그대로 고정되고 발끝이 마지막에 떨어집니다. 몸의 상하 흔들림은 1.5px을 넘지 않고, 팔은 반대로 흔들리며 코트 자락과 머리카락은 한 프레임 늦게 따라옵니다.${hasCompanion ? ` 동반 동물은 사람 발보다 한 박자 뒤에서 네 박자 걸음으로 따라오고, 발바닥이 또렷하게 닿으며 절대 미끄러지지 않습니다.` : ""}`;

        const turnBlock = `돌아보기: 인형이 세 걸음을 짧게 디뎌 속도를 줄이고 두 발을 모은 뒤, 어깨가 약 70도 돌아가고 고개는 두 프레임 늦게 따라옵니다. 턱을 살짝 들어 유리알 눈이 렌즈를 찾고, 입꼬리가 1px 올라갑니다. 화면의 다른 것은 돌지 않습니다.`;

        if (ctx.brief) {
          return [
            `${ratio.ko}, 6초 무한 반복, 24fps. 같은 수제 미니어처 인형을 매크로로 찍은 사진 — 실제 사물, 실제 빛, 얕은 심도.`,
            motion.id === "tracking"
              ? `카메라가 인형의 보행 속도로 옆으로 이동하고, 인형은 화면 가운데에 머문 채 세트가 뒤로 흘러갑니다.`
              : motion.id === "walk"
                ? `카메라 고정. 인형만 걷고 바닥과 흐린 군중이 뒤로 흐릅니다.`
                : motion.id === "turn"
                  ? `카메라 고정. 인형이 걷다가 멈춰 고개를 렌즈로 돌립니다.`
                  : `카메라 고정. 인형은 거의 움직이지 않고 숨과 빛만 변합니다.`,
            `${crowd.shortKo}${H.josa(crowd.shortKo, "은", "는")} 부드러운 보케 속에 있습니다.`,
            `첫 프레임과 마지막 프레임 동일. 모핑·줌 튐·글자·워터마크 금지.`
          ].join(" ");
        }

        return [
          `정지 매크로 사진을 6초 무한 반복 영상으로 만듭니다. 24fps, 탁자 위 세트의 실제 수제 인형을 작은 영화처럼 찍은 화면입니다.`,
          motion.id === "tracking"
            ? `카메라: 인형의 보행 속도와 정확히 같은 저속 측면 이동. 루프 전체에서 화면 폭의 약 1.2배를 지나가고, 슬라이더 위처럼 완전히 고르며 손떨림은 없습니다. 인형은 화면 가운데에 머물고 배경과 흐린 군중이 뒤로 흘러갑니다.`
            : `카메라: 삼각대에 완전히 고정. 팬·틸트·줌·포커스 이동·시차 흔들림·핸드헬드 흔들림 모두 없습니다.`,
          motion.id === "still"
            ? `인형: 서 있는 채로 아주 느린 숨 한 번 — 가슴이 3초에 걸쳐 1px 올라갔다 내려옵니다. 2초 부근에서 한 번 눈을 깜빡이고, 유리알 눈 위로 눈꺼풀이 네 프레임에 걸쳐 닫힙니다.`
            : walkBlock,
          motion.id === "turn" ? turnBlock : "",
          `배경: ${crowd.ko}. 느리고 연속적인 시차로 움직이며, 이미 흐려져 얼굴이 드러나지 않고, 인형의 얼굴 앞을 가로지르지 않습니다.`,
          `초점과 광학: 초점면은 눈에 고정된 채 흔들리지 않습니다. 세트가 움직이면 보케 원이 몇 픽셀 흘러갈 수 있지만, 노출과 색온도는 완전히 일정합니다.`,
          `질감과 빛: 무광 점토 표면, 원단 짜임, 고운 필름 그레인이 모든 프레임에서 똑같이 유지됩니다. 역광이 깜빡이지 않고 그림자가 기어 다니지 않으며, 플라스틱 같은 하이라이트가 생기지 않습니다.`,
          `루프: 보행 사이클과 군중의 흐름이 6초 안에 정수로 들어가도록 맞춰, 마지막 프레임이 첫 프레임과 정확히 같습니다. 페이드·타이틀 카드·로고·소리는 없습니다.`,
          `가드레일: 자세 사이 모핑, 3D CG 같은 매끈함, 조명 변화, 새 인물, 카메라 흔들림, 속도 램프, 모든 글자 추가를 금지합니다.`
        ].filter(Boolean).join("\n\n");
      }
    },

    randomize(ctx) {
      const p = PRESETS[Math.floor(Math.random() * PRESETS.length)];
      const pick = (obj) => Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];
      return {
        preset: p.id,
        seed: Object.assign({}, p.seed, {
          figure: pick(FIGURES),
          companion: pick(COMPANIONS),
          outfit: pick(OUTFITS),
          prop: pick(PROPS),
          crowd: pick(CROWDS),
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
