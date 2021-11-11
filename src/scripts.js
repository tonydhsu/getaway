var dayjs = require('dayjs')
dayjs().format()

import './css/base.scss';
import './images/beachbackground.png'
import './images/logo.png'

import apiCalls from './apiCalls'

console.log('This is the JavaScript entry file - your code begins here.');
let now = dayjs()

console.log(apiCalls.getAllTravelers, "script")