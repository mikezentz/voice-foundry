// Lambda for sending an SMS message to caller

const AWS = require("aws-sdk");
const pinpoint = new AWS.Pinpoint();

exports.handler = (event, context, callback) => {
  console.log("Incoming Event: " + JSON.stringify(event));

  const destinationNumber = event.Details.Parameters.phoneNumber
  const messageContent = event.Details.Parameters.message

  const params = {
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