import { max } from "d3-array";
import censusData from "../censusData.json";
import { parseDate } from "./dateMethods";
export const calculations = (() => {
  let baseData = {};

  const filterDataByDate = (data, date) => data.filter((e) => e.date === date);

  const filterDataBasedOnGroups = (data, groups) =>
    data.filter((e) => groups.indexOf(e.group) > -1);

  const groupByDate = (data, startDate, endDate) => {
    return data.reduce((acc, obj) => {
      const category = obj.group;
      if (acc[obj.date]) {
        acc[obj.date] = {
          ...acc[obj.date],
          [category]:
            (parseInt(acc[obj.date][category], 10) || 0) +
            (parseInt(obj.value, 10) || 0),
        };
      } else {
        if (
          !startDate ||
          !endDate ||
          (parseDate(obj.date) > parseDate(startDate) &&
            parseDate(obj.date) < parseDate(endDate))
        ) {
          acc[obj.date] = { [category]: obj.value || 0 };
        }
      }

      return acc;
    }, {});
  };

  const countSum = (arr) => {
    if (arr.length === 0) return 0;
    return arr.reduce(function (accumulator, obj) {
      let value = parseInt(obj.value, 10);
      if (isNaN(value)) value = 0; //TODO What are the empty values
      return accumulator + value;
    }, 0);
  };

  return {
    mostInfectionsOnADateByGroups: (categories, startDate, endDate) => {
      const dataGrouped = groupByDate(baseData, startDate, endDate);
      const keys = Object.keys(dataGrouped);

      let parsed = [];
      let comparison = keys.map((key) => {
        let obj = {};
        let sum = 0;

        categories.forEach((category) => {
          obj[category] = isNaN(parseInt(dataGrouped[key][category], 10))
            ? 0
            : parseInt(dataGrouped[key][category], 10);
          sum =
            sum +
            (isNaN(parseInt(dataGrouped[key][category], 10))
              ? 0
              : parseInt(dataGrouped[key][category], 10));
        });
        obj.sum = sum;
        obj.date = key;
        parsed.push(obj);
      });
      console.log(parsed)
      const maxValue = max(parsed, (d) => d.sum);
      const date = parsed.find((e) => e.sum === maxValue);
      return { maxValue, date };
    },
    calculateByDateAndCategory: (date, categories) => {
      const dateFiltered = filterDataByDate(baseData, date);
      const categoryAndDateFiltered = filterDataBasedOnGroups(
        dateFiltered,
        categories
      );
      return countSum(categoryAndDateFiltered);
    },
    under40ShareInPopulation: () => {
      const sample =
        parseInt(censusData[0]["0-19"], 10) +
        parseInt(censusData[0]["20-39"], 10);
      console.log(sample);
      const total = parseInt(censusData[0]["total"], 10);
      return (sample / total) * 100;
    },
    under40: () => {
      const onlyGroups = baseData.map((e) => e.group);
      const uniqueGroups = [...new Set(onlyGroups)];

      // Which % of infections are from people under 40 yrs
      const over40Groups = ["40-50", "50-60", "60-70", "70-80", "80-"];
      const under40Groups = ["00-10", "10-20", "20-30", "30-40"];
      const all = ["Kaikki ikäryhmät"];
      const over40 = filterDataBasedOnGroups(baseData, over40Groups);
      const under40 = filterDataBasedOnGroups(baseData, under40Groups);
      const allGroups = filterDataBasedOnGroups(baseData, all);
      const sanityCheck =
        [...over40, ...under40, ...allGroups].length === baseData.length;

      if (sanityCheck) {
        const total = countSum([...over40, ...under40]);
        const under40Average = (countSum(under40) / total) * 100;
        return under40Average;
      }
    },
    storeData: (data) => {
      baseData = data;
    },
    getData: () => baseData,
  };
})();
