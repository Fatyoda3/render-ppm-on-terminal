import { chunk } from "./chunk.js";

const imageBin = await Deno.readFile("./data/kirby/image.bin");
const metaData = await Deno.readTextFile("./data/kirby/metadata.txt");

const { height, width } = JSON.parse(metaData);

const channels = 3;

const parseBinary = (raw = []) => {
  const rows = chunk(imageBin, 3 * width);
  const pixels = rows.map((row) => chunk(row, channels));
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

const pixels = parseBinary(imageBin);
const rendered = pixels.map((row) => row.map((pixel) => setColor(pixel)));

await printByChunks(rendered);
