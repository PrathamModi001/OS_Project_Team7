const Result = require("../models/table")

/** GET Round Robin page */
exports.getRoundRobin = (req, res, next) => {
    res.render("round-robin", {
        title: "Round-Robin"
    })
}

exports.postRoundRobin = async (req, res, next) => {
    const pId = req.body.pId;
    const at = req.body.at;
    const bt = req.body.bt;
    let quantum = parseInt(req.body.quantum);
    let flag = 1;
    let arr = [];
    let time = 0;
    
    for (let i = 0; i < pId.length; i++) {
        for (let j = i + 1; j < pId.length; j++) {
            if (pId[i] === pId[j]) {
                // alert("You must enter at least two processes to calculate.");
                // event.preventDefault(); // prevent form submission
                console.log("SAME SAME SAME")
                flag = 0;
                break;
            }
        }
    }

    if (flag === 1) {


        // ACTUAL ALGO: 

        let processes = [];
        // let time = 0;
        let alldone = false;
        class process {
            index = 0;
            id = 0;
            at = 0;
            bt = 0;
            ct = 0;
            tat = 0;
            wt = 0;
            done = false;
            added = false;
            constructor(at, bt, id) {
                this.at = at;
                this.bt = bt;
                this.id = id;
                this.done = false;
            }
            addTo(array) {
                for (let j = 0; j < array.length; j++) {
                    if (this.id > array[j].id) {
                        continue;
                    } else {
                        array.splice(j, 0, this);
                        this.added = true;
                        return j;
                    }
                }
                if (this.added === false) {
                    array.push(this);
                    this.added = true;
                    return array.length - 1;
                }
            }
        }
        const temp = [];

        for (let i = 0; i < at.length; i++) {
            // if(at.length==2){
            //     processes[i] = new process(at[i], bt[i], pId[i]);
            //     return;
            // }
            processes[i] = new process(at[i], bt[i], pId[i]);
            // console.log(at);
            // console.log(at[i]);
        }

        // let p2 = new process(0, 4, 5, 'p2');
        // let p3 = new process(8, 3, 0, 'p3');
        // let p4 = new process(60, 2, 2, 'p4');
        for (let i = 0; i < processes.length; i++) {
            temp.push(processes[[i]]);
        }
        // temp.push(p2);
        // temp.push(p3);
        // temp.push(p4);

        // let arr = []
        let BT = [];

        function arrange() {
            let i = 0;
            let k = 0;
            let idx = 0;
            while (k < temp.length) {
                if (temp[i].at <= time && temp[i].added === false) {
                    if (arr.length == 0) {
                        arr.push(temp[i]);
                        BT.push(temp[i].bt);
                        temp[i].added = true;
                    }
                    else {
                        idx = temp[i].addTo(arr);
                        BT.splice(idx, 0, temp[i].bt);
                    }
                }
                i = (i + 1) % temp.length;
                k++;
            }
            return;
        }

        function checkDone(checkArr) {
            for (let x = 0; x < checkArr.length; x++) {
                if (checkArr[x].done === false) {
                    alldone = false;
                    return;
                }
            }
            alldone = true;
        }

        function isBTzero(Btarr) {
            for (let y = 0; y < Btarr.length; y++) {
                if (Btarr[y].bt !== 0) {
                    return false;
                }
            }
            return true;
        }

        function Roundrobin() {
            let i = 0
            arrange();
            while (!alldone) {
                arrange();
                checkDone(temp);
                if (alldone === true) {
                    break;
                }
                if (isBTzero(arr)) {
                    // console.log("1");
                    time++;
                    i = 0;
                    continue;
                }
                else {
                    // console.log("2");
                    if (arr[i].done == false) {
                        // console.log("3");
                        if (arr[i].bt <= quantum) {
                            // console.log("4");
                            time += arr[i].bt;
                            arr[i].bt = 0;
                            arr[i].ct = time;
                            arr[i].tat = arr[i].ct - arr[i].at;
                            arr[i].wt = arr[i].tat - BT[i];
                            arr[i].done = true;
                        }
                        else {
                            // console.log("5");
                            arr[i].bt -= quantum;
                            time += quantum;
                        }
                    }
                }
                i = (i + 1) % arr.length;
            }
            for (let i = 0; i < arr.length; i++) {
                arr[i].bt = BT[i];
            }
        }

        Roundrobin();

        const newTable = new Result({
            result: arr
        })

        await newTable.save()
        // res.redirect("/round-robin/solution")
        res.render("solution", {
            title: "RR Simulator",
            arr: arr,
            time: time,
            flag : flag,
        })
    } else {
        res.redirect("/")
    }
}