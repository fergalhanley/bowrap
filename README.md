# bowrap
A very simple browser support wrapper for allowing import of node modules in the browser.

## Install

```
npm install bowrap -g
```

## Usage

In your package.json

```
  :
  :
  "scripts": {
    "test": "mocha --compilers js:babel-register",
    "build": "npm run babel && npm run uglify && npm run bowrap",
    "babel": "babel --presets es2015 index.js --out-file .tmp/index-es5-temp.js",
    "bowrap": "node node_modules/bowrap/bowrap.js myLib .tmp/index-es5-temp.js > .tmp/index-bowrapped-temp.js",
    "uglify": "uglifyjs .tmp/index-bowrapped-temp.js --output dist/index.min.js --screw-ie8 --compress"
  },
  :
  :
```

## Output

Your module will be importable by both ES6's import statement and available globally if included as a browser script, so useful if you want to package for bower for example.

So if you were importing your module in ES6 using:

````
import myLib from 'my-lib';
myLib.doStuff();

````

After being bowrapped your module would also be available for people directly importing your script:

````
myLib.doStuff();

````

## Note
For the package name, bowrap uses the name field in package.json in the current project. This can be overridden as in the example above.

## What actully happened to my code?

Not that much really. Bowrap just wraps your module in a self calling function and puts the export on the global window object if it exists.
