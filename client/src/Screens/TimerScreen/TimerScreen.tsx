import { toInteger } from "lodash";
import { useEffect, useRef, useState } from "react";
import Title from "../../components/Title/Title";
import { removeTimeout } from "../../helpers/removeTimeout";
import { useAuth } from "../../hooks/useAuth";
import "./TimerScreen.scss";

type TimerControl = "playing" | "pause" | "done";

const TimerScreen = () => {
  useAuth("protect");
  const [currentState, setCurrentState] = useState<TimerControl>("pause");
  const [rangeValue, setRangeValue] = useState(1);
  const [second, setSecond] = useState(0);

  const secRef = useRef<NodeJS.Timeout | null>(null);

  const stopTimer = () => {
    setRangeValue(25);
    setSecond(0);
    setCurrentState("pause");
    removeTimeout(secRef.current);
  };
  const startTimer = () => {
    if (second === 0) {
      setSecond(59);
      setRangeValue((currentState) => currentState - 1);
    }
    setCurrentState("playing");
  };

  useEffect(() => {
    if (currentState === "playing") {
      secRef.current = setInterval(() => {
        setSecond((prevVal) => prevVal - 1);
      }, 1000);
    }
    return () => {
      removeTimeout(secRef.current);
    };
  }, [currentState]);

  useEffect(() => {
    if (second <= 0 && rangeValue <= 0 && currentState === "playing") {
      removeTimeout(secRef.current);
      setCurrentState("done");
      return;
    }

    if (currentState === "playing" && second <= 0) {
      setSecond(59);
      if (rangeValue > 0) setRangeValue((prevVal) => prevVal - 1);
    }
  }, [second, currentState, rangeValue]);

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
        {rangeValue}:{`${second <= 9 ? 0 : ""}${second}`}
      </p>
      <input
        type="range"
        min="0"
        max="120"
        defaultValue={rangeValue}
        onChange={() => setRangeValue(toInteger(rangeRef.current.value))}
        ref={rangeRef}
        className="timer-screen__range-input"
        disabled={currentState === "playing"}
      />
      <div className="timer-screen__control">
        <i className="fas fa-redo"></i>
        {currentState === "pause" ? (
          <i className="fas fa-play" onClick={startTimer}></i>
        ) : (
          <i
            className="fas fa-pause"
            onClick={() => setCurrentState("pause")}
          ></i>
        )}

        <i className="fas fa-stop" onClick={stopTimer}></i>
      </div>
    </div>
  );
};

export default TimerScreen;
