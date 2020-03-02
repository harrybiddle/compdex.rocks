const babelJest = require("babel-jest");
const update = require("immutability-helper");

// let babel create the original transformer
let originalTransformer = babelJest.createTransformer({
  presets: [require.resolve("babel-preset-react-app")],
  babelrc: false,
  configFile: false
});

// create a new process function
function process(fileContent, ...rest) {
  const transformedFileContent = fileContent.replace(
    'import worker from "workerize-loader!./predictions.worker"',
    'const worker = () => require("./predictions.worker");'
  );
  if (transformedFileContent.includes("workerize-loader!")) {
    throw Error("Failed to replace workerize-loader! import");
  }
  return originalTransformer.process(transformedFileContent, ...rest);
}

// export with the new process function
module.exports = update(originalTransformer, { process: { $set: process } });
