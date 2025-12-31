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

const makeLine = (p1, p2, screen, icon = "xx") => {
  const dy = p1.y - p2.y;
  const dx = p1.x - p2.x;

  const outerKey = (Math.abs(dx) > Math.abs(dy)) ? `x` : `y`;
  const innerKey = (Math.abs(dx) > Math.abs(dy)) ? `y` : `x`;
  // console.log({ outerKey });

  const outerLoopSt = Math.min(p1[outerKey], p2[outerKey]);
  const outerLoopEn = Math.max(p1[outerKey], p2[outerKey]);
  const innerLoopSt = Math.min(p1[innerKey], p2[innerKey]);
  // console.log({ outerLoopSt, outerLoopEn });

  const slope = dy / dx;

  for (let xy = outerLoopSt; xy <= outerLoopEn; xy++) {
    let x, y;

    if (outerKey === "y") {
      if (slope === Infinity || slope === -Infinity) {
        x = p1.x;
      } else {
        x = (xy - innerLoopSt) / slope;
      }
      y = xy;
    } else {
      y = xy * slope + innerLoopSt;
      x = xy;
    }
    x = x < 0 ? x + screen.width - 1 : x;

    y = y < 0 ? y + screen.height - 1 : y;

    console.log({ x, y });

    drawInScreen(x, y, screen, icon);
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

await printByChunks(screen.pixels);
