import { writeBinaryAndHeader } from "./src/parse_image_data.js";
import { displayImage } from "./src/image_processor.js";

const KIRBY = "./data/kirby/kirby.ppm";
const SCENE = "./data/test/scene.ppm";

const images = [KIRBY, SCENE];

const drawOneImage = async (imagePath) => {
  const { binPath, metaPath } = await writeBinaryAndHeader(imagePath);
  await displayImage(binPath, metaPath);
};
const main = async () => {
  await drawOneImage(SCENE);
  await drawOneImage(KIRBY);
};

main();
