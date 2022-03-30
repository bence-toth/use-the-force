/* eslint-disable testing-library/no-node-access */
import { renderHook, act } from "@testing-library/react-hooks";
import { fetchMemes } from "./fetchMemes";
import useTheForce from "./useTheForce";

const mockMemeData = {
  data: {
    children: [
      {
        data: {
          title: "Meme 1",
          thumbnail: "https://fake.url/thumb1.jpg",
          url: "https://fake.url/image1.jpg",
        },
      },
      {
        data: {
          title: "Meme 2",
          thumbnail: "https://fake.url/thumb2.jpg",
          url: "https://fake.url/image2.jpg",
        },
      },
      {
        data: {
          title: "Meme 3",
          thumbnail: "https://fake.url/thumb3.jpg",
          url: "https://fake.url/image3.jpg",
        },
      },
    ],
  },
};

jest.mock("./fetchMemes", () => ({
  fetchMemes: () =>
    Promise.resolve({
      json: () => Promise.resolve(mockMemeData),
    }),
}));

describe("useTheForce", () => {
  it("should return no meme and loading state in the beginning", () => {
    const { result } = renderHook(() => useTheForce());
    expect(result.current.meme).toBeUndefined();
    expect(result.current.isMemeLoading).toBe(true);
  });

  it("should return first meme after loading memes", async () => {
    const { result } = renderHook(() => useTheForce());
    await act(() => fetchMemes);
    const selectedMeme = mockMemeData.data.children[0].data;
    expect(result.current.meme).toStrictEqual({
      title: selectedMeme.title,
      url: selectedMeme.url,
    });
    expect(result.current.isMemeLoading).toBe(false);
  });

  it("should navigate pages correctly", async () => {
    const { result } = renderHook(() => useTheForce());
    await act(() => fetchMemes);
    await act(() => {
      result.current.onLoadNextMeme();
    });
    await act(() => {
      result.current.onLoadNextMeme();
    });
    await act(() => {
      result.current.onLoadPreviousMeme();
    });
    const selectedMeme = mockMemeData.data.children[1].data;
    expect(result.current.meme).toStrictEqual({
      title: selectedMeme.title,
      url: selectedMeme.url,
    });
  });

  it("should not navigate after last meme", async () => {
    const { result } = renderHook(() => useTheForce());
    await act(() => fetchMemes);
    await act(() => {
      result.current.onLoadNextMeme();
    });
    await act(() => {
      result.current.onLoadNextMeme();
    });
    await act(() => {
      result.current.onLoadNextMeme();
    });
    const selectedMeme = mockMemeData.data.children[2].data;
    expect(result.current.meme).toStrictEqual({
      title: selectedMeme.title,
      url: selectedMeme.url,
    });
  });

  it("should not navigate before first meme", async () => {
    const { result } = renderHook(() => useTheForce());
    await act(() => fetchMemes);
    await act(() => {
      result.current.onLoadPreviousMeme();
    });
    await act(() => {
      result.current.onLoadPreviousMeme();
    });
    const selectedMeme = mockMemeData.data.children[0].data;
    expect(result.current.meme).toStrictEqual({
      title: selectedMeme.title,
      url: selectedMeme.url,
    });
  });
});
