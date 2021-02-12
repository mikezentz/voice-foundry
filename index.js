const wordlist = require('./wordlist.json')
const aws = require('aws-sdk')
const documentClient = new aws.DynamoDB.DocumentClient()

const dialpadMap = {
  '2': 'ABC',
  '3': 'DEF',
  '4': 'GHI',
  '5': 'JKL',
  '6': 'MNO',
  '7': 'PQRS',
  '8': 'TUV',
  '9': 'WXYZ'
}

exports.getRandomChar = (array) => {
  return array.split('')[Math.floor(Math.random() * array.length)]
}

exports.numberToWords = (wordlist, userPhoneNumber) => {
  const vanityNumbers = []
  for (const word in wordlist) {
    if (userPhoneNumber.includes(wordlist[word].number)) {
      const vanityNumber = userPhoneNumber.replace(wordlist[word].number, wordlist[word].word.toUpperCase())
      const formattedVanityNumber = vanityNumber.slice(0, 3) + '-' + vanityNumber.slice(3, 6) + '-' + vanityNumber.slice(6, 10)
      vanityNumbers.push(formattedVanityNumber)
    }
  }

  while (vanityNumbers.length < 5) {
    let randomNumber = exports.getRandomChar(userPhoneNumber)
    if (randomNumber != '0' && randomNumber != '1') {
      let newNumber = userPhoneNumber.replace(randomNumber, exports.getRandomChar(dialpadMap[randomNumber]))

      if (!vanityNumbers.includes(newNumber)) {
        vanityNumbers.push(newNumber)
      }
    }

  }
  return (vanityNumbers.slice(0, 5))
}

exports.handler = async (event, context, callback) => {

  const callernumber = event.Details.Parameters.userNumber.replace('+1', '')

  const vanityNumbers = exports.numberToWords(wordlist, callernumber)

  const resultMap = {
    vanityNumber1: vanityNumbers[0],
    vanityNumber2: vanityNumbers[1],
    vanityNumber3: vanityNumbers[2]

  }

  callback(null, resultMap);

};