class Traveler {
  constructor(traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.type = traveler.type;
    this.allTrips = [];
    this.annualCost = 0;
    this.pastTrips = [];
    this.presentTrips = [];
    this.futureTrips = [];
    this.pendingTrips = [];
  }
}

export default Traveler;