const StyleDictionaryPackage = require("style-dictionary");

const { getStyleDictionaryConfig } = require("./config");

console.log("Build started...");

const contexts = ["global"];

contexts.map(function (context) {
  console.log("\n==============================================");
  console.log(`\nProcessing: [${context}]`);

  const StyleDictionary = StyleDictionaryPackage.extend(
    getStyleDictionaryConfig(context)
  );

  StyleDictionary.buildPlatform("variables");
  StyleDictionary.buildPlatform("typography");

  console.log("\nEnd processing");
});

console.log("\n==============================================");
console.log("\nBuild completed!");
