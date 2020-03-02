const update = require("immutability-helper");

module.exports = {
  jest: {
    configure: (jestConfig, { env, paths, resolve, rootDir }) => {
      // we are expecting the jest config to take this form:
      //
      //   "jest": {
      //     "transform": {
      //        "^.+\\.(js|jsx|ts|tsx)$": "...babelTransform.js",
      //        ...
      //     }
      //     ...
      //   }
      //
      // error if this is not the case
      const expectedJavascriptTransformPattern = "^.+\\.(js|jsx|ts|tsx)$";
      const javascriptTransformValue =
        jestConfig.transform[expectedJavascriptTransformPattern];

      if (
        !javascriptTransformValue ||
        !javascriptTransformValue.endsWith("babelTransform.js")
      ) {
        throw Error(
          "Expecting first key to be a babel transform on Javascript files, got '" +
            expectedJavascriptTransformPattern +
            "': '" +
            javascriptTransformValue +
            "'"
        );
      }

      // inject in our new transform
      const pathToJestTransform = rootDir + "/src/jestTransform.js";
      return update(jestConfig, {
        transform: {
          [expectedJavascriptTransformPattern]: {
            $set: pathToJestTransform
          }
        }
      });
    }
  }
};
