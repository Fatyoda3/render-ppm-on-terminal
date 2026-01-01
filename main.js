import { writeBinaryAndHeader } from "./src/parse_image_data.js";
import { displayImage } from "./src/image_processor.js";
const DELAY = 1;
const KIRBY = "./ppm/kirby/kirby.ppm";
const SCENE = "./ppm/scene/scene.ppm";

const images = [KIRBY, SCENE];

const drawOneImage = async (imagePath) => {
  const { binPath, metaPath } = await writeBinaryAndHeader(imagePath);
  await displayImage(binPath, metaPath, DELAY);
};

const main = async () => {
  for (const image of images) {
    await drawOneImage(image);
  }
};

main();
