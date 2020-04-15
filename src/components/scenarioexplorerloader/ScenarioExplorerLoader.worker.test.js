import { generateScenarios } from "./ScenarioExplorerLoader.worker";

describe("generateScenarios", () => {
  it("return value", () => {
    const predictionsProps = {
      athletes: {
        athlete1: { name: "Adam Ondra", foo: "bar" },
        athlete2: { name: "Alex Megos", foo: "baz" },
        athlete3: { name: "Margo Hayes", foo: "bong" }
      },
      stages: {
        qualification: ["athlete3", "athlete1", "athlete2"],
        speed: ["athlete3", "athlete1", "athlete2"],
        boulder: ["athlete3"],
        lead: []
      }
    };

    const props = generateScenarios(predictionsProps);
    expect(props).toEqual([
      { name: "Adam Ondra", foo: "bar", scenarios: [8, 18, 10] },
      { name: "Alex Megos", foo: "baz", scenarios: [4, 9, 23] },
      { name: "Margo Hayes", foo: "bong", scenarios: [24, 9, 3] }
    ]);
  });
});
