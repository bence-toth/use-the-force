const getMemeData = (node) => ({
  title: node.data.title,
  url: node.data.url,
});

const hasThumbnail = (node) => node.data.thumbnail !== "self";

export { getMemeData, hasThumbnail };
