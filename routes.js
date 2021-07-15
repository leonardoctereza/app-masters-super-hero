const express = require("express");
const router = express.Router();
const heroController = require("./controller");

router.get("/search", heroController.searchHeroByString);

router.get("/hero/:slug", heroController.searchHeroBySlug);

module.exports = router;
