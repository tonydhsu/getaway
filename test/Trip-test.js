import chai from 'chai';
const expect = chai.expect;

import Trip from '../src/Trip';
import destinationData from './test-data/destination-data';
import tripsData from './test-data/trips-data';

describe('Trip', () => {
  let trip1;
  let trip3;

  beforeEach(() => {
    trip1 = new Trip(tripsData[0])
    trip3 = new Trip(tripsData[2])
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function')
  })

  it('should be an instance of Trip', () => {
    expect(trip1).to.be.an.instanceof(Trip)
  })

  it('should have an id', () => {
    expect(trip1.id).to.equal(1)
    expect(trip3.id).to.equal(3)
  })

  it('should have a user id', () => {
    expect(trip1.userID).to.equal(1)
    expect(trip3.userID).to.equal(3)
  })

  it('should have a destination id', () => {
    expect(trip1.destinationID).to.equal(1)
    expect(trip3.destinationID).to.equal(3)
  })

  it('should have a number of total travelers', () => {
    expect(trip1.travelers).to.equal(5)
    expect(trip3.travelers).to.equal(2)
  })

  it('should have a date', () => {
    expect(trip1.date).to.equal('2020/10/04')
    expect(trip3.date).to.equal('2020/08/24')
  })

  it('should have a trip status', () => {
    expect(trip1.status).to.equal('pending')
    expect(trip3.status).to.equal('approved')
  })

  it('should have a trip duration', () => {
    expect(trip1.duration).to.equal(18)
    expect(trip3.duration).to.equal(11)
  })

  it('should have an array of suggested activities', () => {
    expect(trip1.suggestedActivities).to.deep.equal([])
    expect(trip3.suggestedActivities).to.deep.equal(['Shopping', 'Hiking'])
  })

  it('should start off as undefined', () => {
    expect(trip1.destination).to.equal(undefined)
    expect(trip1.startDate).to.equal(undefined)
    expect(trip1.endDate).to.equal(undefined)
  })


  it('should start off with 0 cost', () => {
    expect(trip1.cost).to.equal(0)
  })


  it('should be able to retrieve destination', () => {
    trip1.getDestinationInfo(destinationData)
    expect(trip1.destination).to.deep.equal(
      {
        "id": 1,
        "destination": "Lima, Peru",
        "estimatedLodgingCostPerDay": 70,
        "estimatedFlightCostPerPerson": 400,
        "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        "alt": "overview of city buildings with a clear sky"
      })
    trip3.getDestinationInfo(destinationData)
    expect(trip3.destination).to.eql(
      {
        "id": 3,
        "destination": "Sydney, Austrailia",
        "estimatedLodgingCostPerDay": 130,
        "estimatedFlightCostPerPerson": 950,
        "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "opera house and city buildings on the water with boats"
      })  

  })

  it('should be able to retrieve start and end date of the trip in YYYY-MM-DD format', () => {
    trip1.getDates();
    trip3.getDates();
    expect(trip1.startDate).to.equal('2020-10-04')
    expect(trip1.endDate).to.equal('2020-10-22')
    expect(trip3.startDate).to.equal('2020-08-24')
    expect(trip3.endDate).to.equal('2020-09-04')
  })

  it('should be able to format dates into MMMM D, YYYY format', () => {
    trip1.convertDates();
    trip3.convertDates();
    expect(trip1.startDate).to.equal('October 4, 2020')
    expect(trip1.endDate).to.equal('October 22, 2020')
    expect(trip3.startDate).to.equal('August 24, 2020')
    expect(trip3.endDate).to.equal('September 4, 2020')
  })

  it('should be able to calculate the total amount of the trip', () => {
    trip1.getDestinationInfo(destinationData)
    trip3.getDestinationInfo(destinationData)
    trip1.estimateTotalTripCost();
    trip3.estimateTotalTripCost();
    console.log(trip1.cost)
    expect(trip1.cost).to.equal(3586);
    expect(trip3.cost).to.equal(3663);
  })

})