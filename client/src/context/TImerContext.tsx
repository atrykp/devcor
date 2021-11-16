import { useLazyQuery, gql } from "@apollo/client";
import React, { useState, createContext, useContext, useEffect } from "react";
import { UserCtx } from "./UserContext";

export interface ITimerData {
  userId: string;
  timers: any[];
  currentState: string;
}

const emptyTimer: ITimerData = {
  userId: "",
  timers: [],
  currentState: "",
};

const GET_TIMER_OBJ = gql`
  query GetTimerObj($userId: ID!) {
    getTimerObj(userId: $userId) {
      userId
      currentState
      timers {
        date
        id
        focus {
          startAt
          endAt
          id
        }
        break {
          startAt
          endAt
          id
        }
      }
    }
  }
`;

export const TimerCtx = createContext(emptyTimer);

const TimerContext = ({ children }: { children: React.ReactNode }) => {
  const [timer, setTimer] = useState<ITimerData>(emptyTimer);
  const userContext = useContext(UserCtx);
  const [getTimerObj, { data }] = useLazyQuery(GET_TIMER_OBJ, {
    variables: { userId: userContext.id },
  });

  useEffect(() => {
    if (userContext.id) getTimerObj();
  }, [userContext.id, getTimerObj]);

  useEffect(() => {
    if (data) {
      const {
        getTimerObj: { userId, timers, currentState },
      } = data;
      setTimer({ userId, timers, currentState });
    }
  }, [data]);

  return <TimerCtx.Provider value={timer}>{children}</TimerCtx.Provider>;
};

export default TimerContext;
