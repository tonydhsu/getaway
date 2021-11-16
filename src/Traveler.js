import dayjs from 'dayjs';
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)

import Trip from './Trip.js'





class Traveler {
  constructor(traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.type = traveler.travelerType;
    this.annualCost = 0;
    this.allTrips = [];
    this.pastTrips = [];
    this.currentTrips = [];
    this.futureTrips = [];
    this.pendingTrips = [];
  }

  returnFirstName() {
    return this.name.split(' ')[0]
  }

  getAllTrips(allTrips) {
    allTrips.forEach((trip) => {
      if (trip.userID === this.id) {
        this.allTrips.push(new Trip(trip))
      }
    });
    this.allTrips.forEach(trip => trip.getDates())
  
  }

  getPastTrips(todaysDate) {
    return this.allTrips.filter((trip) => {
      if (dayjs(trip.endDate).isBefore(todaysDate)) {
        this.pastTrips.push(trip)
      }
    })
  }

  getCurrentTrips(todaysDate) {
    return this.allTrips.filter((trip) => {
      if (dayjs(todaysDate).isBetween(trip.startDate, trip.endDate) || todaysDate === trip.startDate) {
        this.currentTrips.push(trip)
      }
    })
  }

  getFutureTrips(todaysDate) {
    return this.allTrips.filter((trip) => {
      if (dayjs(todaysDate).isBefore(trip.startDate)) {
        this.futureTrips.push(trip)
      }
    })
  }

  getPendingTrips() {
    return this.allTrips.filter((trip) => {
      if (trip.status === 'pending') {
        this.pendingTrips.push(trip)
      }
    })
  }

  calculateAnnualSpending(year = new Date().year()) {
    // let currentYear = dayjs(currentDate).getFullYear()
    let totalCost = this.allTrips.reduce((total, trip) => {
      if (dayjs(trip.startDate).year() === dayjs(year).year()) {
        total += trip.getTotalCost()
      }
      return total
      
    }, 0)
    return totalCost
  }




}

export default Traveler;