module.exports = {
    port: process.env.PORT || 3000,
    baseUrl: process.env.BASE_URL || `http://localhost:3000/`,
    imagePath: process.env.IMAGE_PATH || __basedir + '/src/output/'
};