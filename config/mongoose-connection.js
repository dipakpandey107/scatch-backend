const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/scatch", { useNewUrlParser: true, useUnifiedTopology: true })
.then(function() {
    console.log("Connected to MongoDB");
})
.catch(function(err) {
    console.log("Error connecting to MongoDB", err);
});

module.exports = mongoose.connection;
