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

// Seems convoluted, but 
// today = new Date() yields timezone issues
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

document.getElementById("body").onload = function() {defaultToday()};

// Sets default value of calendar (#choreDate) to date page loaded
// Puts current day of week in front of date input
// Calls daysFromBase
function defaultToday() {
  document.querySelector("#choreDate").valueAsDate = today;
  document.getElementById("day-of-week").innerHTML = dayArray[today.getDay() + 1];
  return daysFromBase();
}

// Calulates days between baseDate and calendar date
function daysFromBase() {
  let calendarDate = new Date(document.getElementById("choreDate").value);
  let daysFromBase = (Math.floor((calendarDate - baseDate) / oneDay));
  console.log(daysFromBase);
  natesChores(daysFromBase);
  iansChores(daysFromBase)
  nicksChores(daysFromBase)
  return daysFromBase;
}

// Calculates day of week of changed input date to push in front of date input
// 
document.getElementById("choreDate").addEventListener("change", changed);
function changed() {
  let newCalDate = new Date(document.getElementById("choreDate").value);
//  let newYear = newCalDate.getFullYear();
//  let newMonth = newCalDate.getMonth();
//  let newDateOfMonth = newCalDate.getDate();
//  let pickedDate = new Date(newYear, newMonth, newDateOfMonth);
  document.getElementById("day-of-week").innerHTML = 
    dayArray[newCalDate.getDay() + 1]; // or would pickedDate work better?
  console.log(newCalDate.getDay());
  return daysFromBase();
}

function natesChores(daysFromBase) {
  let satChores = "";
  if (daysFromBase % 7 === 5) {
    satChores = satNN[daysFromBase % 2];
  } else {
      satChores = "";
  }
  document.getElementById("nateschores").innerHTML = 
    everyDayChores + 
    "<li>" + switchChores[daysFromBase % 3] + "</li>" +
    satChores;
}

function iansChores(daysFromBase) {
  let satChores = "";
  if (daysFromBase % 7 === 5) {
    satChores = satIan;
  } else {
      satChores = "";
  }
  document.getElementById("ianschores").innerHTML = 
    everyDayChores + 
    "<li>" + switchChores[(daysFromBase + 1) % 3] + "</li>" +
    satChores;
}

function nicksChores(daysFromBase) {
  let satChores = "";
  if (daysFromBase % 7 === 5) {
    satChores = satNN[(daysFromBase + 1) % 2];
  } else {
      satChores = "";
  }
  document.getElementById("nickschores").innerHTML = 
    everyDayChores + 
    "<li>" + switchChores[(daysFromBase + 2) % 3] + "</li>" +
    satChores;
}


/*
X  Pull date info from date input regardless of change or not

Use this to calc diff of days between base date and date in input

Use diffDays % 3 to determine chore for person on given day.

To determine Saturday chore switch for Nick or Nate, 
if diffDays % 7 === 5, then saturdayChoreArray[Math.floor(diffDays) % 2], else return null;

To determine Saturday chore switch for the other, 
if diffDays % 7 === 5, then saturdayChoreArray[(Math.floor(diffDays) + 1) % 2], else return null;

*/

// Push test I to #nateschores
// document.getElementById("nateschores").innerHTML = everyDayChores;


//Date value returned by input type="date" is format yyyy-mm-dd . Could use .split() with argument "-" to retrieve array containing [yyyy, mm, dd]


