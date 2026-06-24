void mostrarStatus(String message) {
  statusMessage = message;
  salvarFlash = true;
  salvarTimer = 120;
}

float canalR(int c) {
  return (c >> 16) & 0xFF;
}

float canalG(int c) {
  return (c >> 8) & 0xFF;
}

float canalB(int c) {
  return c & 0xFF;
}

float canalA(int c) {
  return (c >>> 24) & 0xFF;
}

int corHSBA(float h, float s, float b, float a) {
  float hh = ((h % 360.0) + 360.0) % 360.0;
  int rgb = java.awt.Color.HSBtoRGB(hh / 360.0, constrain(s / 100.0, 0, 1), constrain(b / 100.0, 0, 1));
  int aa = constrain(round(a / 100.0 * 255.0), 0, 255);
  return (aa << 24) | (rgb & 0x00FFFFFF);
}

int corRGBA255(float r, float g, float b, float a) {
  int rr = constrain(round(r), 0, 255);
  int gg = constrain(round(g), 0, 255);
  int bb = constrain(round(b), 0, 255);
  int aa = constrain(round(a), 0, 255);
  return (aa << 24) | (rr << 16) | (gg << 8) | bb;
}

int corInterfacePaleta(int idx) {
  int i = ((idx % 4) + 4) % 4;
  if (i == 0) return UI_LIGHT;
  if (i == 1) return UI_GREEN;
  if (i == 2) return UI_BROWN;
  return UI_DARK;
}

int corInterfacePaletaPorT(float t) {
  return corInterfacePaleta(floor(constrain(t, 0, 0.9999) * 4.0));
}

void windowResized() {
  atualizarLayout();
}

String timeStamp() {
  return year() + nf(month(), 2) + nf(day(), 2) + "_" + nf(hour(), 2) + nf(minute(), 2) + nf(second(), 2);
}

float aproximarSuave(float atual, float alvo, float fator) {
  if (abs(alvo - atual) < 0.25) return alvo;
  return atual + (alvo - atual) * fator;
}

PImage recortarImagemTransparente(PImage src) {
  if (src == null || src.width <= 0 || src.height <= 0) return src;
  src.loadPixels();
  int minX = src.width;
  int minY = src.height;
  int maxX = -1;
  int maxY = -1;
  for (int y = 0; y < src.height; y++) {
    for (int x = 0; x < src.width; x++) {
      int a = (src.pixels[y * src.width + x] >>> 24) & 0xFF;
      if (a > 10) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < minX || maxY < minY) return src;
  int pad = 4;
  minX = max(0, minX - pad);
  minY = max(0, minY - pad);
  maxX = min(src.width - 1, maxX + pad);
  maxY = min(src.height - 1, maxY + pad);
  return src.get(minX, minY, max(1, maxX - minX + 1), max(1, maxY - minY + 1));
}
