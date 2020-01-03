import { colorBuckets, getColor } from "./Predictions";

describe("color buckets", () => {
  it("for p=-1.00", () => expect(getColor(-1.0)).toEqual(colorBuckets[0]));
  it("for p= 0.00", () => expect(getColor(0.0)).toEqual(colorBuckets[0]));
  it("for p= 0.05", () => expect(getColor(0.05)).toEqual(colorBuckets[0]));
  it("for p= 0.50", () => expect(getColor(0.5)).toEqual(colorBuckets[5]));
  it("for p= 0.55", () => expect(getColor(0.55)).toEqual(colorBuckets[5]));
  it("for p= 0.95", () => expect(getColor(0.95)).toEqual(colorBuckets[9]));
  it("for p= 1.00", () => expect(getColor(1.0)).toEqual(colorBuckets[9]));
  it("for p= 1.50", () => expect(getColor(1.5)).toEqual(colorBuckets[9]));
});
