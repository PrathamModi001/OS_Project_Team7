const Result = require("../models/table");

/** GET Round Robin page */
exports.getRoundRobin = (req, res, next) => {
  res.render("round-robin", {
    title: "Round-Robin",
  });
};

exports.postRoundRobin = async (req, res, next) => {
  const pId = req.body.pId;
  const at = req.body.at;
  const bt = req.body.bt;
  const colors = [
    "#f1d32c",
    "#ff686b",
    "#5ce1e6",
    "#d15cff",
    "#7fd8be",
    "#ff7f50",
    "#e9ff70",
    "#f763ba",
  ];
  let quantum = parseInt(req.body.quantum);
  let flag = 1;
  let arr = [];
  let time = 0;
  const completedId = [];
  const completedBT = [];

  for (let i = 0; i < pId.length; i++) {
    for (let j = i + 1; j < pId.length; j++) {
      if (pId[i] === pId[j]) {
        flag = 0;
        break;
      }
    }
  }

  if (flag === 1) {
    // ACTUAL ALGO:

    let processes = [];
    let alldone = false;
    class process {
      color = "";
      name = "";
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
        this.at = parseInt(at);
        this.bt = parseInt(bt);
        this.id = parseInt(id);
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

    for (let i = 0; i < pId.length; i++) {
      processes[i] = new process(at[i], bt[i], pId[i]);
      processes[i].name = "P" + (i + 1);
      processes[i].color = colors[i];
    }

    for (let i = 0; i < processes.length; i++) {
      temp.push(processes[[i]]);
    }

    let BT = [];
    function arrange() {
      let k = 0;
      let idx = 0;
      while (k < temp.length) {
        if (temp[k].at <= time && temp[k].added === false) {
          if (arr.length == 0) {
            arr.push(temp[k]);
            BT.push(temp[k].bt);
            temp[k].added = true;
          } else {
            idx = temp[k].addTo(arr);
            BT.splice(idx, 0, temp[k].bt);
          }
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
      let i = 0;
      arrange();
      while (!alldone) {
        checkDone(temp);
        if (alldone === true) {
          break;
        }
        if (isBTzero(arr)) {
          time++;
          i = 0;
          completedId.push("-");
          completedBT.push(1);
          continue;
        } else {
          if (arr[i].done == false) {
            if (arr[i].bt <= quantum) {
              time += arr[i].bt;
              completedBT.push(arr[i].bt);
              arr[i].bt = 0;
              arr[i].ct = time;
              arr[i].tat = arr[i].ct - arr[i].at;
              arr[i].wt = arr[i].tat - BT[i];
              arr[i].done = true;
              completedId.push(arr[i].name);
            } else {
              arr[i].bt -= quantum;
              time += quantum;
              completedId.push(arr[i].name);
              completedBT.push(quantum);
            }
          }
        }
        arrange();
        i = (i + 1) % arr.length;
      }
      for (let i = 0; i < arr.length; i++) {
        arr[i].bt = BT[i];
      }
    }

    Roundrobin();

    const newTable = new Result({
      result: arr,
    });

    await newTable.save();
    res.render("rrSolution", {
      title: "RR Simulator",
      arr: arr,
      time: time,
      flag: flag,
      quantum: quantum,
      completedId: completedId,
      completedBT: completedBT,
    });
  } else {
    res.redirect("/");
  }
};
