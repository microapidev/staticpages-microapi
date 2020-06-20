const router = require("express").Router();
const imageController = require("../controllers/image");

router.post("/", imageController.uploadImage);

module.exports = router;
