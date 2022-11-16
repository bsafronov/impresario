import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  ICompany,
  ICompanyMoney,
} from "../../../store/reducers/company/company.interface";
import { companySlice } from "../../../store/reducers/company/companySlice";
import { modalSlice } from "../../../store/reducers/modal/modalSlice";
import { IPlaceCreateNew } from "../../../store/reducers/place/place.interface";
import { placeSlice } from "../../../store/reducers/place/placeSlice";
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";
import Modal from "../../UI/modal/Modal";
import s from "./CreatePlace.module.scss";

const CreatePlace = () => {
  const { t } = useTranslation();
  const { setIsCreatePlace, setIsPlaceManager } = modalSlice.actions;
  const { addPlace } = placeSlice.actions;
  const { moneyFromAll, moneyFromCompany } = companySlice.actions;

  const { managingCompanyId } = useAppSelector(state => state.modalReducer);
  const { freeMoney, companies } = useAppSelector(
    state => state.companyReducer
  );
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>("");
  const [rank, setRank] = useState<number>(0);
  const [isFromCompany, setIsFromCompany] = useState<boolean>(true);

  const currentCompany = companies.find(
    company => company.id === managingCompanyId
  ) as ICompany;
  const balance = isFromCompany ? currentCompany.balance : freeMoney;
  const price = rank ** 3 * 3000;

  function submitCreatePlace() {
    const data: IPlaceCreateNew = {
      name,
      rank,
    };
    const moneyData: ICompanyMoney = {
      amount: price,
      companyId: currentCompany.id,
    };

    dispatch(addPlace(data));
    isFromCompany
      ? dispatch(moneyFromCompany(moneyData))
      : dispatch(moneyFromAll(moneyData));

    closeModal();
  }

  function isValidated() {
    return name !== "" && rank !== 0;
  }

  function changeOption(isTrue: boolean) {
    setIsFromCompany(isTrue);
    setRank(0);
  }

  function closeModal() {
    dispatch(setIsCreatePlace(false));
    dispatch(setIsPlaceManager(true));
  }

  return (
    <Modal closeFunc={closeModal} closeButton>
      <div className={s.box}>
        <h3 className={s.title}>{t("create-place.title")}</h3>
        <div className={s.select__box}>
          <p>{t("create-place.selector-text")}</p>
          <p className={s.select}>
            <button
              className={isFromCompany ? s.option__active : s.option}
              onClick={() => changeOption(true)}
            >
              {t("create-place.select-company")}
            </button>
            <button
              className={!isFromCompany ? s.option__active : s.option}
              onClick={() => changeOption(false)}
            >
              {t("create-place.select-free-money")}
            </button>
          </p>
          <p className={s.balance}>
            <span>{t("create-place.balance")}</span>
            <span className={s.value}>
              ${balance}
              <span className={s.costs}>{rank > 0 && ` -${price}$`}</span>
            </span>
          </p>
        </div>
        <ul className={s.form}>
          <li className={s.item}>
            <span>{t("create-place.name")}</span>
            <Input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </li>
          <li className={s.item}>
            <span>{t("create-place.rank")}</span>
            <Input
              type="range"
              min={0}
              max={Math.floor(Math.pow(balance / 3000, 1 / 3))}
              value={rank}
              onChange={e => setRank(+e.target.value)}
            />
            <span>
              {rank} {rank > 0 && `(${rank ** 2} ${t("create-place.units")})`}
            </span>
          </li>
        </ul>
        {isValidated() && (
          <Button onClick={submitCreatePlace}>{t("create-place.buy")}</Button>
        )}
      </div>
    </Modal>
  );
};

export default CreatePlace;
