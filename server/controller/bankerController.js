/** GET Dead Lock page */
exports.getBanker = (req, res, next) => {
    res.render("banker", {
        title: "Banker's Algorithm"
    })
}

/** POST DeadLock */
exports.postBanker = (req, res, next) => {
    let pCount=1;
    let arr = [];
    let index = 0;
    let flag = 0;
    let allNotDone = true;
    let available = {
        A: 0,
        B: 0,
        C: 0,
    };
    let allocatedArr = [];
    let maxNeedArr = [];
    let processNumArr = [];
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

        calculateRemainingNeed() {
            Object.keys(this.maxNeed).forEach((key) => {
                if (this.allocated.hasOwnProperty(key)) {
                    this.remainingNeed[key] = this.maxNeed[key] - this.allocated[key];
                }
            });
            return;
        }

        constructor(allocated, maxNeed, processNum) {
            this.allocated = allocated;
            this.maxNeed = maxNeed;
            this.processNum = processNum;
            this.calculateRemainingNeed();
            pCount++;
        }
    }

    for (let i = 0; i < ; i++) {
        let Allocated = {
            A: req.body.allocA,
            B: req.body.allocB,
            C: req.body.allocC,
        };
        allocatedArr.push(Allocated);
        let MaxNeed = {
            A: req.body.maxA,
            B: req.body.maxB,
            C: req.body.maxC,
        };
        maxNeedArr.push(MaxNeed);
        let ProcessNum = 0;
        processNumArr.push(ProcessNum);
        let p = new process(allocatedArr[i], maxNeedArr[i], processNumArr[i]);
        arr.push(p);
        console.log(p)
    }

    function calculateAvailableFirstTime() {
        for (let i = 0; i < allocatedArr.length; i++) {
            totalAllocatedA += allocatedArr[i].A;
            totalAllocatedB += allocatedArr[i].B;
            totalAllocatedC += allocatedArr[i].C;
        }
        available.A = A - totalAllocatedA;
        available.B = B - totalAllocatedB;
        available.C = C - totalAllocatedC;
        return;
    }

    function checkNeed(available, remaining_need_process) {
        if (
            available.A >= remaining_need_process.A &&
            available.B >= remaining_need_process.B &&
            available.C >= remaining_need_process.C
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

    calculateAvailableFirstTime();

    function calculateAvailable(i) {
        available.A += allocatedArr[i].A;
        available.B += allocatedArr[i].B;
        available.C += allocatedArr[i].C;
        return;
    }

    while (allNotDone) {
        if (arr.length === 0) {
            break;
        }
        if (checkNeed(available, arr[index].remainingNeed) && !arr[index].done) {
            flag = 0;
            calculateAvailable(index);
            processSequence.push(arr[index]);
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
    } else {
        console.log(processSequence);
    }
    console.log(arr.length)
    console.log(flag)
    res.redirect("/")
}