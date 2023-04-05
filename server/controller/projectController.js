/** GET HOME PAGE: 
 * Route: "/"
 */
exports.getHome = (req,res,next) => {
    res.render("home", {
        title: "Home"
    })
}
/** Get 404 Page */
exports.get404 = (req,res,next) => {
    res.render('get404' , {
        title: "404 Not Found"
    })
}