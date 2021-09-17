import { parseISO, formatRelative, isAfter as isAfterDateFns } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import enUS from "date-fns/locale/en-US";

const formatRelativeLocale = {
  lastWeek: "'last' eeee",
  yesterday: "'yesterday'",
  today: "'today'",
  tomorrow: "'tomorrow'",
  nextWeek: "'next' eeee",
  other: "M/dd",
};

const locale = {
  ...enUS,
  formatRelative: (token: any) => formatRelativeLocale[token],
};

export function fToNow(date: any) {
  return formatRelative(utcToZonedTime(parseISO(date), "UTC"), new Date(), {
    locale,
  });
}

export function isAfter(date: Date) {
  const utc = date;
  const toCompare = new Date(
    utc.getUTCFullYear(),
    utc.getUTCMonth(),
    utc.getUTCDate()
  );
  const today = new Date(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate()
  );

  return isAfterDateFns(today, toCompare);
}

export function createDate(value: string) {
  const [month, day] = value.split("/");
  const year = new Date().getUTCFullYear();
  return `${month}-${day}-${year}`;
}

export function toDate(value: string) {
  const [month, day] = value.split("/");
  const year = new Date().getUTCFullYear();
  const date = new Date(year, Number(month) - 1, Number(day));
  return date;
}
