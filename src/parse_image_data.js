const path = "./data/kirby/512.ppm";

const rawData = await Deno.readFile(path);
let i = 0;

let c = 0;

while (c < 3) {
  if (rawData[i] === 10) {
    c += 1;
  }
  i += 1;
}

const metaData = rawData.slice(0, i);
const rawBinary = rawData.slice(i);

console.log({ metaData });
const data = metaData.map((x) => String.fromCharCode(x)); //weird
console.log({ data });
///investigate

await Deno.writeFile(
  "./data/kirby/metadata.txt",
  metaData,
);

await Deno.writeFile("./data/kirby/image.bin", rawBinary);

const content = await Deno.readTextFile("./data/kirby/metadata.txt");

const [type, dimension, maxColor] = content.split("\n");

const [height, width] = dimension.split(" ");

const metaDatas = {
  type,
  height,
  width,
  maxColor,
};

await Deno.writeTextFile(
  "./data/kirby/metadata.txt",
  JSON.stringify(metaDatas),
);
