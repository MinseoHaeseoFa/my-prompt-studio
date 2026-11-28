/* ============================================================
   My Prompt Studio · data/wool.js
   ⑨ WOOL — 울 소품 콜라주 (가는 연필선 + 진짜 퍼지 울)
   흰 수채 종이 위에 연필로 그린 작은 아이와, 그 위에 실제로
   얹은 니트·펠트 소품이 한 장면을 이루는 혼합 매체 작품을
   이미지/영상 × 영어/한국어 4종 프롬프트로 다시 엮은 모듈.
   글자·손글씨·워터마크는 넣지 않는다(공통 TEXT_GUARD).
   ============================================================ */

(function () {
  const H = MPS.helpers;

  /* ---------- 아이 ---------- */
  const FIGURES = {
    girl: {
      label: "여자아이",
      en: "one small girl with a soft bobbed cut, drawn with single pencil strands, her hands resting where the wool will sit",
      ko: "부드러운 단발머리를 한 작은 여자아이 하나. 머리카락은 연필 한 올씩, 손은 울 소품이 놓일 자리에",
      short: "a small girl"
    },
    boy: {
      label: "남자아이",
      en: "one small boy with a short mop of pencil hair and slightly oversized clothes, hands in his pockets or at his sides",
      ko: "짧은 연필 머리와 조금 큰옷을 입은 작은 남자아이 하나, 손은 주머니나 옆에",
      short: "a small boy"
    },
    two: {
      label: "아이 둘",
      en: "two small children standing side by side and holding hands, the taller one a head above the other",
      ko: "나란히 서서 손을 잡은 작은 아이 둘, 한 아이가 머리 하나만큼 큰",
      short: "two small children"
    },
    none: {
      label: "사람 없이",
      en: "no figure at all — only the real wool objects arranged on the bare paper, with a few drawn guide lines",
      ko: "그림 없이 — 빈 종이 위에 진짜 울 소품만 놓고, 몇 개의 연필 안내선만",
      short: "no figure, wool only"
    }
  };

  /* ---------- 울 소품 ---------- */
  const WOOLS = {
    pomHat: {
      label: "방울모자",
      hex: "#F3B7C4",
      en: "a real hand-knitted bobble hat with a thick ribbed brim and a soft pom-pom, its wool fuzzy and slightly uneven, sitting exactly over the drawn head so it becomes the character's hat",
      ko: "두툼한 고무단과 부드러운 방울이 달린 진짜 손뜨개 모자. 보풀이 살아 있고 조금 울퉁불퉁한 털실이 그려진 머리 위에 정확히 얹혀 아이의 모자가 됩니다",
      short: "a real knitted bobble hat"
    },
    mittens: {
      label: "벙어리장갑",
      hex: "#F2E6CF",
      en: "a pair of real knitted mittens, chunky and soft, worn over the drawn hands so the hands read as little paws",
      ko: "도톰하고 부드러운 진짜 손뜨개 벙어리장갑 한 켤레. 그려진 두 손에 씌워 손이 작은 발바닥처럼 보이게",
      short: "a pair of real knitted mittens"
    },
    scarf: {
      label: "목도리",
      hex: "#D9A63F",
      en: "one real long knitted scarf in a chunky rib, wrapped around both drawn necks with the fringed ends hanging down past the hem",
      ko: "굵은 골지로 짠 진짜 긴 목도리 하나. 그려진 두 아이의 목에 함께 둘러지고 술 달린 끝이 옷자락 아래로 늘어집니다",
      short: "a real knitted scarf"
    },
    feltCat: {
      label: "펠트 고양이",
      hex: "#9A938C",
      en: "a real needle-felted wool cat curled asleep, its surface all soft fibre, a tiny stitched nose and closed eyes, resting against the drawn knee",
      ko: "바늘 펠트로 만든 진짜 양모 고양이. 온몸이 부드러운 섬유이고 코와 감은 눈만 작게 수놓았으며, 그려진 무릎에 붙어 잠들어 있습니다",
      short: "a real felted wool cat"
    },
    blanket: {
      label: "담요",
      hex: "#F1EAD9",
      en: "a real fuzzy wool blanket bunched and folded over the drawn lap and legs, its pile thick enough to hide the knees",
      ko: "그려진 무릎과 다리 위에 뭉쳐 접힌 진짜 보송보송한 울 담요. 파일이 도톰해 무릎이 가려질 만큼",
      short: "a real wool blanket"
    },
    feltFlowers: {
      label: "펠트 꽃송이",
      hex: "#E7A9B0",
      en: "a little garden of real felt balls and wool pom-poms in dusty pink, sage and cream, gathered at the drawn feet like flowers on stems",
      ko: "더스티 핑크와 세이지, 크림색의 진짜 펠트 공과 울 방울로 만든 작은 꽃밭. 그려진 발치에 줄기 위 꽃처럼 모여 있습니다",
      short: "real felt-ball flowers"
    }
  };

  /* ---------- 울 색 ---------- */
  const TONES = {
    rose: {
      label: "더스티 로즈",
      hex: "#F3B7C4",
      en: "dusty rose wool (#F3B7C4) with paler blush fibre and warm white in the fluff",
      ko: "더스티 로즈 울(#F3B7C4), 보풀 끝에 옅은 분홍과 따뜻한 흰색 섬유가 섞인",
      short: "dusty rose wool"
    },
    cream: {
      label: "크림",
      hex: "#F2E6CF",
      en: "warm cream wool (#F2E6CF) with oat and soft ivory fibre in the fluff",
      ko: "따뜻한 크림 울(#F2E6CF), 보풀에 오트밀빛과 부드러운 아이보리 섬유가 섞인",
      short: "cream wool"
    },
    sage: {
      label: "세이지",
      hex: "#B9C6A8",
      en: "soft sage wool (#B9C6A8) with pale moss and grey-green fibre in the fluff",
      ko: "부드러운 세이지 울(#B9C6A8), 보풀에 옅은 이끼색과 회녹색 섬유가 섞인",
      short: "sage wool"
    },
    butter: {
      label: "버터 옐로",
      hex: "#D9A63F",
      en: "muted butter-yellow wool (#D9A63F) with honey and pale straw fibre in the fluff",
      ko: "차분한 버터 옐로 울(#D9A63F), 보풀에 꿀빛과 옅은 밀짚색 섬유가 섞인",
      short: "butter-yellow wool"
    },
    grey: {
      label: "그레이",
      hex: "#9A938C",
      en: "soft grey wool (#9A938C) with ash and pale silver fibre in the fluff",
      ko: "부드러운 그레이 울(#9A938C), 보풀에 잿빛과 옅은 은색 섬유가 섞인",
      short: "grey wool"
    }
  };

  /* ---------- 빛 ---------- */
  const LIGHTS = {
    day: {
      label: "창가의 낮빛",
      en: "soft diffused daylight from the upper left, the kind that comes through a window on a bright winter afternoon; the paper stays warm white and the wool casts a light shadow of 2 to 4 mm",
      ko: "겨울 오후 창으로 들어오는 부드럽고 확산된 낮빛, 왼쪽 위에서. 종이는 따뜻한 흰색 그대로이고 울은 2~4mm의 옅은 그림자를 드리웁니다"
    },
    overcast: {
      label: "흐린 날",
      en: "flat overcast light with almost no direction, the paper reading slightly cooler and the wool shadow very soft and short",
      ko: "방향이 거의 없는 평평한 흐린 빛. 종이가 조금 차게 읽히고 울 그림자는 아주 부드럽고 짧습니다"
    },
    evening: {
      label: "따뜻한 저녁",
      en: "warm low evening lamplight from the right, the paper creamier and the wool shadow longer and softer",
      ko: "오른쪽에서 드는 따뜻하고 낮은 저녁 등빛. 종이가 크림빛으로 데워지고 울 그림자가 더 길고 부드러워집니다"
    }
  };

  /* ---------- 영상 움직임 ---------- */
  const MOTIONS = {
    breathe: {
      label: "아이만 살아 움직임",
      note: "눈 깜빡임 · 숨 한 번",
      en: "the wool and the paper stay perfectly still while the pencil child comes alive: two slow blinks and one small breath",
      ko: "울과 종이는 완전히 멈춰 있고 연필 아이만 살아 움직입니다 — 느린 눈 깜빡임 두 번과 작은 숨 한 번"
    },
    breeze: {
      label: "산들바람",
      note: "보풀 끝만 아주 살짝",
      en: "a faint breeze passes over the fibre, lifting the loose wool hairs by a millimetre while the drawing breathes once",
      ko: "섬유 위로 아주 약한 바람이 지나며 풀린 보풀 끝이 1mm쯤 들리고, 그림이 숨을 한 번 쉽니다"
    },
    still: {
      label: "정지 + 미세 푸시인",
      note: "사진 한 장처럼",
      en: "nothing moves at all except the camera, which pushes in by two percent; it stays a photograph of a still artwork",
      ko: "카메라만 2퍼센트 푸시인하고 나머지는 전혀 움직이지 않습니다. 멈춰 있는 작품을 찍은 사진 한 장"
    }
  };

  /* ---------- 프리셋 ---------- */
  const PRESETS = [
    {
      id: "pom-hat",
      emoji: "🎀",
      label: "분홍 방울모자",
      thumb: "wool/pom-hat.jpg",
      thumbPos: "center 45%",
      caption: "겨울은 머리끝부터 따뜻해진다.",
      captions: ["겨울은 머리끝부터 따뜻해진다.", "종이 위의 겨울은 이렇게 포근하다.", "모자 하나로 계절이 완성된다."],
      scene: {
        en: "a small girl sits on one pencil-drawn horizontal line, a real pink knitted bobble hat on her drawn head, real pink wool gomphrena flowers held in her drawn arms and real pink wool socks on her drawn feet; she faces the viewer with a tiny smile",
        ko: "연필로 그은 가로선 하나 위에 앉은 작은 여자아이. 그려진 머리 위에 진짜 분홍 니트 방울모자, 그려진 두 팔에 안긴 진짜 분홍 털 꽃송이, 그려진 두 발에 진짜 분홍 울 양말. 정면을 바라보며 아주 작게 웃습니다"
      },
      seed: { figure: "girl", wool: "pomHat", tone: "rose", light: "day", motion: "breathe", ratio: "4:5" }
    },
    {
      id: "mitten-paws",
      emoji: "🧤",
      label: "곰 발바닥 장갑",
      thumb: "wool/mitten-paws.jpg",
      thumbPos: "center 45%",
      caption: "장갑을 끼면 손이 곰 발바닥이 된다.",
      captions: ["장갑을 끼면 손이 곰 발바닥이 된다.", "겨울 손은 조금 커도 좋다.", "볼에 대고 있으면 마음까지 따뜻하다."],
      scene: {
        en: "a small girl drawn to her waist raises both drawn hands to her cheeks, real cream knitted mittens worn over them so they read as little paws, one real knitted bobble hat on her drawn head; she peeks over the mittens",
        ko: "허리까지 그려진 작은 여자아이가 그려진 두 손을 볼에 대고 있습니다. 그 손에 진짜 크림색 손뜨개 벙어리장갑을 씌워 작은 발바닥처럼 보이고, 그려진 머리에는 진짜 방울모자. 장갑 너머로 아이가 빼꼼히 웃습니다"
      },
      seed: { figure: "girl", wool: "mittens", tone: "cream", light: "day", motion: "breathe", ratio: "4:5" }
    },
    {
      id: "yarn-cat",
      emoji: "🐈",
      label: "펠트 고양이와",
      thumb: "wool/yarn-cat.jpg",
      thumbPos: "center 45%",
      caption: "오늘의 온기는 고양이 몫.",
      captions: ["오늘의 온기는 고양이 몫.", "털실로 만든 것도 잠은 진짜다.", "옆에 있으면 겨울이 반쯤 지나간다."],
      scene: {
        en: "a small girl sits cross-legged on one drawn line with her drawn hands folded in her lap, a real felted grey wool cat asleep against her drawn knee, real cream wool socks on her drawn feet; the paper stays empty around them",
        ko: "그은 선 하나 위에 책상다리로 앉은 작은 여자아이, 그려진 두 손은 무릎 위에 모았습니다. 그려진 무릎에 붙어 진짜 펠트 양모 고양이가 잠들어 있고, 그려진 두 발에는 진짜 크림 울 양말. 주변 종이는 비어 있습니다"
      },
      seed: { figure: "girl", wool: "feltCat", tone: "grey", light: "overcast", motion: "breathe", ratio: "4:5" }
    },
    {
      id: "scarf-two",
      emoji: "🧣",
      label: "목도리 둘",
      thumb: "wool/scarf-two.jpg",
      thumbPos: "center 45%",
      caption: "목도리 하나로 겨울을 나눠 쓴다.",
      captions: ["목도리 하나로 겨울을 나눠 쓴다.", "한 장 안에 두 사람이 들어간다.", "손을 잡으면 목도리는 반쯤 접힌다."],
      scene: {
        en: "two small children stand side by side holding hands on one drawn line, one real long mustard knitted scarf wrapped around both drawn necks with the fringed ends hanging past their hems; they look at each other",
        ko: "그은 선 하나 위에 나란히 서서 손을 잡은 작은 아이 둘. 진짜 긴 버터색 목도리가 두 아이의 그려진 목에 함께 둘러지고 술 달린 끝이 옷자락 아래로 늘어집니다. 둘이 서로를 봅니다"
      },
      seed: { figure: "two", wool: "scarf", tone: "butter", light: "day", motion: "breathe", ratio: "4:5" }
    },
    {
      id: "blanket-window",
      emoji: "🪟",
      label: "담요 창가",
      thumb: "wool/blanket-window.jpg",
      thumbPos: "center 45%",
      caption: "창밖은 겨울, 무릎 위는 봄.",
      captions: ["창밖은 겨울, 무릎 위는 봄.", "담요 아래는 아직 따뜻한 방.", "겨울 창은 앉아서 보는 그림이다."],
      scene: {
        en: "a small girl sits on the sill of a pencil-drawn window with two panes and a thin curtain line, a real cream wool blanket bunched over her drawn lap and legs with only her drawn toes showing below, her drawn hand on the sill; she looks out",
        ko: "연필로 그린 두 칸 창의 창턱에 앉은 작은 여자아이. 그려진 무릎과 다리 위에 진짜 크림 울 담요가 뭉쳐 덮여 발끝만 아래로 보이고, 그려진 한 손은 창턱에 얹혀 있습니다. 아이는 바깥을 봅니다"
      },
      seed: { figure: "girl", wool: "blanket", tone: "cream", light: "overcast", motion: "still", ratio: "4:5" }
    },
    {
      id: "felt-garden",
      emoji: "🌸",
      label: "펠트 꽃밭",
      thumb: "wool/felt-garden.jpg",
      thumbPos: "center 45%",
      caption: "종이 위에도 꽃은 핀다.",
      captions: ["종이 위에도 꽃은 핀다.", "겨울 정원은 손끝에서 자란다.", "작은 발밑에 계절을 심었다."],
      scene: {
        en: "a tiny girl stands on one drawn line inside a little garden of real felt-ball flowers in dusty pink, sage and cream gathered at her drawn feet, her drawn hands folded behind her back; a few drawn stems and leaves rise between the wool balls",
        ko: "그은 선 하나 위에 선 작은 여자아이. 그려진 발치에 더스티 핑크와 세이지, 크림색의 진짜 펠트 꽃송이들이 작은 꽃밭처럼 모여 있고, 그려진 두 손은 등 뒤로 모았습니다. 울 꽃 사이로 연필 줄기와 잎 몇 장이 올라옵니다"
      },
      seed: { figure: "girl", wool: "feltFlowers", tone: "rose", light: "day", motion: "breeze", ratio: "4:5" }
    }
  ];

  MPS.register({
    id: "wool",
    order: 9,
    name: "WOOL",
    engName: "WOOL",
    tab: "울 소품 콜라주",
    tabSub: "연필선 + 퍼지 울",
    accent: "#c0707f",
    accentSoft: "#f8e6e9",
    ink: "#2b2724",
    tagline: "선은 연필로, 겨울은 울로",
    summary:
      "흰 수채 종이 위에 0.3mm 연필로만 그린 작은 아이와, 그 위에 실제로 얹은 퍼지 울 소품이 한 장면을 이룹니다. 그림은 가볍고 창백하게, 소품은 진짜 섬유의 보풀과 미세한 그림자까지 — 이 두 질감의 대비가 그림의 전부입니다. 종이의 60~70%는 비워 두고, 글자는 어디에도 넣지 않습니다.",
    hero: { src: "wool/pom-hat.jpg", alt: "연필로 그린 아이 위에 실제 분홍 방울모자와 털 꽃송이를 얹은 혼합 매체 작품", pos: "center 45%" },
    facts: [
      { k: "종이", v: "흰 수채지", d: "여백 60~70% · 질감 보임" },
      { k: "선", v: "연필 0.3~0.5mm", d: "회색 #8A8A86 · 채색 없음" },
      { k: "소품", v: "진짜 울·니트", d: "보풀 + 2~4mm 그림자" },
      { k: "구도", v: "정면 톱다운", d: "아이 키 35~45%" }
    ],
    dna: [
      { tag: "01 · 종이", title: "한 장의 흰 수채 종이", swatch: "#FDFCF9",
        body: "바탕은 크림이 섞이지 않은 흰 수채 종이입니다. 결이 살짝 보이고, 사진에서는 종이 가장자리도 프레임도 잘리지 않습니다. 장면은 화면 가운데보다 살짝 아래, 종이의 60~70%는 아무것도 없이 비워 둡니다. 이 여백이 연필선을 가볍게 만듭니다.",
        spec: "배경 #FDFCF9 · 여백 60~70% · 패턴·테두리·비네팅 0" },
      { tag: "02 · 선", title: "0.3mm 연필, 회색 하나", swatch: "#8A8A86",
        body: "아이는 가는 연필선만으로 그립니다. 굵기 0.3~0.5mm, 색은 검정이 아닌 부드러운 회색. 머리카락은 한 올씩, 겹쳐 그은 스케치선은 남겨도 되지만 손이 떨린 선은 아닙니다. 얼굴에 채색은 없고, 볼 터치만 아주 옅게 허용합니다.",
        spec: "연필 0.3~0.5mm · 회색 #8A8A86 · 채색 0 · 볼 터치만 허용" },
      { tag: "03 · 아이", title: "큰 머리, 점 눈, 작은 미소", swatch: "#E9AFA6",
        body: "아이는 머리 대 몸이 약 1 대 2.2, 얼굴은 점 하나짜리 두 눈과 아주 작은 미소, 옅은 볼 터치로 끝냅니다. 화면 높이의 35~45%, 손과 발은 울 소품이 놓일 자리에 맞춰 그립니다. 팔·다리는 단순한 선 두 줄이면 충분합니다.",
        spec: "머리 1 : 몸 2.2 · 점 눈 + 작은 미소 · 키 35~45%" },
      { tag: "04 · 소품", title: "진짜 섬유, 진짜 그림자", swatch: "#F3B7C4",
        body: "소품은 그림이 아니라 사진으로 찍힌 실제 물건입니다. 니트의 코, 풀린 보풀, 빛을 받는 잔털, 그리고 종이 위에 드리운 2~4mm의 옅은 그림자까지 살아 있어야 합니다. 색은 한 가지 울 색으로 통일하고, 보풀 안에 두세 톤이 섞이게 둡니다.",
        spec: "실제 울·펠트 · 보풀 유지 · 그림자 2~4mm · 한 색 계열" },
      { tag: "05 · 맞물림", title: "모자는 머리에, 장갑은 손에", swatch: "#C0707F",
        body: "소품은 그려진 신체의 정확한 자리에 얹힙니다. 모자는 머리 위에, 장갑은 손에, 목도리는 두 아이의 목에 함께, 담요는 무릎 위에. 소품이 그림을 가릴 때도 아이의 표정과 실루엣은 읽혀야 하고, 그림이 소품 위로 겹쳐 그려지면 안 됩니다.",
        spec: "소품 = 신체 위치에 정확히 · 그림은 소품 위로 겹치지 않음" },
      { tag: "06 · 대비", title: "창백한 선, 보송한 덩어리", swatch: "#9A938C",
        body: "그림은 납작하고 창백하며, 소품은 입체적이고 푹신합니다. 이 두 질감이 한 장 안에서 부딪히는 것이 그림의 매력입니다. 그래서 그림에 명암을 넣거나, 소품을 납작하게 그리거나, 둘을 흐릿하게 섞는 순간 작품이 죽습니다.",
        spec: "그림 = 평면·창백 / 소품 = 입체·섬유 / 혼합·번짐 금지" },
      { tag: "07 · 빛", title: "창가의 낮빛, 얕은 그림자", swatch: "#F2E6CF",
        body: "빛은 왼쪽 위에서 부드럽게 확산된 낮빛입니다. 종이는 따뜻한 흰색을 유지하고, 소품 아래에만 얕고 부드러운 그림자가 집니다. 강한 플래시, 반짝임, HDR, 색 번짐은 쓰지 않습니다. 사진은 살짝 위에서, 종이와 평행하게.",
        spec: "좌상단 확산광 · 그림자 얕고 부드럽게 · 플래시·HDR 0" },
      { tag: "08 · 금기", title: "글자도, 채색도, 3D도 없다", swatch: "#A9483C",
        body: "손글씨·캡션·날짜·서명·워터마크·@계정명은 어디에도 넣지 않습니다. 그림에 색을 채우거나, 소품을 디지털로 그리거나, 종이를 3D 배경으로 바꾸는 것도 금지입니다. 소품 외의 소품(컵·책·식물 화분 등)을 곁들이지 않습니다.",
        spec: "글자 0 · 채색 0 · 3D 0 · 여분 소품 0" }
    ],

    controls: [
      { key: "scene", type: "text", label: "장면 직접 입력", placeholder: "예: 털모자를 눌러쓴 아이가 창밖 눈을 본다",
        hint: "비우면 위에서 고른 프리셋의 장면을 씁니다" },
      { key: "figure", type: "chips", label: "아이", options: Object.entries(FIGURES).map(([id, v]) => ({ id, label: v.label })) },
      { key: "wool", type: "chips", label: "울 소품", options: Object.entries(WOOLS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "tone", type: "swatch", label: "울 색", options: Object.entries(TONES).map(([id, v]) => ({ id, label: v.label, hex: v.hex })) },
      { key: "light", type: "chips", label: "빛", options: Object.entries(LIGHTS).map(([id, v]) => ({ id, label: v.label })) },
      { key: "motion", type: "chips", label: "영상 움직임", options: Object.entries(MOTIONS).map(([id, v]) => ({ id, ...v })) },
      { key: "ratio", type: "chips", label: "화면 비율", options: MPS.RATIOS }
    ],

    defaults: {
      figure: "girl",
      wool: "pomHat",
      tone: "rose",
      light: "day",
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

    /* ---------------- 프롬프트 빌더 ---------------- */
    build: {
      imageEn(ctx) {
        const fig = FIGURES[ctx.get("figure").id];
        const wool = WOOLS[ctx.get("wool").id];
        const tone = TONES[ctx.get("tone").id];
        const light = LIGHTS[ctx.get("light").id];
        const ratio = ctx.get("ratio");
        const sceneEn = ctx.scene("en");
        const hasFigure = ctx.get("figure").id !== "none";

        if (ctx.brief) {
          return [
            `A photograph of a real mixed-media collage on white cold-press watercolour paper, ${ratio.en}.`,
            hasFigure ? `Pencil figure: ${fig.en}, thin 0.3–0.5 mm graphite line in soft grey #8A8A86, no colour.` : `No drawn figure at all.`,
            `Real wool: ${wool.en}; real fibre with fluff, soft halo and a 2–4 mm shadow on the paper; ${tone.en}.`,
            `${H.cap(light.en)}.`,
            `${H.cap(sceneEn)}.`,
            `60–70% of the paper stays empty, the scene sits slightly below centre. Flat top-down photo, soft daylight, no text, no handwriting, no watermark.`
          ].join(" ");
        }

        return [
          `A photograph of a handmade mixed-media artwork — a real paper collage shot from slightly above, not a digital illustration, not a 3D render, not a mockup.`,
          `Paper: one sheet of white cold-press watercolour paper (#FDFCF9) filling the frame, ${ratio.en}. Its tooth is faintly visible where the light grazes it. The sheet's edges and the surrounding table are not shown. No printed pattern, no border, no vignette, no torn edge, no drop shadow around the image.`,
          `Layout: the little scene sits a little below the centre and well inside the edges; 60 to 70 percent of the sheet stays completely empty. That emptiness is the composition, so do not add props to fill it.`,
          hasFigure
            ? `Drawing: ${fig.en}. The figure is graphite pencil only — 0.3 to 0.5 mm, a soft grey (#8A8A86) that never turns black, with single confident strands for the hair, a dot for each eye, a tiny curved smile and the faintest blush. No cross-hatching, no filled shadows, no colouring book fills, no outline thicker than the pencil line itself.`
            : `Drawing: no figure at all. Only a few pale pencil guide lines on the paper, drawn by hand and left visible.`,
          `Real wool: ${wool.en}. It is a physical object photographed on the paper, so it keeps what fibre keeps — knitted loops, individual hairs catching the light, a soft halo of loose fluff, slightly uneven thickness, and a shallow soft shadow of 2 to 4 mm falling on the paper just beneath it.`,
          `Colour of the wool: ${tone.en}. It is the only colour in the picture; the paper stays white and the pencil stays grey.`,
          hasFigure
            ? `Register: the wool sits exactly where the drawing needs it — over the drawn head, hands, feet or lap — so that the physical object becomes the character's garment or companion. The pencil line never runs across the front of the wool; where the two meet, the wool simply covers the drawing. The child's face and silhouette stay readable around and above the fibre.`
            : `Register: the wool objects are arranged with the pencil guide lines so the drawing seems to hold or define them, and the pencil never runs across their front.`,
          `Light: ${light.en}.`,
          `Camera: straight down and parallel to the paper, a 50 mm equivalent, everything from the pencil line to the top of the wool in focus, a very slight natural softness only at the far corners. No shallow bokeh, no tilt-shift, no zoom blur.`,
          `Scene direction: ${H.cap(H.stripDot(sceneEn))}.`,
          `Mood: quiet, tender and a little handmade — the feeling of a small artwork someone made on a winter afternoon and photographed before putting it away.`,
          `Output: one still photograph, ${ratio.en}, high resolution, natural colour, no added grain.`,
          `Avoid: any lettering, handwriting, numbers, dates, captions, signatures, watermarks or logos; marker, ink, watercolour or digital brush marks on the figure; colour-filled drawing; 3D rendering, plastic or clay look; pasted paper cut-outs with hard white edges; extra props such as cups, books or plants; patterned or coloured background; harsh flash, HDR, oversaturation, vignette, frame or border.`
        ].join("\n\n");
      },

      imageKo(ctx) {
        const fig = FIGURES[ctx.get("figure").id];
        const wool = WOOLS[ctx.get("wool").id];
        const tone = TONES[ctx.get("tone").id];
        const light = LIGHTS[ctx.get("light").id];
        const ratio = ctx.get("ratio");
        const sceneKo = ctx.scene("ko");
        const hasFigure = ctx.get("figure").id !== "none";

        if (ctx.brief) {
          return [
            `흰 수채 종이 위에 만든 실제 혼합 매체 콜라주를 찍은 사진, ${ratio.ko}.`,
            hasFigure ? `연필 그림: ${fig.ko}. 0.3~0.5mm 가는 연필선, 부드러운 회색 #8A8A86, 채색 없음.` : `그려진 인물 없음.`,
            `진짜 울 소품: ${wool.ko}. 실제 섬유의 보풀과 종이 위 2~4mm 그림자, ${tone.ko}.`,
            `${light.ko}.`,
            `${sceneKo}.`,
            `종이의 60~70%는 비어 있고 장면은 화면 가운데보다 조금 아래. 정면 톱다운 사진, 부드러운 낮빛, 글자·손글씨·워터마크 없음.`
          ].join(" ");
        }

        return [
          `손으로 만든 혼합 매체 작품을 살짝 위에서 찍은 사진 — 디지털 일러스트도, 3D 렌더도, 목업도 아닙니다.`,
          `종이: 흰 수채 종이(#FDFCF9) 한 장이 화면을 가득 채웁니다. ${ratio.ko}. 빛이 스치는 곳에 종이 결이 희미하게 보입니다. 종이 가장자리와 탁자는 화면에 나오지 않습니다. 인쇄된 패턴, 테두리, 비네팅, 찢긴 가장자리, 이미지 주변의 그림자 모두 없습니다.`,
          `배치: 작은 장면은 화면 가운데보다 조금 아래, 가장자리에서 넉넉히 떨어져 놓입니다. 종이의 60~70%는 완전히 비어 있습니다. 그 여백이 곧 구도이므로 빈 곳을 소품으로 채우지 않습니다.`,
          hasFigure
            ? `그림: ${fig.ko}. 인물은 연필만으로 그립니다 — 0.3~0.5mm, 검정으로 넘어가지 않는 부드러운 회색(#8A8A86). 머리카락은 한 올씩 자신 있게, 눈은 점 하나씩, 입은 아주 작은 곡선, 볼은 아주 옅은 터치. 해칭도, 면 채우기도, 채색도 없고, 연필선보다 굵은 외곽선도 없습니다.`
            : `그림: 인물은 없습니다. 종이 위에 손으로 그은 옅은 연필 안내선 몇 개만 남습니다.`,
          `진짜 울 소품: ${wool.ko}. 그림이 아니라 종이 위에 놓인 실제 물건이므로 섬유의 성질이 그대로 남아야 합니다 — 니트 코, 빛을 받는 잔털, 풀린 보풀의 부드러운 halo, 조금 불규칙한 두께, 그리고 바로 아래 종이에 지는 2~4mm의 얕고 부드러운 그림자.`,
          `울 색: ${tone.ko}. 그림에서 색이 있는 것은 이것뿐이고, 종이는 흰색, 연필은 회색으로 남습니다.`,
          hasFigure
            ? `맞물림: 울 소품은 그림이 필요한 자리에 정확히 얹힙니다 — 그려진 머리, 손, 발, 무릎 위에. 그래서 실제 물건이 아이의 옷이나 친구가 됩니다. 연필선이 울 앞면을 가로질러 그려지지 않고, 만나는 곳에서는 울이 그림을 덮습니다. 아이의 얼굴과 실루엣은 섬유 둘레와 위에서 또렷하게 읽힙니다.`
            : `맞물림: 울 소품은 연필 안내선과 함께 배치되어 그림이 소품을 잡아 주는 것처럼 보이고, 연필선은 소품 앞면을 가로지르지 않습니다.`,
          `빛: ${light.ko}.`,
          `카메라: 종이와 평행한 정면 톱다운, 50mm 상당, 연필선부터 울 꼭대기까지 모두 초점, 아주 먼 모서리에만 자연스러운 미세한 부드러움이 있습니다. 얕은 아웃포커스, 틸트시프트, 줌 블러는 없습니다.`,
          `장면 지시: ${H.stripDot(sceneKo)}.`,
          `분위기: 조용하고 다정하며 손맛이 느껴지는 — 겨울 오후에 만든 작은 작품을, 정리하기 전에 살짝 찍어 둔 듯한 사진.`,
          `출력: 정지 사진 한 장, ${ratio.ko}, 고해상도, 자연스러운 색, 인위적 그레인 없음.`,
          `금지: 글자·손글씨·숫자·날짜·캡션·서명·워터마크·로고, 인물에 마커·잉크·수채·디지털 붓 자국, 채색된 그림, 3D 렌더·플라스틱·점토 질감, 흰 테두리가 남은 오려 붙이기, 컵·책·화분 같은 여분 소품, 패턴·색 배경, 강한 플래시, HDR, 과채도, 비네팅, 액자·테두리.`
        ].join("\n\n");
      },

      motionEn(ctx) {
        const fig = FIGURES[ctx.get("figure").id];
        const wool = WOOLS[ctx.get("wool").id];
        const tone = TONES[ctx.get("tone").id];
        const motion = ctx.get("motion");
        const ratio = ctx.get("ratio");
        const hasFigure = ctx.get("figure").id !== "none";

        if (ctx.brief) {
          return [
            `${ratio.en}, 6-second seamless loop at 24 fps: a photograph of the paper collage, camera locked.`,
            `The paper and the real wool never move — ${wool.short}, ${tone.short}, its shadow fixed on the sheet.`,
            hasFigure
              ? `${H.cap(fig.short)} in pencil only: two slow blinks, one small breath, shoulders lift 1–2 px.`
              : `No figure moves; only a faint lift of loose fibre.`,
            motion.id === "still" ? `A 2% push-in is the only camera move.` : `No camera move, no zoom, no hand entering the frame.`,
            `First and last frame identical. No text, no watermark.`
          ].join(" ");
        }

        return [
          `Animate the still collage into a 6-second seamless loop at 24 fps — a photograph of a real paper artwork, moving only as much as a living child in a drawing could.`,
          `What stays physical: the sheet of paper and the real wool stay completely still. ${H.cap(wool.en)}. ${H.cap(tone.en)}. Its fibres do not rustle, its shape does not change, and its shadow stays locked on the paper. No stop-motion, no rearranging, no hand entering the frame, no paper sliding.`,
          hasFigure
            ? `What comes alive: only the pencil figure. Two slow blinks, about half a second each, with the eyes closing fully and opening softly; one breath that lifts the drawn shoulders and the hem of the sleeve by one or two pixels; the mouth stays in its tiny smile. Nothing is redrawn, no line thickens, no new line appears.`
            : `What comes alive: almost nothing — the pencil guide lines stay exactly as drawn, and there is no figure to breathe.`,
          motion.id === "breeze"
            ? `Air: ${motion.en}. Only the loose hairs on top of the fibre lift by about a millimetre and settle, twice in the loop; the body of the wool never shifts.`
            : `Air: none. The room is still and the paper lies flat on the table.`,
          motion.id === "still"
            ? `Camera: a single, perfectly even push-in of two percent over the six seconds, no drift off centre, no focus change.`
            : `Camera: completely locked, straight down and parallel to the paper, 50 mm equivalent, no pan, no zoom, no parallax, no handheld shake, no rack focus.`,
          `Light and colour: the daylight never changes; the paper stays white, the pencil grey, the wool its one colour. No flicker, no exposure breathing, no colour shift, no shadow creeping.`,
          `Loop: the blinks and the breath are timed to whole numbers inside six seconds; the last frame is identical to the first and the loop restarts invisibly. No fade, no title card, no sound.`,
          `Guardrails: no morphing the drawing into a photograph or the wool into an illustration, no adding characters or props, no camera flash, no text.`
        ].filter(Boolean).join("\n\n");
      },

      motionKo(ctx) {
        const fig = FIGURES[ctx.get("figure").id];
        const wool = WOOLS[ctx.get("wool").id];
        const tone = TONES[ctx.get("tone").id];
        const motion = ctx.get("motion");
        const ratio = ctx.get("ratio");
        const hasFigure = ctx.get("figure").id !== "none";

        if (ctx.brief) {
          return [
            `${ratio.ko}, 6초 무한 반복, 24fps, 종이 콜라주 사진, 카메라 고정.`,
            `종이와 진짜 울은 전혀 움직이지 않습니다 — ${wool.short}, ${tone.short}, 그림자는 종이에 고정.`,
            hasFigure
              ? `연필로 그린 ${fig.short}: 느린 눈 깜빡임 두 번, 작은 숨 한 번, 어깨 1~2px.`
              : `인물은 움직이지 않고 보풀만 아주 살짝.`,
            motion.id === "still" ? `카메라만 2퍼센트 푸시인.` : `카메라 이동·줌·손이 들어오는 것 모두 없음.`,
            `첫 프레임과 마지막 프레임 동일. 글자·워터마크 없음.`
          ].join(" ");
        }

        return [
          `정지 콜라주를 6초 무한 반복 영상으로 만듭니다. 24fps, 실제 종이 작품을 찍은 사진이며, 그림 속 아이가 살아 있는 만큼만 움직입니다.`,
          `물리적으로 고정되는 것: 종이와 진짜 울 소품은 완전히 멈춰 있습니다. ${wool.ko}. ${tone.ko}. 섬유가 바스락거리지 않고, 형태가 변하지 않으며, 종이 위 그림자도 고정입니다. 스톱모션도, 소품을 옮기는 손도, 종이가 미끄러지는 것도 없습니다.`,
          hasFigure
            ? `살아 움직이는 것: 연필로 그린 인물 하나뿐입니다. 각각 0.5초 정도의 느린 눈 깜빡임 두 번 — 눈이 완전히 감겼다가 부드럽게 떠집니다. 한 번의 숨에 그려진 어깨와 소매 자락이 1~2px 올라갑니다. 입은 그 작은 미소 그대로입니다. 다시 그려지지 않고, 선이 굵어지지도, 새 선이 생기지도 않습니다.`
            : `살아 움직이는 것: 거의 없습니다 — 연필 안내선은 그린 그대로이고, 숨 쉴 인물도 없습니다.`,
          motion.id === "breeze"
            ? `공기: ${motion.ko}. 섬유 꼭대기의 풀린 잔털만 1mm쯤 들렸다 가라앉기를 루프 안에서 두 번, 울 덩어리 자체는 절대 움직이지 않습니다.`
            : `공기: 없음. 방은 조용하고 종이는 탁자 위에 평평하게 놓여 있습니다.`,
          motion.id === "still"
            ? `카메라: 6초 동안 정확히 2퍼센트의 고른 푸시인 하나. 중심에서 벗어나지 않고 초점도 바뀌지 않습니다.`
            : `카메라: 완전 고정. 종이와 평행한 정면 톱다운, 50mm 상당, 팬·줌·시차·핸드헬드 흔들림·포커스 이동 없음.`,
          `빛과 색: 낮빛은 변하지 않습니다. 종이는 흰색, 연필은 회색, 울은 한 가지 색 그대로. 깜빡임도, 노출의 숨쉬기도, 색 변이도, 그림자가 기어오는 것도 없습니다.`,
          `루프: 깜빡임과 숨이 6초 안에 정수로 들어가 마지막 프레임이 첫 프레임과 같고, 반복이 보이지 않습니다. 페이드·타이틀 카드·소리는 없습니다.`,
          `가드레일: 그림이 사진으로, 울이 일러스트로 변하는 모핑 금지, 인물·소품 추가 금지, 플래시 금지, 글자 금지.`
        ].filter(Boolean).join("\n\n");
      }
    },

    randomize(ctx) {
      const p = PRESETS[Math.floor(Math.random() * PRESETS.length)];
      const pick = (obj) => Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];
      return {
        preset: p.id,
        seed: Object.assign({}, p.seed, {
          tone: pick(TONES),
          light: pick(LIGHTS),
          motion: pick(MOTIONS),
          ratio: ["4:5", "4:5", "9:16", "1:1", "16:9"][Math.floor(Math.random() * 5)]
        }),
        caption: p.captions ? p.captions[Math.floor(Math.random() * p.captions.length)] : p.caption
      };
    }
  });
})();
