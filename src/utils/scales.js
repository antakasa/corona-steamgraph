import { max, min } from "d3-array";
import { scaleLinear } from "d3-scale";
import { timeMonth } from "d3-time";

export const createYScale = ({allDates, data, width, height, parseDate, formatDate, margin}) => {
    const minValue = min(allDates)
    const maxValue  = max(allDates)
    return scaleLinear().domain([minValue,maxValue]).range([0, height]);
 
  }
function getNumberOfWeek(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}


export const createTicks = ({allDates,formatDateWeek, tickDates, parseDate, formatDate, yScale, firstScaledDate, lastScaledDate}) => {
  let parsed = tickDates.map(e => parseDate(e))
    parsed.unshift(allDates[0])
    const bigTicks = parsed.map((value) => {
      return ({
      value: formatDate(value),
      yOffset: yScale(value),
    })});
    const smallTicks = allDates.map((value) => {
      return ({
      value: formatDateWeek(value),
      yOffset: yScale(value),
    })}); 
    return { bigTicks, smallTicks} 
}

export const createXScale = (width, data) => {
  const minValue = min(data, d => min(d, d=> d[0]))
  const maxValue = max(data, d => max(d, d=> d[1]))
  return scaleLinear().domain([minValue, maxValue]).range([50, width - 50 ])
}