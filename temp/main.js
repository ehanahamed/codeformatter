const acorn = require("acorn");

var result = [];
var tokens = [...acorn.tokenizer(
    "if ((1+1) == 2) { console.log(1 + 1); }",
    { "ecmaVersion": "6"}
)];
for (var i = 0; i < tokens.length; i++) {
    if (tokens[i].value) {
        result.push(tokens[i].value + " ");
    } else {
        result.push(tokens[i].type.label);
    }
}

console.log(result);
