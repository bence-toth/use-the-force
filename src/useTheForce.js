import { useState, useEffect, useCallback } from "react";

import { fetchMemes } from "./fetchMemes";
import { getMemeData, hasThumbnail } from "./utility";

const useTheForce = () => {
  const [memes, setMemes] = useState([]);
  const [isMemeLoading, setIsMemeLoading] = useState(true);

  useEffect(() => {
    setIsMemeLoading(true);
    fetchMemes()
      .then((response) => response.json())
      .then((result) => {
        const data = result.data.children.filter(hasThumbnail).map(getMemeData);
        setMemes(data);
        setIsMemeLoading(false);
      });
  }, []);

  const [page, setPage] = useState(0);

  const onLoadNextMeme = useCallback(() => {
    if (page < memes.length - 1) {
      setPage((page) => page + 1);
    }
  }, [page, memes]);

  const onLoadPreviousMeme = useCallback(() => {
    if (page > 0) {
      setPage((page) => page - 1);
    }
  }, [page]);

  return {
    isMemeLoading,
    meme: memes[page],
    onLoadNextMeme,
    onLoadPreviousMeme,
  };
};

export default useTheForce;
