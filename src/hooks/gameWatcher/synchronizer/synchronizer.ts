import { useEffect } from "react";
import { companySlice } from "../../../store/reducers/company/companySlice";
import { modalSlice } from "../../../store/reducers/modal/modalSlice";
import { newsSlice } from "../../../store/reducers/news/newsSlice";
import { operationSlice } from "../../../store/reducers/operation/operationSlice";
import { placeSlice } from "../../../store/reducers/place/placeSlice";
import { prefsSlice } from "../../../store/reducers/prefs/prefsSlice";
import { productSlice } from "../../../store/reducers/product/productSlice";
import { rulesSlice } from "../../../store/reducers/rules/rulesSlice";
import { taskSlice } from "../../../store/reducers/task/taskSlice";
import { useAppDispatch, useAppSelector } from "../../redux";
import { ISynchronizerData } from "./synchronizer.interface";

export function useSynchronizer() {
  const company = useAppSelector(state => state.companyReducer);
  const modal = useAppSelector(state => state.modalReducer);
  const news = useAppSelector(state => state.newsReducer);
  const operation = useAppSelector(state => state.operationReducer);
  const place = useAppSelector(state => state.placeReducer);
  const prefs = useAppSelector(state => state.prefsReducer);
  const product = useAppSelector(state => state.productReducer);
  const rules = useAppSelector(state => state.rulesReducer);
  const tasks = useAppSelector(state => state.tasksReducer);

  const { setStateCompanies } = companySlice.actions;
  const { setStateModals } = modalSlice.actions;
  const { setStateNews } = newsSlice.actions;
  const { setStateOperations } = operationSlice.actions;
  const { setStatePlaces } = placeSlice.actions;
  const { setStatePrefs } = prefsSlice.actions;
  const { setStateProducts } = productSlice.actions;
  const { setStateRules } = rulesSlice.actions;
  const { setStateTasks } = taskSlice.actions;

  const VERSION = 1.0;

  const dispatch = useAppDispatch();
  useEffect(() => {
    const savedDataString = localStorage.getItem("impresario");

    function syncStates() {
      if (!savedDataString) return;
      const savedData: ISynchronizerData = JSON.parse(savedDataString);

      if (savedData.version !== VERSION) return;

      dispatch(setStateCompanies(savedData.company));
      dispatch(setStateModals(savedData.modal));
      dispatch(setStateNews(savedData.news));
      dispatch(setStateOperations(savedData.operation));
      dispatch(setStatePlaces(savedData.place));
      dispatch(setStatePrefs(savedData.prefs));
      dispatch(setStateProducts(savedData.product));
      dispatch(setStateRules(savedData.rules));
      dispatch(setStateTasks(savedData.tasks));
    }

    syncStates();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.onbeforeunload = saveToLocalStorage;

    function saveToLocalStorage() {
      const data: ISynchronizerData = {
        company,
        modal,
        news,
        operation,
        place,
        prefs,
        product,
        rules,
        tasks,
        version: VERSION,
      };

      localStorage.setItem("impresario", JSON.stringify(data));
    }
    // eslint-disable-next-line
  }, [window.onbeforeunload]);
}
