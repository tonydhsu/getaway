import dayjs from "dayjs";
var isBetween = require('dayjs/plugin/isBetween')


let domUpdates = {

  changePageView(date) {
    const loginPage = document.getElementById('loginPage');
    const mainPage = document.getElementById('mainPage');
    const currentDate = document.getElementById('currentDate');
    loginPage.classList.add('hidden');
    mainPage.classList.remove('hidden');
    currentDate.innerHTML += `${date}`;
  },

  welcomeUserName(user) {
    const usernameDisplay = document.getElementById('usernameDisplay');
    const firstName = user.returnFirstName();
    usernameDisplay.innerText = `${firstName}!`;
  },





export default domUpdates


