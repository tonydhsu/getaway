const expect = require('chai').expect;

import Trip from '../src/Trip';
import destinationData from './sample-data/sample-destination-data';
import tripsData from './sample-data/sample-trips-data';

describe('Trip', function() {
  let trip1;
  let trip2;

  beforeEach(function() {
    trip1 = new Trip(tripsData[0])
    trip2 = new Trip(tripsData[1])
  })

  it('should be a function', function() {
    expect(Trip).to.be.a('function')
  })
  
})