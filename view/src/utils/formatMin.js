export default function formatMin(mins) {
  if (mins < 60) {
    if (mins < 1) {
      return "< 1 minute";
    } else {
      return mins + " minutes";
    }
  } else {
    const h = Math.floor(mins / 60);
    const m = mins - h * 60;
    return `${h} hour ${m} minutes`;
  }
}
