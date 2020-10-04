const calculateDateDifference = (startDate, endDate) => {
  const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  let firstDate = new Date(startDate);
  let secondDate = new Date(endDate);
  let timeDiff = Math.abs(secondDate.getTime() - firstDate.getTime());
  let diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  return diffDays > 1 ? `${diffDays} days` : `${diffDays} day`;
};

module.exports = {
  calculateDateDifference,
};
