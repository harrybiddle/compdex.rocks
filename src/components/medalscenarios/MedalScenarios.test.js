import { calculateCentreOfMass } from "./MedalScenarios";

it("centre of mass", () => {
  expect(calculateCentreOfMass([0.4, 1.4, -3.6])).toEqual(
    0.4 * 0 + 1.4 * 1 - 3.6 * 2
  );
});
