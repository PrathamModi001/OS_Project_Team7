let frame = 4;

let pages = new Array(frame);

const refString = [0, 1, 1, 2, 3, 4, 3, 3, 1, 0, 2];
let index = 0;
let recentIndex;
let hit = 0;
let pageFault = 0;

for (let i = 0; i < refString.length; i++) {
  if (index === frame) {
    if (doesExist(pages, refString[i])) {
      hit++;
      recentIndex = findIndex(pages, refString[i]);
      continue;
    } else {
      pageFault++;
      pages[recentIndex] = refString[i];
    }
  } else {
    if (doesExist(pages, refString[i])) {
      hit++;
      recentIndex = findIndex(pages, refString[i]);
      continue;
    } else {
      pageFault++;
      pages[index] = refString[i];
      recentIndex = index;
      index++;
    }
  }
}

function doesExist(array, element) {
  for (let j = 0; j < array.length; j++) {
    if (array[j] === element) {
      return true;
    }
  }
  return false;
}

function findIndex(array, element) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === element) {
      return i;
    }
  }
  return null;
}

console.log(pages);
console.log(hit, pageFault);
