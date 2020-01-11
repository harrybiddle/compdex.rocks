import { heatmapProps } from "./Predictions";

describe("ridgelineplot props", () => {
  it("order athletes by centre of mass", () => {
    const predictionsProps = {
      athletes: {
        athlete1: { name: "Adam Ondra" },
        athlete2: { name: "Alex Megos" },
        athlete3: { name: "Margo Hayes" }
      },
      stages: {
        qualification: ["athlete3", "athlete1", "athlete2"],
        speed: ["athlete3", "athlete1", "athlete2"],
        boulder: ["athlete3"],
        lead: []
      }
    };

    const props = heatmapProps(predictionsProps);
    expect(props.rows.map(row => row[0])).toEqual([
      "Margo Hayes",
      "Adam Ondra",
      "Alex Megos"
    ]);
  });
});
