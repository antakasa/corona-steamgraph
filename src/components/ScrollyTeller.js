import React from "react"
import { Scrollama as ScrollyTell, Step } from "react-scrollama";
export const ScrollyTeller = ({slides, setCurrentStepIndex}) => {

    const onStepEnter = ({ data, direction }) => {
        const newIndex = direction === "up" && data > 0 ? data - 1 : data;
        setCurrentStepIndex(newIndex);
      };

      
    return <ScrollyTell offset={1} onStepEnter={onStepEnter}>
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
  </ScrollyTell>
}
