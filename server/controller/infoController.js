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

exports.getBored = (req,res,next) => {
    res.render("bored" , {
        title: "Bored?",
    })
}

exports.getGameOne = (req,res,next) => {
    res.render("index" , {
        title: "Game-1"
    })
}

exports.getGameTwo = (req,res,next) => {
    res.render("index2" , {
        title: "Game-2"
    })
}

exports.getGameThree = (req,res,next) => {
    res.render("index3" , {
        title: "Game-3"
    })
}