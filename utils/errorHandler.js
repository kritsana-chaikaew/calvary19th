const handle = (err, msg) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(msg);
  }
};
module.exports = handle;