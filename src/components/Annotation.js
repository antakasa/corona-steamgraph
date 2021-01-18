import React from "react";
import { createAnnotationData } from "../utils/annotations";
export const Annotation = ({
    stackedData,
    xScale,
    yScale,
    parseDate,
    date,
    categories,
    annotationText,
    orientation,
  }) => {
    const { x1, x2 } = createAnnotationData({
      stackedData,
      parseDate,
      date,
      categories,
    });
    date = parseDate(date);
    return (
      <g>
        <circle cx={xScale(x1)} cy={yScale(date)} r="2" fill="black" />
        <circle cx={xScale(x2)} cy={yScale(date)} r="2" fill="black " />
        <path
          style={{ stroke: "black", strokeWidth: 2, fill: "none" }}
          d={`
            M${xScale(x1)} ${orientation === "down"? yScale(date) + 5 : yScale(date) - 5} 
            L${xScale(x1)} ${
            orientation === "down" ? yScale(date) + 20 : yScale(date) - 20
          } 
            L${xScale(x2)} ${
            orientation === "down" ? yScale(date) + 20 : yScale(date) - 20
          }
            L${xScale(x2)} ${orientation === "down" ? yScale(date) + 5 : yScale(date) - 5}
            `}
        />
        <text
          x={xScale(x1)}
          y={
            orientation === "down"
              ? yScale(date) + 20 + 13
              : yScale(date) - 20 - 10
          }
          style={{
            fontSize: "13px",
            fill: "black",
            transform: "translateX(0px)",
          }}
        >
          {annotationText}
        </text>
      </g>
    );
  };