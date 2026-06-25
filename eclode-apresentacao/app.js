const STORAGE_KEY = "eclode-deck-v1";
const MEDIA_DB_NAME = "eclode-media-v1";
const MEDIA_STORE = "media";
const BRAND_POINTS_FIX_VERSION = "official-points-v4";
const OFFICIAL_BRAND_SVG_BASE64 = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgaWQ9IkNhbWFkYV8xIgogICB2ZXJzaW9uPSIxLjEiCiAgIHZpZXdCb3g9IjAgMCA5MTcuMTEgNDg4LjE3IgogICBzb2RpcG9kaTpkb2NuYW1lPSJlY2xvZGVfbWFyY2FfYnJhbmNhLnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS40ICg4NmE4YWQ3LCAyMDI0LTEwLTExKSIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9Im5hbWVkdmlldzciCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjMDAwMDAwIgogICAgIGJvcmRlcm9wYWNpdHk9IjAuMjUiCiAgICAgaW5rc2NhcGU6c2hvd3BhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlY2hlY2tlcmJvYXJkPSIwIgogICAgIGlua3NjYXBlOmRlc2tjb2xvcj0iI2QxZDFkMSIKICAgICBpbmtzY2FwZTp6b29tPSIwLjI3OTkxOTY2IgogICAgIGlua3NjYXBlOmN4PSI1NzMuMzc4OCIKICAgICBpbmtzY2FwZTpjeT0iNTk0LjgxMzUyIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTkyMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI5OTEiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii05IgogICAgIGlua3NjYXBlOndpbmRvdy15PSItOSIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9IkNhbWFkYV8xIiAvPgogIDwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyOS44LjcsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiAyLjEuMSBCdWlsZCAxKSAgLS0+CiAgPGRlZnMKICAgICBpZD0iZGVmczEiPgogICAgPHN0eWxlCiAgICAgICBpZD0ic3R5bGUxIj4KICAgICAgLnN0MCB7CiAgICAgICAgZmlsbDogIzFhMWIzOTsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPGcKICAgICBpZD0iZzYiCiAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZiI+CiAgICA8cGF0aAogICAgICAgY2xhc3M9InN0MCIKICAgICAgIGQ9Ik0zNDcuMDYsMjU5LjIyYzAtMjYuNjMsMTUuODUtNDUuODEsNDMuNDQtNDUuODFzNDEuODUsMTguNzEsNDEuODUsNDUuODFjMCwyLjctLjE2LDQuNDQtLjYzLDcuMTNoLTY3LjIxYzEuNDMsMTUuMjIsMTIuODQsMjMuNzgsMjkuMTcsMjMuNzgsMTAuNzgsMCwxOS4zNC0yLjIyLDI4LjY5LTcuNzdsNi4zNCwxMy4zMmMtOS44Myw2LjE4LTIxLjQsOS4zNS0zNS45OCw5LjM1LTI5LjgsMC00NS42NS0xOC43MS00NS42NS00NS44MVpNNDE1LjU1LDI1Mi44N2MtLjk1LTE1LjIyLTkuMTktMjQuNTctMjUuMDUtMjQuNTdzLTI1LjUyLDkuNTEtMjUuNTIsMjQuNTdoNTAuNTdaIgogICAgICAgaWQ9InBhdGgxIgogICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZiIgLz4KICAgIDxwYXRoCiAgICAgICBjbGFzcz0ic3QwIgogICAgICAgZD0iTTQ0MS44NiwyNTkuMjJjMC0yNi42MywxNS4yMi00NS44MSw0NC4yMy00NS44MSwxMy43OSwwLDI0LjI1LDMuNjUsMzIuMzQsMTAuMTVsLTcuOTMsMTNjLTguMjQtNS4yMy0xNC40My03LjI5LTIyLjk5LTcuMjktMTkuOTcsMC0yOC41MywxMi4zNy0yOC41MywyOS45NnM4LjA4LDMwLjEyLDI4LjUzLDMwLjEyYzguODgsMCwxNS44NS0yLjIyLDI0Ljg5LTcuOTNsNy42MSwxMy4zMmMtOS45OSw2LjY2LTIwLjI5LDEwLjMtMzUuNTEsMTAuMy0yNy45LDAtNDIuNjQtMTguODYtNDIuNjQtNDUuODFaIgogICAgICAgaWQ9InBhdGgyIgogICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZiIgLz4KICAgIDxwYXRoCiAgICAgICBjbGFzcz0ic3QwIgogICAgICAgZD0iTTUzMS45LDI4MS44OHYtOTMuNTNsMTYuMTctNC40NHY5NC42NGMwLDcuOTMsMi42OSwxMC43OCw4LjcyLDEwLjc4LDIuODUsMCw1LjcxLS45NSw5LjA0LTMuOTZ2MTQuOWMtMi4wNiwyLjM4LTcuMjksNC43Ni0xMy43OSw0Ljc2LTguODgsMC0yMC4xMy00LjYtMjAuMTMtMjMuMTRaIgogICAgICAgaWQ9InBhdGgzIgogICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZiIgLz4KICAgIDxwYXRoCiAgICAgICBjbGFzcz0ic3QwIgogICAgICAgZD0iTTU2OS43OSwyNTkuMjJjMC0yNy4yNywxNS4yMi00NS44MSw0NS42NS00NS44MXM0NS42NSwxOC41NSw0NS42NSw0NS44MS0xNS4yMiw0NS44MS00NS42NSw0NS44MS00NS42NS0xOC41NS00NS42NS00NS44MVpNNjQzLjk4LDI1OS4yMmMwLTE4LjIzLTguNTYtMjkuOTYtMjguNTMtMjkuOTZzLTI4LjUzLDExLjczLTI4LjUzLDI5Ljk2LDguNCwzMC4xMiwyOC41MywzMC4xMiwyOC41My0xMS44OSwyOC41My0zMC4xMloiCiAgICAgICBpZD0icGF0aDQiCiAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmIiAvPgogICAgPHBhdGgKICAgICAgIGNsYXNzPSJzdDAiCiAgICAgICBkPSJNNzQ1LjQzLDMwNC4zOWMtMS43NC00LjkxLTMuMDEtOS42Ny0zLjgtMTYuMzMtNi41LDExLjg5LTE5LjAyLDE2Ljk2LTMxLjA3LDE2Ljk2LTIzLjMsMC0zOS45NS0xNS44NS0zOS45NS00NC4zOXMxOC41NS00Ny40LDQ3LjQtNDcuNGM3Ljc3LDAsMTUuODUsMS40MywyMi45OSw0LjI4di0yOS4xN2wxNi4zMy00LjQ0djg5Ljg4YzAsMTIuNTIuMTYsMTkuODIsMi42OSwzMC41OWgtMTQuNThaTTc0MC45OSwyNTkuMDZ2LTI2Yy02LjAyLTMuOC0xMi41Mi01LjM5LTIzLjMtNS4zOS0xOS45NywwLTI5Ljk2LDEzLTI5Ljk2LDMyLjk3LDAsMTguNzEsOS4zNSwyOS44LDI1LjY4LDI5LjgsMTguMzksMCwyNy41OC0xMy42MywyNy41OC0zMS4zOVoiCiAgICAgICBpZD0icGF0aDUiCiAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmIiAvPgogICAgPHBhdGgKICAgICAgIGNsYXNzPSJzdDAiCiAgICAgICBkPSJNNzczLjMzLDI1OS4yMmMwLTI2LjYzLDE1Ljg1LTQ1LjgxLDQzLjQ0LTQ1LjgxczQxLjg1LDE4LjcxLDQxLjg1LDQ1LjgxYzAsMi43LS4xNiw0LjQ0LS42Myw3LjEzaC02Ny4yMWMxLjQzLDE1LjIyLDEyLjg0LDIzLjc4LDI5LjE3LDIzLjc4LDEwLjc4LDAsMTkuMzQtMi4yMiwyOC42OS03Ljc3bDYuMzQsMTMuMzJjLTkuODMsNi4xOC0yMS40LDkuMzUtMzUuOTgsOS4zNS0yOS44LDAtNDUuNjUtMTguNzEtNDUuNjUtNDUuODFaTTg0MS44MSwyNTIuODdjLS45NS0xNS4yMi05LjE5LTI0LjU3LTI1LjA1LTI0LjU3cy0yNS41Miw5LjUxLTI1LjUyLDI0LjU3aDUwLjU3WiIKICAgICAgIGlkPSJwYXRoNiIKICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmYiIC8+CiAgPC9nPgogIDxwYXRoCiAgICAgY2xhc3M9InN0MCIKICAgICBkPSJNNDA4LjEsNDU2Ljc1bC0xMDcuMTUtMTk0LjE4YzEuMjYtMS45OCwxLjUzLTQuNDIuNzgtNi42bDkwLjk5LTE0OC42MWMuNDUtLjc0LjIyLTEuNy0uNTItMi4xNWwtMy4xMi0xLjkxYy0uNzQtLjQ1LTEuNy0uMjItMi4xNS41MmwtODguNTgsMTQ0LjY3LS4yNS4wMywxNS4wNC0xMjQuOTEtMy4xNS0uMzgtMTUuMTIsMTI1LjY1LS4zMy4wNC0uNzUtLjI1LTkuOTktMjI1LjQ5LTQuNDcuMiw5Ljc2LDIyMC4xNS01NC44MS0xMzYuNzktMy4xNSwxLjI2LDQ4LjY3LDEyMS40Ni05MC40MS0xNTQuMWMtLjQ4LS44Mi0xLjU0LTEuMDktMi4zNi0uNjFsLTMuNDcsMi4wNGMtLjgyLjQ4LTEuMDksMS41NC0uNjEsMi4zNmw5NC41MSwxNjEuMDgtMTE3LjA0LTExMS4yNi0yLjYzLDIuNzcsMTE0LjY4LDEwOS4wMS04LjM0LTQuMzgtMTM1LjQ0LTkxLjg2LTEuODIsMi42OCwxMTEuNjEsNzUuNy0xNTkuNTItODMuODQtLjY5LDEuMzEsMTcxLjEyLDg5Ljk1LDEwLjYsNy4xOUw0MC4zNywxNjQuNzNsLTEuMTgsMy41NiwyMzIuMTksNzYuOSw1Ljg0LDMuOTYtNjAuNTEtMTEuNzYtMS4yLDYuMTcsNDYuMTMsOC45Ni0uNDEuMDUtMjAyLjU3LDMuNDRjLS42OS4wMS0xLjI0LjU4LTEuMjMsMS4yN2wuMDUsMi45MmMuMDEuNjkuNTgsMS4yNCwxLjI3LDEuMjNsMTQ0LjM3LTIuNDUtMTE3LjcxLDEyLjk4LjU5LDUuMzksMTc1LjU3LTE5LjM1LDE2LjIyLS4yOC05Ny40NSwzOS4wNSwyLjc0LDYuODUsMTAwLjY1LTQwLjMzLTIxNC4yOSwxMjMuNzIsMS42OCwyLjkyLDIxNC42LTEyMy45LTE1Ny40LDE4NS45NSw1Ljk2LDUuMDUsMTM2LjMyLTE2MS4wNS03Ny40MywxMzUuNTIsNC43MSwyLjY5LDgxLjU2LTE0Mi43NC00MS45Nyw5Mi40MSwyLjEuOTUsNTEuMTEtMTEyLjU0LDEuMS0xLjMxLTE2LjA3LDE3OS4xNSw1LjQuNDgsMTQuMjctMTU5LjA4LDUuMjUsNzAuMjcsNS40LS40LTYuNzgtOTAuNjcsMTA0LjEsMTg4LjY1LDQuNzQtMi42MloiCiAgICAgaWQ9InBhdGg3IgogICAgIHN0eWxlPSJmaWxsOiNmZmZmZmYiIC8+Cjwvc3ZnPgo=";

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
      subtitle: "identidade generativa em movimento",
      subtitleVisible: true,
      body: "Uma identidade que não se repete. Ela cresce, reage e deixa cada gesto participar da forma."
    },
    {
      id: crypto.randomUUID(),
      layout: "statement",
      accent: "#ff725c",
      energy: 88,
      eyebrow: "01 · O princípio",
      title: "A marca como organismo.",
      subtitle: "um sistema vivo entre regra, som e acidente",
      subtitleVisible: true,
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
      subtitle: "pontos, campo e imagem se reorganizam em tempo real",
      subtitleVisible: true,
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
      subtitle: "da apresentação à impressão, tudo nasce do mesmo pulso",
      subtitleVisible: true,
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
let mediaDbPromise;
const mediaUrlCache = new Map();
let draggingBrand = false;
let draggedPageIndex = null;
let brandBounds = { x: 0, y: 0, width: 0, height: 0 };
let brandPoints = [];
let brandPointCloudFailed = false;
let brandPointCloudLoading = false;
let lastAnimationError = "";
let gradientClock = 0;
let previousFrameTime = 0;
let embeddedBrandSvgText = "";

const $ = (selector) => document.querySelector(selector);
const stage = $("#stage");
const slideContent = $("#slideContent");
const canvas = $("#organism");
const ctx = canvas.getContext("2d");
const brandImage = new Image();
brandImage.addEventListener("load", buildBrandPointCloud);
brandImage.addEventListener("error", () => buildBrandPointCloudFromEmbeddedSvg());
brandImage.src = "./eclode_marca_branca.svg";
buildBrandPointCloudFromEmbeddedSvg();
const particles = Array.from({ length: 24 }, (_, index) => ({
  seed: Math.random() * 1000,
  phase: Math.random() * Math.PI * 2,
  orbit: 0.08 + Math.random() * 0.42,
  size: 0.7 + Math.random() * 3.5,
  speed: 0.08 + Math.random() * 0.3,
  band: index % 5
}));

function buildBrandPointCloud() {
  if (!brandImage.complete || !brandImage.naturalWidth) return;
  const sampleWidth = 920;
  const sampleHeight = Math.round(sampleWidth * (488.17 / 917.11));
  const sampleCanvas = document.createElement("canvas");
  const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });
  sampleCanvas.width = sampleWidth;
  sampleCanvas.height = sampleHeight;
  let pixels;
  try {
    sampleContext.drawImage(brandImage, 0, 0, sampleWidth, sampleHeight);
    pixels = sampleContext.getImageData(0, 0, sampleWidth, sampleHeight).data;
  } catch (error) {
    brandPointCloudFailed = true;
    lastAnimationError = error.message || "Falha ao ler pixels do SVG oficial";
    loadBrandPointCloudFromOfficialSvg();
    return;
  }
  setBrandPointsFromPixels(pixels, sampleWidth, sampleHeight);
}

function makeBrandPoint(x, y, sampleWidth, sampleHeight, alpha = 255) {
  const ox = x - sampleWidth / 2;
  const oy = y - sampleHeight / 2;
  return {
    ox,
    oy,
    x: ox,
    y: oy,
    vx: 0,
    vy: 0,
    phase: (x * 0.071 + y * 0.043) % (Math.PI * 2),
    edge: alpha < 245 ? 1 : 0
  };
}

function setBrandPointsFromPixels(pixels, sampleWidth, sampleHeight) {
  const points = [];
  const step = 5;
  for (let y = 0; y < sampleHeight; y += step) {
    for (let x = 0; x < sampleWidth; x += step) {
      const alpha = pixels[(y * sampleWidth + x) * 4 + 3];
      if (alpha < 72) continue;
      const edgeNoise = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      if (alpha < 210 && edgeNoise - Math.floor(edgeNoise) > 0.64) continue;
      points.push(makeBrandPoint(x, y, sampleWidth, sampleHeight, alpha));
    }
  }
  if (points.length) {
    brandPointCloudFailed = false;
    brandPoints = points;
  } else {
    brandPointCloudFailed = true;
    lastAnimationError = "SVG oficial carregou, mas não gerou pontos";
  }
}

function getEmbeddedBrandSvg() {
  if (embeddedBrandSvgText) return embeddedBrandSvgText;
  try {
    const bytes = Uint8Array.from(atob(OFFICIAL_BRAND_SVG_BASE64), (character) => character.charCodeAt(0));
    embeddedBrandSvgText = new TextDecoder("utf-8").decode(bytes);
  } catch (error) {
    lastAnimationError = error.message || "Falha ao ler SVG oficial embutido";
  }
  return embeddedBrandSvgText;
}

async function buildBrandPointCloudFromEmbeddedSvg() {
  const svgText = getEmbeddedBrandSvg();
  if (!svgText) return;
  await buildBrandPointCloudFromSvgText(svgText);
}

async function loadBrandPointCloudFromOfficialSvg() {
  if (brandPointCloudLoading) return;
  brandPointCloudLoading = true;
  try {
    let svgText = getEmbeddedBrandSvg();
    if (!svgText && typeof fetch === "function") {
      const response = await fetch("./eclode_marca_branca.svg", { cache: "no-store" });
    if (!response.ok) throw new Error("SVG oficial não encontrado");
      svgText = await response.text();
    }
    if (!svgText) throw new Error("SVG oficial nÃ£o disponÃ­vel");
    await buildBrandPointCloudFromSvgText(svgText);
  } catch (error) {
    brandPointCloudFailed = true;
    lastAnimationError = error.message || "Falha ao carregar SVG oficial";
  } finally {
    brandPointCloudLoading = false;
  }
}

async function buildBrandPointCloudFromSvgText(svgText) {
  await buildBrandPointCloudFromInlineSvg(svgText);
  if (!brandPoints.length) buildBrandPointCloudFromSvgDom(svgText);
  if (!brandPoints.length) buildBrandPointCloudFromSvgPaths(svgText);
}

function buildBrandPointCloudFromInlineSvg(svgText) {
  const image = new Image();
  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgText)}`;
  return new Promise((resolve) => {
    image.onload = () => {
      const sampleWidth = 920;
      const sampleHeight = Math.round(sampleWidth * (488.17 / 917.11));
      const sampleCanvas = document.createElement("canvas");
      const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });
      sampleCanvas.width = sampleWidth;
      sampleCanvas.height = sampleHeight;
      try {
        sampleContext.drawImage(image, 0, 0, sampleWidth, sampleHeight);
        const pixels = sampleContext.getImageData(0, 0, sampleWidth, sampleHeight).data;
        setBrandPointsFromPixels(pixels, sampleWidth, sampleHeight);
      } catch (error) {
        brandPointCloudFailed = true;
        lastAnimationError = error.message || "Falha ao rasterizar SVG oficial";
      }
      resolve();
    };
    image.onerror = () => resolve();
    image.src = url;
  });
}

function buildBrandPointCloudFromSvgDom(svgText) {
  let host;
  try {
    host = document.createElement("div");
    host.style.cssText = "position:absolute;left:-99999px;top:-99999px;width:0;height:0;overflow:hidden;";
    host.innerHTML = svgText;
    document.body.appendChild(host);
    const svg = host.querySelector("svg");
    const paths = Array.from(host.querySelectorAll("path"))
      .filter((path) => typeof path.isPointInFill === "function" || typeof path.isPointInStroke === "function");
    if (!svg || !paths.length || typeof DOMPoint !== "function") return;

    const viewBox = (svg.getAttribute("viewBox") || "0 0 917.11 488.17")
      .trim()
      .split(/\s+/)
      .map(Number);
    const sourceWidth = viewBox[2] || 917.11;
    const sourceHeight = viewBox[3] || 488.17;
    const sampleWidth = 920;
    const sampleHeight = Math.round(sampleWidth * (sourceHeight / sourceWidth));
    const step = 6;
    const points = [];

    for (let y = 0; y < sampleHeight; y += step) {
      for (let x = 0; x < sampleWidth; x += step) {
        const sourceX = viewBox[0] + (x / sampleWidth) * sourceWidth;
        const sourceY = viewBox[1] + (y / sampleHeight) * sourceHeight;
        const point = new DOMPoint(sourceX, sourceY);
        const inside = paths.some((path) =>
          (typeof path.isPointInFill === "function" && path.isPointInFill(point)) ||
          (typeof path.isPointInStroke === "function" && path.isPointInStroke(point))
        );
        if (!inside) continue;
        points.push(makeBrandPoint(x, y, sampleWidth, sampleHeight, 255));
      }
    }

    if (points.length) {
      brandPoints = points;
      brandPointCloudFailed = false;
      lastAnimationError = "";
    }
  } catch (error) {
    brandPointCloudFailed = true;
    lastAnimationError = error.message || "Falha ao converter SVG oficial via DOM";
  } finally {
    host?.remove();
  }
}

function buildBrandPointCloudFromSvgPaths(svgText) {
  const sampleWidth = 920;
  const sampleHeight = Math.round(sampleWidth * (488.17 / 917.11));
  let paths;
  try {
    const svgDocument = new DOMParser().parseFromString(svgText, "image/svg+xml");
    paths = Array.from(svgDocument.querySelectorAll("path"))
      .map((path) => path.getAttribute("d"))
      .filter(Boolean)
      .map((pathData) => new Path2D(pathData));
  } catch (error) {
    brandPointCloudFailed = true;
    lastAnimationError = error.message || "Falha ao ler paths do SVG oficial";
    return;
  }
  if (!paths.length) return;

  const hitCanvas = document.createElement("canvas");
  const hitContext = hitCanvas.getContext("2d");
  hitCanvas.width = sampleWidth;
  hitCanvas.height = sampleHeight;
  const points = [];
  const step = 6;
  const scaleX = 917.11 / sampleWidth;
  const scaleY = 488.17 / sampleHeight;
  for (let y = 0; y < sampleHeight; y += step) {
    for (let x = 0; x < sampleWidth; x += step) {
      const sourceX = x * scaleX;
      const sourceY = y * scaleY;
      if (!paths.some((path) => hitContext.isPointInPath(path, sourceX, sourceY))) continue;
      points.push(makeBrandPoint(x, y, sampleWidth, sampleHeight, 255));
    }
  }

  if (points.length) {
    brandPoints = points;
    brandPointCloudFailed = false;
    lastAnimationError = "";
  } else {
    brandPointCloudFailed = true;
    lastAnimationError = "SVG oficial carregou, mas os paths não geraram pontos";
  }
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
    page.gradientColor2 ??= "#ff725c";
    page.textColor ??= "#f4f1e9";
    page.textAlign ??= "left";
    page.textSize ??= 100;
    page.textWidth ??= 100;
    page.subtitle ??= "Subtítulo editável";
    page.subtitleVisible ??= false;
    page.particleSize ??= 100;
    page.brandDensity ??= 120;
    page.reactiveMode ??= "breathe";
    page.brandVisible ??= true;
    page.brandX ??= 70;
    page.brandY ??= 48;
    page.brandSize ??= 46;
    if (page.brandPointsFixVersion !== BRAND_POINTS_FIX_VERSION) {
      page.brandVisible = true;
      page.brandX = 50;
      page.brandY = 46;
      page.brandSize = 62;
      page.brandDensity = 180;
      page.brandPointsFixVersion = BRAND_POINTS_FIX_VERSION;
    }
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

function escapeAttribute(value = "") {
  return escapeHtml(String(value)).replaceAll('"', "&quot;");
}

function editable(field, className, tag = "div", value) {
  return `<${tag} class="${className}" contenteditable="true" spellcheck="false" data-field="${field}">${escapeHtml(value ?? "")}</${tag}>`;
}

function subtitleBlock(page) {
  return page.subtitleVisible ? editable("subtitle", "subtitle", "div", page.subtitle) : "";
}

function openMediaDb() {
  if (mediaDbPromise) return mediaDbPromise;
  mediaDbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(MEDIA_DB_NAME, 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(MEDIA_STORE, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return mediaDbPromise;
}

async function saveMediaFile(file) {
  const id = crypto.randomUUID();
  const db = await openMediaDb();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(MEDIA_STORE, "readwrite");
    transaction.objectStore(MEDIA_STORE).put({
      id,
      type: file.type || "application/octet-stream",
      name: file.name,
      blob: file,
      updatedAt: Date.now()
    });
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
  return `eclode-media:${id}:${encodeURIComponent(file.type || "application/octet-stream")}`;
}

function parseMediaRef(source = "") {
  if (!source.startsWith("eclode-media:")) return null;
  const [, id, encodedType = ""] = source.split(":");
  return { id, type: decodeURIComponent(encodedType) };
}

async function getMediaObjectUrl(source) {
  const ref = parseMediaRef(source);
  if (!ref) return source;
  if (mediaUrlCache.has(ref.id)) return mediaUrlCache.get(ref.id);
  const db = await openMediaDb();
  const record = await new Promise((resolve, reject) => {
    const transaction = db.transaction(MEDIA_STORE, "readonly");
    const request = transaction.objectStore(MEDIA_STORE).get(ref.id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  if (!record?.blob) return "";
  const url = URL.createObjectURL(record.blob);
  mediaUrlCache.set(ref.id, url);
  return url;
}

function mediaTypeFromSource(source = "") {
  const ref = parseMediaRef(source);
  const value = ref?.type || source;
  if (value.startsWith("video/") || value.startsWith("data:video/")) return "video";
  if (/\.(mp4|webm|mov|m4v|ogv)(\?|#|$)/i.test(value)) return "video";
  return "image";
}

function imageSlot(source, field, label = "Trocar imagem") {
  const type = mediaTypeFromSource(source);
  const sourceAttr = escapeAttribute(source);
  const labelAttr = escapeAttribute(label.replace("imagem", "mídia"));
  const localRef = parseMediaRef(source);
  const media =
    type === "video"
      ? `<video data-media-source="${sourceAttr}"${localRef ? "" : ` src="${sourceAttr}"`} autoplay muted loop playsinline preload="metadata"></video>`
      : `<img data-media-source="${sourceAttr}" src="${sourceAttr}" alt="" />`;
  return `<div class="editable-image" role="button" tabindex="0" data-image-field="${field}" title="${labelAttr}">
    ${media}
    <span>${label}</span>
  </div>`;
}

async function hydrateLocalMedia() {
  const mediaElements = Array.from(slideContent.querySelectorAll("[data-media-source]"));
  await Promise.all(mediaElements.map(async (element) => {
    const source = element.dataset.mediaSource;
    if (!parseMediaRef(source)) return;
    const url = await getMediaObjectUrl(source);
    if (!url) return;
    element.src = url;
    if (element.tagName === "VIDEO") {
      element.load();
      element.play().catch(() => {});
    }
  }));
}

function applyImageRatios() {
  slideContent.querySelectorAll(".editable-image img, .editable-image video").forEach((image) => {
    const apply = () => {
      const width = image.naturalWidth || image.videoWidth;
      const height = image.naturalHeight || image.videoHeight;
      if (!width || !height) return;
      const ratio = width / height;
      const slot = image.closest(".editable-image");
      if (!slot) return;
      const fitWidth = ratio < 0.82 ? Math.max(42, Math.min(76, ratio * 92)) :
        ratio > 1.45 ? 100 :
        Math.max(72, Math.min(92, ratio * 76));
      slot.style.setProperty("--img-ratio", ratio.toFixed(4));
      slot.style.setProperty("--media-fit-width", `${fitWidth.toFixed(1)}%`);
      slot.classList.toggle("image-portrait", ratio < 0.82);
      slot.classList.toggle("image-wide", ratio > 1.45);
      slot.classList.toggle("image-square", ratio >= 0.82 && ratio <= 1.45);
    };
    image.addEventListener("load", apply, { once: true });
    image.addEventListener("loadedmetadata", apply, { once: true });
    if (image.complete) apply();
  });
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
      ${subtitleBlock(page)}
      ${editable("body", "body-copy", "p", page.body)}
    `,
    statement: () => `
      ${editable("eyebrow", "eyebrow", "div", page.eyebrow)}
      ${editable("title", "title", "h1", page.title)}
      ${subtitleBlock(page)}
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
        ${subtitleBlock(page)}
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
        ${subtitleBlock(page)}
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
        ${subtitleBlock(page)}
        ${editable("body", "body-copy", "p", page.body)}
      </div>
    `,
    timeline: () => `
      <div class="timeline-header">
        ${editable("eyebrow", "eyebrow", "div", page.eyebrow)}
        ${editable("title", "title", "h1", page.title)}
        ${subtitleBlock(page)}
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
        ${subtitleBlock(page)}
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
        ${subtitleBlock(page)}
        ${editable("body", "body-copy", "p", page.body)}
      </div>
    `,
    metrics: () => `
      <div class="metrics-intro">
        ${editable("eyebrow", "eyebrow", "div", page.eyebrow)}
        ${editable("title", "title", "h1", page.title)}
        ${subtitleBlock(page)}
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
  $("#gradientColor2Input").value = page.gradientColor2;
  $("#textColorInput").value = page.textColor;
  $("#subtitleVisibleInput").checked = page.subtitleVisible;
  $("#alignLeftButton").classList.toggle("active", page.textAlign === "left");
  $("#alignCenterButton").classList.toggle("active", page.textAlign === "center");
  $("#textSizeInput").value = page.textSize;
  $("#textWidthInput").value = page.textWidth;
  $("#energyInput").value = page.energy;
  $("#reactiveModeSelect").value = page.reactiveMode;
  $("#particleSizeInput").value = page.particleSize;
  $("#brandDensityInput").value = page.brandDensity;
  $("#brandVisibleInput").checked = page.brandVisible;
  $("#brandXInput").value = page.brandX;
  $("#brandYInput").value = page.brandY;
  $("#brandSizeInput").value = page.brandSize;
  $("#bulletControls").hidden = page.layout !== "bullets";
  bindEditable();
  bindImages();
  hydrateLocalMedia().then(applyImageRatios).catch(() => {});
  applyImageRatios();
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
    const openPicker = () => {
      imageTarget = element.dataset.imageField;
      $("#imagePicker").click();
    };
    element.addEventListener("click", openPicker);
    element.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openPicker();
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
    gradientColor2: "#ff725c",
    textColor: "#f4f1e9",
    textAlign: "left",
    textSize: 100,
    textWidth: 100,
    energy: 70,
    particleSize: 100,
    brandDensity: 120,
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
    subtitle: "Subtítulo editável",
    subtitleVisible: false,
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
  brandDensity,
  reactiveMode
) {
  const [r, g, b] = color;
  if (!brandPoints.length) {
    if (brandImage.complete && brandImage.naturalWidth) buildBrandPointCloud();
    if (!brandPoints.length) {
      loadBrandPointCloudFromOfficialSvg();
      return;
    }
  }
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
  const drawEvery = Math.max(1, Math.round(220 / Math.max(25, brandDensity || 120)));
  const returnK = settings.returnK;
  const damping = Math.max(0.71, settings.damping - soundDrive * 0.045 - burstEnergy * 0.035);
  const maxOffsetX = 18 + soundDrive * settings.spreadX + bass * 52 + burstEnergy * 110;
  const maxOffsetY = 10 + soundDrive * settings.spreadY + mid * 28 + burstEnergy * 72;

  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  for (let index = 0; index < brandPoints.length; index += drawEvery) {
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
  try {
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
  const [g2r, g2g, g2b] = hexToRgb(page.gradientColor2 || page.gradientColor);
  const t = time * 0.00018;
  const centerX = width * (page.brandX / 100);
  const centerY = height * (page.brandY / 100);
  gradientClock += deltaSeconds * 0.052;
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

  const slowMix = gradientClock * 0.34;
  const gradientBlobs = [
    {
      x: width * (0.5 + Math.sin(gradientClock * 0.72) * 0.42),
      y: height * (0.5 + Math.cos(gradientClock * 0.49) * 0.25),
      radius: Math.max(width, height) * 0.34 * fieldBreath,
      alpha: 0.30,
      color: [gr, gg, gb]
    },
    {
      x: width * (0.5 + Math.sin(gradientClock * 0.41 + 2.2) * 0.38),
      y: height * (0.5 + Math.cos(gradientClock * 0.57 + 1.1) * 0.30),
      radius: Math.max(width, height) * 0.46 * (1 + audioBands.bass * 0.10),
      alpha: 0.14,
      color: [gr, gg, gb]
    },
    {
      x: width * (0.5 + Math.cos(gradientClock * 0.33 + 0.7) * 0.35),
      y: height * (0.5 + Math.sin(gradientClock * 0.38 + 2.8) * 0.28),
      radius: Math.max(width, height) * 0.40,
      alpha: 0.09,
      color: [gr, Math.round(gg * 0.5), Math.min(255, gb + 35)]
    },
    {
      x: width * (0.5 + Math.sin(slowMix + 0.4) * 0.48),
      y: height * (0.5 + Math.cos(slowMix * 0.78 + 1.6) * 0.36),
      radius: Math.max(width, height) * (0.50 + Math.sin(slowMix * 1.2) * 0.045 + audioBands.mid * 0.05),
      alpha: 0.22,
      color: [g2r, g2g, g2b]
    },
    {
      x: width * (0.5 + Math.cos(slowMix * 0.82 + 3.1) * 0.46),
      y: height * (0.5 + Math.sin(slowMix * 0.68 + 2.4) * 0.34),
      radius: Math.max(width, height) * (0.43 + Math.cos(slowMix) * 0.04 + audioBands.bass * 0.045),
      alpha: 0.18,
      color: [g2r, Math.min(255, Math.round(g2g * 1.08)), Math.min(255, Math.round(g2b * 1.12))]
    }
  ];

  ctx.globalCompositeOperation = "screen";
  gradientBlobs.forEach((blob) => {
    const glow = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
    const warmth = blob.color;
    glow.addColorStop(0, `rgba(${warmth[0]},${warmth[1]},${warmth[2]},${blob.alpha * energy})`);
    glow.addColorStop(0.34, `rgba(${warmth[0]},${warmth[1]},${warmth[2]},${blob.alpha * 0.42 * energy})`);
    glow.addColorStop(0.72, `rgba(${warmth[0]},${warmth[1]},${warmth[2]},${blob.alpha * 0.10 * energy})`);
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
      page.brandDensity,
      page.reactiveMode
    );
  }

  ctx.globalCompositeOperation = "source-over";
  ctx.shadowBlur = 0;
  } catch (error) {
    lastAnimationError = error.message || "Erro na animação";
    ctx.globalCompositeOperation = "source-over";
    ctx.shadowBlur = 0;
  } finally {
  animationFrame = requestAnimationFrame(drawOrganism);
  }
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
$("#imagePicker").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file || !imageTarget) return;
  const isVideo = file.type.startsWith("video/");
  const isImage = file.type.startsWith("image/");
  if (!isVideo && !isImage) {
    toast("Escolha uma imagem ou um vídeo");
    event.target.value = "";
    return;
  }

  try {
    const reference = await saveMediaFile(file);
    setNested(deck.pages[currentIndex], imageTarget, reference);
    saveDeck();
    renderSlide();
    toast(isVideo ? "Vídeo inserido" : "Imagem substituída");
  } catch {
    const reader = new FileReader();
    reader.onload = () => {
      setNested(deck.pages[currentIndex], imageTarget, reader.result);
      saveDeck();
      renderSlide();
      toast(isVideo ? "Vídeo inserido sem armazenamento local" : "Imagem substituída");
    };
    reader.readAsDataURL(file);
  } finally {
    event.target.value = "";
  }
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
$("#gradientColor2Input").addEventListener("input", (event) => {
  deck.pages[currentIndex].gradientColor2 = event.target.value;
  saveDeck();
});
$("#textColorInput").addEventListener("input", (event) => {
  deck.pages[currentIndex].textColor = event.target.value;
  stage.style.setProperty("--slide-ink", event.target.value);
  saveDeck();
});
$("#subtitleVisibleInput").addEventListener("change", (event) => {
  deck.pages[currentIndex].subtitleVisible = event.target.checked;
  renderSlide();
  saveDeck();
  toast(event.target.checked ? "Subtítulo ativado nesta página" : "Subtítulo oculto nesta página");
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
$("#brandDensityInput").addEventListener("input", (event) => {
  deck.pages[currentIndex].brandDensity = Number(event.target.value);
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
$("#showBrandEverywhere").addEventListener("click", () => {
  deck.pages.forEach((page) => {
    page.brandVisible = true;
    page.brandX = 50;
    page.brandY = 46;
    page.brandSize = 62;
    page.brandDensity = 180;
    page.brandPointsFixVersion = BRAND_POINTS_FIX_VERSION;
  });
  if (brandImage.complete && brandImage.naturalWidth) buildBrandPointCloud();
  if (!brandPoints.length) loadBrandPointCloudFromOfficialSvg();
  renderSlide();
  saveDeck();
  toast("Marca ativada em todas as páginas");
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
window.eclodeDebug = () => ({
  brandPoints: brandPoints.length,
  brandImageComplete: brandImage.complete,
  brandImageNaturalWidth: brandImage.naturalWidth,
  brandPointCloudFailed,
  lastAnimationError,
  currentPage: deck.pages[currentIndex] && {
    brandVisible: deck.pages[currentIndex].brandVisible,
    brandX: deck.pages[currentIndex].brandX,
    brandY: deck.pages[currentIndex].brandY,
    brandSize: deck.pages[currentIndex].brandSize,
    brandDensity: deck.pages[currentIndex].brandDensity
  }
});
renderSlide();
resizeCanvas();
cancelAnimationFrame(animationFrame);
drawOrganism();
setTimeout(() => {
  const page = deck.pages[currentIndex];
  if (page?.brandVisible && !brandPoints.length) {
    toast(`Marca ainda não virou pontos: ${lastAnimationError || "aguardando SVG"}`);
  }
}, 2200);
