const test = require('./index.js')

const event = {
  Details: {
    Parameters: {
      userNumber: '+19712492786'
    }
  }
}

console.log(test.handler(event, {}, () => {}))