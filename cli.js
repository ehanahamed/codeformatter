#! /usr/bin/env node
const fs = require("node:fs");
const codeFormatter = require("./main.js");

var helpFlag = false;
var versionFlag = false;

if ((process.argv.length - 2) < 1) {
  helpFlag = true;
}

for (var i = 2; i < process.argv.length; i++) {
  if ((process.argv[i] == "-h") || (process.argv[i] == "--help")) {
    helpFlag = true;
  } else if ((process.argv[i] == "-v") || (process.argv[i] == "--version")) {
    versionFlag = true
  }
}
if (helpFlag === true) {
  console.log(
    "Code Formatter\n" + 
    "v0.0.1 (https://codeformatter.ehan.dev, https://github.com/ehanahamed/codeformatter)\n" +
    "Ehan Ahamed, Evan Albaz, and Mason Safran\n" +
    "Usage:\n" +
    "  codeformatter ./path/to/file ./output/path --options\n" +
    "  OR\n" +
    "  codeformatter ./path/to/file --overwrite --options\n" +
    "  OR\n" +
    "  codeformatter ./path/to/file ./output/path --config ./config/path\n" +
    "  OR\n" +
    "  codeformatter ./path/to/file --overwrite --config ./config.path\n" +
    "Options:\n" +
    "  -v --version         display version\n" +
    "  -h --help            display help\n" +
    "     --overwrite       overwrite input file(s)\n" +
    "     --format          pretty print source code          (default)\n" +
    "  -m --minify          minify source code\n" +
    "  -c --config ./path   read options from config file\n" +
    "     --doublequotes    use double quotes                 (default)\n" +
    "     --singlequotes    use single quotes\n" +
    "     --indent n        indent with n spaces              (default: 2)\n" +
    "     --escapetemplates escape special chars in templates (default)\n" +
    "     --keeptemplates   keep special chars in templates\n"
  );
} else if (versionFlag === true) {
  console.log(
    "Code Formatter\n" + 
    "v0.0.1 (https://codeformatter.ehan.dev, https://github.com/ehanahamed/codeformatter)\n" +
    "Ehan Ahamed, Evan Albaz, and Mason Safran\n" +
    "See --help for more info\n"
  )
} else {
  var srcPath = process.argv[2];
  var overwriteFlag = false;
  var minifyFlag = false;
  var configPath = false;
  var options = {};
  for (var i = 2; i < process.argv.length; i++) {
    if (process.argv[i] == "--overwrite") {
      overwriteFlag = true;
    } else if (process.argv[i] == "--format") {
      minifyFlag = false;
    } else if ((process.argv[i] == "-m") || (process.argv[i] == "--minify")) {
      minifyFlag = true;
    } else if ((process.argv[i] == "-c") || (process.argv[i] == "--config")) {
      if (process.argv.length > (i + 1)) {
        configPath = process.argv[i + 1];
      }
    } else if (process.argv[i] == "--doublequotes") {
      options.quotes = "double";
    } else if (process.argv[i] == "--singlequotes") {
      options.quotes = "single";
    } else if (process.argv[i] == "--indent") {
      if (process.argv.length > (i + 1)) {
        options.indent = process.argv[i + 1];
      }
    } else if (process.argv[i] == "--escapetemplates") {
      options.escapeTemplates = true;
    } else if (process.argv[i] == "--keeptemplates") {
      options.escapeTemplates = false;
    }
  }
  if (configPath) {
    fs.readFile(
      configPath,
      "utf8",
      function (error, data) {
        if (error) {
          console.error("Error while reading config file:\n" + error);
        } else {
          options = JSON.parse(data);
        }
      }
    );
  }
  fs.readFile(
    srcPath,
    "utf8",
    function (error, data) {
      if (error) {
        console.error(error);
      } else {
        console.log(codeFormatter.format(
          data,
          options
        ));
      }
    }
  )
}
