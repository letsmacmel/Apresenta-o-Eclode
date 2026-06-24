const STORAGE_KEY = "eclode-deck-v1";

const initialDeck = {
  title: "Eclode — apresentação viva",
  pages: [
    {
      id: crypto.randomUUID(),
      layout: "cover",
      accent: "#c8ff62",
      energy: 72,
      eyebrow: "Monografia · 2026",
      title: "eclode",
      body: "Uma identidade que não se repete. Ela cresce, reage e deixa cada gesto participar da forma."
    },
    {
      id: crypto.randomUUID(),
      layout: "statement",
      accent: "#ff725c",
      energy: 88,
      eyebrow: "01 · O princípio",
      title: "A marca como organismo.",
      body: "Eclode nasce do encontro entre regra e acidente. Um sistema visual capaz de produzir diferença sem perder sua origem.",
      note: "FORMA · TEMPO · INTERAÇÃO"
    },
    {
      id: crypto.randomUUID(),
      layout: "split",
      accent: "#b7a4ff",
      energy: 64,
      eyebrow: "02 · Sistema generativo",
      title: "Fragmentos encontram direção.",
      body: "Partículas se aproximam, desviam e se reorganizam. O desenho final é uma memória do movimento.",
      image: "../panfleto_20260617_082745.png"
    },
    {
      id: crypto.randomUUID(),
      layout: "metrics",
      accent: "#78d8ff",
      energy: 54,
      eyebrow: "03 · Um sistema aberto",
      title: "Múltiplas saídas. Um mesmo código.",
      body: "O projeto atravessa impressão, movimento e experiência digital.",
      metrics: [
        ["∞", "composições possíveis"],
        ["01", "lógica compartilhada"],
        ["03", "campos de aplicação"]
      ]
    }
  ]
};

let deck = loadDeck();
let currentIndex = 0;
let saveTimer;
let animationFrame;
let audioContext;
let analyser;
let audioData;
let mediaStream;
let audioLevel = 0;
let previousAudioLevel = 0;
let burstEnergy = 0;
const audioBands = { bass: 0, mid: 0, treble: 0 };
let imageTarget = null;
let draggingBrand = false;
let draggedPageIndex = null;
let brandBounds = { x: 0, y: 0, width: 0, height: 0 };
let brandPoints = [];
let gradientClock = 0;
let previousFrameTime = 0;

const $ = (selector) => document.querySelector(selector);
const stage = $("#stage");
const slideContent = $("#slideContent");
const canvas = $("#organism");
const ctx = canvas.getContext("2d");
const brandImage = new Image();
brandImage.addEventListener("load", buildBrandPointCloud);
brandImage.src = "./eclode_marca_branca.svg";
const particles = Array.from({ length: 24 }, (_, index) => ({
  seed: Math.random() * 1000,
  phase: Math.random() * Math.PI * 2,
  orbit: 0.08 + Math.random() * 0.42,
  size: 0.7 + Math.random() * 3.5,
  speed: 0.08 + Math.random() * 0.3,
  band: index % 5
}));

function buildBrandPointCloud() {
  const sampleWidth = 920;
  const sampleHeight = Math.round(sampleWidth * (488.17 / 917.11));
  const sampleCanvas = document.createElement("canvas");
  const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });
  sampleCanvas.width = sampleWidth;
  sampleCanvas.height = sampleHeight;
  sampleContext.drawImage(brandImage, 0, 0, sampleWidth, sampleHeight);
  const pixels = sampleContext.getImageData(0, 0, sampleWidth, sampleHeight).data;
  const points = [];
  const step = 7;
  for (let y = 0; y < sampleHeight; y += step) {
    for (let x = 0; x < sampleWidth; x += step) {
      const alpha = pixels[(y * sampleWidth + x) * 4 + 3];
      if (alpha < 72) continue;
      const edgeNoise = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      if (alpha < 210 && edgeNoise - Math.floor(edgeNoise) > 0.64) continue;
      const ox = x - sampleWidth / 2;
      const oy = y - sampleHeight / 2;
      points.push({
        ox,
        oy,
        x: ox,
        y: oy,
        vx: 0,
        vy: 0,
        phase: (x * 0.071 + y * 0.043) % (Math.PI * 2),
        edge: alpha < 245 ? 1 : 0
      });
    }
  }
  brandPoints = points;
}

function loadDeck() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return normalizeDeck(saved ? JSON.parse(saved) : structuredClone(initialDeck));
  } catch {
    return normalizeDeck(structuredClone(initialDeck));
  }
}

function normalizeDeck(value) {
  value.pages.forEach((page) => {
    page.brandColor ??= page.accent || "#c8ff62";
    page.gradientColor ??= page.accent || "#c8ff62";
    page.textColor ??= "#f4f1e9";
    page.textAlign ??= "left";
    page.textSize ??= 100;
    page.textWidth ??= 100;
    page.particleSize ??= 100;
    page.reactiveMode ??= "breathe";
    page.brandVisible ??= true;
    page.brandX ??= 70;
    page.brandY ??= 48;
    page.brandSize ??= 46;
    page.gallerySide ??= "right";
    page.images ??= [
      "../shape_20260523_104733.png",
      "../shape_20260527_195711.png",
      "../estampa_20260523_095210.png",
      "../panfleto_20260520_175433.jpg"
    ];
    page.splitImages ??= [
      page.image || "../panfleto_20260617_082745.png",
      "../estampa_20260523_095210.png"
    ];
    page.singleImage ??= page.image || "../panfleto_20260617_082745.png";
    page.tripleImages ??= [
      page.image || "../panfleto_20260617_082745.png",
      "../shape_20260523_104733.png",
      "../estampa_20260523_095210.png"
    ];
    page.timelineImages ??= [
      "../shape_20260523_104733.png",
      "../shape_20260527_195711.png",
      "../estampa_20260523_095210.png",
      "../panfleto_20260520_175433.jpg"
    ];
    page.timelineItems ??= [
      ["2023", "Origem"],
      ["2024", "Experimentos"],
      ["2025", "Sistema"],
      ["2026", "Eclode"]
    ];
    page.bullets ??= [
      "Uma identidade que cresce",
      "Movimento orientado pelo som",
      "Sistema visual aberto",
      "Variações sem perder a origem"
    ];
  });
  return value;
}

function saveDeck() {
  $("#saveState").textContent = "Salvando…";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
      $("#saveState").textContent = "Salvo neste navegador";
    } catch {
      $("#saveState").textContent = "Imagem grande demais para salvar";
      toast("Use uma imagem menor para manter o salvamento automático");
    }
  }, 180);
}

function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function editable(field, className, tag = "div", value) {
  return `<${tag} class="${className}" contenteditable="true" spellcheck="false" data-field="${field}">${escapeHtml(value ?? "")}</${tag}>`;
}

function imageSlot(source, field, label = "Trocar imagem") {
  return `<button class="editable-image" data-image-field="${field}" title="${label}">
    <img src="${source}" alt="" />
    <span>${label}</span>
  </button>`;
}

function renderSlide() {
  const page = deck.pages[currentIndex];
  if (!page) return;
  stage.style.setProperty("--accent", page.brandColor);
  stage.style.setProperty("--slide-ink", page.textColor);
  stage.style.setProperty("--text-scale", page.textSize / 100);
  stage.style.setProperty("--text-width", `${page.textWidth}%`);
  stage.classList.toggle("align-center", page.textAlign === "center");
  stage.classList.toggle("align-left", page.textAlign === "left");
  slideContent.className = `slide-content layout-${page.layout}`;
  slideContent.classList.add(`text-${page.textAlign}`);

  const templates = {
    cover: () => `
      ${editable("eyebrow", "eyebrow", "div", page.eyebrow)}
      ${editable("title", "title", "h1", page.title)}
      ${editable("body", "body-copy", "p", page.body)}
    `,
    statement: () => `
      ${editable("eyebrow", "eyebrow", "div", page.eyebrow)}
      ${editable("title", "title", "h1", page.title)}
      <div class="statement-footer">
        ${editable("body", "body-copy", "p", page.body)}
        ${editable("note", "micro", "div", page.note)}
      </div>
    `,
    single: () => `
      <div class="single-media">
        ${imageSlot(page.singleImage, "singleImage", "Trocar imagem")}
      </div>
      <div class="single-copy">
        ${editable("eyebrow", "eyebrow", "div", page.eyebrow)}
        ${editable("title", "title", "h1", page.title)}
        ${editable("body", "body-copy", "p", page.body)}
      </div>
    `,
    split: () => `
      <div class="split-media">
        ${imageSlot(page.splitImages[0], "splitImages.0", "Trocar imagem 1")}
        ${imageSlot(page.splitImages[1], "splitImages.1", "Trocar imagem 2")}
      </div>
      <div class="split-copy">
        ${editable("eyebrow", "eyebrow", "div", page.eyebrow)}
        ${editable("title", "title", "h1", page.title)}
        ${editable("body", "body-copy", "p", page.body)}
      </div>
    `,
    triple: () => `
      <div class="triple-media">
        ${page.tripleImages.slice(0, 3).map((image, index) =>
          imageSlot(image, `tripleImages.${index}`, `Trocar imagem ${index + 1}`)
        ).join("")}
      </div>
      <div class="triple-copy">
        ${editable("eyebrow", "eyebrow", "div", page.eyebrow)}
        ${editable("title", "title", "h1", page.title)}
        ${editable("body", "body-copy", "p", page.body)}
      </div>
    `,
    timeline: () => `
      <div class="timeline-header">
        ${editable("eyebrow", "eyebrow", "div", page.eyebrow)}
        ${editable("title", "title", "h1", page.title)}
        ${editable("body", "body-copy", "p", page.body)}
      </div>
      <div class="timeline-track">
        ${page.timelineItems.slice(0, 4).map((item, index) => `
          <article class="timeline-item">
            <div class="timeline-marker"></div>
            ${imageSlot(page.timelineImages[index], `timelineImages.${index}`, `Trocar imagem ${index + 1}`)}
            ${editable(`timelineItems.${index}.0`, "timeline-date", "div", item[0])}
            ${editable(`timelineItems.${index}.1`, "timeline-label", "div", item[1])}
          </article>
        `).join("")}
      </div>
    `,
    bullets: () => `
      <div class="bullets-header">
        ${editable("eyebrow", "eyebrow", "div", page.eyebrow)}
        ${editable("title", "title", "h1", page.title)}
        ${editable("body", "body-copy", "p", page.body)}
      </div>
      <div class="adaptive-bullets" style="--bullet-count:${page.bullets.length}">
        ${page.bullets.map((bullet, index) => `
          <article class="bullet-item">
            <span class="bullet-number">${String(index + 1).padStart(2, "0")}</span>
            ${editable(`bullets.${index}`, "bullet-text", "div", bullet)}
            <button class="remove-bullet" type="button" data-bullet-index="${index}" aria-label="Remover bullet ${index + 1}">×</button>
          </article>
        `).join("")}
      </div>
    `,
    gallery: () => `
      <div class="gallery-grid">
        ${(page.images || []).slice(0, 4).map((image, index) => imageSlot(image, `images.${index}`, `Trocar imagem ${index + 1}`)).join("")}
      </div>
      <div class="gallery-copy">
        ${editable("eyebrow", "eyebrow", "div", page.eyebrow)}
        ${editable("title", "title", "h1", page.title)}
        ${editable("body", "body-copy", "p", page.body)}
      </div>
    `,
    metrics: () => `
      <div class="metrics-intro">
        ${editable("eyebrow", "eyebrow", "div", page.eyebrow)}
        ${editable("title", "title", "h1", page.title)}
        ${editable("body", "body-copy", "p", page.body)}
      </div>
      <div class="metric-stack">
        ${(page.metrics || initialDeck.pages[3].metrics).map((metric, i) => `
          <div class="metric">
            ${editable(`metrics.${i}.0`, "", "strong", metric[0])}
            ${editable(`metrics.${i}.1`, "", "span", metric[1])}
          </div>
        `).join("")}
      </div>
    `
  };

  slideContent.innerHTML = (templates[page.layout] || templates.cover)();
  $("#slideIndex").textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(deck.pages.length).padStart(2, "0")}`;
  $("#layoutSelect").value = page.layout;
  $("#brandColorInput").value = page.brandColor;
  $("#gradientColorInput").value = page.gradientColor;
  $("#textColorInput").value = page.textColor;
  $("#alignLeftButton").classList.toggle("active", page.textAlign === "left");
  $("#alignCenterButton").classList.toggle("active", page.textAlign === "center");
  $("#textSizeInput").value = page.textSize;
  $("#textWidthInput").value = page.textWidth;
  $("#energyInput").value = page.energy;
  $("#reactiveModeSelect").value = page.reactiveMode;
  $("#particleSizeInput").value = page.particleSize;
  $("#brandVisibleInput").checked = page.brandVisible;
  $("#brandXInput").value = page.brandX;
  $("#brandYInput").value = page.brandY;
  $("#brandSizeInput").value = page.brandSize;
  $("#bulletControls").hidden = page.layout !== "bullets";
  bindEditable();
  bindImages();
  bindBulletRemoval();
  renderNavigation();
}

function setNested(target, path, value) {
  const parts = path.split(".");
  const last = parts.pop();
  const parent = parts.reduce((obj, key) => obj[key], target);
  parent[last] = value;
}

function bindEditable() {
  slideContent.querySelectorAll("[contenteditable]").forEach((element) => {
    element.addEventListener("input", () => {
      setNested(deck.pages[currentIndex], element.dataset.field, element.innerText);
      saveDeck();
      renderPageList();
    });
    element.addEventListener("keydown", (event) => event.stopPropagation());
  });
}

function bindImages() {
  slideContent.querySelectorAll(".editable-image").forEach((element) => {
    element.addEventListener("click", () => {
      imageTarget = element.dataset.imageField;
      $("#imagePicker").click();
    });
  });
}

function bindBulletRemoval() {
  slideContent.querySelectorAll(".remove-bullet").forEach((button) => {
    button.addEventListener("click", () => {
      if (deck.pages[currentIndex].bullets.length <= 1) {
        toast("Mantenha pelo menos um bullet");
        return;
      }
      deck.pages[currentIndex].bullets.splice(Number(button.dataset.bulletIndex), 1);
      renderSlide();
      saveDeck();
    });
  });
}

function renderPageList() {
  $("#pageList").innerHTML = deck.pages.map((page, index) => `
    <div class="page-item ${index === currentIndex ? "active" : ""}" data-index="${index}" draggable="true">
      <i class="drag-handle" aria-hidden="true">⋮⋮</i>
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${escapeHtml(page.title || "Sem título")}</strong>
    </div>
  `).join("");
  $("#pageList").querySelectorAll(".page-item").forEach((item) => {
    item.addEventListener("click", () => goToPage(Number(item.dataset.index)));
    item.addEventListener("dragstart", () => {
      draggedPageIndex = Number(item.dataset.index);
      item.classList.add("dragging");
    });
    item.addEventListener("dragend", () => {
      draggedPageIndex = null;
      item.classList.remove("dragging");
      document.querySelectorAll(".page-item").forEach((pageItem) => pageItem.classList.remove("drag-over"));
    });
    item.addEventListener("dragover", (event) => {
      event.preventDefault();
      item.classList.add("drag-over");
    });
    item.addEventListener("dragleave", () => item.classList.remove("drag-over"));
    item.addEventListener("drop", (event) => {
      event.preventDefault();
      const targetIndex = Number(item.dataset.index);
      item.classList.remove("drag-over");
      if (draggedPageIndex === null || draggedPageIndex === targetIndex) return;
      movePage(draggedPageIndex, targetIndex);
    });
  });
}

function movePage(fromIndex, toIndex) {
  if (
    fromIndex < 0 || fromIndex >= deck.pages.length ||
    toIndex < 0 || toIndex >= deck.pages.length ||
    fromIndex === toIndex
  ) return;
  const [page] = deck.pages.splice(fromIndex, 1);
  deck.pages.splice(toIndex, 0, page);
  currentIndex = toIndex;
  renderSlide();
  saveDeck();
  toast("Ordem das páginas atualizada");
}

function renderNavigation() {
  $("#dots").innerHTML = deck.pages.map((_, index) =>
    `<button class="dot ${index === currentIndex ? "active" : ""}" data-index="${index}" aria-label="Ir à página ${index + 1}"></button>`
  ).join("");
  $("#dots").querySelectorAll(".dot").forEach((dot) => {
    dot.addEventListener("click", () => goToPage(Number(dot.dataset.index)));
  });
  renderPageList();
}

function goToPage(index) {
  currentIndex = (index + deck.pages.length) % deck.pages.length;
  renderSlide();
}

function makePage() {
  return {
    id: crypto.randomUUID(),
    layout: "cover",
    accent: "#c8ff62",
    brandColor: "#c8ff62",
    gradientColor: "#56751f",
    textColor: "#f4f1e9",
    textAlign: "left",
    textSize: 100,
    textWidth: 100,
    energy: 70,
    particleSize: 100,
    reactiveMode: "breathe",
    brandVisible: true,
    brandX: 70,
    brandY: 48,
    brandSize: 46,
    gallerySide: "right",
    images: [
      "../shape_20260523_104733.png",
      "../shape_20260527_195711.png",
      "../estampa_20260523_095210.png",
      "../panfleto_20260520_175433.jpg"
    ],
    splitImages: [
      "../panfleto_20260617_082745.png",
      "../estampa_20260523_095210.png"
    ],
    singleImage: "../panfleto_20260617_082745.png",
    tripleImages: [
      "../panfleto_20260617_082745.png",
      "../shape_20260523_104733.png",
      "../estampa_20260523_095210.png"
    ],
    timelineImages: [
      "../shape_20260523_104733.png",
      "../shape_20260527_195711.png",
      "../estampa_20260523_095210.png",
      "../panfleto_20260520_175433.jpg"
    ],
    timelineItems: [
      ["2023", "Origem"],
      ["2024", "Experimentos"],
      ["2025", "Sistema"],
      ["2026", "Eclode"]
    ],
    bullets: [
      "Uma identidade que cresce",
      "Movimento orientado pelo som",
      "Sistema visual aberto",
      "Variações sem perder a origem"
    ],
    eyebrow: `${String(deck.pages.length + 1).padStart(2, "0")} · Nova página`,
    title: "Uma nova ideia eclode.",
    body: "Clique para editar este texto."
  };
}

function duplicateCurrent() {
  const copy = structuredClone(deck.pages[currentIndex]);
  copy.id = crypto.randomUUID();
  deck.pages.splice(currentIndex + 1, 0, copy);
  goToPage(currentIndex + 1);
  saveDeck();
  toast("Página duplicada");
}

function deleteCurrent() {
  if (deck.pages.length === 1) {
    toast("A apresentação precisa de uma página");
    return;
  }
  deck.pages.splice(currentIndex, 1);
  currentIndex = Math.min(currentIndex, deck.pages.length - 1);
  renderSlide();
  saveDeck();
  toast("Página excluída");
}

function exportDeck() {
  const blob = new Blob([JSON.stringify(deck, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `eclode-apresentacao-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  toast("Backup criado");
}

function importDeck(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!Array.isArray(imported.pages) || !imported.pages.length) throw new Error();
      deck = normalizeDeck(imported);
      currentIndex = 0;
      saveDeck();
      renderSlide();
      toast("Apresentação importada");
    } catch {
      toast("Arquivo de apresentação inválido");
    }
  };
  reader.readAsText(file);
}

function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  setTimeout(() => element.classList.remove("show"), 1800);
}

function resizeCanvas() {
  const ratio = Math.min(devicePixelRatio || 1, 2);
  const rect = stage.getBoundingClientRect();
  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16)
  ];
}

async function startAudioReaction() {
  if (analyser) {
    mediaStream?.getTracks().forEach((track) => track.stop());
    audioContext?.close();
    analyser = null;
    mediaStream = null;
    audioLevel = 0;
    $("#audioToggle").textContent = "Ativar reação ao som";
    toast("Reação ao som pausada");
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStream = stream;
    audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.82;
    audioData = new Uint8Array(analyser.frequencyBinCount);
    source.connect(analyser);
    $("#audioToggle").textContent = "Som ativo · clique para pausar";
    toast("A marca agora reage ao som");
  } catch {
    toast("Permita o microfone para ativar a reação sonora");
  }
}

function updateAudioLevel() {
  if (!analyser || !audioData) {
    audioLevel *= 0.92;
    audioBands.bass *= 0.91;
    audioBands.mid *= 0.91;
    audioBands.treble *= 0.88;
    return;
  }
  analyser.getByteFrequencyData(audioData);
  const averageBand = (from, to) => {
    let sum = 0;
    for (let index = from; index < Math.min(to, audioData.length); index += 1) sum += audioData[index];
    return sum / Math.max(1, Math.min(to, audioData.length) - from) / 255;
  };
  const bassTarget = Math.min(1, averageBand(1, 7) * 2.5);
  const midTarget = Math.min(1, averageBand(7, 34) * 2.15);
  const trebleTarget = Math.min(1, averageBand(34, 95) * 2.7);
  audioBands.bass += (bassTarget - audioBands.bass) * 0.12;
  audioBands.mid += (midTarget - audioBands.mid) * 0.14;
  audioBands.treble += (trebleTarget - audioBands.treble) * 0.24;
  const voiceBand = audioData.slice(2, 64);
  const average = voiceBand.reduce((sum, value) => sum + value, 0) / voiceBand.length / 255;
  audioLevel += (Math.min(1, average * 2.8) - audioLevel) * 0.22;
}

function flowNoise(x, y, time) {
  return (
    Math.sin(x * 0.017 + time * 1.7) +
    Math.cos(y * 0.021 - time * 1.25) +
    Math.sin((x + y) * 0.008 + time * 0.72)
  ) / 3;
}

function updateAndDrawBrandField(
  ctx,
  centerX,
  centerY,
  displayWidth,
  displayHeight,
  time,
  color,
  energy,
  particleSize,
  reactiveMode
) {
  if (!brandPoints.length) return;
  const [r, g, b] = color;
  const scale = displayWidth / 920;
  const scaleY = displayHeight / 488.17;
  const bass = Math.max(audioBands.bass, energy * 0.035);
  const mid = Math.max(audioBands.mid, energy * 0.025);
  const treble = Math.max(audioBands.treble, energy * 0.018);
  const soundDrive = audioLevel;
  const pointScale = particleSize / 100;
  const modeSettings = {
    breathe: { returnK: 0.062, damping: 0.84, spreadX: 62, spreadY: 34 },
    flow: { returnK: 0.048, damping: 0.81, spreadX: 112, spreadY: 54 },
    burst: { returnK: 0.035, damping: 0.77, spreadX: 190, spreadY: 125 }
  };
  const settings = modeSettings[reactiveMode] || modeSettings.breathe;
  const returnK = settings.returnK;
  const damping = Math.max(0.71, settings.damping - soundDrive * 0.045 - burstEnergy * 0.035);
  const maxOffsetX = 18 + soundDrive * settings.spreadX + bass * 52 + burstEnergy * 110;
  const maxOffsetY = 10 + soundDrive * settings.spreadY + mid * 28 + burstEnergy * 72;

  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  for (let index = 0; index < brandPoints.length; index += 1) {
    const point = brandPoints[index];
    const homeX = point.ox - point.x;
    const homeY = point.oy - point.y;
    const length = Math.max(1, Math.hypot(point.ox, point.oy));
    const radialX = point.ox / length;
    const radialY = point.oy / length;
    const field = flowNoise(point.ox, point.oy, time);
    const fieldAngle = field * Math.PI * 2.6 + time * 0.22;
    const localGate = 0.55 + 0.45 * Math.sin(point.phase + time * 0.7);
    let bassPush = bass * (5 + soundDrive * 30);
    let flowX = Math.cos(fieldAngle) * mid * (5 + soundDrive * 38) * localGate;
    let flowY = Math.sin(fieldAngle) * mid * (5 + soundDrive * 38) * localGate;
    let trebleShake = point.edge * treble * (3 + soundDrive * 14) * Math.sin(time * 24 + point.phase);

    if (reactiveMode === "breathe") {
      const breath = 0.55 + Math.sin(time * 2.4 + point.phase * 0.08) * 0.18;
      bassPush *= breath;
      flowX *= 0.32;
      flowY *= 0.32;
      trebleShake *= 0.42;
    } else if (reactiveMode === "flow") {
      const wave = Math.sin(point.ox * 0.018 - time * (3.2 + mid * 5) + point.phase * 0.2);
      flowX += wave * mid * (12 + soundDrive * 46);
      flowY += Math.cos(point.oy * 0.014 + time * 2.1) * mid * (5 + soundDrive * 18);
      bassPush *= 0.72;
    } else if (reactiveMode === "burst") {
      const hash = Math.sin(index * 91.137 + point.phase * 17.17) * 43758.5453;
      const randomAngle = (hash - Math.floor(hash)) * Math.PI * 2;
      const fragment = burstEnergy * (18 + soundDrive * 85) * (0.4 + point.edge * 0.8);
      flowX += Math.cos(randomAngle) * fragment;
      flowY += Math.sin(randomAngle) * fragment;
      bassPush *= 1.5 + burstEnergy * 1.8;
      trebleShake *= 2.2 + burstEnergy * 2.5;
    }

    point.vx += homeX * returnK;
    point.vy += homeY * returnK;
    point.vx += radialX * bassPush + flowX + trebleShake;
    point.vy += radialY * bassPush + flowY + trebleShake * 0.7;
    point.vx *= damping;
    point.vy *= damping;
    point.x += point.vx;
    point.y += point.vy;

    const offsetX = point.x - point.ox;
    const offsetY = point.y - point.oy;
    const normalizedOffset = Math.hypot(offsetX / maxOffsetX, offsetY / maxOffsetY);
    if (normalizedOffset > 1) {
      point.x = point.ox + offsetX / normalizedOffset;
      point.y = point.oy + offsetY / normalizedOffset;
      point.vx *= 0.25;
      point.vy *= 0.25;
    }

    const drawX = centerX + point.x * scale;
    const drawY = centerY + point.y * scaleY;
    const size = Math.max(0.55, scale * (1.45 + bass * 1.8 + point.edge * treble * 1.7) * pointScale);
    ctx.beginPath();
    ctx.arc(drawX, drawY, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${0.52 + energy * 0.26 + soundDrive * 0.12})`;
    ctx.fill();
  }
  ctx.restore();
}

function drawOrganism(time = 0) {
  const page = deck.pages[currentIndex];
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const deltaSeconds = previousFrameTime ? Math.min(0.05, (time - previousFrameTime) / 1000) : 0;
  previousFrameTime = time;
  updateAudioLevel();
  const audioAttack = Math.max(
    0,
    audioLevel - previousAudioLevel,
    audioBands.treble * 0.72 - previousAudioLevel * 0.32
  );
  if (page.reactiveMode === "burst" && audioAttack > 0.035) {
    burstEnergy = Math.min(1.4, burstEnergy + audioAttack * 4.8 + audioBands.bass * 0.16);
  }
  burstEnergy *= page.reactiveMode === "burst" ? 0.935 : 0.82;
  previousAudioLevel = audioLevel;
  const baseEnergy = page.energy / 100;
  const energy = Math.min(1.35, baseEnergy + audioLevel * 0.75);
  const [r, g, b] = hexToRgb(page.brandColor);
  const [gr, gg, gb] = hexToRgb(page.gradientColor);
  const t = time * 0.00018;
  const centerX = width * (page.brandX / 100);
  const centerY = height * (page.brandY / 100);
  gradientClock += deltaSeconds * 0.075;
  const modeGradientBoost =
    page.reactiveMode === "burst" ? burstEnergy * 0.34 :
    page.reactiveMode === "flow" ? audioBands.mid * 0.12 :
    0;
  const fieldBreath = 1 + Math.sin(gradientClock * 0.8) * 0.07 + audioBands.bass * 0.14 + modeGradientBoost;

  // Fundo fluido: três massas de cor se atravessam e a principal segue o gesto.
  const background = ctx.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, "#111311");
  background.addColorStop(0.52, `rgba(${Math.round(gr * 0.12)},${Math.round(gg * 0.12)},${Math.round(gb * 0.12)},1)`);
  background.addColorStop(1, "#090a09");
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  const gradientBlobs = [
    {
      x: width * (0.5 + Math.sin(gradientClock * 0.72) * 0.42),
      y: height * (0.5 + Math.cos(gradientClock * 0.49) * 0.25),
      radius: Math.max(width, height) * 0.34 * fieldBreath,
      alpha: 0.34
    },
    {
      x: width * (0.5 + Math.sin(gradientClock * 0.41 + 2.2) * 0.38),
      y: height * (0.5 + Math.cos(gradientClock * 0.57 + 1.1) * 0.30),
      radius: Math.max(width, height) * 0.46 * (1 + audioBands.bass * 0.10),
      alpha: 0.18
    },
    {
      x: width * (0.5 + Math.cos(gradientClock * 0.33 + 0.7) * 0.35),
      y: height * (0.5 + Math.sin(gradientClock * 0.38 + 2.8) * 0.28),
      radius: Math.max(width, height) * 0.40,
      alpha: 0.12
    }
  ];

  ctx.globalCompositeOperation = "screen";
  gradientBlobs.forEach((blob, index) => {
    const glow = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
    const warmth = index === 2 ? [gr, Math.round(gg * 0.5), Math.min(255, gb + 35)] : [gr, gg, gb];
    glow.addColorStop(0, `rgba(${warmth[0]},${warmth[1]},${warmth[2]},${blob.alpha * energy})`);
    glow.addColorStop(0.38, `rgba(${warmth[0]},${warmth[1]},${warmth[2]},${blob.alpha * 0.36 * energy})`);
    glow.addColorStop(1, `rgba(${warmth[0]},${warmth[1]},${warmth[2]},0)`);
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  });

  ctx.globalCompositeOperation = "screen";
  particles.forEach((particle, index) => {
    const current = Math.sin(t * 1.4 + particle.seed * 0.08) * 0.42;
    const branchAngle = particle.band * (Math.PI * 2 / 5) + current;
    const travel = ((t * particle.speed + particle.phase) % 1 + 1) % 1;
    const radius = particle.orbit * Math.min(width, height) * (0.45 + travel);
    let x = width * 0.5 + Math.cos(branchAngle + travel * 2.6) * radius;
    let y = height * 0.5 + Math.sin(branchAngle + travel * 2.1) * radius;

    const pulse = 0.8 + Math.sin(t * 7 + particle.phase + index) * 0.28;
    const size = particle.size * pulse * (page.particleSize / 100) *
      (1 + audioLevel * 0.45 + (page.reactiveMode === "burst" ? burstEnergy * 0.55 : 0));
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${0.08 + energy * 0.24})`;
    ctx.fill();
  });

  // A marca deixa de ser uma imagem rígida: cada ponto participa do campo sonoro.
  const pulse = 1 + Math.sin(t * 4.5) * 0.025 + audioBands.bass * 0.30 + audioLevel * 0.10;
  const logoWidth = Math.min(width, height) * (page.brandSize / 100) * pulse;
  const logoHeight = logoWidth * (488.17 / 917.11);
  brandBounds = {
    x: centerX - logoWidth / 2,
    y: centerY - logoHeight / 2,
    width: logoWidth,
    height: logoHeight
  };
  if (page.brandVisible) {
    updateAndDrawBrandField(
      ctx,
      centerX,
      centerY,
      logoWidth,
      logoHeight,
      t,
      [r, g, b],
      energy,
      page.particleSize,
      page.reactiveMode
    );
  }

  ctx.globalCompositeOperation = "source-over";
  ctx.shadowBlur = 0;
  animationFrame = requestAnimationFrame(drawOrganism);
}

$("#addPage").addEventListener("click", () => {
  deck.pages.push(makePage());
  goToPage(deck.pages.length - 1);
  saveDeck();
});
$("#duplicatePage").addEventListener("click", duplicateCurrent);
$("#deletePage").addEventListener("click", deleteCurrent);
$("#movePageUp").addEventListener("click", () => {
  if (currentIndex > 0) movePage(currentIndex, currentIndex - 1);
});
$("#movePageDown").addEventListener("click", () => {
  if (currentIndex < deck.pages.length - 1) movePage(currentIndex, currentIndex + 1);
});
$("#prevPage").addEventListener("click", () => goToPage(currentIndex - 1));
$("#nextPage").addEventListener("click", () => goToPage(currentIndex + 1));
$("#exportDeck").addEventListener("click", exportDeck);
$("#importDeck").addEventListener("change", (event) => event.target.files[0] && importDeck(event.target.files[0]));
$("#imagePicker").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file || !imageTarget) return;
  const reader = new FileReader();
  reader.onload = () => {
    setNested(deck.pages[currentIndex], imageTarget, reader.result);
    saveDeck();
    renderSlide();
    toast("Imagem substituída");
  };
  reader.readAsDataURL(file);
  event.target.value = "";
});
$("#audioToggle").addEventListener("click", startAudioReaction);
$("#toggleEditor").addEventListener("click", () => {
  $("#app").classList.toggle("editor-hidden");
  $("#toggleEditor").textContent = $("#app").classList.contains("editor-hidden") ? "Mostrar editor" : "Ocultar editor";
  setTimeout(resizeCanvas, 360);
});
$("#presentMode").addEventListener("click", async () => {
  document.body.classList.add("presenting");
  if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen().catch(() => {});
  resizeCanvas();
});
$("#layoutSelect").addEventListener("change", (event) => {
  deck.pages[currentIndex].layout = event.target.value;
  if (event.target.value === "metrics" && !deck.pages[currentIndex].metrics) {
    deck.pages[currentIndex].metrics = structuredClone(initialDeck.pages[3].metrics);
  }
  if (event.target.value === "gallery" && !deck.pages[currentIndex].images) {
    deck.pages[currentIndex].images = structuredClone(makePage().images);
  }
  if (event.target.value === "split" && !deck.pages[currentIndex].splitImages) {
    deck.pages[currentIndex].splitImages = structuredClone(makePage().splitImages);
  }
  if (event.target.value === "single" && !deck.pages[currentIndex].singleImage) {
    deck.pages[currentIndex].singleImage = makePage().singleImage;
  }
  if (event.target.value === "triple" && !deck.pages[currentIndex].tripleImages) {
    deck.pages[currentIndex].tripleImages = structuredClone(makePage().tripleImages);
  }
  if (event.target.value === "timeline") {
    deck.pages[currentIndex].timelineImages ??= structuredClone(makePage().timelineImages);
    deck.pages[currentIndex].timelineItems ??= structuredClone(makePage().timelineItems);
  }
  if (event.target.value === "bullets" && !deck.pages[currentIndex].bullets) {
    deck.pages[currentIndex].bullets = structuredClone(makePage().bullets);
  }
  renderSlide();
  saveDeck();
});
$("#brandColorInput").addEventListener("input", (event) => {
  deck.pages[currentIndex].brandColor = event.target.value;
  stage.style.setProperty("--accent", event.target.value);
  saveDeck();
});
$("#gradientColorInput").addEventListener("input", (event) => {
  deck.pages[currentIndex].gradientColor = event.target.value;
  saveDeck();
});
$("#textColorInput").addEventListener("input", (event) => {
  deck.pages[currentIndex].textColor = event.target.value;
  stage.style.setProperty("--slide-ink", event.target.value);
  saveDeck();
});
function setTextAlignment(alignment) {
  deck.pages[currentIndex].textAlign = alignment;
  renderSlide();
  saveDeck();
}

$("#alignLeftButton").addEventListener("click", () => setTextAlignment("left"));
$("#alignCenterButton").addEventListener("click", () => setTextAlignment("center"));
$("#textSizeInput").addEventListener("input", (event) => {
  deck.pages[currentIndex].textSize = Number(event.target.value);
  stage.style.setProperty("--text-scale", Number(event.target.value) / 100);
  saveDeck();
});
$("#textWidthInput").addEventListener("input", (event) => {
  deck.pages[currentIndex].textWidth = Number(event.target.value);
  stage.style.setProperty("--text-width", `${event.target.value}%`);
  saveDeck();
});
$("#energyInput").addEventListener("input", (event) => {
  deck.pages[currentIndex].energy = Number(event.target.value);
  saveDeck();
});
$("#reactiveModeSelect").addEventListener("change", (event) => {
  deck.pages[currentIndex].reactiveMode = event.target.value;
  burstEnergy = 0;
  saveDeck();
  const labels = {
    breathe: "Modo Respiração",
    flow: "Modo Fluxo",
    burst: "Modo Explosão"
  };
  toast(labels[event.target.value]);
});
$("#particleSizeInput").addEventListener("input", (event) => {
  deck.pages[currentIndex].particleSize = Number(event.target.value);
  saveDeck();
});
$("#addBullet").addEventListener("click", () => {
  const page = deck.pages[currentIndex];
  if (page.layout !== "bullets") return;
  page.bullets.push("Novo ponto — clique para editar");
  renderSlide();
  saveDeck();
  toast("Bullet adicionado");
});
$("#brandVisibleInput").addEventListener("change", (event) => {
  deck.pages[currentIndex].brandVisible = event.target.checked;
  saveDeck();
  toast(event.target.checked ? "Marca visível nesta página" : "Somente degradê nesta página");
});
$("#brandXInput").addEventListener("input", (event) => {
  deck.pages[currentIndex].brandX = Number(event.target.value);
  saveDeck();
});
$("#brandYInput").addEventListener("input", (event) => {
  deck.pages[currentIndex].brandY = Number(event.target.value);
  saveDeck();
});
$("#brandSizeInput").addEventListener("input", (event) => {
  deck.pages[currentIndex].brandSize = Number(event.target.value);
  saveDeck();
});

stage.addEventListener("pointermove", (event) => {
  if (draggingBrand) {
    const rect = stage.getBoundingClientRect();
    const positionX = (event.clientX - rect.left) / rect.width;
    const positionY = (event.clientY - rect.top) / rect.height;
    deck.pages[currentIndex].brandX = Math.round(Math.max(-60, Math.min(160, positionX * 100)));
    deck.pages[currentIndex].brandY = Math.round(Math.max(5, Math.min(95, positionY * 100)));
    $("#brandXInput").value = deck.pages[currentIndex].brandX;
    $("#brandYInput").value = deck.pages[currentIndex].brandY;
  }
});
stage.addEventListener("pointerdown", (event) => {
  const rect = stage.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  if (
    x >= brandBounds.x && x <= brandBounds.x + brandBounds.width &&
    y >= brandBounds.y && y <= brandBounds.y + brandBounds.height
  ) {
    draggingBrand = true;
    stage.setPointerCapture(event.pointerId);
    stage.classList.add("dragging-brand");
  }
});
stage.addEventListener("pointerup", (event) => {
  if (!draggingBrand) return;
  draggingBrand = false;
  stage.releasePointerCapture(event.pointerId);
  stage.classList.remove("dragging-brand");
  saveDeck();
  toast("Posição da marca salva nesta página");
});

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    document.body.classList.remove("presenting");
    resizeCanvas();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "PageDown") {
    event.preventDefault();
    document.activeElement?.blur?.();
    goToPage(currentIndex + 1);
  }
  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    document.activeElement?.blur?.();
    goToPage(currentIndex - 1);
  }
  if (event.key === "Escape" && document.body.classList.contains("presenting")) {
    document.body.classList.remove("presenting");
    if (document.fullscreenElement) document.exitFullscreen();
  }
}, true);

window.addEventListener("resize", resizeCanvas);
renderSlide();
resizeCanvas();
cancelAnimationFrame(animationFrame);
drawOrganism();
