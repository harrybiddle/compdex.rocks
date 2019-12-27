export function* possibleFinishOrders(
  athletes,
  round1Results = [],
  round2Results = [],
  round3Results = []
) {
  // a result is possible so long as nobody switches their order
  function resultIsPossible(result, knownResult) {
    const indexes = knownResult.map(athlete => result.indexOf(athlete));
    return arrayIsAscending(indexes);
  }

  // iterate over all permutations
  for (let round1 of permutationsOf(athletes)) {
    if (!round1Results || resultIsPossible(round1, round1Results)) {
      for (let round2 of permutationsOf(athletes)) {
        if (!round2Results || resultIsPossible(round2, round2Results)) {
          for (let round3 of permutationsOf(athletes)) {
            if (!round3Results || resultIsPossible(round3, round3Results)) {
              yield { round1: round1, round2: round2, round3: round3 };
            }
          }
        }
      }
    }
  }
}

function arrayIsAscending(array) {
  // from https://stackoverflow.com/a/53833620/1809078
  return array.every((v, i, a) => !i || a[i - 1] <= v);
}

function permutationsOf(set) {
  let result = [];

  function permute(array, m = []) {
    // from https://stackoverflow.com/a/20871714/1809078
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
}
