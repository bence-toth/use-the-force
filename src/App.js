import useTheForce from "./useTheForce";
import "./App.css";

const App = () => {
  const { meme, isMemeLoading, onLoadNextMeme, onLoadPreviousMeme } =
    useTheForce();

  return (
    <div class="app">
      {isMemeLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="pageButtons">
            <button onClick={onLoadPreviousMeme}>Previous</button>
            <button onClick={onLoadNextMeme}>Next</button>
          </div>
          <div className="meme">
            <a href={meme.url}>
              <img src={meme.url} alt={meme.title} />
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
