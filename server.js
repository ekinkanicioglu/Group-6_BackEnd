const express = require('express');
const app = express();
const mongoose = require("mongoose");
 var configDB = require('./config/db');
const router= require('./routes/products');

app.use(router);


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

configDB();