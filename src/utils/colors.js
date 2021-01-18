import { scaleOrdinal } from "d3-scale";

export const createBrightColors = (keys) => {
    return scaleOrdinal().domain(keys).range(["#e76f51", "#f4a261", "#e9c46a","#2a9d8f", "#264653",])
}

export const createGreyColors = (keys) => {
    return scaleOrdinal().domain(keys).range(["#dcd4d1","#ede2de","#e0cfc5","#cfc0b7","#d1c2c2"])
}



