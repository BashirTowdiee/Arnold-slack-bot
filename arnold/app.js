const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWSRegion });
const config = require("./config");
const wordOfTheDay = require("./wordOfTheDay");
const popQuiz = require("./popQuiz");
const popQuizAnswer = require("./popQuizAnswer");

exports.lambdaHandler = async () => {
  let success = await initializeConfig();
  if (!success) {
    return "Couldn't get config";
  } else {
    try {
      let date = new Date();
      let hour = date.getHours();

      console.log('Lambda activated');
      console.log('hour', hour);
      if (hour === 0) {
        console.log('Lambda run wordOfTheDay');
        return wordOfTheDay();
      } else if (hour === 1) {
        console.log('Lambda run popQuiz');
        return popQuiz();
      } else if (hour === 3) {
        console.log('Lambda run popQuizAnswer');
        return popQuizAnswer();
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }
};

const initializeConfig = async () => {
  let ssm = new AWS.SSM();
  let success = true;

  let webhook = {
    Name: "/arnold/slack-webhook",
    WithDecryption: true,
  };
  try {
    let res = await ssm.getParameter(webhook).promise();
    config.setSlackWebhook(res.Parameter.Value);
  } catch (error) {
    console.log(`Couldn't get ${webhook.Name} ${error}`);
    success = false;
  }
  return success;
};
