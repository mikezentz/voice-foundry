const test = require('./index.js')
const expect = require('chai').expect

const event = {
  Details: {
    Parameters: {
      userNumber: '+19712492786'
    }
  }
}

console.log(test.handler(event, {}, () => {}))