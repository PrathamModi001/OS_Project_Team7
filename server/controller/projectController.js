/** GET HOME PAGE: 
 * Route: "/"
 */
exports.getHome = (req,res,next) => {
    res.render("home")
}

/** GET Dead Lock page */
exports.getDeadLock = (req,res,next) => {
    res.render("deadlock")
}

/**GET Scan Page */
exports.getSCAN = (req,res,next) => {
    res.render("scan-cScan")
}

/** GET MRU Page */
exports.getMRU = (req,res,next) => {
    res.render("MRU")
}