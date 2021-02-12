const chai = require('chai')
const expect = chai.expect
const should = chai.should
const wordlist = require('../wordlist.json')

const event = {
  Details: {
    Parameters: {
      userNumber: '+19712492786'
    }
  }
}

const vanity = require('../index')

describe('#numberToWords', () => {
  it('should return an array of length 5', () => {
    let numberToWordsTest = vanity.numberToWords(wordlist, '9712492786')
    expect(numberToWordsTest).to.have.lengthOf(5)
  })
})

describe('#handler', () => {
  it('should return an object with phone numbers', () => {
    let handlerTest
    vanity.handler(event, {}, (err, results) => {
      handlerTest = results
    })
    console.log(handlerTest)
    expect(handlerTest.vanityNumber1).to.have.lengthOf(12)
    expect(typeof handlerTest.vanityNumber1).to.equal('string')
  })
})