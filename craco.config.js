const update = require("immutability-helper");

module.exports = {
  jest: {
    configure: (jestConfig, { env, paths, resolve, rootDir }) => {
      console.log(jestConfig);

      const firstTransformKey = Object.keys(jestConfig.transform)[0];
      const firstTransformValue = jestConfig.transform[firstTransformKey];
      const expectedKey = "^.+\\.(js|jsx|ts|tsx)$";

      if (
        !firstTransformKey == expectedKey ||
        !firstTransformValue.endsWith("babelTransform.js")
      ) {
        throw Error(
          "Expecting first key to be a babel transform on Javascript files, got '" +
            firstTransformKey +
            "': '" +
            firstTransformValue +
            "'"
        );
      }

      const pathToJestTransform = rootDir + "/src/jestTransform.js";
      return update(jestConfig, {
        transform: {
          "^.+\\.(js|jsx|ts|tsx)$": {
            $set: pathToJestTransform
          }
        }
      });
    }
  }
};
