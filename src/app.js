const express = require("express");
const path = require("path");
const cors = require('cors');
const app = express();

// Define global baseurl for image download url
global.__basedir = path.join(__dirname, '/../');
const { port } = require('./config/config');

// Setup CORS and parse url encoded request body
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// demo UI path
app.get('/demo', function (req, res) {
    res.sendFile(__basedir + '/demo/index.html');
});

// Setup application routes
const cardRoutes = require('./routes/card.routes');
app.use(cardRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});