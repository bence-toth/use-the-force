const fetchMemes = () => fetch("https://www.reddit.com/r/PrequelMemes.json");

const getMemeData = (node) => ({
  title: node.data.title,
  image: node.data.thumbnail,
  url: node.data.url,
});

const hasThumbnail = (node) => node.data.thumbnail !== "self";

export { getMemeData, hasThumbnail };

export default fetchMemes;
