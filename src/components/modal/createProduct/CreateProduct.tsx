import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { modalSlice } from "../../../store/reducers/modal/modalSlice";
import { IPlaceAllocate } from "../../../store/reducers/place/place.interface";
import { placeSlice } from "../../../store/reducers/place/placeSlice";
import { IProductCreateNew } from "../../../store/reducers/product/product.interface";
import { productSlice } from "../../../store/reducers/product/productSlice";
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";
import Modal from "../../UI/modal/Modal";
import SvgTriangle from "../../UI/svg/triangle/SvgTriangle";
import s from "./CreateProduct.module.scss";

interface IPlace {
  id: number | null;
  freeUnits: number | null;
  name: string | null;
}

const CreateProduct = () => {
  const { t } = useTranslation();
  const { setIsCompanyManager, setIsCreateProduct, setIsPlaceManager } =
    modalSlice.actions;
  const { createProduct } = productSlice.actions;
  const { giveSpaceToProduct } = placeSlice.actions;

  const { managingCompanyId } = useAppSelector(state => state.modalReducer);
  const { places } = useAppSelector(state => state.placeReducer);

  const [name, setName] = useState<string>("");
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [choosenPlace, setChoosenPlace] = useState<IPlace>();
  const [productArea, setProductArea] = useState<number>(0);
  const dispatch = useAppDispatch();

  const freePlaces = places.filter(
    place => place.freeSpace > 0 && place.companyId === managingCompanyId
  );

  function createNewProduct() {
    const data: IProductCreateNew = {
      name,
      companyId: managingCompanyId as number,
      placeId: choosenPlace?.id as number,
      area: productArea,
    };

    const placeData: IPlaceAllocate = {
      placeId: choosenPlace?.id as number,
      space: productArea,
    };

    dispatch(createProduct(data));
    dispatch(giveSpaceToProduct(placeData));
    closeModal();
  }

  function choosePlace(id: number, units: number, name: string) {
    const placeData: IPlace = {
      id,
      freeUnits: units,
      name,
    };
    setChoosenPlace(placeData);
    setIsSelect(false);
  }

  function isValidated() {
    return name !== "" && productArea > 0;
  }

  function openCreatePlace() {
    dispatch(setIsCreateProduct(false));
    dispatch(setIsPlaceManager(true));
  }

  function closeModal() {
    dispatch(setIsCreateProduct(false));
    dispatch(setIsCompanyManager(true));
  }

  return (
    <Modal closeFunc={closeModal} closeButton centered>
      <div className={s.box}>
        <div className={s.select__box}>
          {freePlaces.length > 0 ? (
            <>
              <p className={s.input__form}>
                <span className={s.label}>{t("text.create_title")}: </span>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type="text"
                />
              </p>
              <div>
                <span className={s.label}>{t("title.location")}: </span>
                <div className={s.select}>
                  <div
                    className={
                      isSelect
                        ? [s.select__title, s.select__title_active].join(" ")
                        : s.select__title
                    }
                    onClick={() => setIsSelect(!isSelect)}
                  >
                    <span className={s.title__name}>
                      {choosenPlace ? choosenPlace.name : t("text.choose")}
                    </span>
                    <span className={s.select__svg}>
                      <SvgTriangle />
                    </span>
                  </div>
                  <ul
                    className={
                      isSelect
                        ? [s.options, s.options__active].join(" ")
                        : s.options
                    }
                  >
                    {freePlaces.map(place => (
                      <li
                        className={s.options__item}
                        key={place.id}
                        onClick={() =>
                          choosePlace(place.id, place.freeSpace, place.name)
                        }
                      >
                        <span className={s.value}>{place.name}</span>
                        <span className={s.options__desc}>
                          ({place.freeSpace} {t("text.units")})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {choosenPlace && (
                <p className="create-product__area">
                  <span className={s.label}>{t("stats.area")}: </span>
                  <input
                    className="input"
                    type="range"
                    min={0}
                    max={(choosenPlace && choosenPlace.freeUnits) || 1}
                    value={productArea}
                    onChange={e => setProductArea(+e.target.value)}
                  />
                  <span>{productArea}</span>
                </p>
              )}
              <Button onClick={createNewProduct} disabled={!isValidated()}>
                {t("button.create")}
              </Button>
            </>
          ) : (
            <>
              <span className={s.null}>{t("text.real_estate_null_2")}</span>
              <Button onClick={openCreatePlace}>{t("button.add")}</Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CreateProduct;
