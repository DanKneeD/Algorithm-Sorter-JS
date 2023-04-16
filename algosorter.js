// Algorithm Sorter
//
// Daniel Dousek
//
// Displays a randomized graph allowing the user to select different
// sorting algorithems and visually see how each algorithem works.
//
//Variables
//change test
//#####################################################################
var numOfLines = 0;
var sortingSpeed = 50;
var running = false;
var comparsions = 0;
var arrayaccess = 0;
var a = 0;
var b = 0;
var x = 0;
var ColCounter = 0;

const inputValues = document.querySelector("#Input");
const ObjHeights = [];
const ChangeCol = [];

let n = ObjHeights.length;

//Normal Functions
//################################################
function sizeGraph() {
  console.log(document.getElementById("BigContainer").clientWidth / 7);
  console.log(numOfLines);
  while (numOfLines + 1 <= document.getElementById("BigContainer").clientWidth / 7) {
    var div = document.createElement("div");

    div.className = "frequencyItem";
    div.id = "frequencyItem" + numOfLines;
    console.log("appened");
    $(".Sortings").append(div);

    numOfLines++;
  }

  while (numOfLines >= document.getElementById("BigContainer").clientWidth / 7) {
    numOfLines--;
    var div = document.getElementById("frequencyItem" + numOfLines);
    div.parentNode.removeChild(div);
    //div.disabled = true;
    console.log("removed");
    //$('.Sortings').remove(document.getElementById("frequencyItem"+numOfLines));
  }
}

function randomizeGraph() {
  /*while (numOfLines+1 <= document.getElementById('BigContainer').clientWidth){
        var diver = document.createElement('div');
    
        diver.className =("frequencyItem");
        diver.id =("frequencyItem"+numOfLines);
        console.log()
        //$('.Sortings').append(diver);
        
        numOfLines++;
      }
    */

  x = 0;

  $(".frequencyItem").each(function () {
    var h = Math.floor(Math.random() * numOfLines) + 30;
    $(this).css("height", h);
    $(this).css("backgroundColor", "white");
    //Objects[numOfLines] = $(this);

    ObjHeights[x] = h;
    x++;
  });
}

function lockButtin(active) {
  const buttons = document.querySelectorAll("Button");

  if (active) {
    running = true;
    buttons.forEach(function (but) {
      but.disabled = true;
      but.style.opacity = 0.5;
      but.style.setProperty("--td-background-color", "#ff0000");
      but.style.setProperty("--text-col", "#ff0000");
    });
  } else {
    running = false;
    buttons.forEach(function (but) {
      but.disabled = false;
      but.style.opacity = 1;
      but.style.setProperty("--td-background-color", "#20bf6b");
      but.style.setProperty("--text-col", "#20bf6b");
    });
  }
}

function updateValues(bool) {
  if (bool) {
    arrayaccess = 0;
    comparsions = 0;
  }

  document.getElementById("arrayNum").innerHTML = arrayaccess;
  document.getElementById("compNum").innerHTML = comparsions;
}

window.onresize = function resizedWindow() {
  if (!running) {
    sizeGraph();
    randomizeGraph();
  } else {
    setTimeout(function () {
      resizedWindow();
    }, 50);
  }
};

inputValues.addEventListener("change", (event) => {
  sortingSpeed = event.target.value;
});

//SORTING ALGORITHEMS
//########################################################################################################
function insertionSort() {
  let tempCount = 0;
  const ChangeCol = [];
  var ColCounter = 0;
  for (let i = 0; i < n; i++) {
    setTimeout(function () {
      //change starting color
      $("#frequencyItem" + (i - 1)).css("backgroundColor", "grey");
      $("#frequencyItem" + i).css("backgroundColor", "green");

      let current = ObjHeights[i];
      let j = i - 1;

      for (var x = 0; x <= ColCounter; x++) {
        $("#frequencyItem" + ChangeCol[x]).css("backgroundColor", "white");
      }

      //Find position for lower value
      while (j > -1 && current < ObjHeights[j]) {
        ObjHeights[j + 1] = ObjHeights[j];
        $("#frequencyItem" + (j + 1)).css("height", ObjHeights[j]);
        $("#frequencyItem" + j).css("backgroundColor", "red");
        ChangeCol[ColCounter] = j;
        ColCounter++;
        j--;
        comparsions++;
        arrayaccess += 4;
      }

      //put in new position
      ObjHeights[j + 1] = current;
      $("#frequencyItem" + (j + 1)).css("height", current);

      arrayaccess++;
      updateValues(false);
      //recall function

      if (i == n - 1) {
        lockButtin(false);
      }
    }, sortingSpeed * i);
  }

  for (var x = 0; x <= ColCounter; x++) {
    $("#frequencyItem" + ChangeCol[x]).css("backgroundColor", "white");
  }
}

function bubbleSort() {
  const ChangeCol = [];
  for (let z = 0; z < n; z++) {
    setTimeout(function () {
      for (var x = 0; x <= ColCounter; x++) {
        $("#frequencyItem" + ChangeCol[x]).css("backgroundColor", "white");
      }
      for (let b = 0; b < n; b++) {
        if (ObjHeights[b + 1] < ObjHeights[b]) {
          $("#frequencyItem" + (b + 1)).css("height", ObjHeights[b]);
          $("#frequencyItem" + b).css("height", ObjHeights[b + 1]);
          $("#frequencyItem" + b).css("backgroundColor", "red");

          var tempValue = ObjHeights[b];
          ObjHeights[b] = ObjHeights[b + 1];
          ObjHeights[b + 1] = tempValue;
          arrayaccess += 3;

          ChangeCol[ColCounter] = b;
          ColCounter++;
        }
        arrayaccess += 2;
        comparsions++;
        updateValues(false);
      }

      if (z == n - 1) {
        lockButtin(false);
      }
    }, sortingSpeed * z);
  }
}

function selectionSort() {
  const ChangeCol = [];
  for (let s = 0; s < n; s++) {
    setTimeout(function () {
      tempMinValuePos = s;
      tempMinValue = 0;

      for (var x = 0; x <= ColCounter; x++) {
        $("#frequencyItem" + ChangeCol[x]).css("backgroundColor", "white");
      }
      ColCounter = 0;

      for (let d = s; d < n; d++) {
        if (ObjHeights[d] < ObjHeights[tempMinValuePos]) {
          tempMinValuePos = d;
          comparsions++;
        }
        arrayaccess += 2;
      }
      tempMinValue = ObjHeights[s];
      ObjHeights[s] = ObjHeights[tempMinValuePos];
      ObjHeights[tempMinValuePos] = tempMinValue;

      arrayaccess += 3;

      updateValues(false);

      $("#frequencyItem" + s).css("height", ObjHeights[s]);
      $("#frequencyItem" + tempMinValuePos).css("height", ObjHeights[tempMinValuePos]);
      $("#frequencyItem" + tempMinValuePos).css("backgroundColor", "red");
      $("#frequencyItem" + s).css("backgroundColor", "green");

      ChangeCol[ColCounter] = tempMinValuePos;
      ColCounter++;
      ChangeCol[ColCounter] = s;

      if (s == n - 1) {
        lockButtin(false);
      }
    }, sortingSpeed * s);
  }
}

async function mergeSortHelper(arr, l, r) {
  if (l < r) {
    let m = parseInt((l + r) / 2);
    await mergeSortHelper(arr, l, m);
    await mergeSortHelper(arr, m + 1, r);
    await merge(arr, l, m, r);
  }
}

async function merge(arr, l, m, r) {
  let n1 = m - l + 1;
  let n2 = r - m;

  let L = [];
  let R = [];

  for (let i = 0; i < n1; i++) {
    L[i] = arr[l + i];
  }

  for (let j = 0; j < n2; j++) {
    R[j] = arr[m + 1 + j];
  }

  let i = 0;
  let j = 0;
  let k = l;

  while (i < n1 && j < n2) {
    $("#frequencyItem" + (l + i)).css("backgroundColor", "red");
    $("#frequencyItem" + (m + 1 + j)).css("backgroundColor", "red");

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, sortingSpeed)
    );

    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }

    $("#frequencyItem" + k).css("height", arr[k]);
    $("#frequencyItem" + (l + i - 1)).css("backgroundColor", "white");
    $("#frequencyItem" + (m + 1 + j - 1)).css("backgroundColor", "white");

    k++;
  }

  while (i < n1) {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, sortingSpeed)
    );

    arr[k] = L[i];
    $("#frequencyItem" + k).css("height", arr[k]);
    $("#frequencyItem" + (l + i)).css("backgroundColor", "white");

    i++;
    k++;
  }

  while (j < n2) {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, sortingSpeed)
    );

    arr[k] = R[j];
    $("#frequencyItem" + k).css("height", arr[k]);
    $("#frequencyItem" + (m + 1 + j)).css("backgroundColor", "white");

    j++;
    k++;
  }
}

async function mergeSort() {
  let l = 0;
  let r = ObjHeights.length - 1;
  await mergeSortHelper(ObjHeights, l, r);
  lockButtin(false);
}

//########################################################################################################

sizeGraph();
randomizeGraph();
$("#Input").val(50);

//Button Events
//##############################################################################################
document.getElementById("InsertionSort").onclick = function () {
  n = ObjHeights.length;

  updateValues(true);
  lockButtin(true);
  insertionSort(ObjHeights);
};

document.getElementById("MergeSort").onclick = function () {
  n = ObjHeights.length;

  updateValues(true);
  lockButtin(true);
  mergeSort();
};

document.getElementById("BubbleBtn").onclick = function () {
  n = ObjHeights.length;

  updateValues(true);
  lockButtin(true);
  bubbleSort();
};

document.getElementById("selectionSort").onclick = function () {
  n = ObjHeights.length;

  updateValues(true);
  lockButtin(true);
  selectionSort();
};

document.getElementById("RandomizeBtn").onclick = function () {
  sizeGraph();
  randomizeGraph();
  updateValues(true);
};
