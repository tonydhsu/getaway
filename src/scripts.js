//Imports
import dayjs from "dayjs";
var isBetween = require('dayjs/plugin/isBetween')
dayjs().format()

import './css/base.scss';
import './images/beachbackground.png'
import './images/logo.png'

import domUpdates from './domUpdates'
import apiCalls from './apiCalls'
import Traveler from './Traveler'
import Trip from './Trip'

//Global
let currentDate = dayjs().format('dddd, MMM D, YYYY')
let currentTraveler;
let allDestinations;
let allTrips;


//Query Selectors
const usernameInput = document.getElementById('usernameInput')
const passwordInput = document.getElementById('passwordInput')
//Event Listeners
window.addEventListener('load', retrieveAllData);
// retrieveSingleTraveler(1)



function retrieveAllData() {
  apiCalls.getAllData()
    .then(data => {
      allTrips = data[1];
      allDestinations = data[2];

    })
}

function retrieveSingleTraveler(userID) {
  apiCalls.getSingleTravelerData(userID)
    .then(data => {
      currentTraveler = new Traveler(data[0])
      createTraveler(currentTraveler);
      displayUserInfo(currentTraveler);
    })
}

function checkUsernameInput(numbers) {
  if ((numbers === undefined) ||
    (numbers === '0') ||
    (numbers === '00') ||
    (parseInt(numbers) > 50)) {
    return false
  } else {
    return true
  }
}

function checkPasswordInput(passwordValue) {
  if (passwordValue !== 'travel') {
    return false
  } else {
    return true
  }
}

function checkLogin(event) {
  const usernameValue = usernameInput.value
  const passwordValue = passwordInput.value
  const splitName = usernameValue.split('')
  const numbers = splitName.slice(8, 10).join('')
  const userIDInput = parseInt(numbers)

  let usernameResult = checkUsernameInput(numbers);
  let passwordResult = checkPasswordInput(passwordValue);

  event.preventDefault();
  if (usernameResult === false && passwordResult === false) {
    domUpdates.buildLoginErrorMessage('both')
  } else if (usernameResult === false && passwordResult === true) {
    domUpdates.buildLoginErrorMessage('username')
  } else if (usernameResult === true && passwordResult === false) {
    domUpdates.buildLoginErrorMessage('password')
  } else if (usernameResult === true && passwordResult === true) {
    retrieveSingleTraveler(userIDInput)
  }
}

function createTraveler() {
  currentTraveler.getAllTrips(allTrips);
  currentTraveler.getCurrentTrips(currentDate)
  currentTraveler.getUpcomingTrips(currentDate)
  currentTraveler.getPastTrips(currentDate)
  currentTraveler.getPendingTrips()
}

function displayUserInfo(traveler) {
  domUpdates.changePageView(currentDate);
  domUpdates.welcomeUserName(traveler);
  domUpdates.makeDestinationSelections(allDestinations);
  domUpdates.displayAnnualCosts(traveler.calcAnnualSpending(currentDate, allDestinations));
  domUpdates.displayTrips(currentTraveler.allTrips, cardGrid, "My Trips", allDestinations)
}

function showCurrentTripsPage() {
  domUpdates.displayTrips(currentTraveler.present, cardGrid, "My Current Trips", allDestinations)
}

function showUpcomingTripsPage() {
  domUpdates.displayTrips(currentTraveler.upcoming, cardGrid, "My Upcoming Trips", allDestinations)
}

function showPastTripsPage() {
  domUpdates.displayTrips(currentTraveler.past, cardGrid, "My Past Trips", allDestinations)
}

function showPendingTripsPage() {
  domUpdates.displayTrips(currentTraveler.pending, cardGrid, "My Pending Trips", allDestinations)
}

function showAllTrips() {
  domUpdates.displayTrips(currentTraveler.allTrips, cardGrid, "My Trips", allDestinations)
}



// function checkUsernameInput(number) {
//   if ((!number) || 
//   (number === '0') || 
//   (number === '00') ||
//   (parseInt(number) > 50)) {
//     return false 
//   } else {
//     return true
//   }
// }

// function checkPasswordInput(password) {
//   if (password !== 'travel') {
//     return false 
//   } else {
//     return true
//   }
// }

// function checkLogin(event) {
//   const usernameValue = usernameInput.value;
//   const passwordValue = passwordInput.value;
//   const splitName = usernameValue.split('');
//   const number = splitName.slice(8, 10).join('')
//   const userIDInput = parseInt(number)

//   let usernameResult = checkUsernameInput(number)
//   let passwordResult = checkPasswordInput(passwordValue)
//   event.preventDefault()
//   if (usernameResult === false && passwordResult === false) {
//     domUpdates.displayLoginErrorMsg('both')
//   } else if (usernameResult === false && passwordResult === true) {
//     domUpdates.displayLoginErrorMsg('username')
//   } else if (usernameResult === true && passwordResult === false) {
//     domUpdates.displayLoginErrorMsg('password')
//   } else if (usernameResult === true && passwordResult === true) {
//     retrieveSingleTraveler(userIDInput)
//   }
  
// }



function displayUserInfo(traveler) {
  domUpdates.changePageView(currentDate)
  domUpdates.welcomeUser(traveler)
  domUpdates.makeDestinationSelections(allDestinations)
  domUpdates.displayAnnualCost(traveler.calculateAnnualSpending(dayjs(currentDate).year()))
  domUpdates.displayTrips(currentTraveler.allTrips, cardGrid, "My Trips", allDestinations)
}

// function showCurrentTripsPage() {
// //   domUpdates.displayTrips(currentTraveler.present, cardGrid, "My Current Trips", allDestinations)
// // }

// function showUpcomingTripsPage() {
//   domUpdates.displayTrips(currentTraveler.upcoming, cardGrid, "My Upcoming Trips", allDestinations)
// }

// function showPastTripsPage() {
//   domUpdates.displayTrips(currentTraveler.past, cardGrid, "My Past Trips", allDestinations)
// }

// function showPendingTripsPage() {
//   domUpdates.displayTrips(currentTraveler.pending, cardGrid, "My Pending Trips", allDestinations)
// }

// function showAllTrips() {
//   domUpdates.displayTrips(currentTraveler.allTrips, cardGrid, "My Trips", allDestinations)
// }

