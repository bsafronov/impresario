import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  ICompany,
  ICompanyMoney,
} from "../../../../store/reducers/company/company.interface";
import { companySlice } from "../../../../store/reducers/company/companySlice";
import { modalSlice } from "../../../../store/reducers/modal/modalSlice";
import Button from "../../../UI/button/Button";
import Modal from "../../../UI/modal/Modal";
import CompanyName from "../companyName/CompanyName";
import MoneyTransfer from "../moneyTransfer/MoneyTransfer";
import Place from "../place/Place";
import Products from "../products/Products";
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
    [managingCompanyId]
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
          <CompanyName name={current.name} />
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
