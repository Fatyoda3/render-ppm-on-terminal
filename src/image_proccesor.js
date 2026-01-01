import { chunk } from "./chunk.js";
const CHANNELS = 3;

const parseBinaryToPixels = (imageBin = [], metadata) => {
  const { _height, width } = JSON.parse(metadata);
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
const mapColors = (pixels) =>
  pixels.map((row) => row.map((pixel) => setColor(pixel)));

export const displayImage = async (binPath, metadataPath) => {
  const imageBin = await Deno.readFile(binPath);
  const metadata = await Deno.readTextFile(metadataPath);

  const pixels = parseBinaryToPixels(imageBin, metadata);
  const rendered = mapColors(pixels);

  await printByChunks(rendered);
};
const binPath = "./data/image-scene/pixels.bin";
const metadataPath = "./data/image-scene/metadata.json";
displayImage(binPath, metadataPath);
