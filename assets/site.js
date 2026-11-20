/* VIKKIE — весь сайт собирается из файлов в папке /content,
   которые редактируются через админку /admin. Править этот файл не нужно. */

const CATS = [
  { key: "portrait",   url: "/portrait.html",   short: "портрет" },
  { key: "wedding",    url: "/wedding.html",    short: "свадьбы" },
  { key: "lovestory",  url: "/lovestory.html",  short: "love story" },
  { key: "commercial", url: "/commercial.html", short: "реклама" },
];
const PALETTES = ["espresso", "olive", "powder", "sage", "raspberry", "coral", "lavender"];
const ROT = [-3, 2.5, -1.5, 3.5, -2.5, 1.5, -4, 2];

/* ── утилиты ─────────────────────────────────────────── */
const $ = (s, el = document) => el.querySelector(s);
const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const paras = (t = "") => String(t).split(/\n\s*\n/).map(p => p.trim()).filter(Boolean).map(p => `<p>${esc(p).replace(/\n/g, "<br>")}</p>`).join("");
async function getJSON(path) {
  const r = await fetch(path, { cache: "no-cache" });
  if (!r.ok) throw new Error(path + " " + r.status);
  return r.json();
}
/* На Netlify большие фото автоматически ужимаются (Netlify Image CDN) */
function src(path, w = 1000) {
  if (!path) return "";
  // Netlify Image CDN работает только на Netlify; на других хостингах отдаём файл как есть
  if (/\.netlify\.app$/.test(location.hostname) && !/\.svg$/i.test(path) && !/^https?:/i.test(path)) return `/.netlify/images?url=${encodeURIComponent(path)}&w=${w}&q=82`;
  return path;
}
const tel = p => "tel:" + String(p || "").replace(/[^\d+]/g, "");
/* последнее слово заголовка — курсивом в акцентном цвете */
const italicLast = (t = "") => { const w = String(t).trim().split(/\s+/); if (w.length < 2) return esc(t); const last = w.pop(); return `${esc(w.join(" "))} <span class="script">${esc(last)}</span>`; };

const WORDMARK = `<span class="wordmark" aria-label="Vikkie"><span class="wm-v">V</span><span class="wm-rest">ikkie</span></span>`;

/* ── иконки ──────────────────────────────────────────── */
const STAR = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c.6 5.9 3.6 9.6 12 12-8.4 2.4-11.4 6.1-12 12-.6-5.9-3.6-9.6-12-12C8.4 9.6 11.4 5.9 12 0z"/></svg>`;
const STAR5 = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.5l3 6.6 7.2.8-5.4 4.9 1.5 7.1L12 17.3l-6.3 3.6 1.5-7.1L1.8 8.9 9 8.1z"/></svg>`;
const CLIP = `<svg class="clip" viewBox="0 0 22 58" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M7 20V8a4 4 0 0 1 8 0v38a7 7 0 0 1-14 0V14"/><path d="M11 14v30"/></svg>`;
const ARROW = `<svg class="arrow" viewBox="0 0 60 50" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4 40C14 10 38 6 54 20"/><path d="M46 13l8 7-10 3"/></svg>`;
const ICONS = {
  telegram: `<svg class="ico" viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3 18.7 19.6c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.2-8.3c.4-.4-.1-.6-.6-.2L6.1 13.2l-4.9-1.5c-1.1-.3-1.1-1.1.2-1.6L20.5 2.8c.9-.3 1.7.2 1.4 1.5z"/></svg>`,
  vk: `<svg class="ico" viewBox="0 0 24 24" fill="currentColor"><path d="M12.8 18.5c-6.2 0-9.8-4.3-9.9-11.4h3.1c.1 5.2 2.4 7.4 4.2 7.9V7.1h2.9v4.5c1.8-.2 3.7-2.2 4.3-4.5h2.9a8.6 8.6 0 0 1-3.9 5.6 9 9 0 0 1 4.6 5.8h-3.2a5.6 5.6 0 0 0-4.7-4v4z"/></svg>`,
  phone: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>`,
  instagram: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
};

/* ── палитра ─────────────────────────────────────────── */
function applyPalette(fromSettings) {
  const q = new URLSearchParams(location.search).get("palette");
  const p = PALETTES.includes(q) ? q : (PALETTES.includes(fromSettings) ? fromSettings : "espresso");
  document.documentElement.dataset.palette = p;
  if (!q) { try { localStorage.setItem("vikkie-palette", p); } catch (e) {} }
  if (q) document.querySelectorAll("a[href^='/']").forEach(a => {
    if (!a.href.includes("palette=")) a.href += (a.href.includes("?") ? "&" : "?") + "palette=" + q;
  });
}

/* ── кнопка «Написать» с выбором мессенджера ─────────── */
function writeBtn(s, cls = "", label = "Написать") {
  return `<div class="write ${cls}">
    <button class="btn" type="button" aria-expanded="false" aria-haspopup="true">${label} <span aria-hidden="true">↗</span></button>
    <div class="write-menu" role="menu">
      <a role="menuitem" href="${esc(s.telegram_url)}" target="_blank" rel="noopener">${ICONS.telegram} Телеграм <span class="mono">быстрее всего</span></a>
      <a role="menuitem" href="${esc(s.instagram_url)}" target="_blank" rel="noopener">${ICONS.instagram} Инстаграм <span class="mono">директ</span></a>
      <a role="menuitem" href="${esc(s.vk_url)}" target="_blank" rel="noopener">${ICONS.vk} ВКонтакте</a>
      <a role="menuitem" href="${tel(s.phone)}">${ICONS.phone} Позвонить</a>
    </div>
  </div>`;
}
document.addEventListener("click", e => {
  const btn = e.target.closest(".write > .btn");
  document.querySelectorAll(".write.open").forEach(w => { if (!btn || w !== btn.parentElement) { w.classList.remove("open"); w.firstElementChild.setAttribute("aria-expanded", "false"); } });
  if (btn) { const w = btn.parentElement; const o = w.classList.toggle("open"); btn.setAttribute("aria-expanded", o); }
  const burger = e.target.closest(".burger");
  if (burger) $(".nav").classList.toggle("open");
});
document.addEventListener("keydown", e => { if (e.key === "Escape") document.querySelectorAll(".write.open").forEach(w => w.classList.remove("open")); });

/* ── шапка и подвал ──────────────────────────────────── */
function header(s, galleries, current) {
  const links = [...CATS.map(c => [c.url, c.short]), ["/prices.html", "стоимость"], ["/about.html", "обо мне"], ["/#contact", "контакты"]];
  return `<header class="site-header"><div class="wrap">
    <a class="logo" href="/" aria-label="VIKKIE — на главную">${WORDMARK}${STAR}</a>
    <button class="burger mono" type="button" aria-label="Меню">меню</button>
    <nav class="nav" aria-label="Разделы">${links.map(([h, t]) => `<a href="${h}" ${h === current ? 'aria-current="page"' : ""}>${t}</a>`).join("")}</nav>
    ${writeBtn(s, "right", "Написать")}
  </div></header>`.replace('class="btn"', 'class="btn small"');
}
function footer(s) {
  return `<footer class="site-footer"><div class="wrap">
    <div>${WORDMARK}<div class="mono muted">Viktoriia Karavaeva · photo</div></div>
    <nav aria-label="Контакты">
      <a href="${tel(s.phone)}">${esc(s.phone)}</a>
      <a href="${esc(s.telegram_url)}" target="_blank" rel="noopener">Телеграм</a>
      <a href="${esc(s.instagram_url)}" target="_blank" rel="noopener">Инстаграм</a>
      <a href="${esc(s.vk_url)}" target="_blank" rel="noopener">ВКонтакте</a>
    </nav>
    <div class="mono muted">© ${new Date().getFullYear()}</div>
  </div></footer>`;
}

/* ── блоки ───────────────────────────────────────────── */
function polaroid(p, i, { href, tag, tape = true, button = false, w = 900 } = {}) {
  const r = ROT[i % ROT.length];
  const tapeCls = tape ? (i % 3 === 0 ? "tape" : i % 3 === 1 ? "tape pink" : "") : "";
  const inner = `${!tapeCls && tape ? CLIP : ""}
    <img src="${src(p.image, w)}" alt="${esc(p.alt || "")}" decoding="async">
    ${tag ? `<span class="cat-tag">${esc(tag)}</span>` : ""}`;
  const attrs = `class="polaroid hoverable ${tapeCls}" style="--r:${r}deg"`;
  if (href) return `<a ${attrs} href="${href}">${inner}</a>`;
  if (button) return `<button type="button" ${attrs} data-i="${i}">${inner}</button>`;
  return `<figure ${attrs}>${inner}</figure>`;
}
function keys(word) {
  const k = [-6, 4, -3, 7, -5, 3, -4, 6];
  return `<span class="keys" aria-label="${word}">${[...word].map((ch, i) => `<span style="--k:${k[i % k.length]}deg;--y:${i % 2 ? 6 : -4}px">${ch}</span>`).join("")}</span>`;
}
function rings(n = 8) { return `<div class="rings" aria-hidden="true">${"<span></span>".repeat(n)}</div>`; }
function aboutBlock(a, s, full) {
  return `<div class="about-card fade-in">
    <span class="star spin" style="width:34px;top:-16px;right:12%">${STAR}</span>
    <div class="about-grid">
      <div class="about-text">
        <div class="hi"><h2 class="h-big">Привет, я</h2>${keys("VIKKIE")}</div>
        <p class="note" style="margin:18px 0 22px">${esc(a.hello)}</p>
        ${full ? paras(a.body) : paras(a.short)}
        <ul class="facts">${(a.facts || []).map(f => `<li>✶ ${esc(f.text)}</li>`).join("")}</ul>
        ${full ? writeBtn(s, "up") : `<a class="btn ghost" href="/about.html">Читать полностью ↗</a>`}
      </div>
      <div class="about-photo">
        <figure class="polaroid" style="--r:4deg">${CLIP}<img src="${src(a.photo, 800)}" alt="Виктория Караваева"></figure>
        <span class="star deep" style="width:30px;bottom:-12px;left:-14px">${STAR5}</span>
      </div>
    </div>
  </div>`;
}
function processBlock(s) {
  const steps = s.process || [];
  if (!steps.length) return "";
  return `<section class="process" aria-labelledby="proc-h">${rings(9)}
    <div class="wrap">
      <h2 class="h-big" id="proc-h">Как проходит <span class="script">съёмка</span></h2>
      <ol class="steps">${steps.map((st, i) => `<li class="step">
        <div class="n"><b>${String(i + 1).padStart(2, "0")}</b>${i < steps.length - 1 ? `<span class="link" aria-hidden="true"></span>` : ""}</div>
        <h3>${esc(st.title)}</h3><p>${esc(st.text)}</p></li>`).join("")}</ol>
    </div></section>`;
}
function contactBlock(s) {
  return `<section class="contact section" id="contact"><div class="wrap">
    <div class="flyer">
      <span class="pin"></span>
      <span class="star" style="width:44px;top:-22px;right:-16px">${STAR5}</span>
      <p class="mono" style="margin:0 0 6px">✶ запись открыта</p>
      <h2>${esc(s.cta_title)}</h2>
      <p>${esc(s.cta_text)}</p>
      ${writeBtn(s)}
      <div class="tabs">
        <a href="${esc(s.telegram_url)}" target="_blank" rel="noopener" aria-label="Телеграм ${esc(s.telegram_handle || "")}">Телеграм</a>
        <a href="${esc(s.instagram_url)}" target="_blank" rel="noopener" aria-label="Инстаграм ${esc(s.instagram_handle)}">Инстаграм</a>
        <a href="${esc(s.vk_url)}" target="_blank" rel="noopener">ВКонтакте</a>
        <a href="${tel(s.phone)}" aria-label="Позвонить ${esc(s.phone)}">${esc(s.phone)}</a>
      </div>
    </div>
  </div></section>`;
}

/* серия-коллаж на главной: большая каллиграфия поверх разбросанных кадров */
function spotlightBlock(s) {
  const sp = s.spotlight; if (!sp || !(sp.photos || []).length) return "";
  const ph = sp.photos.slice(0, 4);
  return `<section class="spotlight section" aria-labelledby="sp-h"><div class="wrap">
    <div class="sp-meta mono"><span>${esc(sp.kicker || "серия")}</span><span>${esc(sp.place || "")}</span></div>
    <div class="sp-stage">
      ${ph.map((p, i) => `<figure class="sp-ph sp-ph${i + 1}"><img src="${src(p.image, 900)}" alt="${esc(p.alt || "")}" loading="lazy"></figure>`).join("")}
      <h2 class="sp-title" id="sp-h"><span class="sp-a">${esc(sp.title_a || "")}</span><span class="sp-b">${esc(sp.title_b || "")}</span></h2>
      <span class="sp-cross c1"></span><span class="sp-cross c2"></span><span class="sp-cross c3"></span>
    </div>
    <div class="sp-foot"><p>${esc(sp.text || "")}</p>${sp.link ? `<a class="btn ghost" href="${esc(sp.link)}">${esc(sp.link_text || "Смотреть серию")} →</a>` : ""}</div>
  </div></section>`;
}
/* с кем я работала */
function clientsBlock(s) {
  const cl = s.clients || []; if (!cl.length) return "";
  return `<section class="clients section" aria-labelledby="cl-h"><div class="wrap">
    <span class="mono muted">${esc(s.clients_kicker || "сотрудничество")}</span>
    <h2 class="h-serif" id="cl-h">${italicLast(s.clients_title || "Со мной работали")}</h2>
    <ul class="cl-list">${cl.map(c => `<li><span class="cl-name">${esc(c.name)}</span><span class="cl-note">${esc(c.note || "")}</span></li>`).join("")}</ul>
  </div></section>`;
}

/* страница «Стоимость» */
function renderPrices(s, pr) {
  document.title = `${pr.title || "Стоимость"} — VIKKIE`;
  return `<section class="page-head prices-head"><div class="wrap">
    <div class="crumbs mono"><a href="/">главная</a> / ${esc(pr.title || "стоимость")}</div>
    <div class="page-title"><h1>${esc(pr.title || "Стоимость")}</h1><span class="script">${esc(pr.tagline || "")}</span></div>
    <p class="lead">${esc(pr.intro || "")}</p>
  </div></section>
  <section class="prices section" style="padding-top:0"><div class="wrap">
    ${(pr.groups || []).map((g, gi) => `<div class="pr-group">
      <div class="pr-side">
        <span class="pr-num" aria-hidden="true">${gi + 1}</span>
        <h2 class="pr-title">${italicLast(g.name)}</h2>
        ${g.lead ? `<p class="pr-lead">${esc(g.lead)}</p>` : ""}
        ${g.image ? `<figure class="pr-photo"><img src="${src(g.image, 700)}" alt="" loading="lazy"></figure>` : ""}
      </div>
      <ul class="pr-list">${(g.items || []).map(it => `<li>
        <span class="pr-name">${esc(it.name)}${it.note ? `<span class="pr-note">${esc(it.note)}</span>` : ""}</span>
        <span class="pr-dots" aria-hidden="true"></span>
        <span class="pr-price">${esc(it.price)}</span></li>`).join("")}</ul>
    </div>`).join("")}
    <div class="pr-cta">${writeBtn(s, "", "Записаться")}</div>
  </div></section>
  ${contactBlock(s)}`;
}

/* ── страницы ────────────────────────────────────────── */
async function loadCommon() {
  const [settings, ...galleries] = await Promise.all([
    getJSON("/content/settings.json"),
    ...CATS.map(c => getJSON(`/content/galleries/${c.key}.json`).catch(() => ({ title: c.short, photos: [] }))),
  ]);
  galleries.forEach((g, i) => { g.key = CATS[i].key; g.url = CATS[i].url; g.photos = g.photos || []; });
  return { settings, galleries };
}

function renderHome(s, gs, about) {
  // перемешиваем «избранные» фото из всех категорий по очереди
  const pools = gs.map(g => g.photos.filter(p => p.featured && p.image).map(p => ({ ...p, g })));
  const mix = [];
  for (let i = 0; pools.some(p => p[i]); i++) pools.forEach(p => p[i] && mix.push(p[i]));
  // колода на первом экране: по 2 лучших кадра из каждой категории, вперемешку
  const deck = [];
  for (let i = 0; i < 2; i++) gs.forEach(g => { const p = (g.photos.filter(x => x.featured)[i] || g.photos[i]); if (p && p.image) deck.push({ image: p.image, focus: p.focus, g }); });
  const marquee = gs.map(g => `<span>${esc(g.title)}</span>`).join("");
  const letters = [..."ikkie"].map(c => `<span class="ch">${c}</span>`).join("");
  const words = String(s.hero_words || "нежно, смело, живо, с любовью").split(",").map(w => w.trim()).filter(Boolean);

  return `
  <section class="hero">
    <div class="wrap">
      <div class="hero-meta mono"><span>${esc(s.hero_kicker)}</span><span class="live"><i></i>запись открыта</span></div>
      <h1 class="hero-name"><span class="wordmark" aria-label="Vikkie"><span class="wm-v">V</span><span class="wm-rest">${letters}</span></span></h1>
      <p class="hero-role">фотограф</p>
      <p class="hero-shoot">снимаю <em class="word" data-words="${esc(words.join("|"))}">${esc(words[0] || "")}</em></p>
      <div class="strip" aria-label="Избранные кадры">
        <div class="strip-track">
          ${deck.map((d, i) => `<a class="strip-item" href="${d.g.url}"><img src="${src(d.image, 900)}" alt="${esc(d.g.title)}"${d.focus ? ` style="object-position:${esc(d.focus)}"` : ""}><span class="mono">${String(i + 1).padStart(2, "0")} — ${esc(d.g.title)}</span></a>`).join("")}
        </div>
        <button type="button" class="strip-btn prev" aria-label="Назад">←</button>
        <button type="button" class="strip-btn next" aria-label="Дальше">→</button>
      </div>
      <div class="hero-foot">
        <p class="hero-tagline">${esc(s.hero_tagline)}</p>
        <div class="hero-actions">${writeBtn(s)}<a class="btn ghost" href="#work">Смотреть работы</a></div>
      </div>
    </div>
  </section>

  <div class="marquee" aria-hidden="true"><div class="marquee-track">${marquee}${marquee}${marquee}${marquee}</div></div>

  <section class="intro section"><div class="wrap">
    <span class="mono muted">знакомство</span>
    <h2 class="h-serif">${esc(s.intro_title)}</h2>
    <p class="lead">${esc(s.intro_text)}</p>
  </div></section>

  <section class="section" id="work" style="padding-top:0"><div class="wrap">
    <div class="featured-head">
      <h2 class="h-big">${italicLast(s.featured_title)}</h2>
      <span class="note">${esc(s.featured_note)}</span>
    </div>
    <div class="masonry">${mix.map((p, i) => polaroid(p, i, { href: p.g.url, tag: p.g.title, w: 800 })).join("")}</div>
  </div></section>

  ${spotlightBlock(s)}
  <section class="section" style="padding-top:20px"><div class="wrap">${aboutBlock(about, s, false)}</div></section>
  ${clientsBlock(s)}

  <section class="section" id="categories"><div class="wrap">
    <div class="cats-head">
      <h2 class="h-big">Что я <span class="script">снимаю</span></h2>
      <span class="mono muted">выбери раздел</span>
    </div>
    <div class="cats">${gs.map(g => `<a class="cat" href="${g.url}">
      <span class="tab">${esc(g.title)}</span>
      <div class="cover"><img src="${src(g.cover || (g.photos[0] || {}).image, 700)}" alt="${esc(g.title)}" loading="lazy"></div>
      <h3>${esc(g.title)}</h3>
      <div class="hand">${esc(g.tagline || "")}</div>
      <span class="more mono">смотреть ${g.photos.length} фото →</span>
    </a>`).join("")}</div>
  </div></section>

  ${processBlock(s)}
  ${contactBlock(s)}`;
}

function renderGallery(s, gs, key) {
  const g = gs.find(x => x.key === key);
  const photos = g.photos.filter(p => p.image);
  document.title = `${g.title} — VIKKIE`;
  return `
  <section class="page-head"><div class="wrap">
    <div class="crumbs mono"><a href="/">главная</a> / <a href="/#categories">работы</a> / ${esc(g.title)}</div>
    <div class="page-title">
      <h1>${esc(g.title)}</h1>
      <span class="script">${esc(g.tagline || "")}</span>
    </div>
    <span class="star spin" style="width:40px;top:40px;right:6%">${STAR}</span>
    <div class="page-desc">
      <p class="lead" style="margin:0">${esc(g.description || "")}</p>
      <nav class="cat-switch" aria-label="Другие категории">${gs.map(x => `<a href="${x.url}" ${x.key === key ? 'aria-current="page"' : ""}>${esc(x.title)}</a>`).join("")}</nav>
    </div>
  </div></section>
  <section class="gallery"><div class="wrap">
    ${photos.length ? `<div class="masonry">${photos.map((p, i) => polaroid(p, i, { button: true, w: 900 })).join("")}</div>`
      : `<p class="empty note">Скоро здесь появятся фото ✶</p>`}
  </div></section>
  ${contactBlock(s)}
  <div class="lightbox" role="dialog" aria-modal="true" aria-label="Просмотр фото">
    <button class="lb-btn lb-close" type="button" aria-label="Закрыть">✕</button>
    <button class="lb-btn lb-prev" type="button" aria-label="Предыдущее">←</button>
    <figure><img alt=""><figcaption></figcaption></figure>
    <button class="lb-btn lb-next" type="button" aria-label="Следующее">→</button>
    <span class="lb-count mono"></span>
  </div>`;
}

function initLightbox(photos) {
  const lb = $(".lightbox"); if (!lb) return;
  const img = $("img", lb), cap = $("figcaption", lb), cnt = $(".lb-count", lb);
  let i = 0;
  const show = n => {
    i = (n + photos.length) % photos.length; const p = photos[i];
    img.src = src(p.image, 2000); img.alt = p.alt || ""; cap.textContent = "";
    cnt.textContent = `${i + 1} / ${photos.length}`;
  };
  const open = n => { show(n); lb.classList.add("open"); document.body.style.overflow = "hidden"; $(".lb-close", lb).focus(); };
  const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
  document.querySelectorAll(".gallery .polaroid").forEach(b => b.addEventListener("click", () => open(+b.dataset.i)));
  $(".lb-close", lb).onclick = close;
  $(".lb-prev", lb).onclick = () => show(i - 1);
  $(".lb-next", lb).onclick = () => show(i + 1);
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  document.addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close(); if (e.key === "ArrowLeft") show(i - 1); if (e.key === "ArrowRight") show(i + 1);
  });
  let x0 = null;
  lb.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) show(i + (dx < 0 ? 1 : -1)); x0 = null; });
}

function renderPalettes() {
  const list = [
    ["espresso", "Эспрессо + терракота", "взрослая, тёплая, как плёнка", ["#C0714F", "#EADCC9", "#4A2A1F", "#D8C2A3"]],
    ["olive", "Олива + шоколад", "спокойная, винтажная", ["#8C8A4E", "#E3E0CC", "#3E2E22", "#CFC6A8"]],
    ["powder", "Пудра + бордо", "нежно и по-взрослому, как бутик-журнал", ["#F2A7BF", "#FADDE6", "#7A1E3A", "#EFE2D2"]],
    ["sage", "Пудра + шалфей", "свежо и воздушно, как мудборд с лилиями", ["#F0A9C0", "#F9DEE7", "#4F6440", "#C9D6B0"]],
    ["raspberry", "Малиновый", "самый дерзкий и яркий", ["#E2336E", "#FBD3E0", "#A3123F", "#FFE6EE"]],
    ["coral", "Коралловый", "тёплый, солнечный, летний", ["#FF7B63", "#FFDDD3", "#C2381F", "#FFEBD6"]],
    ["lavender", "Лавандовый", "мечтательный и немного кукольный", ["#B9A0F3", "#ECE4FF", "#5B34B8", "#F6E9F2"]],
  ];
  return `<section class="page-head"><div class="wrap">
    <div class="crumbs mono"><a href="/">главная</a> / палитры</div>
    <div class="page-title"><h1>Палитры</h1><span class="script">выбери свою</span></div>
    <p class="lead" style="margin-top:80px">Нажми на карточку — сайт откроется в этой палитре. Понравившуюся включи в админке: <b>Тексты и контакты → Главная страница и контакты → Акцентный цвет</b>.</p>
    <div class="swatches">${list.map(([k, n, d, c]) => `<a class="swatch" data-palette="${k}" href="/?palette=${k}">
      <div class="chip">${WORDMARK}</div>
      <div class="row">${c.map(x => `<i style="background:${x}"></i>`).join("")}</div>
      <h3>${n}</h3><div class="mono muted" style="text-transform:none;letter-spacing:0">${d}</div>
      <div class="mono" style="margin-top:6px">${c.join(" · ")}</div></a>`).join("")}</div>
  </div></section>`;
}

/* ── раскладка фото без пустот: каждое фото в самую короткую колонку ── */
function masonry(el) {
  const items = [...el.children].filter(n => !n.classList.contains("m-col"));
  if (!items.length) return;
  const colsFor = () => (innerWidth >= 1000 ? 3 : 2);
  const ratio = it => { const i = it.querySelector("img"); return i && i.naturalWidth ? i.naturalHeight / i.naturalWidth : 1.25; };
  let current = 0;
  const layout = () => {
    const n = colsFor();
    if (n === current) return;
    current = n;
    el.querySelectorAll(".m-col").forEach(c => c.remove());
    const cols = Array.from({ length: n }, () => { const c = document.createElement("div"); c.className = "m-col"; el.appendChild(c); return c; });
    const h = new Array(n).fill(0);
    items.forEach(it => {
      const k = h.indexOf(Math.min(...h));
      cols[k].appendChild(it);
      h[k] += ratio(it) + 0.3; // ≈ рамка, подпись и отступ
    });
    el.classList.add("is-laid");
    requestAnimationFrame(() => fillGaps(el, cols));
  };
  const imgs = items.map(it => it.querySelector("img")).filter(Boolean);
  const loaded = Promise.all(imgs.map(i => i.complete ? null : new Promise(r => { i.addEventListener("load", r, { once: true }); i.addEventListener("error", r, { once: true }); })));
  Promise.race([loaded, new Promise(r => setTimeout(r, 6000))]).then(layout);
  addEventListener("resize", layout);
}

/* Низ сетки всегда ровный: зазор в короткой колонке занимает заметка-стикер */
let SETTINGS = {};
const FILL_NOTES = [
  s => `<span class="fill-star">${STAR}</span><span class="fill-text">ещё больше кадров —<br>в инстаграме</span><span class="mono">${esc(s.instagram_handle || "")} ↗</span>`,
  () => `<span class="fill-star">${STAR}</span><span class="fill-text">тут могла быть<br>ты ♡</span><span class="mono">записаться ↗</span>`,
];
function fillGaps(el, cols) {
  el.querySelectorAll(".m-fill").forEach(f => f.remove());
  if (cols.length < 2) return;
  const hs = cols.map(c => c.getBoundingClientRect().height);
  const max = Math.max(...hs);
  let n = 0;
  cols.forEach((c, i) => {
    const gap = max - hs[i] - 42; // 42 — отступ между карточками
    if (gap < 110) return;
    const note = document.createElement("a");
    const insta = n % 2 === 0;
    note.className = "m-fill";
    note.href = insta ? (SETTINGS.instagram_url || "#") : "#contact";
    if (insta) { note.target = "_blank"; note.rel = "noopener"; }
    note.style.height = Math.round(gap) + "px";
    note.style.setProperty("--r", (n % 2 ? 1.5 : -1.5) + "deg");
    note.innerHTML = FILL_NOTES[n % 2](SETTINGS);
    c.appendChild(note);
    n++;
  });
}

/* ── интерактив первого экрана ───────────────────────── */
function initHero() {
  // имя под «ikkie», справа от петли каллиграфической V
  const rest = $(".hero-name .wm-rest"), nm = $(".hero-name");
  const placeName = () => { if (rest && nm) nm.style.setProperty("--rest-x", Math.max(0, rest.getBoundingClientRect().left - nm.getBoundingClientRect().left) + "px"); };
  placeName(); addEventListener("resize", placeName); document.fonts && document.fonts.ready.then(placeName);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  // меняющееся слово «Снимаю …»
  const w = $(".hero-shoot .word");
  if (w && !reduce) {
    const words = w.dataset.words.split("|"); let k = 0;
    setInterval(() => {
      w.classList.add("out");
      setTimeout(() => { k = (k + 1) % words.length; w.textContent = words[k]; w.classList.remove("out"); }, 350);
    }, 2400);
  }
  // лента кадров: листается сама, стрелками и свайпом
  const tr = $(".strip-track"); if (!tr) return;
  const step = () => (tr.querySelector(".strip-item")?.getBoundingClientRect().width || 300) + 24;
  let visible = true;
  if ("IntersectionObserver" in window) new IntersectionObserver(e => { visible = e[0].isIntersecting; }).observe(tr);
  const go = d => {
    const max = tr.scrollWidth - tr.clientWidth;
    let x = tr.scrollLeft + d * step();
    if (x > max + 4) x = 0; if (x < -4) x = max;
    tr.scrollTo({ left: x, behavior: "smooth" });
  };
  $(".strip .next").onclick = () => { go(1); auto(); };
  $(".strip .prev").onclick = () => { go(-1); auto(); };
  let timer; const auto = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => { if (visible && !document.hidden) go(1); }, 3500); };
  tr.addEventListener("pointerenter", () => clearInterval(timer));
  tr.addEventListener("pointerleave", auto);
  auto();
}
/* ── запуск ──────────────────────────────────────────── */
(async function main() {
  const app = $("#app");
  const page = document.body.dataset.page;
  try {
    const { settings: s, galleries: gs } = await loadCommon();
    SETTINGS = s;
    applyPalette(s.palette);
    if (s.seo_description) { const m = $('meta[name="description"]'); if (m) m.content = s.seo_description; }
    let html = "", current = "/";
    if (page === "home") html = renderHome(s, gs, await getJSON("/content/about.json"));
    else if (page === "about") {
      const a = await getJSON("/content/about.json"); current = "/about.html";
      html = `<section class="page-head"><div class="wrap">
        <div class="crumbs mono"><a href="/">главная</a> / обо мне</div>
        <div class="page-title"><h1>${esc(a.title)}</h1><span class="script">& немного про съёмки</span></div>
      </div></section>
      <section class="section" style="padding-top:20px"><div class="wrap">${aboutBlock(a, s, true)}</div></section>
      ${processBlock(s)}${contactBlock(s)}`;
    }
    else if (page === "gallery") { const k = document.body.dataset.cat; current = CATS.find(c => c.key === k).url; html = renderGallery(s, gs, k); }
    else if (page === "palettes") html = renderPalettes();
    else if (page === "prices") { current = "/prices.html"; html = renderPrices(s, await getJSON("/content/prices.json")); }
    app.innerHTML = header(s, gs, current) + `<main>${html}</main>` + footer(s);
    app.removeAttribute("data-loading");
    document.querySelectorAll(".masonry").forEach(masonry);
    if (page === "home") initHero();
    if (page === "gallery") initLightbox(gs.find(x => x.key === document.body.dataset.cat).photos.filter(p => p.image));
    if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }
  } catch (err) {
    console.error(err);
    app.removeAttribute("data-loading");
    app.innerHTML = `<p class="wrap empty">Не получилось загрузить страницу. Обновите её, пожалуйста.</p>`;
  }
})();