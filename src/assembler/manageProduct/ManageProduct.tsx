import { useEffect, useState } from "react";
import Button from "../../components/UI/button/Button";
import {
  useCurrentCompany,
  useCurrentProduct,
  useCurrentTasks,
} from "../../hooks/findCurrent/findCurrent";
import { useProductCalculations } from "../../hooks/productCalculations/productCalculations";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { modalSlice } from "../../store/reducers/modal/modalSlice";
import { productSlice } from "../../store/reducers/product/productSlice";

import { useTranslation } from "react-i18next";
import ExpectedIncome from "../../components/modal/expectedIncome/ExpectedIncome";
import ProductForm from "../../components/modal/form/ProductForm";
import ProductProgress from "../../components/modal/progress/ProductProgress";
import ProductSpecs from "../../components/modal/specs/ProductSpecs";
import ProductTasks from "../../components/modal/tasks/ProductTasks";
import Modal from "../../components/UI/modal/Modal";
import LogoArrow from "../../components/UI/svg/arrow/LogoArrow";
import s from "./ManageProduct.module.scss";

const ManageProduct = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const company = useCurrentCompany();
  const product = useCurrentProduct();
  const tasks = useCurrentTasks();

  const { managingProductId } = useAppSelector(state => state.modalReducer);
  const { setManagingProductId, setIsProductManager, setIsCompanyManager } =
    modalSlice.actions;
  const { deleteProduct } = productSlice.actions;

  const [costs, setCosts] = useState<string>("");
  const [salary, setSalary] = useState<string>("");
  const [addedValue, setAddedValue] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const calc = useProductCalculations(
    +costs,
    +salary,
    +addedValue,
    company,
    product
  );

  useEffect(() => {
    const isValid = calc.func.isValid();
    if (isValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    // eslint-disable-next-line
  }, [costs, addedValue, salary]);

  function deleteCurrentProduct() {
    dispatch(deleteProduct(managingProductId as number));
    closeModal();
  }

  function closeModal() {
    dispatch(setManagingProductId(null));
    dispatch(setIsProductManager(false));
    dispatch(setIsCompanyManager(true));
  }
  return (
    <Modal closeFunc={closeModal} closeButton>
      <div className={s.box}>
        <ProductSpecs company={company} product={product} />
        {(tasks.activeTasks.length > 0 || tasks.pendingTasks.length > 0) && (
          <ProductTasks tasks={tasks} />
        )}
        <div className={s.form__box}>
          <h3 className={s.form__title}>{t("title.prod_start")}</h3>
          <div className={s.task}>
            <ProductForm
              balance={company.balance}
              calc={calc}
              addedValue={addedValue}
              setAddedValue={setAddedValue}
              costs={costs}
              setCosts={setCosts}
              salary={salary}
              setSalary={setSalary}
            />
            <LogoArrow />
            <ProductProgress
              calc={calc}
              isLoader={isValid}
              costs={+costs}
              salary={+salary}
            />
          </div>
        </div>
        <ExpectedIncome calc={calc.expected} isLoader={isValid} />
        <Button
          type="remove"
          className="manage-products__remove"
          onClick={deleteCurrentProduct}
        />
      </div>
    </Modal>
  );
};

export default ManageProduct;
