import { useEffect } from "react";
import { rulesSlice } from "../../store/reducers/rules/rulesSlice";

import { useAppDispatch } from "../redux";
import { useTasksWatcher } from "./manageTasks/tasksWatcher";
import { useSynchronizer } from "./synchronizer/synchronizer";

export function useGameWatcher() {
  const INFLATION = 10;
  const MINUTE = 60000;

  const dispatch = useAppDispatch();
  const { setGameDay, setInflation } = rulesSlice.actions;

  // Synchronizer between states and localstorage
  useSynchronizer();

  // Update days and inflation
  useEffect(() => {
    dispatch(setGameDay());
    dispatch(setInflation(INFLATION));

    const interval = setInterval(() => {
      dispatch(setGameDay());
      dispatch(setInflation(INFLATION));
    }, MINUTE);

    return () => clearInterval(interval);
  }, []);

  // Watching after progressing and pending product tasks
  useTasksWatcher();
}
