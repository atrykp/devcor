import { useContext, useEffect, useRef, useState } from "react";
import { toInteger } from "lodash";
import { useMutation, gql } from "@apollo/client";

import Input from "../../components/Input/Input";
import Modal from "../../components/Modal/Modal";
import Title from "../../components/Title/Title";
import { TimerCtx } from "../../context/TImerContext";
import { removeTimeout } from "../../helpers/removeTimeout";
import { useAuth } from "../../hooks/useAuth";

import "./TimerScreen.scss";

type TimerControl = "playing" | "pause" | "done";
type CurrentMode = "focus" | "break";

interface TimerInfo {
  startAt: string;
  duration: number;
}

const UPDATE_TIMER_STATUS = gql`
  mutation UpdateTimerStatus($status: String) {
    updateTimerStatus(status: $status) {
      status
      message
    }
  }
`;

const ADD_TIMER = gql`
  mutation AddNote(
    $date: String
    $startAt: String
    $endAt: String
    $mode: String
    $duration: Number
  ) {
    addNote(
      date: $date
      startAt: $startAt
      mode: $mode
      endAt: $endAt
      duration: $duration
    ) {
      status
      message
    }
  }
`;

const TimerScreen = () => {
  useAuth("protect");
  const ctx = useContext(TimerCtx);
  const [currentState, setCurrentState] = useState<TimerControl>("pause");
  const [currentMode, setCurrentMode] = useState<CurrentMode>();
  const [rangeValue, setRangeValue] = useState(1);
  const [second, setSecond] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const [timerInfo, setTimerInfo] = useState<TimerInfo>({
    startAt: "",
    duration: 0,
  });
  const [updateTimerStatus] = useMutation(UPDATE_TIMER_STATUS, {
    refetchQueries: ["GetTimerObj"],
  });

  const manualTimerRef = useRef<HTMLInputElement>(null!);
  const secRef = useRef<NodeJS.Timeout | null>(null);
  const rangeRef = useRef<HTMLInputElement>(null!);

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
    setTimerInfo({
      ...timerInfo,
      startAt: Date.now().toString(),
      duration: rangeValue,
    });
  };

  const setTimerManually = () => {
    const userValue = toInteger(manualTimerRef.current.value);
    if (userValue > 120) {
      setRangeValue(120);
    } else if (userValue < 0) {
      setRangeValue(0);
    } else {
      setRangeValue(userValue);
    }
    setIsManual(false);
  };

  const saveTimer = () => {
    const howLong = timerInfo.duration - rangeValue;
  };

  const changeTimerMode = async (mode: string) => {
    updateTimerStatus({
      variables: { status: mode },
    });
  };

  useEffect(() => {
    if (currentState === "playing") {
      secRef.current = setInterval(() => {
        setSecond((prevVal) => prevVal - 1);
      }, 1000);
    }
    if (currentState === "done") {
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

  useEffect(() => {
    if (ctx.userId) {
      setCurrentMode(ctx.currentState as CurrentMode);
    }
  }, [ctx]);

  return (
    <div>
      {isManual && (
        <Modal
          title="Max duration"
          cancelCallback={() => setIsManual(false)}
          cancelTxt="Cancel"
          confirmTxt="Set"
          confirmCallback={setTimerManually}
        >
          <Input ref={manualTimerRef} type="number" />
        </Modal>
      )}
      <Title text="Timer" isBackButton />
      <div className="timer-screen__state-wrapper">
        <p
          className={`timer-screen__state ${
            currentMode === "break" ? "timer-screen__state--active" : ""
          }`}
          onClick={() => changeTimerMode("break")}
        >
          break
        </p>

        <p
          className={`timer-screen__state ${
            currentMode === "focus" ? "timer-screen__state--active" : ""
          }`}
          onClick={() => changeTimerMode("focus")}
        >
          focus
        </p>
      </div>
      <i className="far fa-calendar-alt timer-screen__calendar-icon"></i>
      <div className="timer-screen__top-bar"></div>
      <p
        className="timer-screen__timer"
        onClick={() => {
          if (currentState !== "playing") setIsManual(true);
        }}
      >
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
        {currentState === "pause" || currentState === "done" ? (
          <i
            className={`fas fa-play ${
              rangeValue === 0 ? "timer-screen__control--disable" : ""
            }`}
            onClick={startTimer}
          ></i>
        ) : (
          <i
            className={`fas fa-pause`}
            onClick={() => setCurrentState("pause")}
          ></i>
        )}

        <i className="fas fa-stop" onClick={stopTimer}></i>
      </div>
    </div>
  );
};

export default TimerScreen;
