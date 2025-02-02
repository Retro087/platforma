import moment from "moment/moment";

export function DateFormat(date) {
  return moment(date).format("D.M.YY, hh:mm");
}
