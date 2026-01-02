import { writeBinaryAndHeader } from "./src/parse_image_data.js";
import { displayImage } from "./src/image_processor.js";
const GALLERY = "./gallery.json";

const DELAY = 100;
const SCENE = "./ppm/scene/scene.ppm";
const TREE_TRUNK = "./ppm/tree_trunk/tree_trunk.ppm";
const BAT_SIGNAL = "./ppm/bat_signal/bat_signal.ppm";

const IMAGES = [SCENE, TREE_TRUNK, BAT_SIGNAL];
const galleryHandle = await Deno.readTextFile(GALLERY);
const payload = [];

if (galleryHandle.length !== 0) {
  payload.push(...(JSON.parse(galleryHandle)));
}

const drawOneImage = async (imagePath, debug = false) => {
  // const { binPath, metaPath } = await writeBinaryAndHeader(imagePath);
  payload.push({ binPath, metaPath });

  debug || await displayImage(binPath, metaPath, DELAY);
};

const addNewImage = () => {};
const main = async () => {
  for (const image of IMAGES) {
    await drawOneImage(image, true);
  }
  // console.log({ payload });
  Deno.writeTextFile(GALLERY, JSON.stringify(payload));
};

main();
