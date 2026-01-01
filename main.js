import { writeBinaryAndHeader } from "./src/parse_image_data.js";
import { displayImage } from "./src/image_processor.js";

const KIRBY = "./data/kirby/kirby.ppm";
const SCENE = "./data/test/scene.ppm";

const main = async () => {
  const { binPath, metaPath } = await writeBinaryAndHeader(SCENE);

  await displayImage(binPath, metaPath);
};

main();
