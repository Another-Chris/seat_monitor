export default function getAvailability(seatInfo) {
  const availibility = seatInfo.availability;

  if (availibility.length === 0) {
    return 0;
  } else {
    const numAvailable = availibility.filter(
      (el) => el.statusCode === 1
    ).length;
    return numAvailable / availibility.length;
  }
}
