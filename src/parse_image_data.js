const NEW_LINE_ASCII = 10;

const path = "./data/kirby/512.ppm";
const imageData = await Deno.readFile(path);

const splitData = (imageData) => {
  let byteIndex = 0;
  let newLineCount = 0;

  while (newLineCount < 3) {
    if (imageData[byteIndex] === NEW_LINE_ASCII) {
      newLineCount += 1;
    }
    byteIndex += 1;
  }

  const metaData = imageData.slice(0, byteIndex);
  const rawBinary = imageData.slice(byteIndex);
  return [metaData, rawBinary];
};

const [metaData, rawBinary] = splitData(imageData);

console.log({ metaData });
const data = metaData.map((x) => String.fromCharCode(x)); //weird
console.log({ data });
///investigate

await Deno.writeFile(
  "./data/kirby/metadata.txt",
  metaData,
);

await Deno.writeFile("./data/kirby/pixels.bin", rawBinary);

const content = await Deno.readTextFile("./data/kirby/metadata.json");

const [type, dimension, maxColor] = content.split("\n");

const [height, width] = dimension.split(" ");

const metaDataFields = {
  type,
  height,
  width,
  maxColor,
};

await Deno.writeTextFile(
  "./data/kirby/metadata.txt",
  JSON.stringify(metaDataFields),
);
