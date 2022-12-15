import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import MoneyTransfer from "../../components/modal/moneyTransfer/MoneyTransfer";
import Place from "../../components/modal/place/Place";
import Products from "../../components/modal/products/Products";
import Button from "../../components/UI/button/Button";
import Modal from "../../components/UI/modal/Modal";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  ICompany,
  ICompanyMoney,
} from "../../store/reducers/company/company.interface";
import { companySlice } from "../../store/reducers/company/companySlice";
import { modalSlice } from "../../store/reducers/modal/modalSlice";

import "./manageCompany.scss";

const ManageCompany = () => {
  const { t } = useTranslation();
  const { setManagingCompanyId, setIsCompanyManager } = modalSlice.actions;
  const { deleteCompany, moneyFromCompanyToAll } = companySlice.actions;
  const { managingCompanyId } = useAppSelector(state => state.modalReducer);
  const { companies } = useAppSelector(state => state.companyReducer);
  const dispatch = useAppDispatch();

  const current = useMemo(
    () =>
      companies.find(company => company.id === managingCompanyId) as ICompany,
    [managingCompanyId, companies]
  );

  function closeModal() {
    dispatch(setManagingCompanyId(null));
    dispatch(setIsCompanyManager(false));
  }

  function deleteCurrentCompany() {
    const data: ICompanyMoney = {
      companyId: current.id,
      amount: current.balance,
    };
    dispatch(moneyFromCompanyToAll(data));
    dispatch(deleteCompany(current.id));
    closeModal();
  }

  return (
    <Modal closeFunc={closeModal} closeButton>
      <div className="modal-manage-company__form">
        <div>
          <MoneyTransfer company={current} />
          <Place id={current.id} />
        </div>
        <Products id={current.id} />
      </div>
      <Button
        type="remove"
        className="modal-manage-company__remove"
        onClick={deleteCurrentCompany}
      />
    </Modal>
  );
};

export default ManageCompany;
