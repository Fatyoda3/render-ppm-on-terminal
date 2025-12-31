const path = "./data/kirby/512.ppm";

const rawData = await Deno.readTextFile(path).then((payload) =>
  payload
    .split("\n")
);
const metaData = rawData.slice(0, 3).join("\n");
const rawBinary = rawData.slice(3)
  .join("\n");

Deno.writeTextFile("./data/kirby/metadata.txt", metaData);
Deno.writeTextFile("./data/kirby/image.bin", rawBinary);
