import React from "react"

export const Legend = ({ data, colors, height }) => {
    return (
      <>
        {data.map((e, i) => {
          return (
            <g key={i}>
              <rect
                x="0"
                y={i * 30}
                width="20"
                height="20"
                style={{ fill: colors(e) }}
              ></rect>
              <text
                x="24"
                y={i*30 +10}
                textAnchor="left"
                style={{ alignmentBaseline: "middle", fill: colors(e) }}
              >
                {e.key}
              </text>
            </g>
          );
        })}
      </>
    );
  };