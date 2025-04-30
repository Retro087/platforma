import moment from "moment/moment";

export function DateFormat(date) {
  return moment(date).format("DD.MM.YYYY, HH:mm");
}
