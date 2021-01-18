import React, {useRef, useEffect} from "react";
import { Scrollama as ScrollyTell, Step } from "react-scrollama";
import { formatDateBackToOriginal } from "../utils/dateMethods";
export const ScrollyTeller = ({ slides, setCurrentStepIndex }) => {
    const container = useRef(null)
  const onStepEnter = ({ data, direction }) => {
    const newIndex = direction === "up" && data > 0 ? data - 1 : data;
    setCurrentStepIndex(newIndex);
  };

  useEffect(() => {
      if(container.current) {
          const {top} = container.current.getBoundingClientRect()
          const height =container.current.firstChild.getBoundingClientRect().height
          const currentTop = container.current.style.top || 0 
          container.current.style.marginTop = currentTop - top - (height/2) - (window.innerHeight / 2) + "px";
        }
        
  }, [container])


  return (
      <section ref={container} style={{height: "100%"}}>
    <ScrollyTell  offset={1} onStepEnter={onStepEnter}>
      {slides.map((_, stepIndex) => (
        <Step data={stepIndex} key={stepIndex}>
          <div
            style={{
              margin: "100vh 0",
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
    </section>
  );
};
