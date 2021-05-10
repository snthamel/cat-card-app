const axios = require('axios');
const blend = require('@mapbox/blend');
const { existsSync, writeFileSync } = require('fs');
const { baseUrl, imagePath } = require('../config/config');

const createCatCard = async (req, res) => {
    try {
        const {
            greeting = 'Hello',
            who = 'You',
            width = 400,
            height = 500,
            color = 'Pink',
            size = 100
        } = req.query;

        const greetImage = await fetchCatImage(greeting, width, height, color, size);
        const whoImage = await fetchCatImage(who, width, height, color, size);

        const mergedImage = await mergeImages([greetImage, whoImage], width, height);

        return res.status(200).json({
            message: `Cat card created with text "${greeting} ${who}"`,
            data: mergedImage
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

/**
 * Fetch image for specified data from https://cataas.com/ and return image as a buffer
 * @param {string} tag Tag name to search the cat images from
 * @param {int} width Width of image
 * @param {int} height Height of image
 * @param {string} color Color for text caption on the image
 * @param {string} size 
 * @returns Buffer
 */
const fetchCatImage = async (tag, width, height, color, size) => {
    return new Promise((resolve, reject) => {
        axios.get(
            `https://cataas.com/cat/says/${tag}?width=${width}&height=${height}&color=${color}&size=${size}`,
            {
                responseType: 'arraybuffer'
            }
        ).then(response => {
            resolve(Buffer.from(response.data, 'binary'));
        }).catch(error => {
            reject(error);
        })
    });
}

/**
 * Merge image buffers and save new image
 * @param {Array} images Array of image buffers
 * @param {int} width Width of one image
 * @param {int} height Height of one image
 * @param {string} format Output format
 * @returns Saved image name and download url
 */
const mergeImages = async (images, width, height, format = 'jpeg') => {
    try {
        const b64MergedImage = await new Promise((resolve, reject) => {
            blend(images.map((image, i) => {
                return { buffer: image, x: width * i, y: 0 };
            }), {
                width: width * images.length,
                height: height,
                format: format
            }, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        })

        const outputName = `${new Date().valueOf()}.jpg`;
        writeFileSync(imagePath + outputName, b64MergedImage, 'binary');
        return {
            name: outputName,
            url: baseUrl + outputName
        };
    } catch (error) {
        console.log(error.stack);
        throw error;
    }
}

const downloadCard = async (req, res) => {
    try {
        const fileName = req.params.filename;
        const downloadPath = imagePath + fileName;

        if (existsSync(downloadPath)) {
            return res.status(200).download(downloadPath, fileName);
        } else {
            return res.status(404).json({
                message: 'Image not found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    createCatCard,
    downloadCard
}
