import { possibleFinishOrders } from "./algorithm";

it("only one possible finish order for one athlete", () => {
  expect(new Set(possibleFinishOrders(new Set(["Eve"])))).toEqual(
    new Set([{ round1: ["Eve"], round2: ["Eve"], round3: ["Eve"] }])
  );
});

describe("possible finish orders for two athletes", () => {
  const athletes = new Set(["Eve", "Sue"]);
  it("should be correct at start of competition", () => {
    expect(new Set(possibleFinishOrders(athletes))).toEqual(
      new Set([
        {
          round1: ["Sue", "Eve"],
          round2: ["Eve", "Sue"],
          round3: ["Sue", "Eve"]
        },
        {
          round1: ["Sue", "Eve"],
          round2: ["Eve", "Sue"],
          round3: ["Eve", "Sue"]
        },
        {
          round1: ["Sue", "Eve"],
          round2: ["Sue", "Eve"],
          round3: ["Sue", "Eve"]
        },
        {
          round1: ["Sue", "Eve"],
          round2: ["Sue", "Eve"],
          round3: ["Eve", "Sue"]
        },
        {
          round1: ["Eve", "Sue"],
          round2: ["Eve", "Sue"],
          round3: ["Sue", "Eve"]
        },
        {
          round1: ["Eve", "Sue"],
          round2: ["Eve", "Sue"],
          round3: ["Eve", "Sue"]
        },
        {
          round1: ["Eve", "Sue"],
          round2: ["Sue", "Eve"],
          round3: ["Sue", "Eve"]
        },
        {
          round1: ["Eve", "Sue"],
          round2: ["Sue", "Eve"],
          round3: ["Eve", "Sue"]
        }
      ])
    );
  });

  it("should be correct at start of round two", () => {
    expect(new Set(possibleFinishOrders(athletes, ["Eve", "Sue"]))).toEqual(
      new Set([
        {
          round1: ["Eve", "Sue"],
          round2: ["Eve", "Sue"],
          round3: ["Sue", "Eve"]
        },
        {
          round1: ["Eve", "Sue"],
          round2: ["Eve", "Sue"],
          round3: ["Eve", "Sue"]
        },
        {
          round1: ["Eve", "Sue"],
          round2: ["Sue", "Eve"],
          round3: ["Sue", "Eve"]
        },
        {
          round1: ["Eve", "Sue"],
          round2: ["Sue", "Eve"],
          round3: ["Eve", "Sue"]
        }
      ])
    );
  });

  it("should be correct at start of round three", () => {
    expect(
      new Set(possibleFinishOrders(athletes, ["Eve", "Sue"], ["Eve", "Sue"]))
    ).toEqual(
      new Set([
        {
          round1: ["Eve", "Sue"],
          round2: ["Eve", "Sue"],
          round3: ["Sue", "Eve"]
        },
        {
          round1: ["Eve", "Sue"],
          round2: ["Eve", "Sue"],
          round3: ["Eve", "Sue"]
        }
      ])
    );
  });

  it("should be correct at end of competition", () => {
    expect(
      new Set(
        possibleFinishOrders(
          athletes,
          ["Eve", "Sue"],
          ["Eve", "Sue"],
          ["Sue", "Eve"]
        )
      )
    ).toEqual(
      new Set([
        {
          round1: ["Eve", "Sue"],
          round2: ["Eve", "Sue"],
          round3: ["Sue", "Eve"]
        }
      ])
    );
  });
});
