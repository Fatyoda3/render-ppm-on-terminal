const path = "./512.ppm";

const rawData = await Deno.readTextFile(path).then((payload) =>
  payload
    .split("\n")
    .slice(3)
    .join("\n")
);
console.log({ rawData });

// P 54
// [80, 54, 10, 53, 48, 48, 32, 53, 48, 48, 10, 50, 53, 53, 10];
