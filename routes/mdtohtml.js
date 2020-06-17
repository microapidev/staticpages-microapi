const router = require("express").Router();
const mdtohtmlController = require("../controllers/mdtohtml");

router.post("/", mdtohtmlController.convert);

module.exports = router;
