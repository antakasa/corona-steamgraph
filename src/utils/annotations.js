import { categories } from "./categories";

export const createAnnotationData = ({
  stackedData,
  parsedData,
  parseDate,
  date,
  categories,
}) => {
  console.log(stackedData)
  let processed = categories.map((cat) => {
    const categoryData = stackedData.find((e) => e.key === cat);
    const datedCategoryData = categoryData.find((e) => {
      return (
        e.data.date.getDate() === parseDate(date).getDate() &&
        e.data.date.getMonth() === parseDate(date).getMonth() &&
        e.data.date.getYear() === parseDate(date).getYear()
      );
    });
    try {
      const x1 = datedCategoryData[0];
      const x2 = datedCategoryData[1];

      return { x1, x2 };
    } catch {
      console.log(`cannot find date ${date}`);
    }
  });
  return { x1: processed[0].x1, x2: processed[processed.length - 1].x2 };
};
