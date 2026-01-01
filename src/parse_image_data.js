const NEW_LINE_ASCII = 10;
const IMAGE_PATH = "./data/kirby/512.ppm";

const extractMetadataAndBinary = (imageData) => {
  let delimiter = 0;
  let newLineCount = 0;

  while (newLineCount < 3) {
    if (imageData[delimiter] === NEW_LINE_ASCII) {
      newLineCount += 1;
    }
    delimiter += 1;
  }

  const metaData = imageData.slice(0, delimiter);
  const rawBinary = imageData.slice(delimiter);

  return [metaData, rawBinary];
};

const parseHeader = (metaData) => {
  const asciiHeader = String.fromCharCode(...metaData);
  const [type, dimension, maxColor] = asciiHeader.split("\n");
  const [height, width] = dimension.split(" ");

  return { type, height, width, maxColor };
};

export const writeBinaryAndHeader = async (imagePath = "") => {
  const delimiterSlash = imagePath.lastIndexOf("/");
  console.log("DIR NAME SHOULD BE", imagePath.slice(delimiterSlash));

  // const dirPath  = ``
  // Deno.mkdir()

  const imageData = await Deno.readFile(imagePath);

  const [metaData, rawBinary] = extractMetadataAndBinary(imageData);
  const metaDataObj = parseHeader(metaData);

  const jsonPath = "./data/kirby/metadata.json";
  const binaryPath = "./data/kirby/pixels.bin";

  await Deno.writeTextFile(jsonPath, JSON.stringify(metaDataObj));
  await Deno.writeFile(binaryPath, rawBinary);
};

writeBinaryAndHeader(IMAGE_PATH);
