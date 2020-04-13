import { getStateFilenameFromUrl } from "./FetchedCompetition";

describe("getStateFilenameFromUrl", () => {
  it("ignores extra query parameters", () => {
    expect(
      getStateFilenameFromUrl(new URL("https://compdex.rocks/comp?foo=bar"))
    ).toEqual("state.json");
  });
  it("defaults when there is no query parameter", () => {
    expect(
      getStateFilenameFromUrl(new URL("https://compdex.rocks/comp"))
    ).toEqual("state.json");
  });
  it("extracts valid state filename", () => {
    expect(
      getStateFilenameFromUrl(new URL("https://compdex.rocks/comp?q=foo"))
    ).toEqual("foo.json");
  });
  it("returns default when filename invalid", () => {
    expect(
      getStateFilenameFromUrl(new URL("https://compdex.rocks/comp?q=1-2.sd"))
    ).toEqual("state.json");
  });
});
