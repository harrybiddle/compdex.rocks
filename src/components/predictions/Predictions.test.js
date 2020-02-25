import { ridgelinePlotProps } from "../../predictions.worker";

describe("RidgelinePlot props", () => {
  it("contents are correct and ordered by centre of mass", () => {
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

    const props = ridgelinePlotProps(predictionsProps);
    expect(props).toEqual({
      athletes: ["Margo Hayes", "Adam Ondra", "Alex Megos"],
      probabilities: {
        "Margo Hayes": [2.0 / 3.0, 0.25, 1.0 / 12.0],
        "Adam Ondra": [2.0 / 9.0, 0.5, 0.2 + 7 / 90],
        "Alex Megos": [1.0 / 9.0, 0.25, 63 / 100 + 8 / 900]
      }
    });
  });
});
