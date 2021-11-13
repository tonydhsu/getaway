import dayjs from 'dayjs';
import Trip from './Trip.js'

// var isBetween = require('dayjs/plugin/isBetween')
// dayjs.extend(isBetween)



class Traveler {
  constructor(traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.type = traveler.travelerType;
    this.annualCost = 0;
    this.allTrips = [];
    this.pastTrips = [];
    this.presentTrips = [];
    this.futureTrips = [];
    this.pendingTrips = [];
  }

  returnFirstName() {
    return this.name.split(' ')[0]
  }

  getAllTrips(allTrips) {
    allTrips.forEach((trip) => {
      if (trip.userID === this.id) {
        this.allTrips.push(trip)
      }
    })
    this.allTrips.forEach((trip) => {
      trip.getDates()
    })
  }

  getPastTrips(currentDate) {
    return this.allTrips.filter((trip) => {
      if (dayjs(trip.endDate).isBefore(currentDate)) {
        return this.pastTrips.push(trip)
      }
    })
  }

  


}

export default Traveler;