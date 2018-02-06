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

    <title>Hello, world!</title>
  </head>
  <body>
    <h1>Hello, world!</h1>

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
We shall use express for 3 things:
1. Serve our initial landing page (index.html) and static files needed (js, css, jpg, etc)
2. API endpoints for client app's request to backend.
3. Execution of build tools (e.g webpack) in order to transpile and bundle our app.

```
npm install --save express
```

Create a directory 'server/' and start a new 'server.js'. Within server.js, add the following code:
```javascript
import express from 'express';
import path from 'path';

const app = express();

//Serve static files from server/static directory
app.use(express.static('static'));

// Generic endpoint index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../app/index.html"));
});

app.listen(3000);
```

## 3. Setup Babel to transpile ES6 for node runtime.
Notice that the snippet for express was written in ES6 syntax? Unfortunately node still does not have full support for ES6 at this time of writting. We will need to use babel and it's ES6 presets to transpile it back.
```
npm install --save-dev babel-cli babel-preset-env
```
Now we can add an npm script to start the Express server that we wrote in 2.
```
//Add in package.json
"scripts": {
    "start": "babel-node server/server.js",
},
```
Try running the server with
```
npm start
```
and access the starter template @ localhost:3000
