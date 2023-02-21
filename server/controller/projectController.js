/** GET HOME PAGE: 
 * Route: "/"
 */
exports.getHome = (req,res,next) => {
    res.render("home", {
        title: "Home"
    })
}


/**GET Scan Page */
exports.getSCAN = (req,res,next) => {
    res.render("scan-cScan", {
        title: "Scan - cScan"
    })
}

/** GET MRU Page */
exports.getMRU = (req,res,next) => {
    res.render("MRU", {
        title: "MRU"
    })
}