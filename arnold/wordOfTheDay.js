const AWS = require("aws-sdk");
const axios = require("axios");
const URL = require("./config");
const today = require("./getDate");
const s3 = new AWS.S3();

const params = {
  Bucket: "arnold-app",
  Key: "wordOfTheDay.json",
};

function createBody(wordOfTheDay, WordOfTheDayIndex) {
  return (body = {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*WORD OF THE DAY: ${wordOfTheDay[WordOfTheDayIndex].word}*`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${wordOfTheDay[WordOfTheDayIndex].definition}`,
        },
      },
    ],
  });
}

async function getQuizData() {
  const data = await s3.getObject(params).promise();
  const wordOfTheDayArr = JSON.parse(data.Body);
  return wordOfTheDayArr;
}

module.exports = async function () {
  const res = null;
  const data = await getQuizData();
  const WordOfTheDayIndex = data.findIndex((wod) => wod.date === today());
  const body = createBody(data, WordOfTheDayIndex);

  if (WordOfTheDayIndex !== -1) {
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
        return `Error: ${error}`;
      });

    return res;
  }

  return res;
};
