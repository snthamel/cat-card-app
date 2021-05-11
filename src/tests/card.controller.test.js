const request = require('supertest');
const app = require('../app');

describe('Test creating new cat card', () => {
    it('should create an image with specified text and return success message and image data', async done => {
        await request(app)
            .get('/')
            .expect(200)
            .then((response) => {
                expect(response.body).toBeObject().toContainKeys(['message', 'data']);
                expect(response.body.message).toBeString();
                expect(response.body.data).toBeObject().toContainKeys(['name', 'url']);
            });
        done();
    });

    it('should validate width parameter to be integer', async done => {
        await request(app)
            .get('/?width=value')
            .expect(422)
            .then((response) => {
                expect(response.body).toBeObject().toContainKey('message');
                expect(response.body.message).toBeObject().toContainKey('width');
                expect(response.body.message.width).toEqual('Width should be numeric');
            });
        done();
    });

    it('should validate height parameter to be integer', async done => {
        await request(app)
            .get('/?height=value')
            .expect(422)
            .then((response) => {
                expect(response.body).toBeObject().toContainKey('message');
                expect(response.body.message).toBeObject().toContainKey('height');
                expect(response.body.message.height).toEqual('Height should be numeric');
            });
        done();
    });

    it('should validate size parameter to be integer', async done => {
        await request(app)
            .get('/?size=value')
            .expect(422)
            .then((response) => {
                expect(response.body).toBeObject().toContainKey('message');
                expect(response.body.message).toBeObject().toContainKey('size');
                expect(response.body.message.size).toEqual('Size should be numeric');
            });
        done();
    });
});

describe('Test downloading a cat card', () => {
    it('should download image with the specified filename', async done => {
        const createCardResponse = await request(app).get('/');
        const cardName = createCardResponse.body.data.name;

        const downloadedCard = await request(app)
            .get('/' + cardName)
            .expect(200)
            .buffer()
            .parse((res, callback) => {
                res.setEncoding('binary');
                res.data = '';
                res.on('data', chunk => res.data += chunk);
                res.on('end', () => {
                    callback(null, Buffer.from(res.data, 'binary'));
                });
            });
        expect(downloadedCard.body).not.toBeUndefined();
        expect(downloadedCard.body).toBeInstanceOf(Buffer);
        done();
    });

    it('should return 404 error for invalid filename', async done => {
        await request(app)
            .get('/not-existing-file.jpg')
            .expect(404)
            .then(response => {
                expect(response.body).toBeObject().toContainKeys(['message']);
                expect(response.body.message).toBeString().toEqual('Image not found');
            });
        done();
    })
});
