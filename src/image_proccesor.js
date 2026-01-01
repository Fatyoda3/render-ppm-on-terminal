import { chunk } from "./chunk.js";
const CHANNELS = 3;

const parseBinaryToPixels = (imageBin = [], metaData) => {
  const { _height, width } = JSON.parse(metaData);
  const rows = chunk(imageBin, CHANNELS * width);
  const pixels = rows.map((row) => chunk(row, CHANNELS));
  return pixels;
};

const draw = (pixels) => {
  console.log(pixels.map((row) => row.join("")).join("\n"));
};

const setColor = ([R, G, B], char = "  ") =>
  `\x1b[48;2;${R};${G};${B}m${char}\x1b[0m`;

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

const imageBin = await Deno.readFile("./data/image-scene/pixels.bin");
const metaData = await Deno.readTextFile("./data/image-scene/metadata.json");

const pixels = parseBinaryToPixels(imageBin, metaData);
const rendered = pixels.map((row) => row.map((pixel) => setColor(pixel)));

await printByChunks(rendered);
