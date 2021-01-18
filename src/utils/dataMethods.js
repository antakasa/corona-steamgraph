import rollingAverage from "sma";
import { area, curveBasis, stack, stackOffsetSilhouette } from "d3-shape";
import censusData from "../censusData.json";

const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);

export const stackData = (data, keys) => {
  return stack().offset(stackOffsetSilhouette).keys(keys)(data);
};
export const createAreas = (y, x) =>
  area()
    .y(function (d) {
      return x(d.data.date);
    })
    .x0(function (d) {
      return y(d[0]);
    })
    .x1(function (d) {
      return y(d[1]);
    })
    .curve(curveBasis);

export const filterByDate = ({
  data,
  startDate,
  endDate,
  parseDate,
  outliers,
}) =>
  data.filter(
    (e) =>
      outliers.indexOf(e.date) === -1 &&
      parseDate(e.date) > parseDate(startDate) &&
      parseDate(e.date) < parseDate(endDate)
  );

export const parseData = ({
  data,
  parseDate,
  categories,
  categorizeGroup,
  nth,
  alwaysInclude,
  formatDateBackToOriginal,
}) => {
  //console.log(data.filter((e) => e.date === "5.7.2020"));
  var mergedObj = data.reduce((acc, obj) => {
    const category = categorizeGroup(obj.group);
    //const category = obj.group
    if (acc[obj.date]) {
      acc[obj.date] = {
        ...acc[obj.date],
        [category]:
          (parseInt(acc[obj.date][category], 10) || 0) +
          (parseInt(obj.value, 10) || 0),
      };
    } else {
      acc[obj.date] = { [category]: obj.value || 0 };
    }

    return acc;
  }, {});

  // TODO: SANITY CHECK THAT "KAIKKI IKÄRYHMÄT" VALUE MATCHES THE SUM OF GROUP VALUES

  let output = [];
  for (let prop in mergedObj) {
    output.push({ ...mergedObj[prop], date: parseDate(prop) });
  }
  const applyRollingAverage = (() => {
    //  modify data so that daily values are actually moving average of last 7 days
    let rollingAverages = {};
    let range = 7;
    for (let index = 0; index < categories.length; index++) {
      let category = categories[index];

      const allValuesWithinCategory = output.map((e) => e[category]);

      const avg = rollingAverage(allValuesWithinCategory, range);
      rollingAverages[category] = avg;
    }

    output.map((e, i) => {
      if (i < 6) {
        return null;
      }

      for (let index = 0; index < categories.length; index++) {
        let category = categories[index];
        let value = rollingAverages[category][i - 6];
        value = value === "NaN" ? 0 : value;
        //value = parseInt(value) / censusData[0][category];
         value = parseInt(value)
        e[category] = value;
      }
    });
    output = output.slice(6);
  })();

  const alwaysIncludedValues = output.filter((e) => {
  return  alwaysInclude.indexOf(formatDateBackToOriginal(e.date)) > -1
  }
    );
  console.log(alwaysInclude)
  console.log(alwaysIncludedValues)
  output = everyNth(output, nth);
  function sortByDateAscending(a, b) {
    // Dates will be cast to numbers automagically:
    return a.date - b.date;
}
  const final = [...output, ...alwaysIncludedValues]
  final.sort(sortByDateAscending)
  return final;
};
