const acorn = require("acorn");

var codeFormatter = {
    func: function (src) {
        var result = [];
        var tokens = [...acorn.tokenizer(
            src,
            { "ecmaVersion": "6"}
        )];
        for (var i = 0; i < tokens.length; i++) {
            if (tokens[i].value) { 
                result.push(tokens[i].value + " ");
            } else {
                result.push(tokens[i].type.label);
            }
        }
        return result;
    }
}

module.exports = codeFormatter;
