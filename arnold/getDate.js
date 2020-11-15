const today = new Date();
const date = today.toLocaleDateString("en-GB", {
  timeZone: "Australia/Melbourne",
});

module.exports = function () {
  return date;
};
