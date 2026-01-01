const NEW_LINE_ASCII = 10;
const MAX_SKIPS = 3;
const _TEST = "./data/kirby/kirby.ppm";

const getHeaderAndBin = (imageData) => {
  let delimiterIndex = 0;
  let newLineCount = 0;

  while (newLineCount < MAX_SKIPS) {
    if (imageData[delimiterIndex] === NEW_LINE_ASCII) {
      newLineCount += 1;
    }
    delimiterIndex += 1;
  }

  const metaData = imageData.slice(0, delimiterIndex);
  const rawBin = imageData.slice(delimiterIndex);

  return [metaData, rawBin];
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

  const [header, rawBin] = getHeaderAndBin(imageData);
  const metadata = parseHeader(header);

  const metadataPath = `${dirPath}/metadata.json`;
  const binPath = `${dirPath}/pixels.bin`;

  return [binPath, rawBin, metadataPath, metadata];
};

export const writeBinaryAndHeader = async (imgPath = "") => {
  const [binPath, rawBin, metaPath, metadata] = await getWriteParams(imgPath);

  await Deno.writeTextFile(metaPath, JSON.stringify(metadata));
  await Deno.writeFile(binPath, rawBin);

  return { binPath, metaPath, metadata };
};
