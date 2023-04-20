const express = require("express")
const router = express.Router()

const projectController = require('../controller/projectController')
const rrController = require('../controller/rrController')
const bankerController = require("../controller/bankerController")
const scanController = require("../controller/scanController")
const mruController = require("../controller/mruController")

const infoController = require('../controller/infoController')

/** Project Routes */
router.get("/" , projectController.getHome)

/** Round Robin Routes  */
router.get("/round-robin" , rrController.getRoundRobin)
router.post("/round-robin" , rrController.postRoundRobin)

/** GET Round Robin INFO */
router.get('/rrInfo' , infoController.getRrInfo)

/** Banker Routes  */
router.get("/banker's-algo" , bankerController.getBanker)
router.post("/banker's-algo" , bankerController.postBanker)

/**GET Banker INFO */
router.get("/bankerInfo" , infoController.getBankerInfo)

/** SCAN C-SCAN */
router.get("/scan-cScan" , scanController.getScan)
router.post("/scan-cScan" , scanController.postScan)
router.get("/allScans", scanController.getAllScans)

/**SCAN C-SCAN Info */
router.get('/scan-cScan-info' , infoController.getScanInfo)

/** MRU Page Replacement */
router.get("/mru" , mruController.getMRU)
router.post("/mru" , mruController.postMRU)

/** MRU INFO */
router.get("/MruInfo" , infoController.getMruInfo)

/** ABOUT US Route */
router.get("/aboutUs" , infoController.getAboutUs)

/**GET bored */
router.get('/bored' , infoController.getBored)

/** GET Game One */
router.get('/game-1' , infoController.getGameOne)

/** GET Game Two */
router.get('/game-2' , infoController.getGameTwo)

/**GET Game Three */
router.get('/game-3' , infoController.getGameThree)

module.exports = router;