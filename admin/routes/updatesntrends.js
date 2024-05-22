const express = require("express");
const router = express.Router();
const updatesntrendsControllers = require("../app/api/controllers/updatesntrends");

router.post("/", updatesntrendsControllers.create);
router.get("/", updatesntrendsControllers.getPaginated);
// router.get("/", updatesntrendsControllers.getAll);
router.get("/:updatesntrendsId", updatesntrendsControllers.getById);
router.put("/:updatesntrendsId", updatesntrendsControllers.updateById);
router.delete("/:updatesntrendsId", updatesntrendsControllers.deleteById);

module.exports = router;
