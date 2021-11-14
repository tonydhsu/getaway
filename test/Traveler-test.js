const expect = require('chai').expect;

import Traveler from '../src/Traveler';
import travelersData from './sample-data/sample-travelers-data';
import tripsData from './sample-data/sample-trips-data'

describe('Traveler', function() {
  let traveler1;
  let traveler2;
  beforeEach(function() {
    traveler1 = new Traveler(travelersData[0])
    traveler2 = new Traveler(travelersData[1])
  })

  it('should be a function', function() {
    expect(Traveler).to.be.a('function')
  })
      
  it('should be an instance of Traveler', function() {
    expect(traveler1).to.be.an.instanceOf(Traveler)
  })
  
  it('should have a id', function() {
    expect(traveler1.id).to.equal(1)
    expect(traveler2.id).to.equal(2)
  })
  
  it('should have a name', function() {
    expect(traveler1.name).to.equal('Ham Leadbeater')
    expect(traveler2.name).to.equal('Rachael Vaughten')
  })
  
  it('should have a type', function() {
    expect(traveler1.type).to.equal('relaxer')
    expect(traveler2.type).to.equal('thrill-seeker')
  })
  
  it('should start with no data', function() {
    expect(traveler1.allTrips).to.deep.equal([])
    expect(traveler1.pastTrips).to.deep.equal([])
    expect(traveler1.currentTrips).to.deep.equal([])
    expect(traveler1.futureTrips).to.deep.equal([])
    expect(traveler1.pendingTrips).to.deep.equal([])
  })
  
  it('should start with 0 annual cost', function() {
    expect(traveler1.annualCost).to.equal(0)
  })
  
  it('should return the first name', function() {
    expect(traveler1.returnFirstName()).to.equal('Ham')
    expect(traveler2.returnFirstName()).to.equal('Rachael')
  })
  
  it('should return number of all trips', function() {
    traveler1.getAllTrips(tripsData)
    traveler2.getAllTrips(tripsData)
    expect(traveler1.allTrips.length).to.equal(5)
    expect(traveler2.allTrips.length).to.equal(3)
  })
  
  it('should return number of past trips', function() {
    traveler1.getAllTrips(tripsData)
    traveler1.getPastTrips('2021-11-13')
    traveler2.getAllTrips(tripsData)
    traveler2.getPastTrips('2021-11-13')

    expect(traveler1.pastTrips.length).to.equal(3)
    expect(traveler2.pastTrips.length).to.equal(2)
  })
  
  it('should return number of current trips', function() {
    traveler1.getAllTrips(tripsData)
    traveler1.getCurrentTrips('2021-11-13')
    traveler2.getAllTrips(tripsData)
    console.log(traveler1.currentTrips)
    
    expect(traveler1.currentTrips.length).to.equal(1)
  })
})
