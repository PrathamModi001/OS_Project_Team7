const MRU = require("../models/mru");

/** GET MRU Page */
exports.getMRU = (req, res, next) => {
  res.render("MRU", {
    title: "MRU",
  });
};

exports.postMRU = (req, res, next) => {
  //collect all Data from website
  let frame = parseInt(req.body.frame);
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
  //if exist then  add to array
  for (let i = 0; i < refString.length; i++) {
    if (index === frame) {
      if (doesExist(pages, refString[i])) {
        didHit[i] = true;
        hit++;
        recentIndex = findIndex(pages, refString[i]);
      } else {//hit not exist then fault +1
        didHit[i] = false;
        pageFault++;
        pages[recentIndex] = refString[i];
      }
    } else {//hit
      if (doesExist(pages, refString[i])) {
        didHit[i] = true;
        hit++;
        recentIndex = findIndex(pages, refString[i]);
      } else {//hit not exist then fault +1
        didHit[i] = false;
        pageFault++;
        pages[index] = refString[i];
        recentIndex = index;
        index++;
      }
    }
    totalPgs = totalPgs.concat(pages);
  }
  totalPages = createNewArray(totalPgs, frame);
  //check the page exist or not
  function doesExist(array, element) {
    for (let j = 0; j < array.length; j++) {
      if (array[j] === element) {
        return true;
      }
    }
    return false;
  }
  //to get data in proper form
  function createNewArray(totalPgs, frame) {
    const totalPages = [];
    for (let i = 0; i < totalPgs.length; i += frame) {
      totalPages.push(totalPgs.slice(i, i + frame));
    }
    return totalPages;
  }
  //to get index
  function findIndex(array, element) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === element) {
        return i;
      }
    }
    return null;
  }

  // time complexity of MRU: O(n*n);
  // Database connection to MONGODB
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
