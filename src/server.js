const app = require('./app.js');
const { port } = require('./config/config');

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
