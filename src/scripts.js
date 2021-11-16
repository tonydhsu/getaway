var dayjs = require('dayjs')
var isBetween = require('dayjs/plugin/isBetween')
dayjs().format()

import './css/base.scss';
import './images/beachbackground.png'
import './images/logo.png'

import domUpdates from './domUpdates'
import apiCalls from './apiCalls'
import Traveler from './Traveler'
import Trip from './Trip'

let currentDate = dayjs().format('dddd, MMM D, YYYY')
let currentTraveler;
let allDestinations;
let allTrips;

window.addEventListener('load', retrieveAllData);

// let now = dayjs()
// console.log(now, 'now')
// console.log(now.format('MM/DD/YYYY'), 'now')


function retrieveAllData() {
  apiCalls.getAllData()
    .then(data => {
      allTrips = data[1]
      allDestinations = data[2]
      // console.log(allTrips, 'trips')
      // console.log(allDestinations, 'destinaions')
    })
}

// function retrieveSingleTraveler(userID) {
//   apiCalls.getSingleTravelerData(userID)
//     .then(data => {
//       currentTraveler = new Traveler(data[0])
//       createTraveler(currentTraveler)
//       console.log(currentTraveler)
//     })
// }

// retrieveSingleTraveler(3)

// function createTraveler() {
//   currentTraveler.getAllTrips(allTrips)
//   currentTraveler.getCurrentTrips(currentDate)
// }