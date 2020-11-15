const AWS = require("aws-sdk");
const axios = require("axios");
const URL = require("./config");
const today = require("./getDate");
const arnoldQuote = require("./arnoldQuotes");
const s3 = new AWS.S3();

const params = {
  Bucket: "arnold-app",
  Key: "popQuiz.json",
};

function createBody(popQuizArr, popQuizIndex) {
  return (body = {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*ANSWER Q(${popQuizArr[popQuizIndex].quizCount}): ${popQuizArr[popQuizIndex].answer}*`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${popQuizArr[popQuizIndex].answerDescription}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `:arnie: "${arnoldQuote()}"`,
        },
      },
    ],
  });
}

async function getQuizData() {
  const data = await s3.getObject(params).promise();
  const popQuizArr = JSON.parse(data.Body);
  return popQuizArr;
}

module.exports = async function () {
  const res = null;
  const data = await getQuizData();
  const popQuizIndex = data.findIndex((popQuiz) => popQuiz.date === today());
  const body = createBody(data, popQuizIndex);

  if (popQuizIndex !== -1) {
    let res = await axios({
      method: "post",
      url: URL.slackWebhook,
      data: body,
    })
      .then(function (response) {
        console.log("axios works");
        return response.body;
      })
      .catch(function (error) {
        console.log(error);
        return `Error: ticket could not be created. ${error}`;
      });
    return res;
  }

  return res;
};
