const express = require("express");
const axios = require('axios');
const blend = require('@mapbox/blend');
const { existsSync, writeFileSync } = require('fs');

global.__basedir = __dirname;

const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}/`;
const imagePath = process.env.IMAGE_PATH || __basedir + '/src/output/';

var app = express();

app.get('/', async (req, res) => {
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
});

app.get('/:filename', async (req, res) => {
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
});

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});