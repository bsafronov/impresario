import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { modalSlice } from "../../../../store/reducers/modal/modalSlice";
import Button from "../../../UI/button/Button";
import ManageCompanyItemBox from "../../../UI/manageCompanyItemBox/ManageCompanyItemBox";
import "./products.scss";

interface IProducts {
  id: number;
}

const Products: FC<IProducts> = ({ id }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.productReducer);
  const {
    setIsCreateProduct,
    setIsCompanyManager,
    setIsProductManager,
    setManagingProductId,
  } = modalSlice.actions;

  const currentProducts = products.filter(product => product.companyId === id);
  function openModalCreateProduct() {
    dispatch(setIsCreateProduct(true));
    dispatch(setIsCompanyManager(false));
  }

  function openModalUpdateProduct(id: number) {
    dispatch(setIsProductManager(true));
    dispatch(setIsCompanyManager(false));
    dispatch(setManagingProductId(id));
  }

  return (
    <ManageCompanyItemBox>
      <div className="products__box">
        <div className="products__content">
          <h3 className="products__title">
            {t("manage-company.products.title")}
          </h3>
          <div className="products__list-box">
            {currentProducts.map(product => (
              <ul
                className="products__item-box"
                key={product.id}
                onClick={() => openModalUpdateProduct(product.id)}
              >
                <li>
                  <span className="products__item-property">
                    {t("manage-product.name")}
                  </span>
                  <span className="products__item-value">{product.name}</span>
                </li>
              </ul>
            ))}
          </div>
        </div>
        <Button onClick={openModalCreateProduct}>
          {t("manage-company.products.add-button")}
        </Button>
      </div>
    </ManageCompanyItemBox>
  );
};

export default Products;
