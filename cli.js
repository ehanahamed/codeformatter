#! /usr/bin/env node
const fs = require("node:fs");
const codeFormatter = require("./main.js");

fs.readFile(
  "./newtest.js",
  "utf8",
  function (error, data) {
    if (error) {
      console.error(error);
    } else {
      console.log(codeFormatter.format(data, {
        escapeTemplates: true
      }));
    }
  }
)
