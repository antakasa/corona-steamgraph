import "./Dataviz.css";
import React from "react";
import { Annotation } from "./Annotation"
import { Legend } from "./Legend"
import { YAxis } from "./YAxis"
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
                stroke: slideData.highlightedLayers && slideData.highlightedLayers.indexOf(e.key) > -1 ? "none" : "none",
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

