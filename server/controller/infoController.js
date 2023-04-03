exports.getRrInfo = (req, res, next) => {
    res.render("RrInfo", {
        title: "Round Robin INFO",
    });
}

exports.getBankerInfo = (req, res, next) => {
    res.render("BankerInfo", {
        title: "Banker' Algorithm INFO",
    });
}

exports.getScanInfo = (req, res, next) => {
    res.render("scanInfo", {
        title: "Scan C-Scan Info",
    });
}

exports.getMruInfo = (req, res, next) => {
    res.render("MruInfo", {
        title: "MRU Info",
    });
}

exports.getAboutUs = (req,res,next) => {
    res.render("aboutUs", {
        title: "About Us",
    });
}