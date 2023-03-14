const Scan = require("../models/scan-cScan");

exports.getScan = (req, res, next) => {
  res.render("scan-cScan", {
    title: "Scan / cScan",
  });
};

exports.postScan = (req, res, next) => {
  let pId = req.body.pId;
  let tn = req.body.tn;
  let headpoint = parseInt(req.body.headpoint);
  let Mode = req.body.mode;
  let Direction = req.body.direction;
  let flag = 1

  /*
WARNING
add a constraint to headpoint that it can not be greater than any track number

OUTPUT
sequence from completed_processes array
graph X-axis->BT Y-axis-> numbers (0-completed_processes.length) => x values from complete_processes[i].bt & y values equal to i+1(i+1 because loops starts from 0) (creating new arrays xAxis and yAxis)
*/

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

    console.log(processes);

    processes.sort(function (a, b) {
      return a.bt - b.bt;
    });

    switch (mode) {
      case "scan":
        completed_processes = [];
        function check_all_done_scan(processes) {
          if (processes.length == 0) {
            All_Not_Done = false;
            return;
          }
          return;
        }

        switch (initial_direction) {
          case "Left":
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
          default:
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
      default:
        completed_processes = [];
        function check_all_done_cscan(processes) {
          if (processes.length == completed_processes.length) {
            All_Not_Done = false;
            return;
          }
          return;
        }

        switch (initial_direction) {
          case "Left":
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
          default:
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

    // pId , tn , headpoint , mode , direction , xaxis , yaxis , completedProcess
    // xAxis yAxis Completed Process all objects
    // pId tn Object
    // headpoint mode Direction string
    //   res.redirect("/");
  } else {
    res.redirect("/");
  }
};