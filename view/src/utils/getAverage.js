function getArr(seatInfo) {
  return seatInfo.status === "available"
    ? seatInfo.available
    : seatInfo.occupied;
}

export default function getAverage(seatInfo) {
  const arr = getArr(seatInfo);

  if (arr.length === 0) {
    if (seatInfo.duration > 0) {
      return seatInfo.duration + " min";
    }
    return "<1 min";
  }

  let totalDuration = 0;
  arr.forEach((el) => {
    totalDuration += el.duration;
  });

  if (totalDuration < 1) {
    return "<1 min";
  }

  return (totalDuration / arr.length).toFixed(2) + " min";
}
