import { toInteger } from "lodash";
import { useRef, useState } from "react";
import Title from "../../components/Title/Title";
import { useAuth } from "../../hooks/useAuth";
import "./TimerScreen.scss";

const TimerScreen = () => {
  useAuth("protect");
  const [rangeValue, setRangeValue] = useState(25);
  const [second, setSecond] = useState(0);

  const rangeRef = useRef<HTMLInputElement>(null!);
  return (
    <div>
      <Title text="Timer" isBackButton />
      <div className="timer-screen__state-wrapper">
        <p className="timer-screen__state">break</p>
        <p className="timer-screen__state timer-screen__state--active">focus</p>
      </div>
      <div className="timer-screen__top-bar"></div>
      <p className="timer-screen__timer">
        {rangeValue}:{second}
      </p>
      <input
        type="range"
        min="0"
        max="120"
        defaultValue={rangeValue}
        onChange={() => setRangeValue(toInteger(rangeRef.current.value))}
        ref={rangeRef}
        className="timer-screen__range-input"
      />
      <div className="timer-screen__control">
        <i className="fas fa-play"></i>
        <i className="fas fa-pause"></i>
        <i className="fas fa-stop"></i>
      </div>
    </div>
  );
};

export default TimerScreen;
