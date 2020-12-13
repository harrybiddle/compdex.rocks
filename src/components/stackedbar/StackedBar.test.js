import { rasterizeSizes } from "./StackedBar";

describe("rasterizeSizes", () => {
  it("equal sizes", () => {
    expect(rasterizeSizes([200, 200])).toEqual([50, 50]);
  });

  it("almost equal sizes", () => {
    expect(rasterizeSizes([201, 200])).toEqual([50, 50]);
  });

  it("only just unequal sizes", () => {
    expect(rasterizeSizes([209, 200])).toEqual([51, 49]);
  });

  it("small and zero sizes", () => {
    expect(rasterizeSizes([1, 997, 1, 0])).toEqual([1, 98, 1, 0]);
  });
});
