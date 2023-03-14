exports.getScan = (req, res, next) => {
  res.render("scan-cScan", {
    title: "Scan / cScan",
  });
};

exports.postScan = (req, res, next) => {
  let pId = req.body.pId;
  let tn = req.body.tn;
  let headpoint = req.body.headpoint;
  let Mode = req.body.mode;
  let Direction = req.body.direction;

  /*
WARNING
add a constraint to headpoint that it can not be greater than any track number

OUTPUT
sequence from completed_processes array
graph X-axis->BT Y-axis-> numbers (0-completed_processes.length) => x values from complete_processes[i].bt & y values equal to i+1(i+1 because loops starts from 0) (creating new arrays xAxis and yAxis)
*/

  let processes = [];
  let completed_processes = [];
  let time = 0;
  let All_Not_Done = true;
  let index = 0;
  let processIdArr = pId;
  let BT = tn;

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

  //   let A = new process(13, "A", 1);
  //   processes.push(A);

  //   let B = new process(191, "B", 2);
  //   processes.push(B);

  //   let C = new process(35, "C", 3);
  //   processes.push(C);

  //   let D = new process(111, "D", 4);
  //   processes.push(D);

  //   let E = new process(163, "E", 5);
  //   processes.push(E);

  //   let F = new process(163, "F", 6);
  //   processes.push(F);

  //   let G = new process(176, "G", 7);
  //   processes.push(G);

  //   let H = new process(105, "H", 8);
  //   processes.push(H);

  //   let I = new process(62, "I", 9);
  //   processes.push(I);

  //   let J = new process(185, "J", 10);
  //   processes.push(J);

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

  console.log(completed_processes);
  console.log(xAxis);
  console.log(yAxis);

  //   res.redirect("/");
};
