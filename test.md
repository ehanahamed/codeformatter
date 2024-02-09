# Testing stuff

Strings, templates, etc
```
var varName = "a string"
console.log("another string");
console.log("a very long string, with many words that takes up a lot of screen space because it's a single line string");
console.log(`a template (the "string thingy" with backticks)`);
console.log(`a template, with a variable: ${ varName }`);
var anotherVar = "if there is no template text before or after a variable, there will be surronding tokens where token.type.label will still be template, but token.value will be null-ish";
console.log(`${ anotherVar }`);
```

Comments & stuff
```
// a single line comment
/*
    A multi-line
    comment
*/
/* A multiline comment that's a single line */
console.log(/* a comment within function parameters*/ "something");
```
