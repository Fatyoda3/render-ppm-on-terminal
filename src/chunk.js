export const chunk = (array, size = 100) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    const temp = array.slice(i, i + size);
    chunks.push(temp);
  }
  return chunks;
};
