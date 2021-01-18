export const CircleContainer = ({ slides, currentStepIndex }) => (
  <div id="circle-container">
    {slides.map((e, i) => (
      <div
        id="circle"
        key={i}
        className={currentStepIndex >= i ? "seen" : "not-seen"}
      ></div>
    ))}
  </div>
);
