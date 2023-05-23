const app = require("./app");
const connectDatabase = require("./config/database");
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv').config();

const port = process.env.PORT || 9000;

connectDatabase();

// cloudinary.config({
//     cloud_name: 'dztgfyv6p',
//     api_key: '694287922283864',
//     api_secret: 'AngY89yuq6Vaqt-6kKt0gU_yiNo',
// });

const server = app.listen(port, () => {
    console.log(`server is working on ${port}`)
})
app.get('/hello', (req, res) => {
    res.send('Hello Hello working! YaY!');
});
// module.exports = cloudinary;
