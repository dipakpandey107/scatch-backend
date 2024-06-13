const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');

const ownersRoutes = require('./routes/ownersRoutes.js');
const usersRoutes = require('./routes/usersRoutes.js');
const productsRoutes = require('./routes/productsRoutes.js');
const indexRouter = require("./routes/index.js");

require("dotenv").config();

// Ensure the database connection is imported and initialized
const db = require("./config/mongoose-connection.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname , "public")));
app.set("view engine" , "ejs");

app.use("/owners",ownersRoutes);
app.use("/users",usersRoutes);
app.use("/products",productsRoutes);


db.once('open', () => {
    console.log('Connected to the database');

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
