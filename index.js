// Lambda for converting a callers phone number into possible vanity numbers
// the program saves the top 5 results to DynamoDB and returns the top 3

const wordlist = require('./wordlist.json')
const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient()

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

// Extracts a random character from an array or string
exports.getRandomChar = (array) => {
  return array.split('')[Math.floor(Math.random() * array.length)]
}

// Matches the callers phone number against all words in the english language
// and then returns the vanity numbers with the most words replaced.  It will
// do a simple substitution of random characters if less than 5 matches are
// found via the dictionary method.
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

// Receives the event from Connect, process the vanity numbers, send the resutls
// to Connect and finally saves the results to DynamoDB
exports.handler = async (event, context, callback) => {

  const callerNumber = event.Details.Parameters.userNumber.replace('+1', '')

  const vanityNumbers = exports.numberToWords(wordlist, callerNumber)

  const resultMap = {
    vanityNumber1: vanityNumbers[0],
    vanityNumber2: vanityNumbers[1],
    vanityNumber3: vanityNumbers[2]
  }
  callback(null, resultMap);

  const params = {
    TableName: 'callers',
    Item: {
      id: callerNumber,
      vanityNumbers: vanityNumbers,
      timestamp: Date.now()
    }
  }

  try {
    const data = await documentClient.put(params).promise()
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}