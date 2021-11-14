var dayjs = require('dayjs')
var isBetween = require('dayjs/plugin/isBetween')
dayjs().format()

import './css/base.scss';
import './images/beachbackground.png'
import './images/logo.png'

import apiCalls from './apiCalls'

console.log('This is the JavaScript entry file - your code begins here.');
let now = dayjs()
console.log(now, 'now')
console.log(now.format('MM/DD/YYYY'), 'now')
console.log(apiCalls.getAllTravelers, "script")