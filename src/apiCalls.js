const apiCalls = {

  getAllTravelers() {
    return fetch('http://localhost:3001/api/v1/travelers')
      .then(response => 
        response.json()
      )
      .then(allTravelers => {
        return allTravelers.travelers
      })
  },

  getAllTrips() {
    return fetch('http://localhost:3001/api/v1/trips')
      .then(response => 
        response.json()
      )
      .then(allTrips => {
        return allTrips.trips
      })
  },

  getAllDestinations() {
    return fetch('http://localhost:3001/api/v1/destinations')
      .then(response =>
        response.json()
      )
      .then(allDestinations => {
        return allDestinations.destinations
      })
  },

  getSingleTraveler(userID) {
    return fetch(`http://localhost:3001/api/v1/travelers/${userID}`)
      .then(response =>
        response.json()
      )
      .then(currentTraveler => {
        return currentTraveler
      })
  },

  getAllData() {
    return Promise.all([this.getAllTravelers(), this.getAllTrips(), this.getAllDestinations()])
      .then(data => data)
      .catch(err => console.log(err))
  },

  getSingleTravelerData(userID) {
    return Promise.all([this.getSingleTraveler(userID)])
      .then(data => data)
      .catch(err => console.log(err))
  }
}


export default apiCalls;