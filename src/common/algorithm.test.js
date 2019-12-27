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

describe("possible finish orders midway through rounds", () => {
  const athletes = new Set(["Eve", "Sue", "Ada"]);

  it("should be correct midway through third round", () => {
    expect(
      new Set(
        possibleFinishOrders(
          athletes,
          ["Eve", "Sue", "Ada"],
          ["Eve", "Sue", "Ada"],
          ["Eve", "Sue"]
        )
      )
    ).toEqual(
      new Set([
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Eve", "Sue", "Ada"]
        }
      ])
    );
  });

  it("should be correct midway through second round", () => {
    expect(
      new Set(
        possibleFinishOrders(athletes, ["Eve", "Sue", "Ada"], ["Eve", "Sue"])
      )
    ).toEqual(
      new Set([
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Eve", "Sue", "Ada"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Eve", "Sue", "Ada"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Eve", "Sue", "Ada"]
        }
      ])
    );
  });

  it("should be correct midway through first round", () => {
    expect(new Set(possibleFinishOrders(athletes, ["Eve", "Sue"]))).toEqual(
      new Set([
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Ada", "Sue", "Eve"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Ada", "Sue", "Eve"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Ada", "Sue", "Eve"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Ada", "Sue", "Eve"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Ada", "Sue", "Eve"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Ada", "Sue", "Eve"],
          round3: ["Eve", "Sue", "Ada"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Eve", "Sue", "Ada"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Sue", "Ada", "Eve"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Sue", "Ada", "Eve"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Sue", "Ada", "Eve"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Sue", "Ada", "Eve"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Sue", "Ada", "Eve"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Sue", "Ada", "Eve"],
          round3: ["Eve", "Sue", "Ada"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Sue", "Eve", "Ada"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Sue", "Eve", "Ada"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Sue", "Eve", "Ada"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Sue", "Eve", "Ada"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Sue", "Eve", "Ada"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Sue", "Eve", "Ada"],
          round3: ["Eve", "Sue", "Ada"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Eve", "Sue", "Ada"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Ada", "Eve", "Sue"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Eve", "Sue", "Ada"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Ada", "Sue", "Eve"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Ada", "Sue", "Eve"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Ada", "Sue", "Eve"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Ada", "Sue", "Eve"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Ada", "Sue", "Eve"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Ada", "Sue", "Eve"],
          round3: ["Eve", "Sue", "Ada"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Eve", "Sue", "Ada"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Sue", "Ada", "Eve"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Sue", "Ada", "Eve"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Sue", "Ada", "Eve"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Sue", "Ada", "Eve"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Sue", "Ada", "Eve"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Sue", "Ada", "Eve"],
          round3: ["Eve", "Sue", "Ada"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Sue", "Eve", "Ada"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Sue", "Eve", "Ada"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Sue", "Eve", "Ada"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Sue", "Eve", "Ada"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Sue", "Eve", "Ada"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Sue", "Eve", "Ada"],
          round3: ["Eve", "Sue", "Ada"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Eve", "Sue", "Ada"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Eve", "Ada", "Sue"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Eve", "Sue", "Ada"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Ada", "Sue", "Eve"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Ada", "Sue", "Eve"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Ada", "Sue", "Eve"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Ada", "Sue", "Eve"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Ada", "Sue", "Eve"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Ada", "Sue", "Eve"],
          round3: ["Eve", "Sue", "Ada"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Ada", "Eve", "Sue"],
          round3: ["Eve", "Sue", "Ada"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Sue", "Ada", "Eve"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Sue", "Ada", "Eve"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Sue", "Ada", "Eve"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Sue", "Ada", "Eve"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Sue", "Ada", "Eve"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Sue", "Ada", "Eve"],
          round3: ["Eve", "Sue", "Ada"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Sue", "Eve", "Ada"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Sue", "Eve", "Ada"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Sue", "Eve", "Ada"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Sue", "Eve", "Ada"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Sue", "Eve", "Ada"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Sue", "Eve", "Ada"],
          round3: ["Eve", "Sue", "Ada"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Ada", "Sue"],
          round3: ["Eve", "Sue", "Ada"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Ada", "Sue", "Eve"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Ada", "Eve", "Sue"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Sue", "Ada", "Eve"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Sue", "Eve", "Ada"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Eve", "Ada", "Sue"]
        },
        {
          round1: ["Eve", "Sue", "Ada"],
          round2: ["Eve", "Sue", "Ada"],
          round3: ["Eve", "Sue", "Ada"]
        }
      ])
    );
  });
});
