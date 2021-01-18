import "./Dataviz.css";
import React from "react";
import { createAnnotationData } from "./utils/annotations";

export const Dataviz = ({ vizProps, slideData }) => {
  const {
    margin,
    width,
    height,
    stackedData,
    xScale,
    bigTicks,
    smallTicks,
    areas,
    yScale,
    greyColors,
    parseDate,
    brightColors,
  } = vizProps;

  const annotationProps = { xScale, yScale, stackedData, parseDate };
  return (
    <section>
      <svg
        id="dataviz-container"
        style={{
          width: width + margin.left + margin.right,
          height: height + margin.top + margin.bottom,
        }}
      >
        <g
          id="container"
          style={{
            transform: "translate(" + margin.left + "px," + margin.top + "px)",
          }}
        >
          {stackedData.map((e, i) => (
            <path
              d={areas(e)}
              key={e.index}
              data-index={e.key}
              style={{
                fill:
                  !slideData.allgrey && (!slideData.highlightedLayers || slideData.highlightedLayers.indexOf(e.key) > -1)
                    ? brightColors(e)
                    : greyColors(e),
                stroke: slideData.highlightedLayers && slideData.highlightedLayers.indexOf(e.key) > -1 ? "white" : "none",
              }}
            ></path>
          ))}
          {slideData.annotations.map((e, i) => (
            <Annotation
              {...annotationProps}
              date={e.date}
              key={i}
              categories={e.categories}
              annotationText={e.text}
              orientation={e.orientation}
            />
          ))}
          <YAxis
          highlight={slideData.highlightYAxis}
            xScale={xScale}
            bigTicks={bigTicks}
            smallTicks={smallTicks}
            margin={margin}
            width={width}
            height={height}
          />
          {true && (
            <Legend data={stackedData} colors={brightColors} height={height} />
          )}
        </g>
      </svg>
    </section>
  );
};

const Legend = ({ data, colors, height }) => {
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

const Annotation = ({
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

const YAxis = ({highlight, xScale, bigTicks, smallTicks, margin, width, height }) => {
  return (
    <>
      <g>
        {false && <path d={`M 9.5 0.5 V 620`} stroke="currentColor" />}
        {false &&
          smallTicks.map(({ value, yOffset }, i) => (
            <g key={value} transform={`translate(9.5, ${yOffset})`}>
              {false && (
                <line
                  x1="0"
                  stroke-dasharray="1"
                  x2={30}
                  stroke="currentColor"
                />
              )}
              <text
                x="50"
                key={value}
                style={{
                  fontSize: "10px",
                  textAnchor: "middle",
                  fontWeight: "bold",
                  fill: highlight ? "red" : "white",
                  transform: "translate(-32px, -2px)",
                }}
              >
                {i % 3 === 3 - 1 ? value : ""}
              </text>
            </g>
          ))}
        {bigTicks.map(({ value, yOffset }) => (
          <g key={value} transform={`translate(9.5, ${yOffset})`}>
            <line
              x1={width}
              strokeWidth="0.3"
              strokeDasharray="2 2"
              x2={0}
              stroke={highlight ? "goldenrod" : "white"}
            />
            <text
              x="40"
              key={value}
              style={{
                fontSize: "13px",
                fill: highlight ? "goldenrod" : "white",
                transform: `translate(${width - 100}px, -6px)`,
              }}
            >
              {value}
            </text>
          </g>
        ))}
      </g>
    </>
  );
};
