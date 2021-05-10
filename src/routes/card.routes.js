const express = require("express");
const router = express.Router();
const {
    createCatCard,
    downloadCard
} = require("../controllers/card.controller");

router.get('/', createCatCard);
router.get('/:filename', downloadCard);

module.exports = router;
