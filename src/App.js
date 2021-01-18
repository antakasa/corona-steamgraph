import "./App.css";
import React, { useEffect, useState } from "react";
import { json } from "d3-fetch";
import { Dataviz } from "./Dataviz";
import { Scrollama as ScrollyTeller, Step } from "react-scrollama";
import { initialize } from "./utils/initialize";

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

  useEffect(() => {
    if(!data) return
    const { vizProps, slides } = initialize({ ...settings, data });
    setVizProps(vizProps);
    storeSlides(slides);
  }, [data]);

  useEffect(() => {
    (async () => {
      const data = await json(
        "https://plus.yle.fi/lambda_sheets/korona/2021-01-korona_ikaryhma/data.json"
      );
      storeData(data.data);
    })();
  }, []);

  const onStepEnter = ({ data, direction }) => {
    const newIndex = direction === "up" && data > 0 ? data - 1 : data;
    setCurrentStepIndex(newIndex);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Koronaviruksen sanottiin syksyllä leviävän etenkin nuorten aikuisten
          parissa.
        </p>
        <p>
          Miltä todellisuus näyttää? Kuinka esimerkiksi korkeakoulujen
          fuksiaiset tai kesäriennot vaikuttavat ikäryhmien osuuksiin
          tartunnoissa?
        </p>
      </header>
      {!vizProps || !slides ? (
        <section>Ladataan...</section>
      ) : (
        <>
          <section
            id="dataviz"
            style={{ position: "sticky", top: 10, left: 0 }}
          >
            <Dataviz
              vizProps={vizProps}
              slideData={slides ? slides[currentStepIndex] : null}
            />
            <div id="circle-container">
              {slides.map((e, i) => (
                <div
                  id="circle"
                  key={i}
                  className={currentStepIndex >= i ? "seen" : "not-seen"}
                ></div>
              ))}
            </div>
          </section>
            <ScrollyTeller offset={1} onStepEnter={onStepEnter} debug>
              {slides.map((_, stepIndex) => (
                <Step data={stepIndex} key={stepIndex}>
                  <div
                    style={{
                      margin: "50vh 0",
                      zIndex: 999,
                      position: "relative",
                      transform: "translate3d(0,0,0)", // Needed for Safari to respect z index with sticky element
                    }}
                  >
                    {_.text.map((e, i) => (
                      <p
                        className="text-paragraph"
                        key={i}
                        dangerouslySetInnerHTML={{ __html: e }}
                      ></p>
                    ))}
                  </div>
                </Step>
              ))}
            </ScrollyTeller>
        </>
      )}
    </div>
  );
};

export default App;
