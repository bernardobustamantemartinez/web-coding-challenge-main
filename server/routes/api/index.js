const router = require("express").Router();
const helloRoutes = require("./hello");
const todoRoutes = require("./todo");

router.use("/hello", helloRoutes);
router.use("/todos", todoRoutes);
module.exports = router;
