const chai = require('chai')
const expect = chai.expect
const should = chai.should
const wordlist = require('../wordlist.json')

const vanity = require('../index')

const testEvent = {
  Details: {
    Parameters: {
      userNumber: '+19712492786'
    }
  }
}

describe('getRandomChar', () => {
  it('should return a random char from any given string', () => {
    let randomChar = vanity.getRandomChar('abc')
    console.log(randomChar)
    expect(randomChar).to.have.lengthOf(1)
  })
})

describe('#numberToWords', () => {
  it('should return an array of length 5', () => {
    let numberToWordsTest = vanity.numberToWords(wordlist, '5029190071')
    console.log(numberToWordsTest)
    expect(numberToWordsTest).to.have.lengthOf(5)
  })
})

describe('#handler', () => {
  it('should return an object with phone numbers', () => {
    let handlerTest
    vanity.handler(testEvent, {}, (err, results) => {
      console.log(results)
      handlerTest = results
    })
    console.log(handlerTest)
    expect(handlerTest.vanityNumber1).to.have.lengthOf(12)
    expect(typeof handlerTest.vanityNumber1).to.equal('string')
  })
})