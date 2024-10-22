
###      https://www.youtube.com/watch?v=_7UQPve99r4&t=419s

## Simple CRUD App
- create a folder `simpleCRUDApp`
- type `npm init -y`
- open and see `package.json`
- `main` is `index.js`


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
- create a `models` folder
- Inside `models` create `product.model.js`
- Import the follow:
```javaScript
const mongoose = require('mongoose`);

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
    },

    quantity: {
        type: Number,
        requiured: true,
        default: 0
    },

    image: {
        type: String,
        required: false

    }

},
{
    timestamps: true
}
);

// allow mongoDB to use it

const Product = mongoose.model("Product", ProductSchema);
// Export it

module.exports = Product;

```
- Now use this model to save data
- Go to index.js
- After `app.post()` type the follow:
```javaScript


app.post('/api/products', async (req, res) =>{
   try {
      const product =   await Product.create(req.body);
   } catch (error) {
    res.status(500).json({message: error.message});
    res.status(200).json(product);
   }

});
```


- Add `middleware` after `const app = express()
```javaScript

app.use(express.json()) // to allow us to see the result

```

- After `const mongoose = require()` import the model

```javaScript
const Product = require('./models/product.model.js');
```


- Now test it
- Create a new folder name `Add a Product`
- Click the arrow and select http request
- rename it as `Add API`
- POST: http://localhost:3000/api/products
- Body `json`
- Provide the fileds as in the models.js
```json
{
    "name": "pizza",
    "quantity": 10,
    "price": 5.99,
}
```

- Click `send`
- Go to your datanase and check it 
- Collection: `Node-API`
- table name : `products` -it became plular 
- Add more....

```json
{
    "name": "pancake",
    "quantity": 20,
    "price": 3.99,
}
```

- `send` it
```json
{
    "name": "donut",
    "quantity": 40,
    "price": 1.99,
}
```


- Click on `refrash` to see the added data


- But we need API to view these product 

- After `app.get`

```javaScript
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.send(500).json({message: errror.message});
        
    }

});

```

- Go to Pastman and create new folder `Get All Products`

- Right click and select http request
## Get product by ID

```javaScript
app.get("/api/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
       const product = await Product.findById(id)
       res.status(200).json(product);
    } catch (error) {
        res.send(500).json({message: error.message});
    }

});

```
- Create `Get One Product `


### Update a Product - based on id


- After     `app.post---`

```javaScript
app.put('/api/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product) {
            return res.status(404).json({message: "Product not found"});
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message})
    }

});

```

- POSTMAN create `Update Product` and test it.


```json
    "name": "UPDATED Pizza",
    "price": 7.99

```

- `send`

## delete api

```javaScript
    app.delete('/api/product/:id', async (req, res) => {
        try {
            const {id } = req.params;
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                res.status(404).json({message: "Product not found"});
            }

            res.status(200).json({message: "Product deleted successfully"});

        } catch  (error) {
            res.status(500).json({message: error.message});

        }
    })
```

- POSTMAN ` Delete a Product`
- `Delete API`
- Add produt  use ` Add a Product api`

```json
"name": "cheese cake",
"quantity": 100,
"price": 4.99
```

- send

- Add one more middleware after `app.use(express.json)`

```javaScript
app.use(express.urlencoded({extended: false})) // This allows us to add Product to database using Form
```


## Code resturcturing
- create `routes` folder

- under this create `product.route.js`
- after the `middlewares add this 
```javaScript

// routes 
app.use('/api/products', productRoute);
```
- NB: name all like this `products`


- In the product.route:
```javaScript

const express = require('express');
const Product = require("../models/product.model.js")
const router = express.Router();
const {getProducts, getProduct} = require('../controllers/product.controller.js');


router.get('/', getProducts); // get moany products

router.get('/:id', getProduct); // get single product

module.exports = router;
```

- add controller in d/t folder:

```javaScript



   

});

```

- create `controllers` and a file `product.controller.js   `


```javaScript 
const Product = require('../models/product.model');


const getProducts = async (req, res) => {
     try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.send(500).json({message: errror.message});
        
    }

}


const getProduct =  async (req, res) => {

    // copy and paste getProduct her from index.js
    try{

    } catch() {

    }


}


module.exports = {
    getProducts,
    getProduct,
    updateProduct,
    deletProdect
}

```

- index.js

```javaScript
const productRoute = require("./routes/product.route.js")

```