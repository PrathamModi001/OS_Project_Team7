/** GET Dead Lock page */
exports.getBanker = (req, res, next) => {
  res.render("banker", {
    title: "Banker's Algorithm",
  });
};

/** POST DeadLock */
exports.postBanker = (req, res, next) => {
  let arr = [];
  let index = 0;
  let availableIndex = 0;
  let flag = 0;
  let allNotDone = true;
  let isDeadLock = false;
  let available = {
    A: 0,
    B: 0,
    C: 0,
  };
  let processNumArr = req.body.pNum;
  let processSequence = [];
  const A = req.body.a;
  const B = req.body.b;
  const C = req.body.c;
  let totalAllocatedA = 0;
  let totalAllocatedB = 0;
  let totalAllocatedC = 0;

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

  let AllocatedA = [];
  let AllocatedB = [];
  let AllocatedC = [];
  let MaxNeedA = [];
  let MaxNeedB = [];
  let MaxNeedC = [];
  let RemainingNeedA = [];
  let RemainingNeedB = [];
  let RemainingNeedC = [];
  let AvailableA = [];
  let AvailableB = [];
  let AvailableC = [];

  AllocatedA = req.body.allocA;
  AllocatedB = req.body.allocB;
  AllocatedC = req.body.allocC;

  MaxNeedA = req.body.maxA;
  MaxNeedB = req.body.maxB;
  MaxNeedC = req.body.maxC;

  function calculateRemainingNeed(p) {
    p.remainingNeed.A = p.maxNeed.A - p.allocated.A;
    p.remainingNeed.B = p.maxNeed.B - p.allocated.B;
    p.remainingNeed.C = p.maxNeed.C - p.allocated.C;
    return;
  }

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

  function allDone() {
    for (let k = 0; k < arr.length; k++) {
      if (arr[k].done === false) {
        return;
      }
    }
    allNotDone = false;
    return;
  }

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
  calculateAvailableFirstTime();

  while (allNotDone) {
    if (arr.length === 0) {
      break;
    }
    if (checkNeed(available, arr[index].remainingNeed) && !arr[index].done) {
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
    console.log("DEADLOCK");
    console.log(processSequence);
    isDeadLock = true;
  } else {
    console.log(processSequence);
  }
  console.log(flag);
  console.log(AvailableA);
  res.redirect("/");
};
