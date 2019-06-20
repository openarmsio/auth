let log = require('ololog')
let moment = require('moment-timezone')

function dateTimeString () {
  let d = new Date()
  let myTimezone = 'America/Toronto'
  let myDatetimeFormat = 'YYYY-MM-DD hh:mm:ss a z'
  let myDatetimeString = '[' + moment(d).tz(myTimezone).format(myDatetimeFormat) + ']'
  return myDatetimeString
}

module.exports = {
  dateTimeString: dateTimeString
}
