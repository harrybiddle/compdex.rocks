import React from "react";

export function rasterizeSizes(sizes) {
  /*
   * Rasterizes an array of integer sizes onto a one-dimensional "image" of 100 pixels, with the guarantee that a
   * non-zero input size will occupy at least one pixel
   */

  // sort the array in ascending order, with a mapping to the original order
  const orderedAscending = sizes
    .map((size, i) => ({ index: i, size: size }))
    .sort((a, b) => a.size - b.size);

  // rasterize the sizes to a grid of 100 pixels
  // store the result in a mapping of originalIndex -> rasterizedSize
  let remainingSize = sizes.reduce((agg, cur) => agg + cur, 0);
  let remainingPixels = 100;
  const indexToPixelCount = orderedAscending.reduce(
    (agg, cur) => {
      // calculate how many floating-point pixels there are
      const floatPixels = (remainingPixels * cur.size) / remainingSize;

      // round this to the nearest integer pixel, with the caveat that this must be at least 1 for non-zero sizes
      const pixels = cur.size > 0 ? Math.max(1, Math.round(floatPixels)) : 0;

      // reduce counters
      remainingSize = remainingSize - cur.size;
      remainingPixels = remainingPixels - pixels;

      // insert result into mapping
      return {
        ...agg,
        [cur.index]: pixels
      };
    },
    /* initialValue */ {}
  );

  // for each of the original entries, return the number of pixels
  return new Array(sizes.length).fill().map((_, i) => indexToPixelCount[i]);
}

export default function StackedBar(props) {
  // convert props to array and sort in descending order
  const array = Object.values(props); //.sort((a, b) => b.width - a.width);

  // rasterize onto a "grid" of 100 pixels
  const widthPercentages = rasterizeSizes(array.map(d => d.width));
  return (
    <div style={{ height: "100px", display: "flex" }}>
      {array.map((d, i) => (
        <div
          style={{
            height: "100%",
            width: widthPercentages[i].toString() + "%",
            color: d.textColor,
            backgroundColor: d.backgroundColor,
            borderRight: "1px solid white",
            overflow: "hidden",
            // center the text
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {d.label}
        </div>
      ))}
    </div>
  );
}
