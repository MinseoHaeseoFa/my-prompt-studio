# 나만의 프롬프트 스튜디오 · My Prompt Studio

세 가지 그림체(에세이 시퀀스 · 수채 여백 산책 · 일상 다이어리툰)를 한 화면에서 오가며,
상황만 고르면 **이미지 프롬프트(영어·한국어)** 와 **영상 모션 프롬프트(영어·한국어)** 4종이
실시간으로 만들어지는 정적 웹앱입니다.

- 빌드 도구 없음. `index.html`을 더블클릭(`file://`)해도, Vercel·GitHub Pages 같은 정적 호스팅에 올려도 그대로 동작합니다.
- 폰트는 앱 안에 넣었습니다(고운바탕 · 나눔손글씨 펜, 한글 전체 글자 + 라틴). 인터넷 없이도 서체가 유지됩니다.
- 저장한 프롬프트는 브라우저 `localStorage`에 남고, `.md` 파일로 내려받을 수 있습니다.

## 탑재된 스타일

| 탭 | 스타일 | 핵심 DNA | 프리셋 |
|---|---|---|---|
| 01 | **린니 · 에세이 시퀀스** | 크림 종이(#F6EEE0), 0.8~1.2px 잉크선, 동그란 머리, 여백 60~70%, 3~5칸 시퀀스 | 8장 |
| 02 | **HSH · 수채 여백 산책** | 순백 여백 + 상단 30% 수채 커튼(단풍·벚꽃·은행잎·첫눈·등나무), 하단 흑백 펜 선화, 지면 패닝 전진감, 8동작 보행 → 멈춤 → 마주봄 | 6장 |
| 03 | **YUNA · 일상 다이어리툰** | 크림 단색 배경, 큰 동그란 머리 + 점 눈, 진갈색 둥근 외곽선, 플랫 파스텔, 구석에 빼꼼 내민 강아지·고양이 | 6장 |

## 화면 구성

1. **스타일 탭** — 상단에서 스타일을 바꾸면 DNA·프리셋·빌더·갤러리가 통째로 바뀝니다. 스타일별 설정은 각각 기억됩니다.
2. **스타일 DNA** — 그 스타일을 이루는 8가지 규칙(카드).
3. **상황 프리셋** — 카드를 누르면 장면·색·구도가 빌더에 채워집니다.
4. **프롬프트 빌더** — 왼쪽에서 상황·구도/움직임·인물·오브젝트·색·비율·빛·글귀를 고르면 오른쪽 4종이 즉시 다시 쓰입니다.
   - `간결 모드` — 핵심 문장만 남긴 짧은 버전
   - `4종 한 번에 복사` / 카드별 `복사`
   - `✨ 랜덤 영감` — 프리셋과 옵션을 무작위로 조합
   - `보관함에 저장`
5. **샘플 갤러리** — 같은 규칙으로 만든 예시. 누르면 그 설정이 빌더로 올라갑니다.
6. **내 프롬프트 보관함** — 저장·불러오기·삭제, `.md` 내보내기(보관함 전체).

## 파일 구조

```
my-prompt-studio/
├── index.html            화면 뼈대
├── styles.css            디자인 시스템(종이·잉크 + 스타일별 액센트) · 반응형
├── app.js                엔진: 탭 · 동적 빌더 · 프롬프트 조립 · 복사 · 보관함 · 내보내기
├── data/
│   ├── registry.js       스타일 등록기(MPS.register) · 공통 선택지(화면 비율) · 헬퍼
│   ├── linni.js          ① 린니 스타일 정의 + 프롬프트 빌더
│   ├── hsh.js            ② HSH 스타일 정의 + 프롬프트 빌더
│   └── yuna.js           ③ YUNA 스타일 정의 + 프롬프트 빌더
└── assets/
    ├── fonts/            고운바탕(보통·굵게) · 나눔손글씨 펜 (OFL, 서브셋)
    ├── linni/            린니 샘플 10장
    ├── hsh/              HSH 샘플 6장 (단풍 2 + 벚꽃·은행잎·첫눈·등나무)
    └── yuna/             YUNA 샘플 4장 (공책·머그·이불·야식)
```

## 새 스타일 추가하기

스타일은 **데이터 한 파일 + 스크립트 한 줄**로 늘어납니다. `app.js`는 손대지 않습니다.

1. `data/mystyle.js` 를 만들고 등록합니다.

```js
(function () {
  MPS.register({
    id: "mystyle",
    order: 4,                     // 탭 순서
    name: "마이스타일",
    engName: "MYSTYLE",
    tab: "새 스타일 이름",          // 탭 제목
    tabSub: "한 줄 설명",
    accent: "#7a8f6b",
    accentSoft: "#eaf0e2",
    tagline: "한 문장 슬로건",
    summary: "스타일 소개 문장",
    hero: { src: "mystyle/hero.jpg", alt: "대표 이미지 설명", pos: "center 60%" },
    facts: [{ k: "배경", v: "값", d: "설명" }],
    dna: [{ tag: "01 · 규칙", title: "제목", body: "설명", spec: "수치", swatch: "#cccccc" }],

    // 빌더 컨트롤 — 이 배열이 그대로 화면이 됩니다.
    controls: [
      { key: "scene", type: "text", label: "장면 직접 입력", placeholder: "예: ..." },
      { key: "composition", type: "chips", label: "구도",
        options: [{ id: "single", label: "단일 컷", en: "one frame", ko: "단일 컷" }] },
      { key: "color", type: "swatch", label: "색",
        options: [{ id: "sage", label: "세이지", hex: "#8fa98b", en: "sage green", ko: "세이지" }] },
      { key: "ratio", type: "chips", label: "화면 비율", options: MPS.RATIOS },
      { key: "caption", type: "caption", label: "글귀",
        modes: [{ id: "below", label: "그림 아래" }, { id: "none", label: "글자 없이" }] }
    ],
    defaults: { composition: "single", color: "sage", ratio: "1:1", captionMode: "below" },
    presets: [{
      id: "hello", emoji: "🌿", label: "첫 장면", caption: "한 줄 소개",
      scene: { en: "…", ko: "…" },
      seed: { composition: "single", color: "sage", ratio: "1:1" }
    }],
    samples: [{ file: "mystyle/hero.jpg", title: "예시", caption: "한 줄", preset: "hello", seed: {} }],

    // 프롬프트 4종 — ctx.get(키) / ctx.list(키) / ctx.text(키) / ctx.scene("en"|"ko")
    build: {
      imageEn(ctx) { return "…"; },
      imageKo(ctx) { return "…"; },
      motionEn(ctx) { return "…"; },
      motionKo(ctx) { return "…"; }
    },
    randomize(ctx) { return { preset: "hello", seed: {} }; }   // 선택
  });
})();
```

2. `index.html` 아래쪽 스크립트 목록에 한 줄 추가합니다.

```html
<script src="data/mystyle.js"></script>
```

3. `assets/mystyle/` 에 이미지를 넣습니다. 탭·프리셋·빌더·프롬프트 4종·갤러리가 자동으로 생깁니다.

### 빌더 컨트롤 타입

| type | 쓰임 | 비고 |
|---|---|---|
| `text` | 직접 입력(장면) | 값은 `ctx.text("scene")`, `ctx.scene("en"/"ko")` |
| `chips` | 단일 선택 / `multi: true, max: 2` 로 다중 선택 | `ctx.get(key)` 또는 `ctx.list(key)` |
| `swatch` | 색 선택(동그라미 견본) | 옵션에 `hex`, `en`, `ko` |
| `caption` | 글귀 입력 + 모드 칩 | 모드는 `ctx.get("captionMode")` |

## 보관함 · 내보내기

- `보관함에 저장` → 스타일·프리셋·설정·글귀·4종 프롬프트가 한 묶음으로 저장됩니다.
- `불러오기` → 그 스타일 탭으로 이동해 설정과 프롬프트를 복원합니다.
- `.md 내보내기` → 보관함 전체를 마크다운 파일로 저장합니다(코드 블록 4개씩).
- 저장 위치는 **그 브라우저의 그 주소**입니다. `file://`로 열었을 때와 배포 주소가 다르면 보관함은 서로 공유되지 않습니다.

## 참고

- 샘플 이미지는 분석한 규칙으로 새로 만든 예시이며, 원작 게시물 이미지를 복제하지 않았습니다.
- 다른 사람의 그림을 그대로 옮기거나 자신의 것처럼 쓰지 마세요.
- 제작: 김비서 · 2026-11-22
