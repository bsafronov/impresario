import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../hooks/redux";
import { companySlice } from "../../../store/reducers/company/companySlice";
import { modalSlice } from "../../../store/reducers/modal/modalSlice";
import Button from "../../UI/button/Button";
import Modal from "../../UI/modal/Modal";
import s from "./CreateCompany.module.scss";

const CreateCompany = () => {
  const { t } = useTranslation();
  const [companyName, setCompanyName] = useState<string>("");
  const { setIsCreateCompany } = modalSlice.actions;
  const { createCompany } = companySlice.actions;
  const dispatch = useAppDispatch();

  function isFormValidated(): boolean {
    return companyName !== "";
  }

  function submitCreateCompany() {
    dispatch(createCompany(companyName));
    closeModal();
  }

  function closeModal() {
    dispatch(setIsCreateCompany(false));
  }

  return (
    <Modal closeFunc={closeModal} closeButton centered>
      <div className={s.box}>
        <div className={s.point}>
          <label className={s.label}>{t("text.create_title")}: </label>
          <input
            className={s.input}
            type="text"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
          />
        </div>
        <Button disabled={!isFormValidated()} onClick={submitCreateCompany}>
          {t("button.create")}
        </Button>
      </div>
    </Modal>
  );
};

export default CreateCompany;
