var AWS = require("aws-sdk");
var pinpoint = new AWS.Pinpoint();

//main entry
exports.handler = (event, context, callback) => {
  console.log("Incoming Event: " + JSON.stringify(event));

  //You must have these attributes set in your Contact Flow prior to invoking lambda function
  var destinationNumber = event.Details.Parameters.phoneNumber
  var messageContent = event.Details.Parameters.message

  var params = {
    //ApplicationId must match the ID of the application you created in AWS Mobile Hub
    ApplicationId: "2cee3a2d297e4cbc9f9637a4ed7ef439",
    MessageRequest: {
      Addresses: {
        [destinationNumber]: {
          ChannelType: "SMS",
        },
      },
      MessageConfiguration: {
        SMSMessage: {
          Body: messageContent,
          MessageType: "PROMOTIONAL",
          SenderId: "AWS",
        }
      },
    }
  };

  // Send the SMS
  pinpoint.sendMessages(params, function(err, data) {
    if (err) {
      console.log(err);
      context.fail(buildResponse(false));
    } else {
      console.log("Great Success");
      callback(null, buildResponse(true, "none"));
    }
  });
};

// Return Result to Connect
function buildResponse(isSuccess) {
  if (isSuccess) {
    return {
      lambdaResult: "Success"
    };
  } else {
    return {
      lambdaResult: "Error"
    };
  }
}