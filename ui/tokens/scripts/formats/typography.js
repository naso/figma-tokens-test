const StyleDictionaryPackage = require("style-dictionary");
const get = require("lodash/get");

const name = "css/typography";

const cssProps = {
  fontFamily: "font-family",
  fontWeight: "font-weight",
  fontSize: "font-size",
  //   letterSpacing: "letter-spacing",
  lineHeight: "line-height",
};

const weights = {
  Regular: "400",
  SemiBold: "600",
  Bold: "700",
};

const mapTokenToValue = (token, tokens) => {
  const parsed = { ...token, value: {} };

  const { category } = token.attributes;

  let props = Object.keys(token.value);
  props = props.filter((prop) => Object.keys(cssProps).includes(prop));

  if (props.length > 0) {
    props.map((prop) => {
      const value = token.value[prop];

      if (value.startsWith("$")) {
        const path = value.replace("$", `${category}.`);

        let result = get(tokens, path).value;

        if (prop === "lineHeight") {
          if (result === "AUTO") {
            result = "normal";
          } else {
            result = parseInt(result, 10) / 100;
          }
        }

        if (prop === "fontSize") {
          result = parseInt(result, 10) + "px";
        }

        if (prop === "fontWeight") {
          result = weights[result];
        }

        parsed.value[cssProps[prop]] = result;
      }
    });
  }

  return parsed;
};

StyleDictionaryPackage.registerFormat({
  name,
  formatter: function ({ dictionary }) {
    // console.log(dictionary.tokens.global.fontFamilies);
    // console.log(dictionary.tokens);

    const tokens = dictionary.allTokens.filter(
      (token) => token.type === "typography"
    );

    return tokens
      .map((token) => {
        const { value } = token;

        const parsed = mapTokenToValue(token, dictionary.tokens);

        const styles = Object.keys(parsed.value)
          .map((name) => `  ${name}: ${parsed.value[name]};`)
          .join("\n");

        const css = [];
        css.push(`.${token.name} {`);
        css.push(styles);
        css.push("}");

        return css.join("\n");
      })
      .join(`\n`);
  },
});

const config = {
  typography: {
    transforms: ["attribute/cti", "name/cti/kebab"],
    buildPath: `public/css/tokens/`,
    files: [
      {
        format: name,
        destination: "typography.css",
      },
    ],
  },
};

module.exports = { config };
