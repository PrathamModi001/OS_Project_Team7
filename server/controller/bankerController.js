const Banker = require("../models/banker");

/** GET Dead Lock page */
exports.getBanker = (req, res, next) => {
  res.render("banker", {
    title: "Banker's Algorithm",
    showMessage: false,
    message: ''
  });
};

/** POST DeadLock */
exports.postBanker = async (req, res, next) => {
  let arr = []; //Final Output array
  let index = 0;
  let availableIndex = 0;
  let flag = 0; //To check DeadLock. We are using this variable to check isDeadLock is true or false 
  let checkDiff = 1; //Check if any process id is same
  let allNotDone = true; //All processes are not completed
  let isDeadLock = false; //deadLock detection

  let available = {
    A: 0,
    B: 0,
    C: 0,
  };
  //collect all Data from website
  let processNumArr = req.body.pNum;

  const A = req.body.a;
  const B = req.body.b;
  const C = req.body.c;

  AllocatedA = req.body.allocA;
  AllocatedB = req.body.allocB;
  AllocatedC = req.body.allocC;

  MaxNeedA = req.body.maxA;
  MaxNeedB = req.body.maxB;
  MaxNeedC = req.body.maxC;

  let processSequence = [];

  let totalAllocatedA = 0;
  let totalAllocatedB = 0;
  let totalAllocatedC = 0;

  let RemainingNeedA = [];
  let RemainingNeedB = [];
  let RemainingNeedC = [];

  let AvailableA = [];
  let AvailableB = [];
  let AvailableC = [];


  //check the process id (if any id is same then it will detect)
  for (let i = 0; i < processNumArr.length; i++) {
    for (let j = i + 1; j < processNumArr.length; j++) {
      if (processNumArr[i] === processNumArr[j]) {
        checkDiff = 0;
        break;
      }
    }
  }
  if (checkDiff === 1) {
    //ACTUAL ALGO
    //class to create processes and used it to store all process data efficiently
    class process {
      done = false;
      processNum = 0;
      allocated = {
        A: 0,
        B: 0,
        C: 0,
      };
      maxNeed = {
        A: 0,
        B: 0,
        C: 0,
      };
      remainingNeed = {
        A: 0,
        B: 0,
        C: 0,
      };

      constructor(
        allocatedA,
        allocatedB,
        allocatedC,
        maxNeedA,
        maxNeedB,
        maxNeedC,
        processNum
      ) {
        this.allocated.A = allocatedA;
        this.allocated.B = allocatedB;
        this.allocated.C = allocatedC;

        this.maxNeed.A = maxNeedA;
        this.maxNeed.B = maxNeedB;
        this.maxNeed.C = maxNeedC;

        this.processNum = processNum;
      }
    }
    //calculate Remaining Need
    function calculateRemainingNeed(p) {
      p.remainingNeed.A = p.maxNeed.A - p.allocated.A;
      p.remainingNeed.B = p.maxNeed.B - p.allocated.B;
      p.remainingNeed.C = p.maxNeed.C - p.allocated.C;
      return;
    }

    //calculate Available resources initially 
    function calculateAvailableFirstTime() {
      for (let i = 0; i < processNumArr.length; i++) {
        totalAllocatedA += parseInt(AllocatedA[i]);
        totalAllocatedB += parseInt(AllocatedB[i]);
        totalAllocatedC += parseInt(AllocatedC[i]);
      }
      available.A = A - totalAllocatedA;
      available.B = B - totalAllocatedB;
      available.C = C - totalAllocatedC;

      AvailableA[availableIndex] = available.A;
      AvailableB[availableIndex] = available.B;
      AvailableC[availableIndex] = available.C;
      availableIndex++;

      return;
    }
    //check need of individual process
    function checkNeed(available, remaining_need_process) {
      if (
        parseInt(available.A) >= parseInt(remaining_need_process.A) &&
        parseInt(available.B) >= parseInt(remaining_need_process.B) &&
        parseInt(available.C) >= parseInt(remaining_need_process.C)
      ) {
        return true;
      }
      return false;
    }
    // check all process are completed or not
    function allDone() {
      for (let k = 0; k < arr.length; k++) {
        if (arr[k].done === false) {
          return;
        }
      }
      allNotDone = false;
      return;
    }
    // calculate Available while executing
    function calculateAvailable(i) {
      available.A += parseInt(AllocatedA[i]);
      available.B += parseInt(AllocatedB[i]);
      available.C += parseInt(AllocatedC[i]);
      AvailableA[availableIndex] = available.A;
      AvailableB[availableIndex] = available.B;
      AvailableC[availableIndex] = available.C;
      availableIndex++;
      return;
    }


    //pushing all data in "arr" array
    for (let i = 0; i < processNumArr.length; i++) {
      let p = new process(
        AllocatedA[i],
        AllocatedB[i],
        AllocatedC[i],
        MaxNeedA[i],
        MaxNeedB[i],
        MaxNeedC[i],
        processNumArr[i]
      );
      calculateRemainingNeed(p);
      RemainingNeedA[i] = p.remainingNeed.A;
      RemainingNeedB[i] = p.remainingNeed.B;
      RemainingNeedC[i] = p.remainingNeed.C;
      arr.push(p);
    }

    calculateAvailableFirstTime();

    while (allNotDone) { //it will iterate till all processes are not done otherwise deadlock
      if (arr.length === 0) {
        break;
      }
      if (checkNeed(available, arr[index].remainingNeed) && !arr[index].done) { //ckeck remaining need can be fulfilled with available 
        flag = 0;
        calculateAvailable(index);
        processSequence.push(arr[index].processNum);
        arr[index].done = true;
        index = (index + 1) % arr.length;
      } else {
        index = (index + 1) % arr.length;
        if (flag == arr.length) {
          allNotDone = false;
          break;
        }
        flag += 1;
      }

      allDone();
    }
    if (flag === arr.length) {
      isDeadLock = true;
    }

    
    // time complexity of Banker: O(n*n*m);
    // Database connection to MONGODB
    const newBanker = new Banker({
      A: A,
      B: B,
      C: C,
      pNum: processNumArr,
      allocA: AllocatedA,
      allocB: AllocatedB,
      allocC: AllocatedC,
      maxA: MaxNeedA,
      maxB: MaxNeedB,
      maxC: MaxNeedC,
      remA: RemainingNeedA,
      remB: RemainingNeedB,
      remC: RemainingNeedC,
      availA: AvailableA,
      availB: AvailableB,
      availC: AvailableC,
      isDeadLock: isDeadLock,
      processSequence: processSequence,
    });
    await newBanker.save();
    res.render("bankerSolution", {
      title: "Banker's Solution",
      isDeadLock: isDeadLock,
      processSequence: processSequence,
    });

  } else {
    res.render("banker", {
      title: "Round-Robin",
      showMessage: true,
      message: "2 pIDs Cannot Be Same!"
    });
  }
};
