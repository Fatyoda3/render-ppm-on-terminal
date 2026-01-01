import { writeBinaryAndHeader } from "./src/parse_image_data.js";
import { displayImage } from "./src/image_processor.js";

const DELAY = 100;
const SCENE = "./ppm/scene/scene.ppm";
const TREE_TRUNK = "./ppm/tree_trunk/tree_trunk.ppm";
const BAT_SIGNAL = "./ppm/bat_signal/bat_signal.ppm";

const IMAGES = [SCENE, TREE_TRUNK, BAT_SIGNAL];

const drawOneImage = async (imagePath, debug = false) => {
  const { binPath, metaPath } = await writeBinaryAndHeader(imagePath);
  console.log({ binPath, metaPath });

  debug || await displayImage(binPath, metaPath, DELAY);
};

const main = async () => {
  for (const image of IMAGES) {
    await drawOneImage(image, true);
  }
};

main();
