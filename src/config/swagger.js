const swaggerJsDoc = require('swagger-jsdoc');
const { name, version } = require('../../package.json');
const { port } = require('./config');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: name,
            version: version,
            description: 'This is documentation for the Cat Card Application API',
            termsOfService: 'http://swagger.io/terms/',
            contact: {
                email: 'snthamel.lanka@gmail.com'
            },
            license: {
                name: 'Apache 2.0',
                url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
            },
            basePath: '/',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json']
        },
        servers: [
            {
                url: `http://localhost:${port}/`,
                description: 'Local environment'
            }
        ]
    },
    apis: ['./docs/*.js', './src/docs/*.js']
};

module.exports = {
    spec: () => {
        return swaggerJsDoc(swaggerOptions);
    }
};
