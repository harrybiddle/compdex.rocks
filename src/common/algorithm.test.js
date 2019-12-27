import { possible_finish_orders } from "./algorithm";

describe("possible finish orders for two athletes", () => {
  const athletes = new Set(["Eve", "Sue"]);

  it("should be correct at start of competition", () => {
    expect(possible_finish_orders(athletes)).toEqual(new Set([
          new Set([["Sue", "Eve"], ["Eve", "Sue"], ["Sue", "Eve"]]),
          new Set([["Sue", "Eve"], ["Eve", "Sue"], ["Eve", "Sue"]]),
          new Set([["Sue", "Eve"], ["Sue", "Eve"], ["Sue", "Eve"]]),
          new Set([["Sue", "Eve"], ["Sue", "Eve"], ["Eve", "Sue"]]),
          new Set([["Eve", "Sue"], ["Eve", "Sue"], ["Sue", "Eve"]]),
          new Set([["Eve", "Sue"], ["Eve", "Sue"], ["Eve", "Sue"]]),
          new Set([["Eve", "Sue"], ["Sue", "Eve"], ["Sue", "Eve"]]),
          new Set([["Eve", "Sue"], ["Sue", "Eve"], ["Eve", "Sue"]])
        ])
    );
  });
})
