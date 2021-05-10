const express = require("express");
const port = process.env.PORT || 3000;

var app = express();

app.get('/', (req, res) => {
    const { greet = 'Hello', name = 'You' } = req.query;

    return res.status(200).json({
        message: `Cat card created with text ${greet} ${name}`
    });
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});