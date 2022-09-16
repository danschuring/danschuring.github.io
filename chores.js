// Chore lists
const everyDayChores = 
      "<li>Dishwasher</li>" + 
      "<li>Clean Room & Make Bed</li>" + 
      "<li>Mom’s Choice / Dad’s Choice</li>";
const switchChores = 
      ["Set / Help Cook",
       "Clear / Counters / Sweep",
       "Rinse & Load / Wash Pots & Pans"
      ];
const satIan = 
      "<li>Basement Bathroom</li>" + 
       "<li>Vacuum Basement, Stairs / Trash";
const satNN = 
      ["<li>Main Bathroom</li> <li>Vacuum Main Floor / Trash</li>",
       "<li>Upper Bathroom</li> <li> Vacuum Stairs & Hall / Trash</li"
      ];

// Sets the variable "today" at the very first moment of the day for
// calculating number of days from today in later formulas.
  let a = new Date();
  let yrToday = a.getFullYear();
  let moToday = a.getMonth();
  let dateToday = a.getDate();
  let today = new Date(yrToday, moToday, dateToday);

const dayArray = ["Sunday", 
                  "Monday", 
                  "Tuesday", 
                  "Wednesday", 
                  "Thursday", 
                  "Friday", 
                  "Saturday",
                  "Sunday"
                 ];
const msPerDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
const baseDate = new Date(2021, 8, 6); // a Monday used as a base
let path = window.location.pathname;
let page = path.split("/").pop();

window.addEventListener('DOMContentLoaded', function() {defaultToday()});

// Sets default value of date input to today, or this week's Mon for print chart
// Puts current day of week in front of date input
// Puts date in appropriate row for print chart
// Calls daysFromBase
function defaultToday() {
  if (page === "chores.html") {
    document.querySelector("#choredate").valueAsDate = today;
    document.getElementById("day-of-week").innerHTML = dayArray[today.getDay()];
    return daysFromBase();
    } else if (page === "chores-for-print.html") {
      let daysFromMon = Math.floor((today - baseDate) / msPerDay) % 7;
      let thisMon = new Date(today.getTime() - (daysFromMon * msPerDay));
      document.querySelector("#choredate").valueAsDate = thisMon;
      let x = document.getElementById("tab01");
      let daySpan = x.getElementsByTagName("span");
      for (let i = 0; i < daySpan.length; i++) {
        daySpan[i].innerHTML = (moToday + 1) + "/" + (dateToday - daysFromMon + i);
      console.log("thisMon == " + thisMon);
      }
      return daysFromBase();
  } 
}

// Calulates days between baseDate and calendar date
function daysFromBase() {
  let calendarDate = new Date(document.getElementById("choredate").value);
  let daysFromBase = (Math.floor((calendarDate - baseDate) / msPerDay));
  natesChores(daysFromBase);
  iansChores(daysFromBase);
  ashsChores(daysFromBase);
  return daysFromBase;
}

// Calculates day of week of changed input date to push in front of date input for single-day chart
document.getElementById("choredate").addEventListener("change", changed);
function changed() {
  let newCalDate = new Date(document.getElementById("choredate").value);
console.log("newCalDate == " + newCalDate);
  if (page === "chores.html") {
    document.getElementById("day-of-week").innerHTML = 
      dayArray[newCalDate.getDay() + 1];
    return daysFromBase();
  } else if (page === "chores-for-print.html") {
      let b = document.getElementById("choredate").value;
      let bYear = b.substr(0, 4);
      let bMonth = parseInt(b.substr(5, 2), 10) - 1;
      let bDate = parseInt(b.substr(8, 2), 10);
      const options = { month: 'numeric', day: 'numeric' }; // month: 'numeric', day: 'numeric'
      let x = document.getElementById("tab01");
      let daySpan = x.getElementsByTagName("span");
      for (let i = 0; i < daySpan.length; i++) {
        let bClean = new Date(bYear, bMonth, bDate + i);
        let dateToPrint = bClean.toLocaleDateString(undefined, options);
        daySpan[i].innerHTML = dateToPrint;
      }
    return daysFromBase();
  }
}
 
function natesChores(daysFromBase) {
  let satChores;
  if (page === "chores.html") {
    if (daysFromBase % 7 === 4) {
      satChores = satNN[daysFromBase % 2];
    } else {
      satChores = "";
    }
    document.getElementById("nateschores").innerHTML = 
      everyDayChores + 
      "<li>" + switchChores[daysFromBase % 3] + "</li>" +
      satChores;
  } else if (page === "chores-for-print.html") {
    for (let i = 0; i < 7; i++) {
      if (i === 5) {
        satChores = satNN[(daysFromBase + 1) % 2];
      } else {
        satChores = "";
      }
      document.getElementById("nate" + i).innerHTML = 
        everyDayChores + 
        "<li>" + switchChores[(daysFromBase + i) % 3] + "</li>" +
        satChores;
    }
  } else {
    window.alert("Oops! Something went wrong. The page file name does not seem to match what you expected in code.");
  }
}

function iansChores(daysFromBase) {
  let satChores;
  if (page === "chores.html") {
    if (daysFromBase % 7 === 4) {
      satChores = satIan;
    } else {
      satChores = "";
    }
  document.getElementById("ianschores").innerHTML = 
    everyDayChores + 
    "<li>" + switchChores[(daysFromBase + 1) % 3] + "</li>" +
    satChores;
  } else if (page === "chores-for-print.html") {
    for (let i = 0; i < 7; i++) {
      if (i === 5) {
        satChores = satIan;
      } else {
        satChores = "";
      }
      document.getElementById("ian" + i).innerHTML = 
        everyDayChores + 
        "<li>" + switchChores[(daysFromBase + 1 + i) % 3] + "</li>" +
        satChores;
    }
  } else {
    window.alert("Oops! Something went wrong. The page file name does not seem to match what you expected in code.");
  }
}

function ashsChores(daysFromBase) {
  let satChores;
  if (page === "chores.html") {
    if (daysFromBase % 7 === 4) {
      satChores = satNN[(daysFromBase + 1) % 2];
    } else {
      satChores = "";
    }
  document.getElementById("ashschores").innerHTML = 
    everyDayChores + 
    "<li>" + switchChores[(daysFromBase + 2) % 3] + "</li>" +
    satChores;
  } else if (page === "chores-for-print.html") {
    for (let i = 0; i < 7; i++) {
      if (i === 5) {
        satChores = satNN[daysFromBase % 2];
      } else {
        satChores = "";
      }
      document.getElementById("ash" + i).innerHTML = 
        everyDayChores + 
        "<li>" + switchChores[(daysFromBase + 2 + i) % 3] + "</li>" +
        satChores;
    }
  } else {
    window.alert("Oops! Something went wrong. The page file name does not seem to match what you expected in code.");
  }
}