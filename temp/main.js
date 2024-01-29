const acorn = require("acorn");

let result = acorn.parse("1 + 1");

console.log(result);
console.log("e");
for (let token of acorn.tokenizer("1 + 1")) {
    console.log(token)
}
