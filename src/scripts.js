//Imports
import dayjs from "dayjs";
var isBetween = require('dayjs/plugin/isBetween')


import './css/base.scss';
import './images/beachbackground.png'
import './images/logo.png'

import domUpdates from './domUpdates'
import apiCalls from './apiCalls'
import Traveler from './Traveler'
import Trip from './Trip'

//Global
let currentDate = dayjs().format('dddd, MMM D YYYY')
let currentTraveler;
let allDestinations;
let allTrips;


//Query Selectors
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('loginBtn')
const cardGrid = document.getElementById('cardGrid')
const allTripsBtn = document.getElementById('allTripsBtn')
const currentTripsBtn = document.getElementById('currentTripsBtn')
const upcomingTripsBtn = document.getElementById('upcomingTripsBtn')
const previousTripsBtn = document.getElementById('previousTripsBtn')
const pendingTripsBtn = document.getElementById('pendingTripsBtn')
//Booking Section
const destinationInput = document.getElementById('destinationMenu')
const startDateInput = document.getElementById('startDateMenu')
const durationInput = document.getElementById('durationInput')
const travelersInput = document.getElementById('travelersInput')
const costBtn = document.getElementById('costBtn')
const bookBtn = document.getElementById('bookBtn')
const bookingForm = document.getElementById('bookingForm')


//Event Listeners
window.addEventListener('load', retrieveAllData);
loginBtn.addEventListener('click', checkLogin)
currentTripsBtn.addEventListener('click', showCurrentTripsPage)
upcomingTripsBtn.addEventListener('click', showUpcomingTripsPage)
previousTripsBtn.addEventListener('click', showPastTripsPage)
pendingTripsBtn.addEventListener('click', showPendingTripsPage)
allTripsBtn.addEventListener('click', showAllTrips)
costBtn.addEventListener('click', estimateTripCost)
bookBtn.addEventListener('click', bookNewTrip)





function retrieveAllData() {
  apiCalls.getAllData()
    .then(data => {
      allTrips = data[1];
      allDestinations = data[2];
      retrieveSingleTraveler(44)
    })
}

function retrieveSingleTraveler(userID) {
  apiCalls.getSingleTravelerData(userID)
    .then(data => {
      currentTraveler = new Traveler(data[0])
      console.log(currentTraveler)

      createTraveler(currentTraveler);
      displayUserInfo(currentTraveler);
    })
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
    domUpdates.showErrorMessage('both')
  } else if (usernameResult === false && passwordResult === true) {
    domUpdates.showErrorMessage('username')
  } else if (usernameResult === true && passwordResult === false) {
    domUpdates.showErrorMessage('password')
  } else if (usernameResult === true && passwordResult === true) {
    retrieveSingleTraveler(userIDInput)
  }
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

//Post new trip

function checkTripInputs(newTripData) {
  if (newTripData.destinationID <= 0 || newTripData.date === '' || !newTripData.duration || !newTripData.travelers || dayjs(newTripData.date).isBefore(currentDate)) {
    return false;
  }
  return true
}

function makePostTripObject() {
  let startDate = dayjs(startDateInput.value).format('YYYY/MM/DD')
  let numberDays = parseInt(durationInput.value)
  let numberTravelers = parseInt(travelersInput.value)
  let destinationId = parseInt(destinationInput.value)
  let newTripObject = {
    'id': allTrips.length + 1,
    'userID': currentTraveler.id,
    'destinationID': destinationId,
    'travelers': numberTravelers,
    'date': startDate,
    'duration': numberDays,
    'status': 'pending',
    'suggestedActivities': []
  }
  return newTripObject
}

function estimateTripCost() {
  let newTripData = makePostTripObject()
  let newTripInstance = new Trip(newTripData)
  let checkInputs = checkTripInputs(newTripData)
  if (!checkInputs) {
    domUpdates.showErrorMessage()
  } else {
    newTripInstance.getDestinationInfo(allDestinations)
    newTripInstance.estimateTotalTripCost()
    let costString = newTripInstance.cost.toFixed(2)
    domUpdates.showCostMessage(costString)
  }
}

function bookNewTrip() {
  let newTripData = makePostTripObject()
  let newTripInstance = new Trip(newTripData)
  let checkInputs = checkTripInputs(newTripData)

  if (!checkInputs) {
    domUpdates.showErrorMessage()
  } else {
    apiCalls.postNewTrip(newTripData)
    currentTraveler.allTrips.push(newTripInstance)
    currentTraveler.pending.push(newTripInstance)
    currentTraveler.upcoming.push(newTripInstance)
    newTripInstance.getDestinationInfo(allDestinations)
    newTripInstance.estimateTotalTripCost()
    domUpdates.showBookingMessage(newTripInstance)
    domUpdates.displayTrips(currentTraveler.allTrips, cardGrid, "My Trips", allDestinations)
    bookingForm.reset()
    retrieveAllData()
  }
}





