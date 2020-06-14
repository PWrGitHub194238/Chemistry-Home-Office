export function getDate(date: Date | any) {
  if (typeof date.getTime === "function") {
    return date;
  } else if (typeof date.toDate === "function") {
    return date.toDate();
  }

  return new Date();
}
