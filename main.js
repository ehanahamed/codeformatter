const acorn = require("acorn");

var codeFormatter = {
    parse: function (src) {
        var result = [];
        acorn.tokenizer(
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
        ).then( function () {
            return result;
        });
    },
    func: function (src) {
        var tokens = codeFormatter.parse(src);
        for (var i = 0; i < tokens.length; i++) {
            if (tokens[i].type.label === "string") {
                result += `"${ tokens[i].value }"`;
            } else if (tokens[i].type.label === "template") {
                result += tokens[i].value;
            } else {
                if (tokens[i].value) { 
                    result += (tokens[i].value + " ");
                } else {
                    result += (tokens[i].type.label);
                }
            }
        }
        return result;
    },
}

module.exports = codeFormatter;
