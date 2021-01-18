export const YAxis = ({highlight, xScale, bigTicks, smallTicks, margin, width, height }) => {
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