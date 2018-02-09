# Forgive me, I'm a frontend noob.

## Introduction:
Setting up react for development is a pain. This repository is a step-by-step documentation of the pain of setting up a development environment that can bootstrap a react application.

## Pre-Requisites:
I assume we all know how to install node, do npm init, and git init, right?

## 1. Add a bootstrap index.html
Let's start by creating the html landing page. Create an 'app/' directory and create an 'index.html'. This will be the first page the server will serve to the browser upon initial client request. The code snippet below is a starter template from bootstrap (https://getbootstrap.com/docs/4.0/getting-started/introduction/)

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <title>React Bootstrap</title>
  </head>
  <body>
    <h1>React Bootstrap</h1>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>
```
The starter template is good, but next we need a server to serve this landing page.

## 2. Setup Express to serve landing page.
We shall use express for 3 tasks:
1. Serve our initial landing page (index.html) and static files needed (js, css, jpg, etc)
2. API endpoints for client app's request to backend.
3. Execution of build tools (e.g webpack) in order to transpile and bundle our app.

For now we will just setup express for task 1. Task 2 and 3 will come later.

```
npm install --save express
```

Create a directory 'server/' and start a new 'devServer.js'. Within devServer.js, add the following code:
```javascript
import express from 'express';
import path from 'path';

const app = express();

// Generic endpoint index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../app/index.html"));
});

app.listen(3000);
```

## 3. Setup Babel to transpile ES6 to ES5 for node runtime.
Notice that the snippet for express was written in ES6 syntax? Unfortunately node still does not have full support for ES6 at this time of writting. We will need to use babel and it's ES6 presets to transpile it back.

```
npm install --save-dev babel-cli babel-preset-env
```

Now we can add an npm script to start the Express server that we wrote in 2.

```
//Add in package.json
"scripts": {
    "start": "babel-node server/devServer.js",
},
```

We also need to create a .babelrc file to load the ES6 presets for babel:

```
{
  "presets":["env"]
}
```

Try running the server with

```
npm start
```

and access the starter template @ localhost:3000

## 4. Install React, React-DOM
```
npm install --save react react-dom
```
nuff said.

## 5. Bootstrap the React app.
In 'app/src/' directory, start an index.js entry point for the React app like this:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
  render(){
    return (
      <div className="jumbotron">
        <h1 className="display-4">Hello World from React Bootstrap!</h1>
      </div>
    );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```
We are just adding a simple bootstrap jumbotron using React for a start. We attach the whole react app to an element with id of 'app' at the end.
We now need to create the element with id 'app' in index.html. We also attach the 'bundle.js' script first, although it does not exist for now.

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <title>React Bootstrap</title>
  </head>
  <body>
    <div id='app'></div>
    <script src="/bundle.js"></script>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>
```

## 6. Setup Webpack for bundling index.js (development mode)
If you run 'npm start' now, you will notice nothing is loaded. This is because Express does not know where 'index.js' is located. Even if Express can find and serve 'index.js', the client browser most likely wouldn't recognize its funky ES6 and JSX syntax.
We will use Webpack to build 'index.js' into something that client browser can use, with help from babel-loader (for ES6) and babel-react-preset (for JSX). It can be a bit confusing (didn't we install babel already?), but babel-cli which we installed earlier helps to run ES6 in node, but not in client browser.

First, install Webpack, babel-loader and babel-preset-react.
```
npm install --save-dev webpack babel-preset-react babel-loader
```

Initialize a 'webpack.config.dev.js':
```javascript
import webpack from 'webpack';
import path from 'path';

export default {
  entry: [
    path.join(__dirname, 'app/src/index')
  ],
  output: {
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {test: /\.js$/, include: path.join(__dirname, "app/src"), use:['babel-loader']},
      {test: /\.css$/, loaders: ['style', 'css']}
    ]
  },
};
```
What we did here:
1. Setup entry point of the compilation as 'app/src/index.js'.
2. Setup Webpack to output the bundled js file 'bundle.js'. Set 'publicPath' to '/' so devServer.js will serve 'bundle.js' as though there is an API endpoint at '/' route (See later).
3. Setup all .js files in 'app/src/' directory to be compiled with 'babel-loader'.
4. Setup all .css files to be compiled with 'style' and 'css' loader.

We also need to change .babelrc to include react preset:
```
{
  "presets":["env", "react"]
}
```

## 7. Setup Express to work with Webpack.
In development mode, we want Express to bundle our app with webpack and serve the bundle file directly from memory. We also want hot reloading as we develop our app.
For this, we need to install a few more packages:
```
npm install --save-dev webpack-dev-middleware webpack-hot-middleware
```
Add the configuration of the middleware to 'webpack.config.dev.js':
```javascript
import webpack from 'webpack';
import path from 'path';

export default {
  entry: [
    'webpack-hot-middleware/client', // Add this!
    path.join(__dirname, 'app/src/index')
  ],
  output: {
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {test: /\.js$/, include: path.join(__dirname, "app/src"), use:['babel-loader']},
      {test: /\.css$/, loaders: ['style', 'css']}
    ]
  },
  plugins: [ // Add this!
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
```

We want to trigger webpack to bundle our app when we start up the Express server.
Modify 'app/src/devServer.js' to the following:
```javascript
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from "../webpack.config.dev.js";

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

// Generic endpoint index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../app/index.html"));
});

app.listen(3000);
```

## 8. Development environment ready to go!
With this, the development environment should be ready to go. Try it:
```
npm start
```

## 9. Setup for production build.
To deploy the app to production, we would need an actual "bundle.js" served rather than the virtual one served from memory.

First, create a separate "webpack.config.prod.js" for production build:
```javascript
import webpack from 'webpack';
import path from 'path';

export default {
  entry: [
    path.join(__dirname, 'app/src/index')
  ],
  output: {
    path: path.join(__dirname, 'app/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {test: /\.js$/, include: path.join(__dirname, "app/src"), use:['babel-loader']},
      {test: /\.css$/, loaders: ['style', 'css']}
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({sourceMap: true})
  ]
};
```
Notice we removed the development middleware plugins and added the minification plugin. Additional plugins can be used here, such as file hashing, sass compilation or html plugin. Also, instead of publicPath in output, we declare an actual path in filesystem to dump our bundle.js.

Next, create a "server/build.js" for building with webpack outside express:
```javascript
import webpack from 'webpack';
import config from '../webpack.config.prod';

webpack(config).run((err, stats) => {
  if (err){
    console.log(err);
    return 1;
  }
});
```

Finally, we add the build script to package.json:
```
"scripts": {
  "start": "babel-node server/devServer.js",
  "build": "babel-node server/build.js",
}
```

Run "npm run build" to see the minified bundle.js in "app/dist/"

## 10. Time to serve!
Create a "server/prodServer.js" as our Express production server:

```javascript
import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname,'../app/dist')));

// Generic endpoint index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../app/index.html"));
});

app.listen(3000);
```

Add a new npm script for serving the bundle:
```
"scripts": {
  "start": "babel-node server/devServer.js",
  "build": "babel-node server/build.js",
  "serve": "babel-node server/prodServer.js"
}
```

Run:
```
npm run serve
```

Of course, you may choose to use any backend at this point (django, ruby-on-rails, etc) other than Express to serve "app/index.html" and "app/dist/bundle.js" to the browser.

## 11. Optional: Enhanced hot reloading for react.
At the moment in dev mode, we have to refresh the page everytime we save some changes (although webpack-hot-middleware allows us not to spin up dev server every time). We want the changes to be reflected by browser without manual page refresh.
For this, install the following:

```
npm install --save-dev babel-preset-react-hmre
```

and change the following to .babelrc
```
{
  "presets": ["react", "env"],
  "env": {
    "development": {
      "presets": ["react-hmre"]
    }
  }
}
```

## Final words
This is a minimalistic development environment for react, with the main aim of de-mystifying some of the magic most react starter-kit has. For a better react dev environment (albeit more magic), use create-react-app.
