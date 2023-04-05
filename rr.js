let time = 0;
let alldone = false;
const quantum = 4;
class process {
    id = 0;
    name = '';
    at = 0;
    bt = 0;
    ct = 0;
    tat = 0;
    wt = 0;
    done = false;
    added = false;
    constructor(at, bt, id, name) {
        this.name = name;
        this.at = at;
        this.bt = bt;
        this.id = id;
        this.done = false;
    }
    addTo(processes) {
        for (let j = 0; j < processes.length; j++) {
            if (this.id > processes[j].id) {
                continue;
            } else {
                processes.splice(j, 0, this);
                this.added = true;
                return j;
            }
        }
        if (this.added === false) {
            processes.push(this);
            this.added = true;
            return processes.length - 1;
        }
    }
}
let p1 = new process(0, 5, 1, 'p1');
let p2 = new process(1, 6, 2, 'p2');
let p3 = new process(2, 3, 3, 'p3');
let p4 = new process(3, 1, 4, 'p4');
let p5 = new process(4, 5, 5, 'p4');
let p6 = new process(6, 4, 6, 'p4');

const temp = [];
temp.push(p1);
temp.push(p2);
temp.push(p3);
temp.push(p4);
temp.push(p5);
temp.push(p6);

let arr = [];
let BT = [];

function arrange() {
    let k = 0;
    let index = 0;
    while (k < temp.length) {
        if (temp[k].at <= time && temp[k].added === false) {
            if (arr.length == 0) {
                arr.push(temp[k]);
                BT.push(temp[k].bt);
                temp[k].added = true;
            }
            else {
                index = temp[k].addTo(arr);
                BT.splice(index, 0, temp[k].bt);
            }
            // console.log(k);
        }
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
        // arrange();
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
        arrange();
        i = (i + 1) % arr.length;
    }
    for (let i = 0; i < BT.length; i++) {
        arr[i].bt = BT[i];
    }
}

Roundrobin();
// console.log(temp);
// console.log(time);
for (let index = 0; index < arr.length; index++) {

    console.log(arr[index].ct);

}