import { writeBinaryAndHeader } from "./src/parse_image_data.js";
const KIRBY = "./data/kirby/kirby.ppm";
const SCENE = "./data/test/scene.ppm";

const main = () => {
  writeBinaryAndHeader(SCENE);
};

main();
