import { writeBinaryAndHeader } from "./src/parse_image_data.js";
import { displayImage } from "./src/image_processor.js";

const KIRBY = "./data/kirby/kirby.ppm";
const SCENE = "./data/test/scene.ppm";

const main = async () => {
  const { binPath, jsonPath } = await writeBinaryAndHeader(SCENE);
  // console.log({ binPath, jsonPath });

  // const binPath1 = "./data/image-scene/pixels.bin";
  // const metadataPath = "./data/image-scene/metadata.json";

  // await displayImage(binPath1, metadataPath);
};

main();
