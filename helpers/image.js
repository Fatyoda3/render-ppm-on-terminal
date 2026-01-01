import { chunk } from "./chunk.js";
const HEIGHT = 20;
const WIDTH = 20;
const BLOCK = "🟥";

const screen = {
  pixels: Array.from(
    { length: HEIGHT },
    () => Array.from({ length: WIDTH }, () => BLOCK),
  ),

  height: HEIGHT,
  width: WIDTH,
};

const draw = (pixels) => {
  console.log(pixels.map((row) => row.join("")).join("\n"));
};

const isInBetween = (min, value, max) => min < value && value < max;

const drawInScreen = (x, y, screen, icon = "  ") => {
  const isPlotPossible = isInBetween(-1, x, screen.width) &&
    isInBetween(-1, y, screen.height);

  if (isPlotPossible) {
    screen.pixels[Math.floor(y)][Math.floor(x)] = icon;
    return;
  }
};

const printByChunks = async (pixels) => {
  const imageParts = chunk(pixels, 10);

  for (const part of imageParts) {
    await new Promise((resolve) => {
      setTimeout(() => {
        draw(part);
        resolve(1);
      }, 50);
    });
  }
};

// await printByChunks(screen.pixels);
