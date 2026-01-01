const NEW_LINE_ASCII = 10;

const path = "./data/kirby/512.ppm";
const imageData = await Deno.readFile(path);

export const extractMetadataAndBinary = (imageData) => {
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

const [metaData, rawBinary] = extractMetadataAndBinary(imageData);

console.log({ metaData });

const asciiHeader = String.fromCharCode(...metaData);

console.log(asciiHeader);

// await Deno.writeFile("./data/kirby/pixels.bin", rawBinary);
// const [type, dimension, maxColor] = asciiHeader.split("\n");

// const [height, width] = dimension.split(" ");

// const metaDataFields = {
//   type,
//   height,
//   width,
//   maxColor,
// };

// await Deno.writeTextFile(
//   "./data/kirby/metadata.json",
//   JSON.stringify(metaDataFields),
// );
