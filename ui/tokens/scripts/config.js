const { config: variablesConfig } = require("./formats/variables");
const { config: typographyConfig } = require("./formats/typography");

function getStyleDictionaryConfig(context) {
  return {
    source: [`ui/tokens/input/${context}.json`],
    platforms: {
      ...variablesConfig,
      ...typographyConfig,
    },
  };
}

module.exports = { getStyleDictionaryConfig };
