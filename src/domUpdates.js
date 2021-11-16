import dayjs from "dayjs";
var isBetween = require('dayjs/plugin/isBetween')


let domUpdates = {

  changePageView(date) {
    const loginPage = document.getElementById('loginPage');
    const mainPage = document.getElementById('mainPage');
    const currentDate = document.getElementById('currentDate');
    loginPage.classList.add('hidden');
    mainPage.classList.remove('hidden');
    currentDate.innerHTML = `${date}`;
  },

  welcomeUserName(user) {
    const usernameDisplay = document.getElementById('usernameDisplay');
    const firstName = user.returnFirstName();
    usernameDisplay.innerText = `${firstName}!`;
  },

  makeDestinationSelections(allDestinations) {
    let destinationInput = document.getElementById("destinationMenu");

    allDestinations.sort((a, b) => a.destination.localeCompare(b.destination))

    allDestinations.forEach(destination => {
      destinationInput.innerHTML += `<option value="${destination.id}">${destination.destination}</option>`;
    })
  },

  displayAnnualCosts(totalCost) {
    const totalSpentDisplay = document.getElementById('totalSpentDisplay');
    totalSpentDisplay.innerText = `$${totalCost.toFixed(2)} Spent this year`;
  },

  displayTrips(trips, tripCardsSection, bannerMessage, allDestinations) {
    this.displayTripCardsBanner(trips, tripCardsSection, bannerMessage, allDestinations)
  },

  displayTripCardsBanner(trips, tripCardsSection, bannerMessage, allDestinations) {
    let banner = document.getElementById('mainBanner');
    if (trips.length === 0) {
      tripCardsSection.innerHTML = ``
      banner.innerHTML =
        `<h2>No Trips Found</h2>`
    } else {
      banner.innerHTML =
        `<h2>${bannerMessage}</h2>`
      this.displayTripCards(trips, tripCardsSection, allDestinations)
    }
  },

  displayTripCards(trips, tripCardsSection, allDestinations) {
    tripCardsSection.innerHTML = ``
    let sortedTrips = trips.sort((a, b) => (dayjs(b.date).isAfter(dayjs(a.date)) ? 1 : -1))

    sortedTrips.forEach(trip => {
      trip.convertDates();
      trip.getDestinationInfo(allDestinations);
      tripCardsSection.innerHTML +=
        `<article class="card">
            <section class="card-top" aria-label="[photograph of ${trip.destination.destination}]" style="background-image: url(${trip.destination.image})">
            </section>
            <section class="card-bottom">
            <h2 id="destination">${trip.destination.destination}</h2>
              <div class="trip-info">
                <h3>Start Date:</h3>
                <h2 id="startDate">${trip.startDate}</h2>
              </div>
              <div class="trip-info">
                <h3>Duration:</h3>
                <h2 id="duration">${trip.duration} days</h2>
              </div>
              <div class="trip-info">
                <h3>Travelers:</h3>
                <h2 id="travelers">${trip.travelers}</h2>
              </div>
              <div class="trip-info">
                <h3>Trip Status:</h3>
                <h2 id="tripStatus">${trip.status}</h2>
              </div>
            </section>
          </article>`;
    })
  },

  showBookingMessage(newTrip) {
    const bookingMessage = document.getElementById('bookingMsg');
    let place = newTrip.destination;
    let costString = newTrip.cost.toFixed(2).toString();
    bookingMessage.innerHTML = `Your trip to ${place.destination} for $${costString} has been booked!`;
  },

  showCostMessage(cost) {
    const bookingMessage = document.getElementById('bookingMsg');
    bookingMessage.innerHTML = `$${cost}`
  },

  showErrorMessage() {
    const bookingMessage = document.getElementById('bookingMsg');
    bookingMessage.innerHTML = `**Please fill out all fields**`
  },

  showLoginErrorMessage(type) {
    const loginError = document.getElementById('loginError');
    if (type === 'password') {
      loginError.innerText = `**Incorrect password**`
    } else if (type === 'username') {
      loginError.innerText = `**Incorrect username**`
    } 
  }

  
}

export default domUpdates


