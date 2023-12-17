const express = require("express");
const path = require("path")
const app = express();

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:5000/'
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname,"webpages")));

app.use("/products",require("./routes/products.js"))

const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`server has started at ${port}`));
