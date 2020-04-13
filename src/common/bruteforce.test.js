import { computeScore, possibleFinishOrders, scenarios } from "./bruteforce";

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

it("compute score is correct", () => {
  expect(
    computeScore(
      "Bob",
      ["Joe", "Bob", "Alf"],
      ["Bob", "Alf", "Joe"],
      ["Joe", "Alf", "Bob"]
    )
  ).toEqual(2 * 1 * 3);
});

describe("scenarios for two athletes", () => {
  const countback = ["Eve", "Sue"];
  const athletes = new Set(countback);
  it("should be correct for no completed rounds", () => {
    expect(scenarios(athletes, countback)).toEqual({
      Sue: [4, 4],
      Eve: [4, 4]
    });
  });

  it("scenarios correct when eve wins round one", () => {
    /*
    If Eve wins round one there is only one scenario in which Sue wins overall:

        EVE wins - SUE wins - SUE wins

    But there are three scenarios in which Eve wins overall:

        EVE wins - EVE wins - SUE wins  : EVE wins
        EVE wins - EVE wins - EVE wins  : EVE wins
        EVE wins - SUE wins - EVE wins  : EVE wins
    */
    const speedRound = ["Eve", "Sue"];
    expect(scenarios(athletes, countback, speedRound)).toEqual({
      Sue: [1, 3],
      Eve: [3, 1]
    });
  });

  it("scenarios correct when eve wins rounds one and two", () => {
    /* Eve is guaranteed to win the competition */
    const speedRound = ["Eve", "Sue"];
    const boulderRound = ["Eve", "Sue"];
    expect(scenarios(athletes, countback, speedRound, boulderRound)).toEqual({
      Sue: [0, 2],
      Eve: [2, 0]
    });
  });

  it("scenarios correct when eve wins round one but loses round two", () => {
    /* Its down to whoever wins the final round! */
    const speedRound = ["Eve", "Sue"];
    const boulderRound = ["Sue", "Eve"];
    expect(scenarios(athletes, countback, speedRound, boulderRound)).toEqual({
      Sue: [1, 1],
      Eve: [1, 1]
    });
  });

  const finishOrdersInWhichEveWinsOverall = [
    {
      speedRound: ["Sue", "Eve"],
      boulderRound: ["Eve", "Sue"],
      leadRound: ["Eve", "Sue"]
    },
    {
      speedRound: ["Eve", "Sue"],
      boulderRound: ["Eve", "Sue"],
      leadRound: ["Sue", "Eve"]
    },
    {
      speedRound: ["Eve", "Sue"],
      boulderRound: ["Eve", "Sue"],
      leadRound: ["Eve", "Sue"]
    },
    {
      speedRound: ["Eve", "Sue"],
      boulderRound: ["Sue", "Eve"],
      leadRound: ["Eve", "Sue"]
    }
  ];
  for (let i = 0; i < finishOrdersInWhichEveWinsOverall.length; i++) {
    it(
      "proabilities correct when the competition is over and eve has already won (" +
        (i + 1) +
        " of " +
        finishOrdersInWhichEveWinsOverall.length +
        ")",
      () => {
        const k = finishOrdersInWhichEveWinsOverall[i];
        expect(
          scenarios(
            athletes,
            countback,
            k.speedRound,
            k.boulderRound,
            k.leadRound
          )
        ).toEqual({
          Eve: [1, 0],
          Sue: [0, 1]
        });
      }
    );
  }
});

it("in a tie scenario, the athlete with the higher countback is more likely to win", () => {
  const countback = ["Sue", "Eve", "Ada"];
  const athletes = new Set(["Eve", "Ada", "Sue"]);

  // in this scenario, all athletes end with a score of 6
  expect(
    scenarios(
      athletes,
      countback,
      ["Eve", "Sue", "Ada"],
      ["Ada", "Eve", "Sue"],
      ["Sue", "Ada", "Eve"]
    )
  ).toEqual({
    Sue: [1.0, 0.0, 0.0],
    Eve: [0.0, 1.0, 0.0],
    Ada: [0.0, 0.0, 1.0]
  });
});
