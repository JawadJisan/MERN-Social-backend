const mongoose = require("mongoose");
const connectDatabase = () => {
    mongoose
        .connect("mongodb+srv://admin:KiuthnQsbRZlzSxE@cluster0.glpxgbz.mongodb.net/?retryWrites=true&w=majority")
        .then(() => console.log('Database Connection is successful'))

};

module.exports = connectDatabase


/* 
admin
KiuthnQsbRZlzSxE

*/