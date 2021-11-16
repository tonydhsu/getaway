import Trip from '../src/Trip';
import dayjs from 'dayjs'
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)

class Traveler {
  constructor(traveler) {
    this.id = traveler.id
    this.name = traveler.name
    this.type = traveler.travelerType;
    this.allTrips = [];
    this.annualCost = 0;
    this.past = [];
    this.present = [];
    this.upcoming = [];
    this.pending = [];
  }

  returnFirstName() {
    return this.name.split(' ')[0]
  }

  getAllTrips(allTrips) {
    allTrips.forEach(trip => {
      if (trip.userID === this.id) {
        this.allTrips.push(new Trip(trip));
      }
    });
    this.allTrips.forEach(trip => trip.getDates());
  }

  getCurrentTrips(currentDate) {
    return this.allTrips.filter(trip => {
      if (dayjs(currentDate).isBetween(trip.startDate, trip.endDate) || currentDate === trip.startDate) {
        return this.present.push(trip);
      }
    });
  }

  getUpcomingTrips(currentDate) {
    return this.allTrips.filter(trip => {
      if (dayjs(currentDate).isBefore(trip.startDate) === true) {
        return this.upcoming.push(trip)
      }
    })
  }

  getPastTrips(currentDate) {
    return this.allTrips.filter(trip => {
      if (dayjs(trip.startDate).isBefore(currentDate) === true && dayjs(trip.endDate).isBefore(currentDate)) {
        return this.past.push(trip)
      }
    })
  }

  getPendingTrips() {
    return this.allTrips.filter(trip => {
      if (trip.status === 'pending') {
        return this.pending.push(trip)
      }
    })
  }

  calculateAnnualCost(currentDate, data) {
    let currentYear = dayjs(currentDate).year();
    let tripArray = this.allTrips.filter(trip => {
      trip.getDestinationInfo(data);
      let tripYear = dayjs(trip.startDate).year();
      if (tripYear === currentYear && trip.status === 'approved') {
        return trip
      }
    })

    return tripArray.reduce((total, trip) => {
      trip.estimateTotalTripCost();
      total += trip.cost;
      return this.annualCost = total;
    }, 0);
  }
}

export default Traveler;
