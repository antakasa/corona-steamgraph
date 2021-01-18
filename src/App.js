import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import { json } from "d3-fetch";
import { Dataviz } from "./components/Dataviz";
import { CircleContainer } from "./components/Circles";
import { initialize } from "./utils/initialize";
import { ScrollyTeller } from "./components/ScrollyTeller";

const settings = {
  startDate: "15.4.2020",
  endDate: "20.1.2021",
  avgRange: 7, // how many days are taken into account when counting rolling average
  nth: 7, // pick every nth value from averaged and date filtered data. This smoothens the curves.
  outliers: ["26.11.2020", "27.11.2020"], // dropped from data
  alwaysInclude: ["10.12.2020", "10.11.2020", "15.9.2020", "2.8.2020"],
  tickDates: [
    // note that first is added automatically
    "1.6.2020",
    "1.7.2020",
    "1.8.2020",
    "1.9.2020",
    "1.10.2020",
    "1.11.2020",
    "1.12.2020",
    "1.1.2021",
  ],
};

const App = () => {
  const [data, storeData] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [vizProps, setVizProps] = useState(null);
  const [slides, storeSlides] = useState(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const container = useRef(null)

  useEffect(() => {
    if (!data) return;
    const { vizProps, slides } = initialize({ ...settings, data });
    setVizProps(vizProps);
    storeSlides(slides);
  }, [data]);

  useEffect(() => {
    // container height is used to vertically align dataviz
    if(container.current && containerHeight === 0) {
       const {height} = container.current.getBoundingClientRect();
       setContainerHeight(height)
    }
  })


  useEffect(() => {
    (async () => {
      const data = await json(
        "https://plus.yle.fi/lambda_sheets/korona/2021-01-korona_ikaryhma/data.json"
      );
      storeData(data.data);
    })();
  }, []);

  return (
    <div className="App">
      {!vizProps || !slides ? (
        <section>Ladataan...</section>
      ) : (
        <>
          <section
            ref={container}
            id="dataviz"
            style={{ position: "sticky", top: (window.innerHeight / 2) - (containerHeight / 2) + "px", left: 0 }}
          >
            <Dataviz
              vizProps={vizProps}
              slideData={slides ? slides[currentStepIndex] : null}
            />
            <CircleContainer
              slides={slides}
              currentStepIndex={currentStepIndex}
            />
          </section>
          <ScrollyTeller
            setCurrentStepIndex={setCurrentStepIndex}
            slides={slides}/>
        </>
      )}
    </div>
  );
};

export default App;
