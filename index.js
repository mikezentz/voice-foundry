const wordlist = require('./wordlist.json')
const aws = require('aws-sdk')
const documentClient = new aws.DynamoDB.DocumentClient()

exports.handler = async (event, context, callback) => {

  const callernumber = event.Details.Parameters.userNumber.replace('+1', '')

  //AWS Connect Inbound Number 21F-EEL-S177, 213-335-7177

  const numberToWords = (wordlist, userPhoneNumber) => {
    const vanityNumbers = []
    for (const word in wordlist) {
      if (userPhoneNumber.includes(wordlist[word].number)) {
        const vanityNumber = userPhoneNumber.replace(wordlist[word].number, wordlist[word].word.toUpperCase())
        const formattedVanityNumber = vanityNumber.slice(0, 3) + '-' + vanityNumber.slice(3, 6) + '-' + vanityNumber.slice(6, 10)
        vanityNumbers.push(formattedVanityNumber)
      }
    }
    return (vanityNumbers.slice(0, 5))
  }

  const vanityNumbers = numberToWords(wordlist, callernumber)

  const resultMap = {
    vanityNumber1: vanityNumbers[0],
    vanityNumber2: vanityNumbers[1],
    vanityNumber3: vanityNumbers[2]

  }

  callback(null, resultMap);

};