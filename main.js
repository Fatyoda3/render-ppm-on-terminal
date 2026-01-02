import { writeBinaryAndHeader } from "./src/parse_image_data.js";
import { displayImage } from "./src/image_processor.js";

const GALLERY = "./gallery.json";
const DELAY = 100;

const IMAGES = [];

const loadImages = async () => {
  const galleryHandle = await Deno.readTextFile(GALLERY);
  if (galleryHandle.length !== 0) {
    IMAGES.push(...(JSON.parse(galleryHandle)));
  }
};

const drawOneImage = async ({ binPath, metaPath }, debug = false) => {
  debug || await displayImage(binPath, metaPath, DELAY);
};

const addNewImage = async (imagePath) => {
  const { metaPath, binPath } = await writeBinaryAndHeader(imagePath);
  IMAGES.push({ metaPath, binPath });

  Deno.writeTextFile(GALLERY, JSON.stringify(IMAGES));
  console.log({ metaPath, binPath }, "ADDED SUCCESSFULLY");
};

await loadImages(); //THIS is UGLY but needed

const displayImages = async ({ debug = false }) => {
  for (const image of IMAGES) {
    await drawOneImage(image, debug);
  }
};

const main = async (add = false) => {
  if (add === "add") {
    await addNewImage(prompt("enter path :").trim());
  }

  await displayImages({ debug: false });
};

main(Deno.args[0]);
