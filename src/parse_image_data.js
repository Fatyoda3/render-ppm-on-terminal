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

const parseHeader = (metaData) => {
  const asciiHeader = String.fromCharCode(...metaData);
  const [type, dimension, maxColor] = asciiHeader.split("\n");
  const [height, width] = dimension.split(" ");
  const metaDataFields = {
    type,
    height,
    width,
    maxColor,
  };

  return metaDataFields;
};

export const writeBinaryAndHeader = async () => {
  const [metaData, rawBinary] = extractMetadataAndBinary(imageData);
  const metaDataObj = parseHeader(metaData);

  const jsonPath = "./data/kirby/metadata.json";
  const binaryPath = "./data/kirby/pixels.bin";

  await Deno.writeTextFile(jsonPath, JSON.stringify(metaDataObj));
  await Deno.writeFile(binaryPath, rawBinary);
};

writeBinaryAndHeader();
