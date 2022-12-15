import { useEffect } from "react";
import { useAppSelector } from "../redux";
export function useBodyOverflow() {
  const { managingCompanyId } = useAppSelector(state => state.modalReducer);
  useEffect(() => {
    if (managingCompanyId) {
      document.body.classList.add("body__fixed");
    } else {
      document.body.classList.remove("body__fixed");
    }
  }, [managingCompanyId]);
}
