const StyleDictionaryPackage = require("style-dictionary");

const name = "css/variables";

StyleDictionaryPackage.registerFormat({
  name,
  formatter: function (dictionary, config) {
    const types = ["color"];

    const props = dictionary.allProperties.filter((prop) =>
      types.includes(prop.type)
    );

    const variables = props
      .map((prop) => {
        return `  --${prop.name}: ${prop.value};`;
      })
      .join("\n");

    const css = [];
    css.push(`${this.selector} {`);
    css.push(variables);
    css.push("}");

    return css.join("\n");
  },
});

const config = {
  variables: {
    transforms: ["name/cti/kebab"],
    buildPath: `public/css/tokens/`,
    files: [
      {
        format: name,
        destination: "variables.css",
        selector: ":root",
      },
    ],
  },
};

module.exports = { config };
