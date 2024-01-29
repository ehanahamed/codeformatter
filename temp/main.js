const acorn = require("acorn");

for (let token of acorn.tokenizer("if ((1+1) == 2) { console.log(1 + 1); }")) {
    //console.log(token.value + " y " + token.type.label)
    if (token.value) {
        console.log(token.value);
    } else {
        console.log(token.type.label);
    }
}
