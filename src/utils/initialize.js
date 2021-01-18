import { categories, categorizeGroup } from "./categories.js";
import { createBrightColors, createGreyColors } from "./colors.js";
import {
  createAreas,
  filterByDate,
  parseData,
  stackData,
} from "./dataMethods.js";
import {
  formatDate,
  formatDateBackToOriginal,
  formatDateWeek,
  parseDate,
} from "./dateMethods.js";
import { layout } from "./layout.js";
import { createXScale, createYScale, createTicks } from "./scales.js";
import { calculations } from "./calculations";
import { generateSlides } from "../Slides.js";

export const initialize = ({
  data,
  startDate,
  endDate,
  outliers,
  tickDates,
  nth,
  alwaysInclude,
}) => {
  const { margin, width, height } = layout();
  // filterByDate()
  // Filter data by date:
  // 1. create a sample of dataset including only the information between start point & end point
  // 2. exclude outliers – dates that contain strange values

  const filteredData = filterByDate({
    parseDate,
    data,
    startDate,
    endDate,
    outliers,
  });

  // store this data to be used with calculations
  calculations.storeData(filteredData);

  const slides = generateSlides();
  let annotationDates = [];
  slides.forEach(element => {
    let newDates = element["annotations"].map(e => e.date)
    annotationDates = [...annotationDates, ...newDates]
  });

  alwaysInclude = [...alwaysInclude, ...annotationDates]

  // pa3rseData()
  // Process data into an array of objects where each object holds values of a one particular date.
  // 1: {date: , catgory2, category3, category4...}
  // 2. Counts rolling averages
  // 3. Picks every nth from the data to reduce sample size
  // 4. Removes outliers and makes sure the 'always included' dates (e.g. those with annotations)
  // are included in the sample
  const parsedData = parseData({
    data: filteredData,
    parseDate,
    categories,
    categorizeGroup,
    nth,
    alwaysInclude,
    formatDateBackToOriginal,
  });

  const stackedData = stackData(parsedData, categories);
  const allDates = stackedData[0].map((e) => e.data.date);
  const yScale = createYScale({
    data: stackedData,
    width,
    height,
    margin,
    allDates,
    parseDate,
    formatDate,
  });
  const { bigTicks, smallTicks } = createTicks({
    tickDates,
    formatDate,
    yScale,
    parseDate,
    allDates,
    formatDateWeek,
  });
  const xScale = createXScale(width, stackedData);
  const areas = createAreas(xScale, yScale);
  const brightColors = createBrightColors(categories);
  const greyColors = createGreyColors(categories);
  return {
    vizProps: {
      margin,
      width,
      height,
      stackedData,
      xScale,
      bigTicks,
      smallTicks,
      areas,
      yScale,
      parseDate,
      brightColors,
      greyColors,
    },
    slides,
  };
};
