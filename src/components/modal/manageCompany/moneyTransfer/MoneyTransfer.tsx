import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { shortBalance } from "../../../../functions/representation";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  ICompany,
  ICompanyMoney,
} from "../../../../store/reducers/company/company.interface";
import { companySlice } from "../../../../store/reducers/company/companySlice";
import Button from "../../../UI/button/Button";
import Input from "../../../UI/input/Input";
import ManageCompanyItemBox from "../../../UI/manageCompanyItemBox/ManageCompanyItemBox";
import ExchangeArrow from "../../../UI/svg/exchangeArrow/ExchangeArrow";
import s from "./MoneyTransfer.module.scss";
import "./moneyTransfer.scss";

interface IMoneyTransfer {
  company: ICompany;
}

const MoneyTransfer: FC<IMoneyTransfer> = ({ company }) => {
  const { t } = useTranslation();
  const { moneyFromCompanyToAll, moneyFromAllToCompany } = companySlice.actions;
  const { freeMoney } = useAppSelector(state => state.companyReducer);
  const [isTransferToCompany, setIsTransferToCompany] = useState<boolean>(true);
  const [currentBalance, setCurrentBalance] = useState<string>("");
  const dispatch = useAppDispatch();

  function transferToFrom() {
    const data: ICompanyMoney = {
      amount: +currentBalance,
      companyId: company.id,
    };

    isTransferToCompany
      ? dispatch(moneyFromAllToCompany(data))
      : dispatch(moneyFromCompanyToAll(data));

    setCurrentBalance("");
  }

  function isValidated() {
    if (+currentBalance < 1) return;

    if (isTransferToCompany) {
      return freeMoney >= +currentBalance;
    }

    if (!isTransferToCompany) {
      return company.balance >= +currentBalance;
    }
  }

  return (
    <ManageCompanyItemBox>
      <div className={s.exchange}>
        <ExchangeArrow
          reversed={isTransferToCompany}
          onClick={() => setIsTransferToCompany(!isTransferToCompany)}
        />
        <p className={s.label}>
          {t("manage-company.transfer.from")}
          {isTransferToCompany
            ? t("manage-company.transfer.free-money") +
              "$" +
              shortBalance(freeMoney)
            : t("manage-company.transfer.company-money") +
              "$" +
              shortBalance(company.balance)}
          <br />
          {t("manage-company.transfer.to")}
          {isTransferToCompany
            ? t("manage-company.transfer.company-money") +
              "$" +
              shortBalance(company.balance)
            : t("manage-company.transfer.free-money") +
              "$" +
              shortBalance(freeMoney)}
        </p>
      </div>
      <p className={s.form}>
        <Input
          className={s.input}
          type="number"
          placeholder={
            isTransferToCompany
              ? t("manage-company.transfer.placeholder-to")
              : t("manage-company.transfer.placeholder-from")
          }
          min={0}
          max={isTransferToCompany ? freeMoney : company.balance}
          value={currentBalance}
          onChange={e => setCurrentBalance(e.target.value)}
        />
        <Button
          className={s.accept}
          onClick={() => transferToFrom()}
          disabled={!isValidated()}
        >
          {t("manage-company.transfer.transfer-button")}
        </Button>
      </p>
    </ManageCompanyItemBox>
  );
};

export default MoneyTransfer;
