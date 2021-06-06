const parseTime = (timestamp) => {
  return new Date(timestamp).toLocaleDateString("th-TH", {
    timeZone: "Asia/Bangkok",
    year: "2-digit",
    month: "narrow",
    day: "2-digit",
    weekday:"narrow",
    hour12:false,
    hour:"2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
};
console.log(parseTime(Date.now()));

module.exports = parseTime;