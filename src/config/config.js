const CONFIG = {};

CONFIG.port = process.env.PORT || 3000;
CONFIG.baseUrl = process.env.BASE_URL || `http://localhost:${CONFIG.port}/`;
CONFIG.imagePath = process.env.IMAGE_PATH || __basedir + '/src/output/';

module.exports = CONFIG;
