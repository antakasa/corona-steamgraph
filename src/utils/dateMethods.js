import { formatLocale } from "d3-format";
import { timeFormat, timeFormatLocale, timeParse } from "d3-time-format";

var locale = timeFormatLocale({
  dateTime: "%A, %-d. %Bta %Y klo %X",
  date: "%-d.%-m.%Y",
  time: "%H:%M:%S",
  periods: ["a.m.", "p.m."],
  days: [
    "sunnuntai",
    "maanantai",
    "tiistai",
    "keskiviikko",
    "torstai",
    "perjantai",
    "lauantai",
  ],
  shortDays: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
  months: [
    "tammikuu",
    "helmikuu",
    "maaliskuu",
    "huhtikuu",
    "toukokuu",
    "kesäkuu",
    "heinäkuu",
    "elokuu",
    "syyskuu",
    "lokakuu",
    "marraskuu",
    "joulukuu",
  ],
  shortMonths: [
    "Tammi",
    "Helmi",
    "Maalis",
    "Huhti",
    "Touko",
    "Kesä",
    "Heinä",
    "Elo",
    "Syys",
    "Loka",
    "Marras",
    "Joulu",
  ],
});

export const parseDate = timeParse("%d.%m.%Y"); // Date stored in data in form 1.5.2020
export const formatDate = locale.format("%B");
export const formatDateBackToOriginal = locale.format("%-d.%-m.%Y");
export const formatDateWeek = timeFormat("vko %V");
