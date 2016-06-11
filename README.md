# bowrap
A very simple and small browser support wrapper to make node modules available in the browser. 

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
    "build": "npm run babel && npm run bowrap && npm run uglify",
    "babel": "babel --presets es2015 index.js --out-file .tmp/es5.js",
    "bowrap": "bowrap es5.tmp -o bowrapped.tmp -n myLib",
    "uglify": "uglifyjs bowrapped.tmp --output dist/index.min.js --screw-ie8 --compress",
    "clean": "del-cli *.tmp"
  },
  :
  :
```

## Output

Your module will be importable by node's require, ES6 import and can be added as browser script; useful if you want to package for bower.

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
For the package name, bowrap uses the name field in package.json in the current project unless specified with -n or --name.

## What actully happened to my code?

Not that much really. Bowrap wraps your module in a self calling function and puts export and module objects on the global window object if it exists. After the module exports bowrap will make it available on the global window object. See the test folder for an example.
