const express = require("express")
const router = express.Router()

const projectController = require('../controller/projectController')
const rrController = require('../controller/rrController')
const bankerController = require("../controller/bankerController")
const scanController = require("../controller/scanController")

/** Project Routes */
router.get("/" , projectController.getHome)

/** Round Robin Routes  */
router.get("/round-robin" , rrController.getRoundRobin)
router.post("/round-robin" , rrController.postRoundRobin)

/** Dead Lock Routes  */
router.get("/banker's-algo" , bankerController.getBanker)
router.post("/banker's-algo" , bankerController.postBanker)

/** SCAN C-SCAN */
router.get("/scan-cScan" , scanController.getScan)
router.post("/scan-cScan" , scanController.postScan)

/** MRU Page Replacement */
router.get("/MRU" , projectController.getMRU)

module.exports = router;