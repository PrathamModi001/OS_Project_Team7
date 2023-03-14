exports.getScan = (req,res,next) => {
    res.render("scan-cScan" , {
        title : "Scan / cScan"
    })
}

exports.postScan = (req,res,next) => {
    let pId = req.body.pId
    let tn = req.body.tn
    let mode = req.body.mode
    
    console.log(pId , tn)
    console.log(mode)
    res.redirect("/")
}