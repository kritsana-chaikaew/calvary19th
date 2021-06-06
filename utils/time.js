const parseTime = (timestamp) => {
  const ts = parseInt(timestamp, 10);
  const thDate = new Date(ts).toLocaleDateString("th-TH", {
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
  return thDate;
};

module.exports = parseTime;