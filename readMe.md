
###      https://www.youtube.com/watch?v=_7UQPve99r4&t=419s

## Simple CRUD App
- create a folder `simpleCRUDApp`
- type `npm init -y`
- open and see `package.json`
- `mqain` is `index.js`


- Create a file `index.js` the brain of our app back-end
- Try `console.log("Hello world")`
- on teminal run `node index.js`
- But to use the package.json, you have to inside the `script  ` type: `"server": "node index.js"`
- now you can run  `npm run server` and see the same result.
- NB use `cls` to clean terminal
- now install `express`
- Go to `npmjs.com`
- type  `express`
- copy `npm i express` and paste to `terminal`
- see the changes
- Now use expres biolet plate code to test it

- in `index.js`
```javaScript
const express = require('express');
const app = express();
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
```
- terminal

```javaScript
npm run server
```

- To get the response at default url `'/'`
- index.js 9

```javaScript
app.get('/', (req, res) => {
    res.send("Hello from Node API");
});
```

- But b/se you add the posrt, it will tell you that the server is running on port 3000.
- So go to `localhost:3000` to see the message `Hello from Node API`
- OR `use postman` `GET`
- Install `insomia`
- Click `+` and add new folder
- name it `GET API `
- create `.gitignore`
- make sure u download `git`
- type ` node_modules/` in `gitignore`
- insall nodemon in order to see the change immedatley on the browser.
- So type on terminal `npm i nodemon -D`
- You can read about it at `npmjs.com`  
- Go into `package.json` and in `script` include `"dev": "nodemon index.js"`
- now use `npm run dev`
## Now connect to mogoDB database
- Go to `mongodb.com/atlas`
- singin 
- click `creat new project`
- name it ` Node API` click `next`
- Give yoursel permission
- click `create project`
- click `create deployment`
- choose `M0` and `aws`
- Name your claster `BackendDB`
- click create 
- create your `username` and `password`
- Ip Address: `0.0.0.0` to allow access from anywhere
- Type `Allow from anywhere` in the description.
- Click `add entry`
- Click `Go to overview`
- Click `Database` from left
- click `connect`
- Go to `Drivers`
- Copy `npm install mongoDB`
- Paste in on terminal
- Copy connection string
- Go to `index.js`
- import monogoose
- Go to npmjs.org and search for `mongoose`
- copy `npm i mongoose`
- import it by coping what u what from this page `import mongoose from "mongoose"`
- copy the connection bioler plate
```javaScript
mongoose.connect("mongodb://127.0.0.1:27017/<collectionNameHere>?retryWrites=true&w=majority").connect().then(() => {console.log("connected");
}).catch(()=>{
    console.log("connection failed")
});

```
## Create Model
