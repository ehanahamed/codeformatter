const acorn = require("acorn");

var codeFormatter = {
    parse: function (src) {
        var result = [];
        acorn.parse(
            src,
            {
                "ecmaVersion": "6",
                onToken: function (token) {
                    result.push({ type: "token", token: token});
                },
                onComment: function (block, comment) {
                    result.push({
                        type: "comment",
                        block: block,
                        comment: comment
                    });
                }
            }
        )
        return result;
    },
    format: function (
      src,
      options
    ) {
        result = "";
        var tokens = codeFormatter.parse(src);
        for (var i = 0; i < tokens.length; i++) {
            if (tokens[i].type === "token") {
                if (tokens[i].token.type.keyword) {
                    result += tokens.token.value + " ";
                } else if (tokens[i].token.type.label === "string") {
                    var string = JSON.stringify(tokens[i].token.value).slice(1, -1);
                    result += `"${ string }"`;
                } else if (tokens[i].token.type.label === "template") {
                  if (options.escapeTemplates === false) {
                    result += tokens[i].token.value;
                  } else {
                    var template = JSON.stringify(tokens[i].token.value).slice(1, -1);
                    result += template;
                  }
                } else if (tokens[i].token.type.label === "eof") {
                    result += "\n";
                } else {
                    if (tokens[i].token.value) { 
                        result += (tokens[i].token.value + " ");
                    } else {
                        result += (tokens[i].token.type.label);
                    }
                }
            } else if (tokens[i].type === "comment") {
                if (tokens[i].block === true) {
                    result += `/*${tokens[i].comment}*/`
                    if (tokens[i].comment.includes("\n")) {
                        result += "\n";
                    } else if (tokens[i + 1].type === "comment") {
                        result += "\n";
                    } else if (
                        tokens[i - 1].type === "token" &&
                        tokens[i + 1].type === "token"
                    ) {
                        result += " ";
                    } else if (
                        tokens[i - 1].type === "comment" &&
                        tokens[i + 1].type === "token"
                    ) {
                        result += "\n";   
                    }
                } else if (tokens[i].block === false) {
                    result += `//${tokens[i].comment}\n`
                }
            }
        }
        return result;
    },
    minify: function (src) {
      result = "";
      var tokens = codeFormatter.parse(src);
      for (var i = 0; i < tokens.length; i++) {
        if (tokens[i].type === "token") {
          if (tokens[i].token.type.keyword) {
            result += tokens.token.value + " ";
          } else if (tokens[i].token.type.label === "string") {
            result += `"${ tokens[i].token.value }"`;
          } else if (tokens[i].token.type.label === "template") {
            result += tokens[i].token.value;
          } else if (tokens[i].token.type.label === "eof") {
            result += "\n";
          } else {
            if (tokens[i].token.value) { 
                result += tokens[i].token.value;
            } else {
                result += tokens[i].token.type.label;
            }
          }
        }
      }
      return result;
    }
}

module.exports = codeFormatter;
