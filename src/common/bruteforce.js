export function* possibleFinishOrders(
  athletes,
  knownOrderRoundOne = [],
  knownOrderRoundTwo = [],
  knownOrderRoundThree = []
) {
  // a function to compute permutations
  // from https://stackoverflow.com/a/20871714/1809078
  const permutationsOf = set => {
    let result = [];
    function permute(array, m = []) {
      if (array.length === 0) {
        result.push(m);
      } else {
        for (let i = 0; i < array.length; i++) {
          let curr = array.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next));
        }
      }
    }
    const array = Array.from(set.values());
    permute(array);
    return result;
  };

  // a finish order is possible so long as nobody switches their order
  const finishOrderIsPossible = (candidateFinishOrder, knownFinishOrder) => {
    const isAscending = array => array.every((v, i, a) => !i || a[i - 1] <= v);
    const indexes = knownFinishOrder.map(athlete =>
      candidateFinishOrder.indexOf(athlete)
    );
    return isAscending(indexes);
  };

  // iterate over all permutations
  for (let finishOrderRoundOne of permutationsOf(athletes)) {
    if (
      !knownOrderRoundOne ||
      finishOrderIsPossible(finishOrderRoundOne, knownOrderRoundOne)
    ) {
      for (let finishOrderRoundTwo of permutationsOf(athletes)) {
        if (
          !knownOrderRoundTwo ||
          finishOrderIsPossible(finishOrderRoundTwo, knownOrderRoundTwo)
        ) {
          for (let finishOrderRoundThree of permutationsOf(athletes)) {
            if (
              !knownOrderRoundThree ||
              finishOrderIsPossible(finishOrderRoundThree, knownOrderRoundThree)
            ) {
              yield {
                round1: finishOrderRoundOne,
                round2: finishOrderRoundTwo,
                round3: finishOrderRoundThree
              };
            }
          }
        }
      }
    }
  }
}

export function computeScore(
  athlete,
  finishOrderRoundOne,
  finishOrderRoundTwo,
  finishOrderRoundThree
) {
  return (
    (finishOrderRoundOne.indexOf(athlete) + 1) *
    (finishOrderRoundTwo.indexOf(athlete) + 1) *
    (finishOrderRoundThree.indexOf(athlete) + 1)
  );
}

export function probabilities(
  athletes,
  knownOrderRoundOne = [],
  knownOrderRoundTwo = [],
  knownOrderRoundThree = []
) {
  const numberAthletes = athletes.size;
  const counts = {};
  for (let athlete of athletes.values()) {
    counts[athlete] = new Array(numberAthletes).fill(0);
  }

  let numberScenarios = 0;
  for (let finishOrder of possibleFinishOrders(
    athletes,
    knownOrderRoundOne,
    knownOrderRoundTwo,
    knownOrderRoundThree
  )) {
    // order athletes by their final score
    const finalOrder = Array.from(athletes.values()).map(athlete => [
      athlete,
      computeScore(
        athlete,
        finishOrder.round1,
        finishOrder.round2,
        finishOrder.round3
      )
    ]);
    finalOrder.sort((a, b) => a[1] - b[1]);

    // record the finishing index of every athlete
    for (let finishIndex = 0; finishIndex < numberAthletes; finishIndex++) {
      const athlete = finalOrder[finishIndex][0];
      counts[athlete][finishIndex]++;
    }

    // keep track of how many scenarios we computed
    numberScenarios++;
  }

  // compute probabilities
  let probabilities = {};
  for (let athlete of athletes.values()) {
    let p = [];
    for (let finishIndex = 0; finishIndex < numberAthletes; finishIndex++) {
      p.push(counts[athlete][finishIndex] / numberScenarios);
    }
    probabilities[athlete] = p;
  }

  return probabilities;
}
