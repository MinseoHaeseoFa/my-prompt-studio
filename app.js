/* ============================================================
   My Prompt Studio · app.js
   스타일 탭 · 동적 빌더 · 프롬프트 4종 · 보관함(localStorage) · .md 내보내기
   스타일별 지식은 data/*.js 에만 있고, 이 파일은 엔진입니다.
   ============================================================ */

(function () {
  const H = window.MPS.helpers;
  const STYLES = (window.MPS.styles || []).slice().sort((a, b) => (a.order || 99) - (b.order || 99));
  const LS_LIB = "mps.library.v1";
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const CARDS = [
    { key: "imageEn", icon: "🖼️", title: "이미지 프롬프트", kind: "image", lang: "ENGLISH", cls: "en" },
    { key: "imageKo", icon: "🖼️", title: "이미지 프롬프트", kind: "image", lang: "한국어", cls: "ko" },
    { key: "motionEn", icon: "🎬", title: "영상 모션 프롬프트", kind: "motion", lang: "ENGLISH", cls: "en" },
    { key: "motionKo", icon: "🎬", title: "영상 모션 프롬프트", kind: "motion", lang: "한국어", cls: "ko" }
  ];

  /* 날짜·서명·@계정 워터마크 금지 — 스타일 파일이 빠뜨려도 엔진이 4종 모두에 마지막으로 붙입니다.
     글귀(캡션)는 스타일이 의도적으로 그리는 것이라 "위에서 요청한 글귀 외"로 한정합니다. */
  const TEXT_GUARD = {
    en: "No date stamp, no time stamp, no signature, no watermark, no logo, and no @ username or social media handle anywhere in the frame; no text beyond the caption this prompt already asks for.",
    ko: "화면 안에 날짜·시간·서명·워터마크·로고·@ 계정명을 넣지 마세요. 이 프롬프트가 이미 요청한 글귀 밖의 다른 글자도 넣지 마세요."
  };

  /* 스타일이 자기 가드를 정의하면 그것을 씁니다. 캘리그라피(08 CALLI)는 문구와
     낙관의 작가명이 곧 작품이라 '서명 금지' 기본 가드로는 의도한 글씨까지 막힙니다. */
  function guardText(prompt, lang, style) {
    const guard = (style && style.textGuard && style.textGuard[lang]) || TEXT_GUARD[lang];
    if (!prompt) return "";
    if (prompt.indexOf(guard) !== -1) return prompt;
    return prompt.replace(/\s+$/, "") + "\n\n" + guard;
  }

  let currentId = STYLES.length ? STYLES[0].id : null;
  let brief = false;
  let prompts = { imageEn: "", imageKo: "", motionEn: "", motionKo: "" };
  let memoryLib = [];
  let clearArmed = false;
  let clearTimer = null;

  const store = {};
  STYLES.forEach((style) => {
    const first = style.presets[0];
    store[style.id] = {
      presetId: first.id,
      scene: "",
      caption: first.caption || "",
      captionTouched: false,
      c: Object.assign({}, style.defaults, (first.seed || {}))
    };
    if (first.object && !first.seed) store[style.id].c.objects = [first.object];
    if (first.color && !first.seed) store[style.id].c.color = first.color;
  });

  /* ---------------- utils ---------------- */
  const styleById = (id) => STYLES.find((s) => s.id === id) || STYLES[0];
  const current = () => styleById(currentId);
  const state = () => store[currentId];
  const presetOf = (style, ss) => style.presets.find((p) => p.id === ss.presetId) || style.presets[0];
  const esc = (str) =>
    String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  function toast(msg) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), 2400);
  }

  /* ---------------- context for style builders ---------------- */
  function makeCtx(style, ss) {
    const ctrls = {};
    style.controls.forEach((c) => (ctrls[c.key] = c));

    const get = (key) => {
      /* 글귀 모드는 별도 컨트롤이 아니라 caption 컨트롤의 modes에서 읽습니다 */
      if (key === "captionMode") {
        const opts = (ctrls.caption && ctrls.caption.modes) || [];
        return opts.find((o) => o.id === ss.c.captionMode) || opts[0] || null;
      }
      const spec = ctrls[key];
      if (!spec) return null;
      const opts = spec.options || spec.modes || [];
      return opts.find((o) => o.id === ss.c[key]) || opts[0] || null;
    };
    const list = (key) => {
      const spec = ctrls[key];
      if (!spec || !spec.multi) return [];
      const arr = Array.isArray(ss.c[key]) ? ss.c[key] : [];
      return arr.map((id) => (spec.options || []).find((o) => o.id === id)).filter(Boolean);
    };
    const text = (key) =>
      key === "scene" ? ss.scene : key === "caption" ? ss.caption : typeof ss.c[key] === "string" ? ss.c[key] : "";
    const preset = presetOf(style, ss);
    const scene = (lang) => (ss.scene.trim() ? ss.scene.trim() : preset.scene ? preset.scene[lang] : "");

    return {
      st: ss,
      style,
      preset,
      brief,
      get,
      list,
      text,
      scene,
      pick: H.pick,
      cap: H.cap,
      stripDot: H.stripDot
    };
  }

  /* ---------------- render: tabs ---------------- */
  function renderTabs() {
    $("#styleTabs").innerHTML = STYLES.map(
      (s, i) => `<button type="button" class="tab" role="tab" data-style="${s.id}" aria-selected="${s.id === currentId}">
        <span class="tab-num" aria-hidden="true">0${i + 1}</span>
        <span class="tab-text"><b>${esc(s.tab)}</b><em>${esc(s.name)} · ${esc(s.tabSub)}</em></span>
      </button>`
    ).join("");
  }

  /* ---------------- render: hero stats (스타일 수·프리셋 수 자동 계산) ---------------- */
  function renderHeroStats() {
    const styleCount = STYLES.length;
    const presetCount = STYLES.reduce((n, s) => n + ((s.presets && s.presets.length) || 0), 0);
    const sEl = $("#statStyles");
    const pEl = $("#statPresets");
    if (sEl) sEl.textContent = String(styleCount);
    if (pEl) pEl.textContent = String(presetCount);
  }

  /* 활성 탭이 모바일 스트립에서 잘리지 않게 가로 스크롤만 가운데로 맞춥니다 */
  function centerActiveTab() {
    const box = $("#styleTabs");
    if (!box) return;
    const tab = box.querySelector(`[data-style="${currentId}"]`);
    if (!tab) return;
    const left = tab.offsetLeft - (box.clientWidth - tab.offsetWidth) / 2;
    box.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }

  /* ---------------- render: style intro ---------------- */
  function renderStyleIntro() {
    const style = current();
    document.body.dataset.style = style.id;
    $("#styleKicker").textContent = `01 / ${style.engName} 스타일 DNA`;
    $("#styleTitle").innerHTML = `${esc(style.name)} · <span class="hand">${esc(style.tagline)}</span>`;
    $("#styleSummary").textContent = style.summary;

    $("#styleFacts").innerHTML = style.facts
      .map(
        (f) => `<div class="fact">
          <p class="fact-k">${esc(f.k)}</p>
          <p class="fact-v">${esc(f.v)}</p>
          <p class="fact-d">${esc(f.d)}</p>
        </div>`
      )
      .join("");

    $("#styleDna").innerHTML = style.dna
      .map(
        (d) => `<article class="dna-card">
          <p class="dna-tag"><span class="dna-dot" style="background:${esc(d.swatch)}"></span>${esc(d.tag)}</p>
          <h3>${esc(d.title)}</h3>
          <p class="dna-body">${esc(d.body)}</p>
          <p class="dna-spec">${esc(d.spec)}</p>
        </article>`
      )
      .join("");

    const hero = style.hero;
    $("#heroArt").innerHTML = `<span class="tape" aria-hidden="true"></span>
      <img src="assets/${esc(hero.src)}" alt="${esc(hero.alt)}" width="900" height="1100"${hero.pos ? ` style="object-position:${esc(hero.pos)}"` : ""}>
      <figcaption><span class="hero-cap-tag">${esc(style.name)}</span>${esc(style.tagline)}</figcaption>`;
  }

  /* ---------------- render: presets ---------------- */
  function presetMeta(style, preset) {
    const seed = preset.seed || {};
    const bits = [];
    ["format", "composition", "motion", "ground", "curtain"].forEach((key) => {
      const spec = style.controls.find((c) => c.key === key);
      if (!spec || !seed[key]) return;
      const opt = (spec.options || []).find((o) => o.id === seed[key]);
      if (opt) bits.push(opt.label);
    });
    return bits.slice(0, 2).join(" · ");
  }

  function renderPresets() {
    const style = current();
    $("#presetGrid").innerHTML = style.presets
      .map((p) => {
        const meta = presetMeta(style, p);
        const thumb = p.thumb
          ? `<span class="preset-thumb"><img src="assets/${esc(p.thumb)}" alt="${esc(p.label)} 예시 그림" loading="lazy" width="480" height="270"${p.thumbPos ? ` style="object-position:${esc(p.thumbPos)}"` : ""}></span>`
          : `<span class="preset-thumb empty" aria-hidden="true"><b>${esc(p.emoji || "✦")}</b></span>`;
        return `<button type="button" class="preset-card" data-preset="${p.id}" aria-pressed="false">
          ${thumb}
          <span class="preset-body">
            <span class="preset-label">${esc(p.emoji || "")} ${esc(p.label)}</span>
            <span class="preset-line">${esc(p.caption || "")}</span>
            ${meta ? `<span class="preset-meta">${esc(meta)}</span>` : ""}
          </span>
        </button>`;
      })
      .join("");
    $("#presetLead").textContent =
      `${style.name} 스타일의 상황 카드 ${style.presets.length}장입니다. 누르면 장면·색·구도가 빌더에 들어가고, 아래 프롬프트 4종이 바로 다시 쓰입니다.`;
  }

  /* ---------------- render: controls ---------------- */
  function renderControl(style, ss, spec) {
    if (spec.type === "text") {
      const textVal = spec.key === "scene" ? ss.scene : spec.key === "caption" ? ss.caption : ss.c[spec.key] || "";
      return `<label class="field">
        <span class="f-label">${esc(spec.label)}</span>
        <input type="text" data-text="${spec.key}" value="${esc(textVal)}" placeholder="${esc(spec.placeholder || "")}" maxlength="120">
        ${spec.hint ? `<span class="f-hint">${esc(spec.hint)}</span>` : ""}
      </label>`;
    }

    if (spec.type === "caption") {
      const val = ss.caption || "";
      const modes = (spec.modes || [])
        .map(
          (m) => `<button type="button" class="chip small" data-key="captionMode" data-val="${m.id}" aria-pressed="${ss.c.captionMode === m.id}">${esc(m.label)}</button>`
        )
        .join("");
      return `<div class="field" role="group" aria-label="${esc(spec.label)}">
        <p class="f-label">${esc(spec.label)}</p>
        <div class="caption-row">
          <input type="text" data-text="caption" value="${esc(val)}" placeholder="${esc(spec.placeholder || "")}" maxlength="60">
          <button type="button" class="mini-btn" data-action="dice" title="다른 글귀 넣기">🎲</button>
        </div>
        <div class="chips small">${modes}</div>
      </div>`;
    }

    if (spec.type === "swatch") {
      const opts = (spec.options || [])
        .map(
          (o) => `<button type="button" class="swatch" data-key="${spec.key}" data-val="${o.id}" aria-pressed="${ss.c[spec.key] === o.id}">
            <i style="background:${esc(o.hex || "#ccc")}"></i><span>${esc(o.label)}</span>
          </button>`
        )
        .join("");
      return `<div class="field" role="group" aria-label="${esc(spec.label)}">
        <p class="f-label">${esc(spec.label)}</p>
        <div class="swatches">${opts}</div>
      </div>`;
    }

    const currentVals = spec.multi ? ss.c[spec.key] || [] : [ss.c[spec.key]];
    const opts = (spec.options || [])
      .map((o) => {
        const on = spec.multi ? currentVals.includes(o.id) : currentVals[0] === o.id;
        return `<button type="button" class="chip" data-key="${spec.key}" data-val="${o.id}" aria-pressed="${on ? "true" : "false"}"${o.note ? ` title="${esc(o.note)}"` : ""}>${esc(o.label)}</button>`;
      })
      .join("");
    return `<div class="field" role="group" aria-label="${esc(spec.label)}">
      <p class="f-label">${esc(spec.label)}${spec.multi ? ` <em>최대 ${spec.max}개</em>` : ""}</p>
      <div class="chips">${opts}</div>
    </div>`;
  }

  function renderControls() {
    const style = current();
    const ss = state();
    /* 프리셋이 자기에게 맞지 않는 칩을 숨길 수 있습니다(hideIn) —
       예: 04 ZEN의 굵은 먹붓 카드는 장소·잎·인물·낙엽 칩을 쓰지 않습니다. */
    const usable = style.controls.filter((c) => !(c.hideIn && c.hideIn.includes(ss.presetId)));
    $("#controlFields").innerHTML = usable.map((spec) => renderControl(style, ss, spec)).join("");
    syncPressed();
  }

  function syncPressed() {
    const style = current();
    const ss = state();
    $$("#controlFields [data-val]").forEach((btn) => {
      const key = btn.dataset.key;
      const spec = style.controls.find((c) => c.key === key);
      let on = false;
      if (key === "captionMode") on = ss.c.captionMode === btn.dataset.val;
      else if (spec && spec.multi) on = (ss.c[key] || []).includes(btn.dataset.val);
      else if (spec) on = ss.c[key] === btn.dataset.val;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    $$("#presetGrid .preset-card").forEach((card) =>
      card.setAttribute("aria-pressed", card.dataset.preset === ss.presetId ? "true" : "false")
    );
  }

  /* ---------------- render: prompt cards ---------------- */
  function renderPromptCards() {
    $("#promptGrid").innerHTML = CARDS.map(
      (c) => `<article class="prompt-card" data-kind="${c.kind}">
        <div class="pc-head">
          <span class="pc-title"><span class="pc-icon" aria-hidden="true">${c.icon}</span>${c.title}</span>
          <span class="pc-lang ${c.cls}">${c.lang}</span>
          <span class="pc-count" id="cnt-${c.key}"></span>
          <button type="button" class="copy-btn" data-copy="${c.key}" aria-label="${c.title} ${c.lang} 복사">복사</button>
        </div>
        <pre class="pc-body" id="pre-${c.key}" tabindex="0"></pre>
      </article>`
    ).join("");
  }

  /* ---------------- gallery ---------------- */
  function renderGallery() {
    const style = current();
    $("#galleryTitle").innerHTML = `${esc(style.name)} 스타일로 만든 <span class="hand">결과물</span>`;
    $("#galleryGrid").innerHTML = style.samples
      .map(
        (s, i) => `<button type="button" class="shot" data-sample="${i}">
          <span class="shot-img"><img src="assets/${esc(s.file)}" alt="${esc(s.title)} 예시 그림" loading="lazy" width="600" height="780"${s.pos ? ` style="object-position:${esc(s.pos)}"` : ""}></span>
          <span class="shot-info">
            <span class="shot-title">${esc(s.title)}</span>
            <span class="shot-line">${esc(s.caption)}</span>
            <span class="shot-cta">눌러서 이 설정 불러오기 →</span>
          </span>
        </button>`
      )
      .join("");
  }

  /* ---------------- prompt update ---------------- */
  function summaryOf(style, ss) {
    const bits = [];
    style.controls.forEach((spec) => {
      if (spec.type === "text" || spec.type === "caption") return;
      /* 이 프리셋에서 숨긴 칩(hideIn)은 결과 요약에도 넣지 않습니다 */
      if (spec.hideIn && spec.hideIn.includes(ss.presetId)) return;
      const val = ss.c[spec.key];
      if (spec.multi) {
        (val || []).forEach((id) => {
          const o = (spec.options || []).find((x) => x.id === id);
          if (o) bits.push(o.label);
        });
      } else {
        const o = (spec.options || spec.modes || []).find((x) => x.id === val);
        if (o && spec.key !== "ratio") bits.push(o.label);
      }
    });
    const ratio = (style.controls.find((c) => c.key === "ratio") || { options: window.MPS.RATIOS }).options.find(
      (r) => r.id === ss.c.ratio
    );
    return [ratio ? ratio.id : "", ...bits.slice(0, 5)].filter(Boolean).join(" · ");
  }

  function update() {
    const style = current();
    const ss = state();
    const ctx = makeCtx(style, ss);
    try {
      prompts = {
        imageEn: guardText(style.build.imageEn(ctx), "en", style),
        imageKo: guardText(style.build.imageKo(ctx), "ko", style),
        motionEn: guardText(style.build.motionEn(ctx), "en", style),
        motionKo: guardText(style.build.motionKo(ctx), "ko", style)
      };
    } catch (err) {
      console.warn("prompt build failed", err);
      prompts = { imageEn: "프롬프트를 만드는 중 문제가 생겼습니다.", imageKo: "", motionEn: "", motionKo: "" };
    }

    Object.keys(prompts).forEach((k) => {
      const pre = document.getElementById("pre-" + k);
      const cnt = document.getElementById("cnt-" + k);
      if (pre) pre.textContent = prompts[k];
      if (cnt) cnt.textContent = k.endsWith("Ko") ? `${prompts[k].length.toLocaleString()}자` : `${prompts[k].length.toLocaleString()} chars`;
    });

    const p = presetOf(style, ss);
    let title = p.label;
    ["format", "composition", "motion"].some((key) => {
      const spec = style.controls.find((c) => c.key === key);
      if (!spec) return false;
      const o = (spec.options || []).find((x) => x.id === ss.c[key]);
      if (!o) return false;
      title = `${p.label} · ${o.label}`;
      return true;
    });
    $("#resultTitle").textContent = `${p.emoji || "✦"} ${title}`;
    $("#resultSub").textContent = summaryOf(style, ss);

    const ratioSpec = style.controls.find((c) => c.key === "ratio");
    const ratio = (ratioSpec ? ratioSpec.options : window.MPS.RATIOS).find((r) => r.id === ss.c.ratio);
    if (ratio) {
      $("#ratioNote").textContent = `${ratio.label} · ${ratio.note} · 이미지 프롬프트에는 "${ratio.en}" 기준으로 적혀 있습니다. 미드저니라면 끝에 --ar ${ratio.id} 를 붙이세요.`;
    }

    resetCopyButtons();
  }

  function resetCopyButtons() {
    $$(".copy-btn").forEach((b) => {
      b.classList.remove("done");
      b.textContent = "복사";
    });
  }

  /* ---------------- actions ---------------- */
  function applyPreset(id, scroll) {
    const style = current();
    const ss = state();
    const preset = style.presets.find((p) => p.id === id);
    if (!preset) return;

    ss.presetId = id;
    ss.scene = "";
    if (preset.seed) Object.assign(ss.c, preset.seed);
    if (preset.object) ss.c.objects = [preset.object];
    if (preset.color) ss.c.color = preset.color;
    if (preset.caption) ss.caption = preset.caption;
    ss.captionTouched = false;

    renderControls();
    update();
    if (scroll) scrollToWork();
  }

  function applySample(index) {
    const style = current();
    const ss = state();
    const sample = style.samples[index];
    if (!sample) return;
    ss.presetId = sample.preset;
    ss.scene = "";
    ss.caption = sample.caption || "";
    ss.captionTouched = true;
    if (sample.seed) Object.assign(ss.c, sample.seed);
    renderControls();
    update();
    scrollToWork();
    toast(`"${sample.title}" 설정을 불러왔습니다`);
  }

  function scrollToWork() {
    const target = window.innerWidth <= 1080 ? $(".result") : $("#builder");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function randomize() {
    const style = current();
    const ss = state();
    if (typeof style.randomize !== "function") return;
    const roll = style.randomize(makeCtx(style, ss));
    if (roll.preset) {
      const preset = style.presets.find((p) => p.id === roll.preset);
      if (preset) {
        ss.presetId = preset.id;
        if (preset.object) ss.c.objects = [preset.object];
        if (preset.color) ss.c.color = preset.color;
      }
    }
    if (roll.seed) Object.assign(ss.c, roll.seed);
    ss.scene = "";
    if (roll.caption) {
      ss.caption = roll.caption;
      ss.captionTouched = true;
    }
    renderControls();
    update();
    toast("랜덤 영감으로 새 프롬프트를 만들었습니다 ✨");
  }

  function resetStyle() {
    const style = current();
    const first = style.presets[0];
    store[style.id] = {
      presetId: first.id,
      scene: "",
      caption: first.caption || "",
      captionTouched: false,
      c: Object.assign({}, style.defaults, (first.seed || {}))
    };
    if (first.object && !first.seed) store[style.id].c.objects = [first.object];
    if (first.color && !first.seed) store[style.id].c.color = first.color;
    renderControls();
    update();
    toast(`${style.name} 스타일을 처음 상태로 되돌렸습니다`);
  }

  function diceCaption() {
    const style = current();
    const ss = state();
    const preset = presetOf(style, ss);
    const pool = (preset.captions || []).filter((c) => c !== ss.caption);
    if (!pool.length) {
      toast("이 카드에는 다른 글귀가 없습니다");
      return;
    }
    ss.caption = pool[Math.floor(Math.random() * pool.length)];
    ss.captionTouched = true;
    const input = $('#controlFields [data-text="caption"]');
    if (input) input.value = ss.caption;
    update();
  }

  /* ---------------- clipboard ---------------- */
  async function writeClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (e) {
      /* fall through */
    }
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:-2000px;left:-2000px;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  }

  async function copyOne(key, btn) {
    const ok = await writeClipboard(prompts[key] || "");
    if (ok) {
      if (btn) {
        btn.classList.add("done");
        btn.textContent = "복사 완료 ✓";
        setTimeout(() => {
          btn.classList.remove("done");
          btn.textContent = "복사";
        }, 2000);
      }
      const card = CARDS.find((c) => c.key === key);
      toast(`${card.lang} ${card.title}를 복사했습니다`);
    } else {
      toast("복사가 막혔습니다. 프롬프트를 길게 눌러 직접 선택해 주세요");
    }
  }

  function allPromptsText() {
    const style = current();
    return [
      `# ${style.name} · ${$("#resultTitle").textContent.replace(/^[^\w가-힣]+/, "")}`,
      "",
      "── 🖼️ IMAGE PROMPT (EN) ──",
      prompts.imageEn,
      "",
      "── 🖼️ IMAGE PROMPT (KO) ──",
      prompts.imageKo,
      "",
      "── 🎬 MOTION PROMPT (EN) ──",
      prompts.motionEn,
      "",
      "── 🎬 MOTION PROMPT (KO) ──",
      prompts.motionKo
    ].join("\n");
  }

  /* ---------------- library ---------------- */
  function readLibrary() {
    try {
      const raw = localStorage.getItem(LS_LIB);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      /* file:// 또는 저장소 차단 */
    }
    return memoryLib.slice();
  }

  function writeLibrary(list) {
    memoryLib = list.slice();
    try {
      localStorage.setItem(LS_LIB, JSON.stringify(list));
    } catch (e) {
      /* 메모리 보관으로 대체 */
    }
    renderLibrary(list);
  }

  function fmtDate(iso) {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function renderLibrary(listArg) {
    const list = listArg || readLibrary();
    $("#libCount").textContent = String(list.length);
    $("#libStatus").textContent = list.length
      ? `${list.length}개의 프롬프트가 저장되어 있습니다.`
      : "저장된 프롬프트가 없습니다. 빌더에서 '보관함에 저장'을 눌러 보세요.";

    $("#libList").innerHTML = list.length
      ? list
          .map((item) => {
            const style = styleById(item.styleId);
            return `<article class="lib-item">
              <div class="lib-top">
                <span class="lib-badge" style="--badge:${esc(style.accent)}">${esc(item.styleName || style.name)}</span>
                <h3>${esc(item.title)}</h3>
                <span class="lib-date">${esc(fmtDate(item.at))}</span>
              </div>
              <p class="lib-caption">${esc(item.caption || "")}</p>
              <p class="lib-meta">${esc(item.meta || "")}</p>
              <details class="lib-details">
                <summary>프롬프트 4종 보기</summary>
                <div class="lib-prompts">
                  <div><h4>🖼️ 이미지 · EN</h4><pre>${esc(item.prompts.imageEn)}</pre></div>
                  <div><h4>🖼️ 이미지 · KO</h4><pre>${esc(item.prompts.imageKo)}</pre></div>
                  <div><h4>🎬 영상 · EN</h4><pre>${esc(item.prompts.motionEn)}</pre></div>
                  <div><h4>🎬 영상 · KO</h4><pre>${esc(item.prompts.motionKo)}</pre></div>
                </div>
              </details>
              <div class="lib-btns">
                <button type="button" class="mini-btn" data-load="${esc(item.id)}">불러오기</button>
                <button type="button" class="mini-btn" data-copy-item="${esc(item.id)}">4종 복사</button>
                <button type="button" class="mini-btn danger" data-del="${esc(item.id)}">삭제</button>
              </div>
            </article>`;
          })
          .join("")
      : `<div class="lib-empty">
          <p class="lib-empty-emoji" aria-hidden="true">🗂️</p>
          <p>아직 비어 있습니다. 빌더에서 마음에 드는 조합을 만든 뒤 <b>보관함에 저장</b>을 눌러 주세요.</p>
        </div>`;
  }

  function saveCurrent() {
    const style = current();
    const ss = state();
    const list = readLibrary();
    const entry = {
      id: "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
      at: new Date().toISOString(),
      styleId: style.id,
      styleName: style.name,
      styleTab: style.tab,
      presetId: ss.presetId,
      title: $("#resultTitle").textContent.replace(/^[^\w가-힣]+/, ""),
      caption: ss.caption,
      scene: ss.scene,
      brief,
      c: JSON.parse(JSON.stringify(ss.c)),
      meta: summaryOf(style, ss),
      prompts: JSON.parse(JSON.stringify(prompts))
    };
    list.unshift(entry);
    writeLibrary(list.slice(0, 300));
    toast("보관함에 저장했습니다");
  }

  function loadEntry(id) {
    const list = readLibrary();
    const item = list.find((x) => x.id === id);
    if (!item) return;
    const style = styleById(item.styleId);
    if (!store[style.id]) return;
    currentId = style.id;
    store[style.id] = {
      presetId: item.presetId,
      scene: item.scene || "",
      caption: item.caption || "",
      captionTouched: true,
      c: Object.assign({}, style.defaults, item.c || {})
    };
    brief = !!item.brief;
    $("#briefMode").checked = brief;
    renderTabs();
    renderStyleIntro();
    renderPresets();
    renderControls();
    renderGallery();
    update();
    syncPressed();
    $("#builder").scrollIntoView({ behavior: "smooth", block: "start" });
    toast(`"${item.title}" 프롬프트를 불러왔습니다`);
  }

  function deleteEntry(id) {
    const list = readLibrary().filter((x) => x.id !== id);
    writeLibrary(list);
    toast("보관함에서 삭제했습니다");
  }

  function buildMarkdown(list) {
    const lines = [
      "# My Prompt Studio · 프롬프트 보관함",
      "",
      `- 내보낸 시각: ${fmtDate(new Date().toISOString())}`,
      `- 저장된 프롬프트: ${list.length}개`,
      "",
      "---",
      ""
    ];
    list.forEach((item, i) => {
      lines.push(`## ${i + 1}. [${item.styleName}] ${item.title}`);
      lines.push("");
      lines.push(`- 저장: ${fmtDate(item.at)}`);
      lines.push(`- 설정: ${item.meta || "-"}`);
      if (item.caption) lines.push(`- 글귀: ${item.caption}`);
      if (item.scene) lines.push(`- 직접 입력한 장면: ${item.scene}`);
      lines.push(`- 간결 모드: ${item.brief ? "켜짐" : "꺼짐"}`);
      lines.push("");
      lines.push("### 🖼️ 이미지 프롬프트 (English)");
      lines.push("");
      lines.push("```text");
      lines.push(item.prompts.imageEn || "");
      lines.push("```");
      lines.push("");
      lines.push("### 🖼️ 이미지 프롬프트 (한국어)");
      lines.push("");
      lines.push("```text");
      lines.push(item.prompts.imageKo || "");
      lines.push("```");
      lines.push("");
      lines.push("### 🎬 영상 모션 프롬프트 (English)");
      lines.push("");
      lines.push("```text");
      lines.push(item.prompts.motionEn || "");
      lines.push("```");
      lines.push("");
      lines.push("### 🎬 영상 모션 프롬프트 (한국어)");
      lines.push("");
      lines.push("```text");
      lines.push(item.prompts.motionKo || "");
      lines.push("```");
      lines.push("");
      lines.push("---");
      lines.push("");
    });
    return lines.join("\n");
  }

  async function exportMarkdown() {
    const list = readLibrary();
    if (!list.length) {
      toast("보관함이 비어 있습니다. 먼저 저장해 주세요");
      return;
    }
    const md = buildMarkdown(list);
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const filename = `my-prompt-studio-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}.md`;
    let ok = false;
    try {
      const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.remove();
      }, 2000);
      ok = true;
    } catch (e) {
      ok = false;
    }
    if (ok) {
      toast(`${filename} 파일로 내보냈습니다`);
    } else {
      const copied = await writeClipboard(md);
      toast(copied ? "파일 저장이 막혀 마크다운을 클립보드로 복사했습니다" : "내보내기가 막혔습니다");
    }
  }

  /* ---------------- events ---------------- */
  function bind() {
    $("#styleTabs").addEventListener("click", (e) => {
      const tab = e.target.closest("[data-style]");
      if (!tab || tab.dataset.style === currentId) return;
      currentId = tab.dataset.style;
      renderTabs();
      renderStyleIntro();
      renderPresets();
      renderControls();
      renderGallery();
      update();
      centerActiveTab();
      /* 스타일을 바꾸면 늘 페이지 맨 위에서 새 스타일을 보여줍니다 — 깊이 스크롤한 상태에서
         탭을 눌러도 이전 위치에 머물지 않도록 전환 즉시 최상단으로 올립니다.
         html에 scroll-behavior:smooth가 걸려 있어 behavior를 명시하지 않으면 그 규칙을 따라
         천천히 미끄러지므로, 이 이동만 'instant'로 고정합니다. */
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      toast(`${current().name} 스타일로 전환했습니다`);
    });

    $("#presetGrid").addEventListener("click", (e) => {
      const card = e.target.closest("[data-preset]");
      if (!card) return;
      applyPreset(card.dataset.preset, true);
    });

    $("#controlForm").addEventListener("click", (e) => {
      const dice = e.target.closest('[data-action="dice"]');
      if (dice) {
        diceCaption();
        return;
      }
      const btn = e.target.closest("[data-val]");
      if (!btn) return;
      const style = current();
      const ss = state();
      const key = btn.dataset.key;
      const val = btn.dataset.val;
      const spec = style.controls.find((c) => c.key === key);
      if (!spec) return;

      if (key === "captionMode") {
        ss.c.captionMode = val;
      } else if (spec.multi) {
        const arr = Array.isArray(ss.c[key]) ? ss.c[key].slice() : [];
        const i = arr.indexOf(val);
        if (i >= 0) arr.splice(i, 1);
        else {
          if (spec.max && arr.length >= spec.max) arr.shift();
          arr.push(val);
        }
        ss.c[key] = arr;
      } else {
        ss.c[key] = val;
      }
      syncPressed();
      update();
    });

    $("#controlForm").addEventListener("input", (e) => {
      const input = e.target;
      if (!input.dataset || !input.dataset.text) return;
      const ss = state();
      if (input.dataset.text === "scene") {
        ss.scene = input.value;
      } else if (input.dataset.text === "caption") {
        ss.caption = input.value;
        ss.captionTouched = true;
      } else {
        /* 도시명·랜드마크처럼 스타일이 정의한 임의의 텍스트 컨트롤 */
        ss.c[input.dataset.text] = input.value;
      }
      update();
    });

    $("#briefMode").addEventListener("change", (e) => {
      brief = e.target.checked;
      update();
      toast(brief ? "간결 모드로 바꿨습니다" : "상세 모드로 바꿨습니다");
    });

    $("#randomBtn").addEventListener("click", randomize);
    $("#resetBtn").addEventListener("click", resetStyle);
    $("#saveBtn").addEventListener("click", saveCurrent);
    $("#exportBtn").addEventListener("click", exportMarkdown);

    $("#copyAllBtn").addEventListener("click", async () => {
      const ok = await writeClipboard(allPromptsText());
      toast(ok ? "프롬프트 4종을 한 번에 복사했습니다" : "복사가 막혔습니다. 각 카드의 복사를 눌러 주세요");
    });

    $("#promptGrid").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-copy]");
      if (!btn) return;
      copyOne(btn.dataset.copy, btn);
    });

    $("#galleryGrid").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-sample]");
      if (!btn) return;
      applySample(Number(btn.dataset.sample));
    });

    $("#libList").addEventListener("click", async (e) => {
      const load = e.target.closest("[data-load]");
      if (load) {
        loadEntry(load.dataset.load);
        return;
      }
      const del = e.target.closest("[data-del]");
      if (del) {
        deleteEntry(del.dataset.del);
        return;
      }
      const copy = e.target.closest("[data-copy-item]");
      if (copy) {
        const item = readLibrary().find((x) => x.id === copy.dataset.copyItem);
        if (!item) return;
        const text = [
          "── 🖼️ IMAGE PROMPT (EN) ──",
          item.prompts.imageEn,
          "",
          "── 🖼️ IMAGE PROMPT (KO) ──",
          item.prompts.imageKo,
          "",
          "── 🎬 MOTION PROMPT (EN) ──",
          item.prompts.motionEn,
          "",
          "── 🎬 MOTION PROMPT (KO) ──",
          item.prompts.motionKo
        ].join("\n");
        const ok = await writeClipboard(text);
        toast(ok ? "4종을 복사했습니다" : "복사가 막혔습니다");
      }
    });

    $("#clearBtn").addEventListener("click", () => {
      const btn = $("#clearBtn");
      if (!clearArmed) {
        clearArmed = true;
        btn.textContent = "한 번 더 누르면 비웁니다";
        btn.classList.add("armed");
        clearTimeout(clearTimer);
        clearTimer = setTimeout(() => {
          clearArmed = false;
          btn.textContent = "보관함 비우기";
          btn.classList.remove("armed");
        }, 4000);
        return;
      }
      clearArmed = false;
      clearTimeout(clearTimer);
      btn.textContent = "보관함 비우기";
      btn.classList.remove("armed");
      writeLibrary([]);
      toast("보관함을 비웠습니다");
    });

    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        $("#copyAllBtn").click();
      }
    });
  }

  /* ---------------- init ---------------- */
  function init() {
    if (!STYLES.length) return;
    renderHeroStats();
    renderTabs();
    renderPromptCards();
    renderStyleIntro();
    renderPresets();
    renderControls();
    renderGallery();
    renderLibrary();
    bind();
    update();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
