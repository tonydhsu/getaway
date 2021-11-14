const expect = require('chai').expect;

import Trip from '../src/Trip';
import destinationData from './sample-data/sample-destination-data';
import tripsData from './sample-data/sample-trips-data';

describe('Trip', function() {
  let trip1;
  let trip2;

  beforeEach(function() {
    trip1 = new Trip(tripsData[0]);
    trip2 = new Trip(tripsData[1]);
  })

  it('should be a function', function() {
    expect(Trip).to.be.a('function')
  })

  it('should be an instance of Trip', function() {
    expect(trip1).to.be.an.instanceOf(Trip)
  })

  it('should have an id', function() {
    expect(trip1.id).to.equal(1)
    expect(trip2.id).to.equal(2)
  })

  it('should have a user ID', function() {
    expect(trip1.userID).to.equal(1)
    expect(trip2.userID).to.equal(2)
  })

  it('should have a destination ID', function() {
    expect(trip1.destinationID).to.equal(49)
    expect(trip2.destinationID).to.equal(25)
  })

  it('should have number of travelers', function() {
    expect(trip1.travelers).to.equal(1)
    expect(trip2.travelers).to.equal(5)
  })

  it('should have a date', function() {
    expect(trip1.date).to.equal('2021/09/16')
    expect(trip2.date).to.equal('2021/10/04')
  })
  
  it('should have a duration', function() {
    expect(trip1.duration).to.equal(8)
    expect(trip2.duration).to.equal(18)
  })

  it('should have a status', function() {
    expect(trip1.status).to.equal('approved')
  })

  it('should have suggested activites', function() {
    expect(trip1.suggestedActivities).to.deep.equal([])
    expect(trip2.suggestedActivities).to.deep.equal(['fishing', 'shopping'])
  })

  it('destination should be undefined by default', function() {
    expect(trip1.destination).to.equal(undefined)
  })

  it('dates should be undefined by default', function() {
    expect(trip1.startDate).to.equal(undefined)
    expect(trip1.endDate).to.equal(undefined)
  })

  it('should start at 0 cost', function() {
    expect(trip1.cost).to.equal(0)
  })

  it('should get start and end dates of trip in YYYY-MM-DD format', function() {
    trip1.getDates()
    trip2.getDates()

    expect(trip1.startDate).to.equal('2021-09-16')
    expect(trip1.endDate).to.equal('2021-09-24')
    expect(trip2.startDate).to.equal('2021-10-04')
    expect(trip2.endDate).to.equal('2021-10-22')
  })

  it('should display date as MONTH D, YEAR format', function() {
    trip1.convertDates()

    expect(trip1.startDate).to.equal('September 16, 2021')
    expect(trip1.endDate).to.equal('September 24, 2021')
  })

  it('should return destination details', function() {
    trip1.getDestination(destinationData)
    expect(trip1.destination).to.deep.equal(
      {
        "id": 1,
        "destination": "Lima, Peru",
        "estimatedFlightCostPerPerson": 400,
        "estimatedLodgingCostPerDay": 70,
        "image": "https://images.unsplash.cphoto-1489171084589-9b5031ebcf9b?      ixlib=rb-1.2ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        "alt": "overview of city buildings with a clear sky"
      }
    )
  })


})