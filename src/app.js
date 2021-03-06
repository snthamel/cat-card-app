const express = require("express");
const path = require("path");
const cors = require('cors');
const helmet = require('helmet');
const app = express();

const swaggerUi = require('swagger-ui-express');

// Define global baseurl for image download url
global.__basedir = path.join(__dirname, '/../');

// Setup CORS and parse url encoded request body
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Http headers security
app.use(helmet());

// Setup API documentation
const swaggerSpec = require('./config/swagger').spec();
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        customSiteTitle: 'Cat Card Application API Documentation',
        customCss: '.topbar { display: none }'
    })
);

// Setup application routes
const cardRoutes = require('./routes/card.routes');
app.use(cardRoutes);

module.exports = app;
