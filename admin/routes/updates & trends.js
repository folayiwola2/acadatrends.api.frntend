const express = require("express");
const router = express.Router();
const updates & trendsControllers = require("../app/api/controllers/updates & trends");

router.post("/", updates & trendsControllers.create);
router.get("/", updates & trendsControllers.getPaginated);
// router.get("/", updates & trendsControllers.getAll);
router.get("/:updates & trendsId", updates & trendsControllers.getById);
router.put("/:updates & trendsId", updates & trendsControllers.updateById);
router.delete("/:updates & trendsId", updates & trendsControllers.deleteById);

module.exports = router;
