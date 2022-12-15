import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { modalSlice } from "../../../store/reducers/modal/modalSlice";
import Button from "../../UI/button/Button";

import ManageCompanyItemBox from "../../UI/manageCompanyItemBox/ManageCompanyItemBox";
import s from "./Place.module.scss";

interface IPlace {
  id: number;
}

const Place: FC<IPlace> = ({ id }) => {
  const { t } = useTranslation();
  const { places } = useAppSelector(state => state.placeReducer);
  const { setIsPlaceManager, setIsCompanyManager } = modalSlice.actions;
  const dispatch = useAppDispatch();

  const currentPlaces = places.filter(place => place.companyId === id);

  function openPlaceManager() {
    dispatch(setIsPlaceManager(true));
    dispatch(setIsCompanyManager(false));
  }

  return (
    <ManageCompanyItemBox>
      <div className={s.box}>
        <h3 className={s.title}>{t("title.real_estate")}</h3>
        <div className={s.inner}>
          {currentPlaces.length > 0 ? (
            <ul className={s.list}>
              {currentPlaces.map(place => (
                <li className={s.item} key={place.id}>
                  <ul>
                    <li className={s.item__line}>
                      <span className={s.property}>{t("stats.name")}: </span>
                      <span className={s.value}>{place.name}</span>
                    </li>
                    <li className={s.item__line}>
                      <span className={s.property}>{t("stats.rank")}: </span>
                      <span className={s.value}>{place.rank}</span>
                    </li>
                    <li className={s.item__line}>
                      <span className={s.property}>{t("stats.area")}: </span>
                      <span className={s.value}>{place.rank ** 2}</span>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p className={s.null}>{t("text.null")}</p>
          )}
        </div>
        <Button onClick={openPlaceManager}>{t("button.add")}</Button>
      </div>
    </ManageCompanyItemBox>
  );
};

export default Place;
