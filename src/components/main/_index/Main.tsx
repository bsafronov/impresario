import { useAppSelector } from "../../../hooks/redux";
import CreateCompany from "../../modal/createCompany/CreateCompany";
import CreatePlace from "../../modal/createPlace/CreatePlace";
import CreateProduct from "../../modal/createProduct/CreateProduct";
import ManageCompany from "../../modal/manageCompany/_index/ManageCompany";
import ManagePlace from "../../modal/managePlace/ManagePlace";
import ManageProduct from "../../modal/manageProduct/_index/ManageProduct";
import Dashboard from "../dashboard/_index/Dashboard";
import General from "../general/_index/General";
import Toolbar from "../toolbar/Toolbar";
import "./main.scss";

function Main() {
  const {
    isCreateCompany,
    isCompanyManager,
    isPlaceManager,
    isCreatePlace,
    isProductManager,
    isCreateProduct,
  } = useAppSelector(state => state.modalReducer);
  return (
    <main className="main">
      <General />
      <Toolbar />
      <Dashboard />
      {isCreateCompany && <CreateCompany />}
      {isCreatePlace && <CreatePlace />}
      {isCreateProduct && <CreateProduct />}
      {isCompanyManager && <ManageCompany />}
      {isPlaceManager && <ManagePlace />}
      {isProductManager && <ManageProduct />}
    </main>
  );
}

export default Main;
