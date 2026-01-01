const NEW_LINE_ASCII = 10;
const IMAGE_PATH = "./data/kirby/kirby.ppm";

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

const parseImagePath = (imagePath) => {
  const delimiterSlash = imagePath.lastIndexOf("/");
  const name = imagePath.slice(delimiterSlash + 1, -4);
  const dirPath = `./data/image-${name}`;
  return dirPath;
};

const getWriteParams = async (imagePath) => {
  const dirPath = parseImagePath(imagePath);

  try {
    await Deno.mkdir(dirPath);
    console.log("DIRECTORY created", dirPath);
  } catch (err) {
    console.log(err.name, " : ERROR");
  }

  const imageData = await Deno.readFile(imagePath);

  const [header, rawBin] = extractMetadataAndBinary(imageData);
  const metadata = parseHeader(header);

  const jsonPath = `${dirPath}/metadata.json`;
  const binPath = `${dirPath}/pixels.bin`;

  return [binPath, rawBin, jsonPath, metadata];
};

export const writeBinaryAndHeader = async (imgPath = "") => {
  const [binPath, rawBin, jsonPath, metadata] = await getWriteParams(imgPath);

  await Deno.writeTextFile(jsonPath, JSON.stringify(metadata));
  await Deno.writeFile(binPath, rawBin);
};

writeBinaryAndHeader(IMAGE_PATH);
