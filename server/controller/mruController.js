/** GET MRU Page */
exports.getMRU = (req, res, next) => {
    res.render("MRU", {
        title: "MRU"
    })
}

exports.postMRU = (req, res, next) => {
    let frame = req.body.frame;

    let pages = new Array(frame);
    for (let index = 0; index < frame; index++) {
        pages[index] = -1;
    }
    let totalPages = [];


    const reference = (req.body.reference.split(' '));
    const refString = reference.map(function(str) {
        return parseInt(str);
    });
    let index = 0;
    let recentIndex;
    let hit = 0;
    let pageFault = 0;

    for (let i = 0; i < refString.length; i++) {
        if (index === frame) {
            if (doesExist(pages, refString[i])) {
                hit++;
                recentIndex = findIndex(pages, refString[i]);
            } else {
                pageFault++;
                pages[recentIndex] = refString[i];
            }
        } else {
            if (doesExist(pages, refString[i])) {
                hit++;
                recentIndex = findIndex(pages, refString[i]);
            } else {
                pageFault++;
                pages[index] = refString[i];
                recentIndex = index;
                index++;
            }
        }
        totalPages.push(pages);
        // console.log(totalPages);
    }

    function doesExist(array, element) {
        for (let j = 0; j < array.length; j++) {
            if (array[j] === element) {
                return true;
            }
        }
        return false;
    }

    function findIndex(array, element) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === element) {
                return i;
            }
        }
        return null;
    }
    res.render("MRUsolution" , {
        title: "MRU-Solution",
        totalPages : totalPages,
        hit: hit,
        pageFault: pageFault,
        refString: refString,
        frame: frame,
    })
}