const codeFormatter = require("./main.js");

//console.log(codeFormatter.func("var eee = \"idk\"; console.log(\"e\"); console.log(`${eee} e`"));

var thingy = codeFormatter.format(
    "// a single line comment\n" +
    "/*\n" +
    "    A multi-line\n" +
    "    comment\n" +
    "*/\n" +
    "/* A multiline comment that's a single line */\n" +
    "console.log(/* a comment within function parameters*/ \"something\");"
);


/*for (var i = 0; i < thingy.length; i++) {
    console.log(thingy[i]);
}
*/
console.log(thingy);
