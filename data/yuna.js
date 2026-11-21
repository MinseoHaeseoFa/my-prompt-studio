/* ============================================================
   My Prompt Studio · data/yuna.js
   ③ YUNA — 일상 다이어리툰형
   따뜻한 단색 배경, 둥근 데포르메 캐릭터, 플랫 파스텔,
   구석에 빼꼼 내민 보조 캐릭터, 포근한 일상 공감 톤.
   ============================================================ */

(function () {
  const H = MPS.helpers;

  const BACKGROUNDS = {
    cream: { label: "크림", hex: "#F7EFE4", en: "warm cream (#F7EFE4)", ko: "따뜻한 크림(#F7EFE4)" },
    ivory: { label: "아이보리", hex: "#FAF4E8", en: "soft ivory (#FAF4E8)", ko: "부드러운 아이보리(#FAF4E8)" },
    peach: { label: "피치", hex: "#FBE6DD", en: "pale peach (#FBE6DD)", ko: "옅은 피치(#FBE6DD)" },
    mint: { label: "민트", hex: "#E6F0E8", en: "pale mint (#E6F0E8)", ko: "옅은 민트(#E6F0E8)" },
    lavender: { label: "라벤더", hex: "#EEE8F5", en: "pale lavender (#EEE8F5)", ko: "옅은 라벤더(#EEE8F5)" },
    sky: { label: "하늘", hex: "#E8F0F6", en: "pale sky (#E8F0F6)", ko: "옅은 하늘(#E8F0F6)" }
  };

  const OUTFITS = {
    navy: { label: "네이비 조끼", hex: "#43536E", en: "a navy vest over a pastel blue shirt", ko: "파스텔 블루 셔츠 위에 걸친 네이비 조끼" },
    peach: { label: "피치 후디", hex: "#F2B49A", en: "an oversized peach hoodie", ko: "큼직한 피치색 후디" },
    mint: { label: "민트 니트", hex: "#A8C7B4", en: "a soft mint knit sweater", ko: "부드러운 민트색 니트" },
    lavender: { label: "라벤더 잠옷", hex: "#C3B3DC", en: "lilac pajamas", ko: "라일락색 잠옷" },
    butter: { label: "버터 셔츠", hex: "#EFD69B", en: "a butter-yellow shirt with rolled sleeves", ko: "소매를 걷은 버터색 셔츠" }
  };

  const COMPANIONS = {
    dog: {
      label: "강아지 빼꼼",
      en: "a small beige puppy with one brown floppy ear, only its head and one front paw visible, cropped by the bottom-left frame edge",
      ko: "한쪽 귀만 갈색인 작은 베이지 강아지. 머리와 앞발 하나만 보이고 화면 왼쪽 아래 모서리에 잘려 있음"
    },
    cat: {
      label: "고양이 빼꼼",
      en: "a small pale-grey tabby cat, only its head and one paw visible, cropped by the bottom-right frame edge",
      ko: "옅은 회색 줄무늬 고양이. 머리와 발 하나만 보이고 화면 오른쪽 아래 모서리에 잘려 있음"
    },
    none: { label: "없음", en: "", ko: "" }
  };

  const EMOTIONS = {
    blank: { label: "멍때림", en: "two flat dot eyes and a tiny straight mouth, staring into the middle distance", ko: "납작한 점 눈 두 개에 짧은 일자 입, 허공을 바라보는 표정" },
    proud: { label: "뿌듯", en: "eyes drawn as two small upward arcs and a small self-satisfied smile", ko: "위로 굽은 눈 두 개와 작은 뿌듯한 미소" },
    teary: { label: "울컥", en: "shiny dot eyes with two tiny tear drops at the corners and a wobbly mouth", ko: "촉촉한 점 눈에 눈가의 작은 눈물 방울 두 개, 떨리는 입" },
    laugh: { label: "빵 터짐", en: "eyes squeezed into two ^ ^ shapes and an open smiling mouth", ko: "^ ^ 모양으로 접힌 눈과 벌린 웃음 입" },
    cozy: { label: "포근", en: "eyes closed as two soft curves and a small content smile", ko: "부드러운 곡선으로 감은 눈과 작은 만족스러운 미소" }
  };

  const PROPS = {
    notebook: { label: "공책과 연필", en: "an open spiral notebook on the floor and a pencil in one hand", ko: "바닥에 펼친 스프링 공책과 손에 든 연필" },
    mug: { label: "머그잔", en: "a big white mug held with both hands, two thin curls of steam rising", ko: "두 손으로 감싼 큼직한 흰 머그잔, 가는 김 두 줄기" },
    blanket: { label: "이불", en: "a soft pastel blanket pulled up to the chin, only the head and two hands showing", ko: "턱까지 끌어올린 파스텔 이불, 머리와 두 손만 보임" },
    noodles: { label: "라면 냄비", en: "a yellow pot of instant noodles and chopsticks lifted mid-bite", ko: "노란 라면 냄비와 입으로 가져가는 젓가락" },
    phone: { label: "휴대폰", en: "a phone held in one hand, the screen a flat pale rectangle", ko: "한 손에 든 휴대폰, 화면은 옅은 단색 사각형" },
    none: { label: "소품 없음", en: "no props at all", ko: "소품 없음" }
  };

  const FORMATS = [
    { id: "single", label: "단일 컷", note: "한 장짜리 툰", panels: 0,
      en: "one single panel", ko: "한 장짜리 단일 컷" },
    { id: "four", label: "4컷 세로", note: "위에서 아래로", panels: 4,
      en: "a four-panel vertical comic strip, read top to bottom, panels separated by even cream gutters", ko: "위에서 아래로 읽는 세로 4컷, 칸 사이는 배경색 그대로의 여백" },
    { id: "three", label: "3컷 가로", note: "왼쪽에서 오른쪽", panels: 3,
      en: "a three-panel horizontal comic strip, read left to right, panels separated by even cream gutters", ko: "왼쪽에서 오른쪽으로 읽는 가로 3컷, 칸 사이는 배경색 그대로의 여백" },
    { id: "pair", label: "2컷 대비", note: "전 · 후", panels: 2,
      en: "two panels side by side, before and after", ko: "좌우 2칸, 전과 후 대비" }
  ];

  const CAPTION_MODES = [
    { id: "below", label: "그림 아래 손글씨", en: "hand-lettered in the empty margin below the drawing", ko: "그림 아래 여백에 손글씨로" },
    { id: "canvas", label: "그림 안에 손글씨", en: "hand-lettered inside the artwork, at the top of the background", ko: "그림 안 배경 위쪽에 손글씨로" },
    { id: "balloon", label: "말풍선", en: "inside a simple rounded speech balloon with a short tail", ko: "짧은 꼬리가 달린 둥근 말풍선 안에" },
    { id: "none", label: "글자 없이", en: "no lettering at all", ko: "글자 없이" }
  ];

  const PRESETS = [
    {
      id: "notebook",
      emoji: "📓",
      label: "오늘 하루 중 제일 안 아까웠던 시간",
      thumb: "yuna/notebook.jpg",
      caption: "오늘 하루 중 제일 안 아까웠던 시간은 언제야?",
      scene: {
        en: "sits cross-legged on the floor writing in an open notebook, pencil in hand, thinking",
        ko: "바닥에 책상다리를 하고 앉아 공책에 뭔가를 적다가 생각에 잠긴 모습"
      },
      beats: {
        en: ["staring at a blank page, pencil hovering", "writes one line, then crosses it out", "stops, looks up, small proud smile", "closes the notebook with both hands"],
        ko: ["빈 페이지를 바라보며 연필을 든 채 멈춤", "한 줄을 적었다가 지움", "고개를 들어 작게 뿌듯한 미소", "두 손으로 공책을 덮음"]
      },
      seed: { format: "single", outfit: "navy", companion: "dog", bg: "cream", emotion: "blank", prop: "notebook", ratio: "1:1", captionMode: "below" }
    },
    {
      id: "mug",
      emoji: "☕",
      label: "머그잔 들고 멍때리기",
      thumb: "yuna/mug-idle.jpg",
      caption: "아무 생각 없이 있는 것도 생각을 쓰는 일이다.",
      scene: {
        en: "slouches while holding a big mug with both hands, steam curling up, staring into nothing",
        ko: "어깨를 축 늘어뜨리고 두 손으로 큰 머그잔을 감싼 채 김을 바라보며 멍때리는 모습"
      },
      beats: {
        en: ["picks up the mug and blows on it", "stares at nothing, one blink", "the mug is empty and still being held", "sets it down and sighs"],
        ko: ["머그잔을 들어 입김을 불어 식힘", "허공을 바라보며 눈을 한 번 깜빡", "잔은 비었는데도 계속 들고 있음", "잔을 내려놓고 한숨"]
      },
      seed: { format: "single", outfit: "peach", companion: "cat", bg: "ivory", emotion: "blank", prop: "mug", ratio: "1:1", captionMode: "below" }
    },
    {
      id: "bed",
      emoji: "🛌",
      label: "오후 2시, 이불 속",
      thumb: "yuna/bed-2pm.jpg",
      caption: "낮잠은 인생의 절반이다.",
      scene: {
        en: "lies buried under a pastel blanket, only the head and two little hands above the edge, eyes closed",
        ko: "파스텔 이불 속에 파묻혀 이불 끝 위로 머리와 두 손만 내놓고 눈을 감고 누운 모습"
      },
      beats: {
        en: ["an alarm rings and a hand slaps it off", "pulls the blanket over the head", "one eye opens under the blanket", "gives up and lies still, content"],
        ko: ["자명종이 울리고 손이 더듬어 끔", "이불을 머리 끝까지 끌어올림", "이불 속에서 눈 하나가 떠짐", "체념하고 만족스럽게 그대로 누워 있음"]
      },
      seed: { format: "single", outfit: "mint", companion: "dog", bg: "cream", emotion: "cozy", prop: "blanket", ratio: "4:5", captionMode: "below" }
    },
    {
      id: "night",
      emoji: "🍜",
      label: "야식은 왜 더 맛있을까",
      thumb: "yuna/late-night.jpg",
      caption: "밤 11시의 라면은 왜 이렇게 맛있을까.",
      scene: {
        en: "sits cross-legged at a low table at night eating instant noodles, cheeks puffed, a small lamp glowing behind",
        ko: "밤에 낮은 상 앞에 책상다리로 앉아 볼이 빵빵하게 라면을 먹고, 뒤로 작은 스탠드가 켜져 있는 모습"
      },
      beats: {
        en: ["checks the clock: 11 p.m.", "the pot is already boiling", "slurps with puffed cheeks", "leans back, empty pot, satisfied"],
        ko: ["시계를 봄: 밤 11시", "냄비는 벌써 끓고 있음", "볼이 빵빵하게 후루룩", "빈 냄비를 두고 만족스럽게 뒤로 기댐"]
      },
      seed: { format: "single", outfit: "lavender", companion: "cat", bg: "ivory", emotion: "laugh", prop: "noodles", ratio: "1:1", captionMode: "below" }
    },
    {
      id: "commute",
      emoji: "🚇",
      label: "퇴근길, 남은 자리 하나",
      thumb: "yuna/commute-seat.jpg",
      caption: "오늘도 나는 그 자리를 남에게 양보했다.",
      scene: {
        en: "stands on a subway train holding a strap, one empty seat visible behind them, eyes closed",
        ko: "지하철 손잡이를 잡고 서 있고, 뒤로 빈자리 하나가 보이며, 눈을 감고 있는 모습"
      },
      beats: {
        en: ["the doors open, everyone looks up", "one seat is empty, they step toward it", "someone else sits down first", "they stand there with a tiny smile"],
        ko: ["문이 열리고 모두 고개를 듦", "빈자리 하나, 그쪽으로 한 걸음", "다른 사람이 먼저 앉음", "작게 웃으며 그냥 선다"]
      },
      seed: { format: "four", outfit: "butter", companion: "none", bg: "sky", emotion: "teary", prop: "none", ratio: "4:5", captionMode: "below" }
    },
    {
      id: "monday",
      emoji: "😵",
      label: "월요일 아침의 나",
      thumb: "yuna/monday-bed.jpg",
      caption: "월요일 아침엔 나도 나를 잘 모르겠다.",
      scene: {
        en: "sits up in bed with hair sticking out in two strands, eyes half-open, one sock on",
        ko: "침대에서 일어나 앉았는데 머리카락이 두 갈래로 삐죽 서고, 눈은 반쯤 감겼고, 양말은 한 짝만 신은 모습"
      },
      beats: {
        en: ["the alarm rings, a hand reaches out blindly", "sits up with hair standing", "hunts for the other sock", "leaves the house with mismatched socks"],
        ko: ["자명종이 울리고 손이 눈먼 채로 더듬음", "머리카락이 서고 일어나 앉음", "다른 양말 한 짝을 찾아 헤맴", "짝짝이 양말로 집을 나섬"]
      },
      seed: { format: "four", outfit: "mint", companion: "dog", bg: "peach", emotion: "blank", prop: "phone", ratio: "4:5", captionMode: "below" }
    }
  ];

  MPS.register({
    id: "yuna",
    order: 3,
    name: "YUNA",
    engName: "YUNA",
    tab: "일상 다이어리툰",
    tabSub: "플랫 파스텔 · 공감",
    accent: "#b07a4f",
    accentSoft: "#f4e6d6",
    ink: "#4a3728",
    tagline: "오늘 하루, 한 컷",
    summary:
      "크림·아이보리 단색 배경에 둥글둥글한 2D 인스타툰 캐릭터. 큰 동그란 머리에 점 눈 두 개, 정수리 머리카락 두 가닥, 진갈색 둥근 외곽선, 명암 없는 플랫 파스텔. 구석에 빼꼼 내민 강아지·고양이와 포근한 공감 한 줄.",
    hero: { src: "yuna/notebook.jpg", alt: "크림 배경에 공책에 적는 동그란 캐릭터와 빼꼼 내민 강아지" },
    facts: [
      { k: "배경", v: "단색 파스텔", d: "크림 · 아이보리 · 피치 · 민트" },
      { k: "머리 : 몸", v: "1 : 1.1", d: "동그란 머리, 작은 몸" },
      { k: "외곽선", v: "3~4px", d: "진갈색 #4A3728 · 둥근 모서리" },
      { k: "채색", v: "플랫 2~4색", d: "명암·하이라이트 없음" }
    ],
    dna: [
      { tag: "01 · 배경", title: "따뜻한 단색 한 판", swatch: "#F7EFE4",
        body: "크림·아이보리·피치·민트 같은 따뜻한 파스텔 단색이 화면을 가득 채웁니다. 그라데이션도, 종이 질감도, 바닥선도, 벽지 무늬도 없습니다. 배경은 캐릭터가 편히 놓일 수 있는 방의 공기입니다.",
        spec: "단색 1색 · #F7EFE4 계열 · 텍스처 0 · 그라데이션 0" },
      { tag: "02 · 머리", title: "몸보다 큰 동그란 머리", swatch: "#FFFFFF",
        body: "머리는 정원(正圓) 하나로 그린 크고 둥근 덩어리, 몸은 그와 거의 같은 높이의 둥근 덩어리. 목은 거의 없고 팔다리는 짧고 통통합니다. 손은 벙어리장갑처럼 뭉툭하게, 손가락은 생략합니다.",
        spec: "머리 : 몸 ≈ 1 : 1.1 · 목 생략 · 팔다리 3등신" },
      { tag: "03 · 얼굴", title: "점 눈 두 개, 코 없음", swatch: "#2B2118",
        body: "눈은 작은 검은 점 두 개, 코는 없고, 입은 짧은 선 하나 또는 생략. 눈썹도 대개 없습니다. 표정은 눈 모양(점·호·^ ^)과 입꼬리 하나로만 만들고, 볼 터치는 넣지 않습니다.",
        spec: "눈 = 점 2개 · 코 없음 · 입 = 한 획 · 볼터치 없음" },
      { tag: "04 · 머리카락", title: "정수리의 두 가닥", swatch: "#6B5546",
        body: "정수리에서 가느다란 머리카락 두 가닥이 안테나처럼 삐죽 올라와 있습니다. 이 두 가닥이 캐릭터의 표식이고, 움직일 때 살짝 흔들립니다. 옆머리는 둥근 머리선을 따라 한 덩어리로 붙습니다.",
        spec: "가닥 2개 · 길이 6~10px · 곡선 하나씩" },
      { tag: "05 · 선", title: "진갈색 둥근 외곽선", swatch: "#4A3728",
        body: "검정이 아닌 진한 갈색(#4A3728) 외곽선이 3~4px 두께로 일정하게 둘러집니다. 굵기가 변하지 않고, 끝과 모서리는 둥글게 마감합니다. 스케치처럼 겹쳐 그은 선이나 삐죽한 펜 끝은 없습니다.",
        spec: "외곽선 #4A3728 · 3~4px 균일 · 라운드 조인 · 테이퍼 없음" },
      { tag: "06 · 채색", title: "명암 없는 플랫 파스텔", swatch: "#A8C7B4",
        body: "옷과 소품은 파스텔 2~4색으로 평평하게 채웁니다. 명암·하이라이트·블러셔·드롭섀도가 전혀 없고, 색 경계는 외곽선으로만 나뉩니다. 색은 낮은 채도, 따뜻한 쪽으로 기울입니다.",
        spec: "플랫 2~4색 · 채도 30~55% · 그림자 0 · 하이라이트 0" },
      { tag: "07 · 빼꼼", title: "구석의 보조 캐릭터", swatch: "#E5D3BC",
        body: "화면 한쪽 구석에 강아지나 고양이가 머리와 앞발만 내밀고 있습니다. 프레임에 잘린 채로 등장해 '지금 막 들어왔다'는 느낌을 줍니다. 주인공보다 작고, 표정은 점 눈 두 개와 입 하나.",
        spec: "머리+발만 · 프레임에 크롭 · 주인공의 60% 크기" },
      { tag: "08 · 말", title: "한 줄 공감과 질문", swatch: "#D9A0A0",
        body: "대사는 짧은 한 줄. 질문을 던지거나('오늘 하루 중 제일 안 아까웠던 시간은?') 스스로를 놀리는 톤('낮잠은 인생의 절반이다'). 손글씨체로 작게, 그림 아래 여백이나 말풍선 안에 넣습니다.",
        spec: "10~25자 · 반말 · 질문 또는 자기 놀림 · 손글씨 1줄" }
    ],

    controls: [
      { key: "scene", type: "text", label: "장면 직접 입력", placeholder: "예: 소파에서 넷플릭스를 켜 놓고 잠들어 버린 밤",
        hint: "비우면 프리셋 장면을 씁니다" },
      { key: "format", type: "chips", label: "형식", options: FORMATS },
      { key: "emotion", type: "chips", label: "표정", options: Object.entries(EMOTIONS).map(([id, v]) => ({ id, label: v.label, en: v.en, ko: v.ko })) },
      { key: "prop", type: "chips", label: "소품", options: Object.entries(PROPS).map(([id, v]) => ({ id, label: v.label, en: v.en, ko: v.ko })) },
      { key: "companion", type: "chips", label: "구석의 빼꼼", options: Object.entries(COMPANIONS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "outfit", type: "swatch", label: "옷 색", options: Object.entries(OUTFITS).map(([id, v]) => ({ id, label: v.label, hex: v.hex, en: v.en, ko: v.ko })) },
      { key: "bg", type: "swatch", label: "배경색", options: Object.entries(BACKGROUNDS).map(([id, v]) => ({ id, label: v.label, hex: v.hex, en: v.en, ko: v.ko })) },
      { key: "ratio", type: "chips", label: "화면 비율", options: MPS.RATIOS },
      { key: "caption", type: "caption", label: "한 줄 대사", placeholder: "예: 오늘 하루 중 제일 안 아까웠던 시간은?", modes: CAPTION_MODES }
    ],

    defaults: {
      format: "single",
      emotion: "blank",
      prop: "notebook",
      companion: "dog",
      outfit: "navy",
      bg: "cream",
      ratio: "1:1",
      captionMode: "below"
    },

    presets: PRESETS,

    samples: PRESETS.filter((p) => p.thumb).map((p) => ({
      file: p.thumb,
      title: p.label,
      caption: p.caption,
      preset: p.id,
      seed: Object.assign({}, p.seed)
    })),

    build: {
      imageEn(ctx) {
        const fmt = ctx.get("format");
        const emo = ctx.get("emotion");
        const prop = ctx.get("prop");
        const comp = ctx.get("companion");
        const outfit = ctx.get("outfit");
        const bg = ctx.get("bg");
        const ratio = ctx.get("ratio");
        const cap = ctx.text("caption").trim().replace(/\.+$/, "");
        const capMode = ctx.get("captionMode").id;
        const n = fmt.panels;

        const capLine =
          capMode === "none" || !cap
            ? `Lettering: none at all. Keep the drawing free of text.`
            : capMode === "balloon"
            ? `Lettering: the Korean line "${cap}" sits inside one simple rounded speech balloon with a short tail, hand-lettered in a soft, rounded Korean handwriting, 4% of the frame height, black-brown ink, no other text.`
            : capMode === "canvas"
            ? `Lettering: the Korean line "${cap}" is hand-lettered inside the top of the background in a soft rounded Korean handwriting, small, slightly uneven, with generous space around it. No other text.`
            : `Lettering: the Korean line "${cap}" is hand-lettered in the empty margin below the drawing, in a soft rounded Korean handwriting, small and slightly uneven. No other text.`;

        if (ctx.brief) {
          return [
            `Flat 2D Korean insta-toon illustration, ${ratio.en}, ${bg.en} background, no gradient or texture.`,
            `Cute chibi character: oversized round head (head:body 1:1.1), two dot eyes, no nose, tiny mouth, two hair strands on the crown, ${emo.en}.`,
            `Even rounded dark-brown outline (#4A3728) 3–4px, flat pastel fills, no shading, no highlights. ${H.cap(outfit.en)}.`,
            `${H.cap(ctx.scene("en"))}. ${H.cap(prop.en)}.`,
            comp.en ? `In one corner, ${comp.en}.` : "",
            cap && capMode !== "none" ? `Hand-lettered Korean line "${cap}" ${capMode === "balloon" ? "in a speech balloon" : capMode === "canvas" ? "inside the background" : "below the drawing"}.` : "No lettering.",
            `Warm, quietly funny everyday mood. No 3D, no shading, no anime eyes, no extra text.`
          ].filter(Boolean).join(" ");
        }

        const panelsLine = n
          ? `Format: ${fmt.en}. Every panel uses the identical character, outline weight and flat palette; only the pose, prop state and expression change. Panel beats: ` +
            ctx.pick(ctx.preset.beats.en, n).map((b, i) => `${i + 1}) ${b}.`).join(" ") +
            ` Keep the gutters clean background colour — no panel borders unless a single hairline is needed.`
          : `Format: ${fmt.en}, one drawing that carries the whole joke.`;

        return [
          `A flat 2D Korean insta-toon (diary comic) illustration — the kind of warm, self-deprecating daily cartoon people post when they want to say "me too".`,
          panelsLine,
          `Background: ${bg.en}, one perfectly even flat tone filling the whole frame. No gradient, no paper texture, no floor line, no wallpaper, no shadow on the wall, no background objects unless the joke needs one.`,
          `Character: a chibi figure whose head is a large perfect circle and whose body is a rounded blob of almost the same height (head : body ≈ 1 : 1.1). No neck, short rounded limbs, mitten hands with no fingers, tiny feet. Ears as small half-circles. Two thin hair strands stand straight up from the crown and curve slightly, like tiny antennae; the rest of the hair is one rounded mass.`,
          `Face: ${emo.en}. Eyes are small solid dots, the nose is omitted entirely, the mouth is a single short stroke. No eyebrows, no blush, no eyelashes, no sparkle.`,
          `Line: an even, rounded dark-brown outline (#4A3728) about 3–4 px thick at this scale, with rounded joins and no taper, no sketchy double strokes, no pen texture. Interior lines (clothing seams, blanket folds) are the same brown but thinner.`,
          `Colour: flat pastel fills only, two to four colours per image, low saturation and warm. ${H.cap(outfit.en)}. Skin is a warm off-white (#FCF4EA). Absolutely no shading, no highlight, no gradient, no texture, no drop shadow.`,
          `Pose and prop: ${H.cap(ctx.scene("en"))}. ${H.cap(prop.en)}.`,
          comp.en
            ? `Second character: in one corner of the frame, ${comp.en} — it is cropped by the edge and blends into the background with no sticker border or white panel behind it.`
            : `No second character.`,
          capLine,
          `Composition: generous empty background around the character (at least 35% of the frame stays plain colour), character centred or slightly off to one side, eye level straight on.`,
          `Mood: cozy, warm, gently funny, quietly relatable — the feeling of a friend's message at 11 p.m.`,
          `Output: one still image, ${ratio.en}, high resolution.`,
          `Avoid: 3D, painterly or watercolour texture, gradients, shading, cel shadows, anime sparkle eyes, realistic proportions, detailed rooms, chibi exaggeration beyond the head, extra fingers, busy patterns, sticker borders, any text other than the single Korean line.`
        ].join("\n\n");
      },

      imageKo(ctx) {
        const fmt = ctx.get("format");
        const emo = ctx.get("emotion");
        const prop = ctx.get("prop");
        const comp = ctx.get("companion");
        const outfit = ctx.get("outfit");
        const bg = ctx.get("bg");
        const ratio = ctx.get("ratio");
        const cap = ctx.text("caption").trim().replace(/\.+$/, "");
        const capMode = ctx.get("captionMode").id;
        const n = fmt.panels;

        const capLine =
          capMode === "none" || !cap
            ? `글씨: 전혀 넣지 않습니다. 그림은 글자 없이 깨끗하게.`
            : capMode === "balloon"
            ? `글씨: 한국어 한 줄 "${cap}"${H.josa(cap, "을", "를")} 짧은 꼬리가 달린 둥근 말풍선 하나에 손글씨로 넣습니다. 둥글고 부드러운 한글 손글씨, 크기는 화면 높이의 4% 정도, 먹갈색. 다른 글자는 없습니다.`
            : capMode === "canvas"
            ? `글씨: 한국어 한 줄 "${cap}"${H.josa(cap, "을", "를")} 배경 위쪽 빈 공간에 둥글고 부드러운 한글 손글씨로 넣습니다. 작고 살짝 삐뚤하게, 주변에 여백을 넉넉히. 다른 글자는 없습니다.`
            : `글씨: 한국어 한 줄 "${cap}"${H.josa(cap, "을", "를")} 그림 아래 빈 여백에 둥글고 부드러운 한글 손글씨로 넣습니다. 작고 살짝 삐뚤하게. 다른 글자는 없습니다.`;

        if (ctx.brief) {
          return [
            `플랫 2D 한국 인스타툰 일러스트, ${ratio.ko}, ${bg.ko} 단색 배경, 그라데이션·질감 없음.`,
            `큰 동그란 머리(머리:몸 = 1:1.1)의 데포르메 캐릭터, 점 눈 두 개, 코 없음, 짧은 입 하나, 정수리 머리카락 두 가닥, ${emo.ko}.`,
            `진갈색(#4A3728) 둥근 외곽선 3~4px, 플랫 파스텔 채색, 명암·하이라이트 없음. ${outfit.ko}.`,
            `${ctx.scene("ko")}. ${prop.ko}.`,
            comp.ko ? `한쪽 구석에 ${comp.ko}.` : "",
            cap && capMode !== "none" ? `손글씨 한 줄 "${cap}" ${capMode === "balloon" ? "말풍선 안에" : capMode === "canvas" ? "배경 위쪽에" : "그림 아래에"}.` : "글자 없음.",
            `포근하고 조용히 웃긴 일상 공감 톤. 3D·명암·애니메이션 눈·여분 글자 금지.`
          ].filter(Boolean).join(" ");
        }

        const panelsLine = n
          ? `형식: ${fmt.ko}. 모든 칸이 똑같은 캐릭터, 같은 외곽선 굵기, 같은 플랫 팔레트를 씁니다. 자세·소품 상태·표정만 바뀝니다. 칸별 연출: ` +
            ctx.pick(ctx.preset.beats.ko, n).map((b, i) => `${i + 1}) ${b}.`).join(" ") +
            ` 칸 사이는 배경색 그대로의 깨끗한 여백으로 나누고, 꼭 필요할 때만 아주 얇은 경계선 하나를 씁니다.`
          : `형식: ${fmt.ko}. 한 장 안에서 상황과 표정으로 이야기를 끝냅니다.`;

        return [
          `플랫 2D 한국 인스타툰(일기툰) 일러스트 — "나도 그래"라고 말하고 싶을 때 올리는 따뜻하고 자조적인 일상 만화의 화법.`,
          panelsLine,
          `배경: ${bg.ko} 단색 한 색이 화면 전체를 고르게 채웁니다. 그라데이션 없음, 종이 질감 없음, 바닥선 없음, 벽지 무늬 없음, 벽 그림자 없음, 이야기에 꼭 필요한 경우가 아니면 배경 사물도 없습니다.`,
          `캐릭터: 머리가 큰 정원 하나이고 몸은 그와 거의 같은 높이의 둥근 덩어리인 데포르메(머리:몸 ≈ 1:1.1). 목은 없고 팔다리는 짧고 통통, 손은 손가락 없이 벙어리장갑처럼, 발은 아주 작습니다. 귀는 작은 반원. 정수리에서 가는 머리카락 두 가닥이 안테나처럼 곧게 서서 살짝 휘고, 나머지 머리는 둥근 덩어리 하나입니다.`,
          `얼굴: ${emo.ko}. 눈은 작고 꽉 찬 점 두 개, 코는 완전히 생략, 입은 짧은 선 하나. 눈썹·볼터치·속눈썹·반짝임은 없습니다.`,
          `선: 진한 갈색(#4A3728)의 일정하고 둥근 외곽선 3~4px. 모서리는 둥글게, 굵기 변화 없음, 겹쳐 그은 스케치선 없음, 펜 질감 없음. 옷 솔기나 이불 주름 같은 내부선은 같은 갈색의 더 얇은 선으로.`,
          `채색: 플랫 파스텔만, 한 장에 2~4색, 낮은 채도에 따뜻한 쪽. ${outfit.ko}. 피부는 따뜻한 미색(#FCF4EA). 명암·하이라이트·그라데이션·질감·그림자는 전혀 없습니다.`,
          `자세와 소품: ${ctx.scene("ko")}. ${prop.ko}.`,
          comp.ko
            ? `보조 캐릭터: 화면 한쪽 구석에 ${comp.ko}. 프레임 가장자리에 잘린 채로, 스티커 테두리나 흰 판 없이 배경에 자연스럽게 녹아 있습니다.`
            : `보조 캐릭터는 없습니다.`,
          capLine,
          `구도: 캐릭터 주변으로 빈 배경을 넉넉히(화면의 35% 이상은 민무늬 색으로) 남기고, 캐릭터는 중앙 또는 살짝 한쪽으로 치우쳐 정면 눈높이에 놓습니다.`,
          `분위기: 포근하고 따뜻하고 조용히 웃긴, 밤 11시에 친구가 보낸 메시지 같은 느낌.`,
          `출력: 정지 이미지 한 장, ${ratio.ko}, 고해상도.`,
          `금지: 3D, 유화·수채 질감, 그라데이션, 명암, 셀 그림자, 애니메이션처럼 반짝이는 눈, 사실적 비율, 자세한 방 배경, 과도한 데포르메, 손가락 추가, 복잡한 무늬, 스티커 테두리, 지정한 한 줄 외의 모든 글자.`
        ].join("\n\n");
      },

      motionEn(ctx) {
        const fmt = ctx.get("format");
        const emo = ctx.get("emotion");
        const prop = ctx.get("prop");
        const comp = ctx.get("companion");
        const bg = ctx.get("bg");
        const ratio = ctx.get("ratio");
        const n = fmt.panels;
        const propMotion =
          prop.id === "mug"
            ? "two thin curls of steam rise and dissolve on a 3-second cycle"
            : prop.id === "notebook"
            ? "the pencil tip taps the page twice, leaving no mark"
            : prop.id === "blanket"
            ? "the blanket edge rises and falls with the breath"
            : prop.id === "noodles"
            ? "steam curls from the pot and a noodle strand sways"
            : prop.id === "phone"
            ? "the flat phone screen brightens by 3% and dims again"
            : "the hem of the shirt settles";

        if (ctx.brief) {
          return `4-second seamless 2D loop, 12 fps on twos, static camera: ${n ? n + "-panel strip, panels animate one after another" : "single panel"}, two-frame hand-drawn boil (≤1 px), one blink, ${propMotion}, ${comp.en ? "the pet's ear twitches and its tail wags once" : "a small weight shift"}, ${bg.en} background never changes, no zoom, no morph, no 3D, no added text.`;
        }

        const panelsLine = n
          ? `Panel timing: each of the ${n} panels animates in turn for about 1 second — the earlier ones settle while the next wakes — and at the end everything holds for half a second before the loop restarts. Nothing moves between panels; no sliding, no camera move.`
          : `Single panel: nothing enters or leaves. The whole loop happens in place.`;

        return [
          `Animate the illustration as a 4-second seamless loop in limited 2D webtoon animation — 12 drawings per second on twos, 24 fps playback. It should feel like a hand-drawn comic that took one small breath, not like a motion graphic.`,
          `Camera: locked. No pan, no zoom, no parallax, no shake. The background ${bg.en} stays exactly the same colour and value in every frame.`,
          panelsLine,
          `Boil: the entire drawing alternates between two hand-drawn versions every six frames, with a difference of no more than one pixel — the "line boil" of traditional 2D animation. Nothing else about the line changes: same 3–4 px brown outline (#4A3728) in both versions.`,
          `Micro-motion: one blink (eyes close to a line and open again over four frames), the mouth corner lifting by one pixel, one small weight shift in the shoulders, ${propMotion}. The two hair strands on the crown bend by 2 px and spring back one frame later.`,
          comp.en ? `The pet in the corner: one ear twitch, one tail wag, one slow blink, then still — it stays cropped by the frame edge the whole time.` : ``,
          `Hold: at least one second of the loop is almost completely still, so the movement reads as a small human moment rather than constant fidgeting.`,
          `Style guardrails: flat colour and the same outline in every frame; no shading, no gradients, no lighting change, no squash-and-stretch beyond 2%, no 3D, no morphing, no added text, no new props.`,
          `Ending: the last frame matches the first exactly for a seamless loop.`
        ].filter(Boolean).join("\n\n");
      },

      motionKo(ctx) {
        const fmt = ctx.get("format");
        const prop = ctx.get("prop");
        const comp = ctx.get("companion");
        const bg = ctx.get("bg");
        const n = fmt.panels;
        const propMotion =
          prop.id === "mug"
            ? "가는 김 두 줄기가 3초 주기로 올라왔다 사라집니다"
            : prop.id === "notebook"
            ? "연필 끝이 종이를 두 번 톡톡 치지만 자국은 남기지 않습니다"
            : prop.id === "blanket"
            ? "이불 끝이 숨에 맞춰 1~2px 오르내립니다"
            : prop.id === "noodles"
            ? "냄비에서 김이 피어오르고 면 가닥 하나가 흔들립니다"
            : prop.id === "phone"
            ? "휴대폰 화면이 3% 밝아졌다 다시 어두워집니다"
            : "셔츠 자락이 가라앉습니다";

        if (ctx.brief) {
          return `4초 무한 반복 2D 루프, 12fps(2프레임 유지), 카메라 고정: ${n ? n + "칸 스트립, 칸이 차례로 움직임" : "단일 컷"}, 두 버전 손그림 보일링(1px 이내), 눈 깜빡임 한 번, ${propMotion}, ${comp.ko ? "보조 캐릭터 귀 씰룩과 꼬리 한 번" : "작은 무게 중심 이동"}, ${bg.ko} 배경은 절대 변하지 않음, 줌·모핑·3D·글자 추가 금지.`;
        }

        const panelsLine = n
          ? `칸별 타이밍: ${n}칸이 약 1초씩 차례로 살아납니다 — 앞 칸이 가라앉으면 다음 칸이 깨어나고, 마지막에 0.5초 전체 정지 후 루프가 다시 시작됩니다. 칸 사이를 넘나드는 움직임이나 카메라 이동은 없습니다.`
          : `단일 컷: 무언가 들어오거나 나가지 않습니다. 모든 움직임이 제자리에서 일어납니다.`;

        return [
          `일러스트를 4초 무한 반복의 제한 2D 웹툰 애니메이션으로 만듭니다. 초당 12장(2프레임 유지), 재생 24fps. 모션 그래픽이 아니라 손으로 그린 만화가 작게 숨을 한 번 쉰 것처럼 보여야 합니다.`,
          `카메라: 고정. 팬·줌·시차·흔들림 없음. ${bg.ko} 배경은 모든 프레임에서 색과 밝기가 정확히 같습니다.`,
          panelsLine,
          `보일링: 그림 전체가 6프레임마다 손으로 그린 두 버전을 번갈아 씁니다. 차이는 1px 이내. 전통 2D 애니메이션의 선 떨림입니다. 선 자체는 바뀌지 않습니다 — 두 버전 모두 같은 3~4px 진갈색(#4A3728) 외곽선.`,
          `미세 동작: 눈 깜빡임 한 번(4프레임에 걸쳐 점이 선으로 접혔다 다시 열림), 입꼬리 1px 상승, 어깨의 작은 무게 중심 이동, ${propMotion}. 정수리 머리카락 두 가닥이 2px 휘었다가 한 프레임 늦게 돌아옵니다.`,
          comp.ko ? `구석의 보조 캐릭터: 귀 한 번 씰룩, 꼬리 한 번, 느린 눈 깜빡임 한 번, 그다음 정지. 내내 프레임 가장자리에 잘린 상태로 있습니다.` : ``,
          `정지 구간: 루프 중 최소 1초는 거의 완전히 멈춰 있어, 끊임없이 꿈틀대는 영상이 아니라 작은 사람의 순간처럼 읽히게 합니다.`,
          `스타일 가드레일: 모든 프레임에서 플랫한 색과 같은 외곽선. 명암·그라데이션·조명 변화·2% 넘는 스쿼시앤스트레치·3D·모핑·글자 추가·새 소품은 금지합니다.`,
          `마무리: 마지막 프레임이 첫 프레임과 정확히 같아 반복이 보이지 않습니다.`
        ].filter(Boolean).join("\n\n");
      }
    },

    randomize(ctx) {
      const p = PRESETS[Math.floor(Math.random() * PRESETS.length)];
      const pick = (obj) => Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];
      return {
        preset: p.id,
        seed: Object.assign({}, p.seed, {
          format: p.seed.format,
          emotion: pick(EMOTIONS),
          bg: pick(BACKGROUNDS),
          outfit: pick(OUTFITS),
          ratio: ["1:1", "4:5", "4:5", "9:16"][Math.floor(Math.random() * 4)]
        }),
        caption: p.caption
      };
    }
  });
})();
