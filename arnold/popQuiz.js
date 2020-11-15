const AWS = require("aws-sdk");
const axios = require("axios");
const URL = require("./config");
const today = require("./getDate");
const s3 = new AWS.S3();

const emojiOptions = [
  ":exploding_head:",
  ":space_invader:",
  ":skull_and_crossbones:",
  ":man-facepalming:",
];

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
          text: `*POP QUIZ: ${popQuizArr[popQuizIndex].quizCount}*`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${popQuizArr[popQuizIndex].question}?`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${emojiOptions[0]}: ${popQuizArr[popQuizIndex].answerOptions[0]}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${emojiOptions[1]}: ${popQuizArr[popQuizIndex].answerOptions[1]}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${emojiOptions[2]}: ${popQuizArr[popQuizIndex].answerOptions[2]}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${emojiOptions[3]}: ${popQuizArr[popQuizIndex].answerOptions[3]}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: " ",
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
