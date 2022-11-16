import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { modalSlice } from "../../../store/reducers/modal/modalSlice";
import { IPlaceOccupy } from "../../../store/reducers/place/place.interface";
import { placeSlice } from "../../../store/reducers/place/placeSlice";
import Button from "../../UI/button/Button";
import Modal from "../../UI/modal/Modal";
import "./managePlace.scss";

const ManagePlace = () => {
  const { t } = useTranslation();
  const { places } = useAppSelector(state => state.placeReducer);
  const { managingCompanyId } = useAppSelector(state => state.modalReducer);

  const { setIsPlaceManager, setIsCompanyManager, setIsCreatePlace } =
    modalSlice.actions;
  const { occupyPlace } = placeSlice.actions;
  const dispatch = useAppDispatch();

  const [choosenPlace, setChoosenPlace] = useState<number | null>(null);

  const availablePlaces = places.filter(place => !place.companyId);

  function setCompanyPlace() {
    const data: IPlaceOccupy = {
      companyId: managingCompanyId as number,
      placeId: choosenPlace as number,
    };
    dispatch(occupyPlace(data));
    closeModal();
  }

  function openCreatePlace() {
    dispatch(setIsCreatePlace(true));
    dispatch(setIsPlaceManager(false));
  }

  function closeModal() {
    dispatch(setIsPlaceManager(false));
    dispatch(setIsCompanyManager(true));
  }

  return (
    <Modal closeFunc={closeModal} closeButton>
      <h3 className="title">{t("manage-place.title")}</h3>
      <ul className="manage-real-estate__list">
        {availablePlaces.map(place => (
          <li className="manage-real-estate__item" key={place.id}>
            <input
              id={`${place.id}`}
              className="manage-real-estate__radio"
              type="radio"
              name="real-estate"
              checked={place.id === choosenPlace}
              onChange={() => setChoosenPlace(place.id)}
            />
            <label
              className={
                place.id === choosenPlace
                  ? "manage-real-estate__field active"
                  : "manage-real-estate__field"
              }
              htmlFor={`${place.id}`}
            >
              {place.name}
            </label>
          </li>
        ))}
      </ul>
      {availablePlaces.length === 0 && <p>{t("manage-place.desc-null")}</p>}
      <Button onClick={openCreatePlace}>{t("manage-place.buy")}</Button>
      {choosenPlace && (
        <Button type="main-accept" onClick={setCompanyPlace}>
          {t("all.accept")}
        </Button>
      )}
    </Modal>
  );
};

export default ManagePlace;
