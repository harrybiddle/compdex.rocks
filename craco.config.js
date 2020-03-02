const update = require("immutability-helper");

const expectedJavascriptTransformPattern = "^.+\\.(js|jsx|ts|tsx)$";

function errorOnUnexpectedJestConfiguration(jestConfig) {
  /* we are expecting the jest config to take this form:
   *
   *   "jest": {
   *     "transform": {
   *        "^.+\\.(js|jsx|ts|tsx)$": "...babelTransform.js",
   *        ...
   *     }
   *     ...
   *   }
   *
   * error if this is not the case
   */
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
}

module.exports = {
  jest: {
    configure: (jestConfig, { rootDir }) => {
      // replace the existing transform on .js files with our custom one
      // it would be great if we could simply append a transform rather than
      // replacing it, but Jest does not support multiple transforms for
      // one file (https://github.com/facebook/jest/issues/8725)
      errorOnUnexpectedJestConfiguration(jestConfig);
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
