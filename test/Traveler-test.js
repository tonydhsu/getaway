import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/Traveler';
import destinationData from './test-data/destination-data';
import travelersData from './test-data/travelers-data';
import tripsData from './test-data/trips-data';

describe('Traveler', () => {
  let traveler1; 
  let traveler3;
  beforeEach(() => {
    traveler1 = new Traveler(travelersData[0]);
    traveler3 = new Traveler(travelersData[2]);
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function')
  })

  it('should be an instance of Trip', () => {
    expect(traveler1).to.be.an.instanceof(Traveler)
  })

  it('should have an id', () => {
    expect(traveler1.id).to.equal(1)
    expect(traveler3.id).to.equal(3)
  })

  it('should have a name', () => {
    expect(traveler1.name).to.equal('Ham Leadbeater')
    expect(traveler3.name).to.equal('Sibby Dawidowitsch')
  })

  it('should have a type', () => {
    expect(traveler1.type).to.equal('relaxer')
    expect(traveler3.type).to.equal('shopper')
  })

  it('should start off with no data by default', ()=> {
    expect(traveler1.allTrips).to.deep.equal([])
    expect(traveler1.past).to.deep.equal([])
    expect(traveler1.present).to.deep.equal([])
    expect(traveler1.upcoming).to.deep.equal([])
    expect(traveler1.pending).to.deep.equal([])
  })

  it('should start off with 0 annual cost as default', ()=> {
    expect(traveler1.annualCost).to.equal(0)
  })

  it('should return the travelers first name', () => {
    expect(traveler1.returnFirstName()).to.equal('Ham')
    expect(traveler3.returnFirstName()).to.equal('Sibby')
  })

  it('should have list of the travelers trips', () => {
    traveler1.getAllTrips(tripsData);
    expect(traveler1.allTrips.length).to.equal(2);

    traveler3.getAllTrips(tripsData);
    expect(traveler3.allTrips.length).to.equal(3);
  })

  it('should have list of the travelers past trips', () => {
    traveler1.getAllTrips(tripsData);
    traveler1.getPastTrips('2021-11-13')
    expect(traveler1.past.length).to.equal(2)


    traveler3.getAllTrips(tripsData);
    traveler3.getPastTrips('2021-11-13')
    expect(traveler3.past.length).to.equal(3)
  })

  it('should have list of the travelers current trips', () => {
    traveler1.getAllTrips(tripsData);
    traveler1.getCurrentTrips('2020-10-25');
    expect(traveler1.present.length).to.equal(0)

    traveler3.getAllTrips(tripsData);
    traveler3.getCurrentTrips("2020-09-20");
    expect(traveler3.present.length).to.equal(1)
  })

  

  it('should have list of the travelers upcoming trips', () => {
    traveler1.getAllTrips(tripsData);
    traveler1.getUpcomingTrips('2020-01-01')
    expect(traveler1.upcoming.length).to.equal(2)


    traveler3.getAllTrips(tripsData);
    traveler3.getUpcomingTrips('2020-09-18')
    expect(traveler3.upcoming.length).to.equal(1)
  })

  it('should have list of the travelers pending trips', () => {
    traveler1.getAllTrips(tripsData);
    traveler1.getPendingTrips();
    expect(traveler1.pending.length).to.equal(1)

    traveler3.getAllTrips(tripsData);
    traveler3.getPendingTrips();
    expect(traveler3.pending.length).to.equal(2)
  })

  it('should calculate the total amount the traveler spent yearly', () => {
    traveler1.getAllTrips(tripsData);
    traveler1.calcAnnualSpending('2020-09-18', destinationData)
    expect(traveler1.annualCost).to.equal(2882)

    traveler3.getAllTrips(tripsData);
    traveler3.calcAnnualSpending('2020-09-18', destinationData)
    expect(traveler3.annualCost).to.equal(3663)
  })
})