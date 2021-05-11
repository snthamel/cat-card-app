const express = require("express");
const router = express.Router();
const {
    createCatCard,
    downloadCard
} = require("../controllers/card.controller");
const {
    validateCreateCatCard
} = require('../validators/card.validator');

router.get('/', validateCreateCatCard, createCatCard);
router.get('/:filename', downloadCard);

module.exports = router;
