/*
 * This transformer should be applied to .js files before they get passed to Jest
 * It strips out calls to workerize-loader!, replacing workers with a synchronous
 * version. Then, it transforms the file using Babel.
 *
 * This "transformer composition" is necessary because Jest does not support
 * multiple transforms of the same file: https://github.com/facebook/jest/issues/8725
 */

const babelJest = require("babel-jest");
const update = require("immutability-helper");

// let babel create its transformer
let babelJestTransformer = babelJest.createTransformer({
  presets: [require.resolve("babel-preset-react-app")],
  babelrc: false,
  configFile: false
});

// create a new process function that wraps the babel one
function process(fileContent, ...rest) {
  // replace a line like
  //
  //    import worker from "workerize-loader!./scenarioexplorerloader.worker";
  //
  // with
  //
  //    const worker = () => require("./scenarioexplorerloader.worker");
  const transformedFileContent = fileContent.replace(
    new RegExp('import (.+?) from "workerize-loader!(.+?)"'),
    'const $1 = () => require("$2");'
  );

  // the regex isn't totally perfect - it doesn't handle whitespace, for example
  // error if we didn't replace workerize-loader!
  if (transformedFileContent.includes("workerize-loader!")) {
    throw Error("Failed to replace workerize-loader! import");
  }

  // now pass the file content through the babel transformer
  return babelJestTransformer.process(transformedFileContent, ...rest);
}

// export with the new process function injected in
module.exports = update(babelJestTransformer, { process: { $set: process } });
