const MRU = require("../models/mru");

/** GET MRU Page */
exports.getMRU = (req, res, next) => {
  res.render("MRU", {
    title: "MRU",
  });
};

exports.postMRU = (req, res, next) => {
  let frame = parseInt(req.body.frame);
  // console.log(frame)

  let totalPgs = [];
  let totalPages = [];
  let pages = new Array(frame);
  for (let index = 0; index < frame; index++) {
    pages[index] = "-";
  }

  const reference = req.body.reference.split(" ");
  const refString = reference.map(function (str) {
    return parseInt(str);
  });

  let index = 0;
  let recentIndex;
  let didHit = [];
  let hit = 0;
  let pageFault = 0;

  for (let i = 0; i < refString.length; i++) {
    if (index === frame) {
      if (doesExist(pages, refString[i])) {
        didHit[i] = true;
        hit++;
        recentIndex = findIndex(pages, refString[i]);
      } else {
        didHit[i] = false;
        pageFault++;
        pages[recentIndex] = refString[i];
      }
    } else {
      if (doesExist(pages, refString[i])) {
        didHit[i] = true;
        hit++;
        recentIndex = findIndex(pages, refString[i]);
      } else {
        didHit[i] = false;
        pageFault++;
        pages[index] = refString[i];
        recentIndex = index;
        index++;
      }
    }
    totalPgs = totalPgs.concat(pages);
    // console.log(pages)
  }
  totalPages = createNewArray(totalPgs, frame);

  function doesExist(array, element) {
    for (let j = 0; j < array.length; j++) {
      if (array[j] === element) {
        return true;
      }
    }
    return false;
  }

  function createNewArray(totalPgs, frame) {
    const totalPages = [];
    for (let i = 0; i < totalPgs.length; i += frame) {
      totalPages.push(totalPgs.slice(i, i + frame));
    }
    return totalPages;
  }

  function findIndex(array, element) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === element) {
        return i;
      }
    }
    return null;
  }

  const newMRU = new MRU({
    refString: refString,
    frame: frame,
    hit: hit,
    pageFault: pageFault,
    totalPages: totalPages,
  });
  newMRU.save();

  res.render("MRUsolution", {
    title: "MRU-Solution",
    refString: refString,
    frame: frame,
    totalPages: totalPages,
    hit: hit,
    pageFault: pageFault,
    didHit: didHit,
  });
};
