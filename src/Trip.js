import dayjs from 'dayjs'

class Trip {
  constructor(tripsData) {
    this.id = tripsData.id;
    this.userID = tripsData.userID;
    this.destinationID = tripsData.destinationID;
    this.travelers = tripsData.travelers;
    this.date = tripsData.date;
    this.duration = tripsData.duration;
    this.status = tripsData.status;
    this.suggestedActivities = tripsData.suggestedActivities;
    this.destination;
    this.cost = 0;
    this.startDate;
    this.endDate;
  }

  getDates() {
    let start = new Date(this.date);
    let end = new Date(this.date).setDate(new Date(this.date).getDate() + this.duration);
    this.startDate = dayjs(start).format('YYYY-MM-DD');
    this.endDate = dayjs(end).format('YYYY-MM-DD');
  }

  convertDates() {
    let start = new Date(this.date);
    let end = new Date(this.date).setDate(new Date(this.date).getDate() + this.duration);

    this.startDate = dayjs(start).format('MMM D, YYYY');
    this.endDate = dayjs(end).format('MMM D, YYYY');
  }

  getDestinationInfo(destinationData) {
    return destinationData.find(destination => {
      if (this.destinationID === destination.id) {
        return this.destination = destination;
      }
    })
  }

  estimateTotalTripCost() {
    let total = 0;
    total += this.destination.estimatedLodgingCostPerDay * this.duration
    total += this.destination.estimatedFlightCostPerPerson * this.travelers
    total += total * .10
    return this.cost += parseFloat(total.toFixed(2));
  }
}

export default Trip;
