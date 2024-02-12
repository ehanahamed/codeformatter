# Code Formatter - CLI Docs

## Installation

Code Formatter's cli can be installed through nodejs. It can be installed globally or for just one project.

Install for one project:
```
$ npm install --save-dev codeformatter
```

Or install for your whole system:
```
# npm install --global codeformatter
```

## Usage

Codeformatter's command is `codeformatter`
```
$ npx codeformatter --help
```

If you installed it globally, you don't need to type `npx`
```
$ codeformatter --help
```

## Configuration

Code formatter will run with its default options if no options or config file is given
```
$ codeformatter ./src.js ./output.js
```

You can pass options as cli flags
```
$ codeformatter ./src.js ./output.js --indent 4 --keeptemplates
```

Or you can define options in a config file
```json
{
    "indent": 4,
    "escapeTemplates": false
}
```

And then specify the path to your config file
```
$ codeformatter ./src.js ./output.js --config ./config.json
```

### Config file

```jsonc
{
    "indent": 2, /* number of spaces */
    "quotes": "double", 
    "escapeTemplates": false
}
```
