const AWS = require('aws-sdk')
const SNS = new AWS.SNS()

exports.handler = async (event, context, callback) => {
  console.log(event)
  const params = {
    PhoneNumber: event.Details.Parameters.phoneNumber,
    Message: event.Details.Parameters.message
  }
  console.log('params', params)
  var publishTextPromise = new AWS.SNS({
    apiVersion: '2010-03-31'
  }).publish(params).promise();

  publishTextPromise.then(
    function(data) {
      console.log("MessageID is " + data.MessageId);
    }).catch(
    function(err) {
      console.error(err, err.stack);
    });
}