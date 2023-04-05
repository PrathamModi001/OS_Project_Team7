const Scan = require("../models/scan-cScan");

exports.getScan = (req, res, next) => {
  res.render("scan-cScan", {
    title: "Scan / cScan",
    showMessage: false,
    message: ''
  });
};

exports.postScan = (req, res, next) => {
  //collect all Data from website
  let pId = req.body.pId;
  let tn = req.body.tn;
  let headpoint = parseInt(req.body.headpoint);
  let Mode = req.body.mode;
  let Direction = req.body.direction;
  let flag = 1
  //check the process id (if any id is same then it will detect)
  for (let i = 0; i < pId.length; i++) {
    for (let j = i + 1; j < pId.length; j++) {
      if (pId[i] === pId[j]) {
        flag = 0;
        break;
      }
    }
  }
  if (flag == 1) {
    let processes = [];
    let completed_processes = [];
    let time = 0;
    let All_Not_Done = true;
    let index = 0;

    let mode = Mode;
    let initial_direction = Direction;
    let initial_head_point = headpoint;

    let xAxis = [parseInt(initial_head_point)];
    let yAxis = [0];
    //class to create processes and used it to store all process data efficiently
    class process {
      bt = 0;
      id = 0;
      constructor(bt, id) {
        this.bt = bt;
        this.id = id;
      }
    }

    for (let i = 0; i < pId.length; i++) {
      processes.push(new process(parseInt(tn[i]), parseInt(pId[i])));
    }


    processes.sort(function (a, b) {//complexity nlogn
      return a.bt - b.bt;
    });

    switch (mode) {
      case "scan": // to select scan algorithm
        completed_processes = [];
        function check_all_done_scan(processes) {
          if (processes.length == 0) {
            All_Not_Done = false;
            return;
          }
          return;
        }

        switch (initial_direction) {
          case "Left": // to select left mode of simulation in scan
            function find_head_index(processes) {
              if (processes[0].bt >= initial_head_point) {
                return 0;
              }
              for (let i = 0; i < processes.length; i++) {
                if (processes[i].bt >= initial_head_point) {
                  index = i - 1;
                  return index;
                }
              }
            }
            index = find_head_index(processes);

            function adjust_index(index) {
              index--;
              if (index < 0) {
                index = 0;
                return index;
              }
              return index;
            }

            while (All_Not_Done) {
              completed_processes.push(processes[index]);
              time += processes[index].bt;
              processes.splice(index, 1);
              index = adjust_index(index);
              check_all_done_scan(processes);
            }
            break;
          default:  // default right
            function find_head_index_right(processes) {
              for (let i = 0; i < processes.length; i++) {
                if (processes[i].bt >= initial_head_point) {
                  return i;
                }
              }
            }
            index = find_head_index_right(processes);
            function adjust_index_right(processes, index) {
              if (processes.length == index) {
                index--;
                return index;
              }
              return index;
            }

            while (All_Not_Done) {
              completed_processes.push(processes[index]);
              time = time + processes[index].bt;
              processes.splice(index, 1);
              index = adjust_index_right(processes, index);
              check_all_done_scan(processes);
            }
        }
        break;
      default: // c scan
        completed_processes = [];
        function check_all_done_cscan(processes) {
          if (processes.length == completed_processes.length) {
            All_Not_Done = false;
            return;
          }
          return;
        }

        switch (initial_direction) {
          case "Left": // to select left mode of simulation in c scan
            function find_head_index(processes) {
              if (processes[0].bt >= initial_head_point) {
                return 0;
              }
              for (let i = 0; i < processes.length; i++) {
                if (processes[i].bt >= initial_head_point) {
                  index = i - 1;
                  return index;
                }
              }
            }
            index = find_head_index(processes);

            while (All_Not_Done) {
              completed_processes.push(processes[index]);
              time += processes[index].bt;
              index = index - 1;
              if (index < 0) {
                index = processes.length - 1;
              }
              check_all_done_cscan(processes);
            }
            break;
          default: // default right for  c scan
            function find_head_index_right(processes) {
              for (let i = 0; i < processes.length; i++) {
                if (processes[i].bt >= initial_head_point) {
                  return i;
                }
              }
            }
            index = find_head_index_right(processes);

            while (All_Not_Done) {
              completed_processes.push(processes[index]);
              time = time + processes[index].bt;
              index = (index + 1) % processes.length;
              check_all_done_cscan(processes);
            }
        }
    }

    for (let i = 0; i < completed_processes.length; i++) {
      xAxis.push(completed_processes[i].bt);
      yAxis.push(i + 1);
    }


    // Database connection to MONGODB
    const newScan = new Scan({
      pId: pId,
      trackNum: tn,
      headPoint: headpoint,
      mode: mode,
      direction: Direction,
      xAxis: xAxis,
      yAxis: yAxis,
      completedProcess: completed_processes,
    });
    newScan.save();
    res.render("random", {
      title: "Solution",
      completed_processes: completed_processes
    });

  } else {
    res.render("scan-cScan", {
      title: "Scan / cScan",
      showMessage: true,
      message: "2 pIDs Cannot Be Same!"
    });
  }
};

exports.getAllScans = async (req, res, next) => {
  const allScans = await Scan.find({})
  const currentScan = allScans[allScans.length - 1];
  res.json({ xAxis: currentScan.xAxis, yAxis: currentScan.yAxis })
}