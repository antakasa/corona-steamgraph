//export const categories =  ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-"]
export const categories =["0-19", "20-39", "40-59","60-79", "80-"]
export const categorizeGroup = (group) => {
    if (["00-10"].indexOf(group) > -1) return categories[0];
    if (["10-20"].indexOf(group) > -1) return categories[0];
    if (["20-30"].indexOf(group) > -1) return categories[1];
    if (["30-40"].indexOf(group) > -1) return categories[1];
    if (["40-50"].indexOf(group) > -1) return categories[2];
    if (["50-60"].indexOf(group) > -1) return categories[2];
    if (["60-70"].indexOf(group) > -1) return categories[3];
    if (["70-80"].indexOf(group) > -1) return categories[3];
    if (["80-"].indexOf(group) > -1) return categories[4];
    if (group === "Kaikki ikäryhmät") return group;
  }