/* ============================================================
   My Prompt Studio · data/registry.js
   스타일 레지스트리와 모든 스타일이 공유하는 선택지.

   새 스타일을 추가하는 법:
     1) data/ 아래에 새 파일(예: data/soop.js)을 만든다.
     2) 그 안에서 MPS.register({ id, name, tab, ... }) 로 스타일 하나를 등록한다.
     3) index.html 끝의 <script> 목록에 그 파일 한 줄을 더한다.
   그러면 상단 탭 · 프리셋 카드 · 빌더 컨트롤 · 프롬프트 4종이 자동으로 늘어납니다.
   ============================================================ */

window.MPS = window.MPS || {};
window.MPS.styles = window.MPS.styles || [];

window.MPS.register = function register(style) {
  if (!style || !style.id) throw new Error("style.id is required");
  if (window.MPS.styles.some((s) => s.id === style.id)) {
    throw new Error("duplicate style id: " + style.id);
  }
  window.MPS.styles.push(style);
};

/* 화면 비율 — 모든 스타일 공통 */
window.MPS.RATIOS = [
  {
    id: "9:16",
    label: "9:16 · 세로",
    note: "릴스 · 숏폼",
    en: "9:16 vertical (1080x1920)",
    ko: "9:16 세로 (1080x1920)"
  },
  {
    id: "16:9",
    label: "16:9 · 가로",
    note: "유튜브 · 블로그",
    en: "16:9 horizontal (1920x1080)",
    ko: "16:9 가로 (1920x1080)"
  },
  {
    id: "1:1",
    label: "1:1 · 정사각",
    note: "피드 · 카드",
    en: "1:1 square (1080x1080)",
    ko: "1:1 정사각 (1080x1080)"
  },
  {
    id: "4:5",
    label: "4:5 · 세로 피드",
    note: "인스타 피드",
    en: "4:5 vertical (1080x1350)",
    ko: "4:5 세로 (1080x1350)"
  }
];

/* 공통 헬퍼 — 스타일 빌더들이 ctx로 함께 받습니다 */
window.MPS.helpers = {
  /* n칸에 맞춰 비트를 고르게 뽑기 */
  pick(list, n) {
    if (!list || !list.length) return [];
    if (!n || n <= 0) return [];
    if (n >= list.length) return list.slice(0, n);
    const out = [];
    for (let i = 0; i < n; i++) {
      out.push(list[Math.round((i * (list.length - 1)) / (n - 1))]);
    }
    return out;
  },
  cap(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
  },
  /* 영어 목록: a, b and c */
  joinEn(list) {
    const arr = list.filter(Boolean);
    if (arr.length <= 1) return arr[0] || "";
    return arr.slice(0, -1).join(", ") + " and " + arr[arr.length - 1];
  },
  joinKo(list) {
    return list.filter(Boolean).join(", ");
  },
  stripDot(str) {
    return String(str || "").replace(/[.。]\s*$/, "");
  },
  /* 한국어 조사 선택: 받침이 있으면 withBatchim, 없으면 without */
  josa(word, withBatchim, withoutBatchim) {
    const w = String(word || "").trim().replace(/[.!?~"'”’)\]]+$/, "");
    const code = w ? w.charCodeAt(w.length - 1) : 0;
    if (code >= 0xac00 && code <= 0xd7a3) return (code - 0xac00) % 28 ? withBatchim : withoutBatchim;
    return withoutBatchim;
  }
};
