// Chore lists
const everyDayChores = 
      "<li>Dishwasher</li>" + 
      "<li>Clean Room & Make Bed</li>" + 
      "<li>Mom's Choice / Dad's Choice</li>";
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
       "<li>Boys' Bathroom</li> <li> Vacuum Stairs & Hall / Trash</li"
      ];

// Seems convoluted, but today = new Date() yields timezone issues
  let a = new Date();
  let aYear = a.getFullYear();
  let aMonth = a.getMonth() + 1;
    if (aMonth < 10) {
      aMonth = "0" + aMonth;
    } // Two digits is critical to negate timezone issue
  let aDateOfMonth = a.getDate();
    if (aDateOfMonth < 10) {
      aDateOfMonth = "0" + aDateOfMonth;
    } // Two digits is critical to negate timezone issue
  let aToday = aYear + "-" + aMonth + "-" + aDateOfMonth;
  let today = (new Date(aToday));

const dayArray = ["Sunday", 
                  "Monday", 
                  "Tuesday", 
                  "Wednesday", 
                  "Thursday", 
                  "Friday", 
                  "Saturday",
                  "Sunday"
                 ];
const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
const baseDate = new Date("2021-09-06"); // sets baseDate to 06 Sep 2021
let path = window.location.pathname;
let page = path.split("/").pop();

window.addEventListener('DOMContentLoaded', function() {defaultToday()});

// Sets default value of date input to today or this week's Mon for print chart
// Puts current day of week in front of date input
// Puts date in appropriate row for print chart
// Calls daysFromBase
function defaultToday() {
  if (page === "boyschores.html") {
    document.querySelector("#choredate").valueAsDate = today;
    document.getElementById("day-of-week").innerHTML = dayArray[today.getDay() + 1];
    return daysFromBase();
    } else if (page === "boyschores-for-print.html") {
      let daysFromMon = Math.floor((today - baseDate) / oneDay) % 7;
      let thisMon = new Date(today.getTime() - (daysFromMon * oneDay));
      document.querySelector("#choredate").valueAsDate = thisMon;
      let x = document.getElementById("tab01");
      let daySpan = x.getElementsByTagName("span");
      for (let i = 0; i < daySpan.length; i++) {
        daySpan[i].innerHTML = aMonth + "/" + (aDateOfMonth - daysFromMon + i);
      }
      return daysFromBase();
  } 
}

// Calulates days between baseDate and calendar date
function daysFromBase() {
  let calendarDate = new Date(document.getElementById("choredate").value);
  let daysFromBase = (Math.floor((calendarDate - baseDate) / oneDay));
  natesChores(daysFromBase);
  iansChores(daysFromBase);
  nicksChores(daysFromBase);
  return daysFromBase;
}

// Calculates day of week of changed input date to push in front of date input for single-day chart
document.getElementById("choredate").addEventListener("change", changed);
function changed() {
  let newCalDate = new Date(document.getElementById("choredate").value);
  if (page === "boyschores.html") {
    document.getElementById("day-of-week").innerHTML = 
      dayArray[newCalDate.getDay() + 1];
    return daysFromBase();
  } else if (page === "boyschores-for-print.html") {
      let daysFromNewMon = Math.floor((newCalDate - baseDate) / oneDay) % 7;
      let newMon = new Date(newCalDate.getTime() - (daysFromNewMon * oneDay));
//    let x = document.getElementById("tab01");
//    let daySpan = x.getElementsByTagName("span");
//    for (let i = 0; i < daySpan.length; i++) {
//      daySpan[i].innerHTML = aMonth + "/" + (aDateOfMonth - daysFromMon + i);
//    }

/* ******************* Working in the middle of this as of 10/13 *********************** */

    console.log((newCalDate - baseDate) / oneDay); // displays diff between new calendar date and base date (42 on 10/13)
console.log(today);
console.log(newCalDate.getDate()); // newCalDate.getDate() displayed to console 10/13 at 6:12 PM as "17" but I expected "18"

    return daysFromBase();
  }
}
 
function natesChores(daysFromBase) {
  let satChores;
  if (page === "boyschores.html") {
    if (daysFromBase % 7 === 5) {
      satChores = satNN[daysFromBase % 2];
    } else {
      satChores = "";
    }
    document.getElementById("nateschores").innerHTML = 
      everyDayChores + 
      "<li>" + switchChores[daysFromBase % 3] + "</li>" +
      satChores;
  } else if (page === "boyschores-for-print.html") {
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
  if (page === "boyschores.html") {
    if (daysFromBase % 7 === 5) {
      satChores = satIan;
    } else {
      satChores = "";
    }
  document.getElementById("ianschores").innerHTML = 
    everyDayChores + 
    "<li>" + switchChores[(daysFromBase + 1) % 3] + "</li>" +
    satChores;
  } else if (page === "boyschores-for-print.html") {
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

function nicksChores(daysFromBase) {
  let satChores;
  if (page === "boyschores.html") {
    if (daysFromBase % 7 === 5) {
      satChores = satNN[(daysFromBase + 1) % 2];
    } else {
      satChores = "";
    }
  document.getElementById("nickschores").innerHTML = 
    everyDayChores + 
    "<li>" + switchChores[(daysFromBase + 2) % 3] + "</li>" +
    satChores;
  } else if (page === "boyschores-for-print.html") {
    for (let i = 0; i < 7; i++) {
      if (i === 5) {
        satChores = satNN[daysFromBase % 2];
      } else {
        satChores = "";
      }
      document.getElementById("nick" + i).innerHTML = 
        everyDayChores + 
        "<li>" + switchChores[(daysFromBase + 2 + i) % 3] + "</li>" +
        satChores;
    }
  } else {
    window.alert("Oops! Something went wrong. The page file name does not seem to match what you expected in code.");
  }
}
