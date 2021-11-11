import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/Traveler';
import travelersData from './sample-data/sample-travelers-data';

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

})
