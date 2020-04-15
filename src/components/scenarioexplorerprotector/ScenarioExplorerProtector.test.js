import { degreesOfFreedom } from "./ScenarioExplorerProtector";
import { stages } from "../constants";

describe("degrees of freedom", () => {
  const athletes = {
    athlete1: {
      name: "Adam Ondra"
    },
    athlete2: {
      name: "Akiyo Noguchi"
    },
    athlete3: {
      name: "Jan Hoyer"
    },
    athlete4: {
      name: "Janja Garnabret"
    },
    athlete5: {
      name: "William Bosi"
    },
    athlete6: {
      name: "Jessie Pilz"
    },
    athlete7: {
      name: "Margo Hayes"
    },
    athlete8: {
      name: "Tomoa Narasaki"
    }
  };

  it("not yet started", () => {
    const props = {
      athletes: athletes,
      stages: {
        [stages.QUALIFICATION]: [],
        [stages.SPEED]: [],
        [stages.BOULDER]: [],
        [stages.LEAD]: []
      }
    };
    expect(degreesOfFreedom(props)).toEqual(8 + 8 + 8 + 8);
  });

  it("part way through", () => {
    const props = {
      athletes: athletes,
      stages: {
        [stages.QUALIFICATION]: [], // 8 missing
        [stages.SPEED]: [
          // 1 missing
          "athlete1",
          "athlete2",
          "athlete3",
          "athlete4",
          "athlete6",
          "athlete7",
          "athlete8"
        ],
        [stages.BOULDER]: [
          // 0 missing
          "athlete1",
          "athlete2",
          "athlete3",
          "athlete4",
          "athlete5",
          "athlete6",
          "athlete7",
          "athlete8"
        ],
        [stages.LEAD]: ["athlete1"] // 7 missing
      }
    };
    expect(degreesOfFreedom(props)).toEqual(8 + 1 + 0 + 7);
  });

  it("finished", () => {
    const all = [
      "athlete1",
      "athlete2",
      "athlete3",
      "athlete4",
      "athlete5",
      "athlete6",
      "athlete7",
      "athlete8"
    ];
    const props = {
      athletes: athletes,
      stages: {
        [stages.QUALIFICATION]: all,
        [stages.SPEED]: all,
        [stages.BOULDER]: all,
        [stages.LEAD]: all
      }
    };
    expect(degreesOfFreedom(props)).toEqual(0);
  });
});
