import { companySlice } from "../../store/reducers/company/companySlice";
import { modalSlice } from "../../store/reducers/modal/modalSlice";
import { newsSlice } from "../../store/reducers/news/newsSlice";
import { operationSlice } from "../../store/reducers/operation/operationSlice";
import { placeSlice } from "../../store/reducers/place/placeSlice";
import { prefsSlice } from "../../store/reducers/prefs/prefsSlice";
import { productSlice } from "../../store/reducers/product/productSlice";
import { rulesSlice } from "../../store/reducers/rules/rulesSlice";
import { taskSlice } from "../../store/reducers/task/taskSlice";
import { useAppDispatch } from "../redux";

export function useProgressDeleter() {
  const dispatch = useAppDispatch();
  const { setStateCompanies } = companySlice.actions;
  const { setStateModals } = modalSlice.actions;
  const { setStateNews } = newsSlice.actions;
  const { setStateOperations } = operationSlice.actions;
  const { setStatePlaces } = placeSlice.actions;
  const { setStatePrefs } = prefsSlice.actions;
  const { setStateProducts } = productSlice.actions;
  const { setStateRules } = rulesSlice.actions;
  const { setStateTasks } = taskSlice.actions;

  function deleteAllProgress() {
    const submit = window.confirm("Хочешь начать заново?");
    if (!submit) return null;

    dispatch(setStateCompanies(null));
    dispatch(setStateModals(null));
    dispatch(setStateNews(null));
    dispatch(setStateOperations(null));
    dispatch(setStatePlaces(null));
    dispatch(setStatePrefs(null));
    dispatch(setStateProducts(null));
    dispatch(setStateRules(null));
    dispatch(setStateTasks(null));

    localStorage.removeItem("impresario");
  }

  return { deleteAllProgress };
}
