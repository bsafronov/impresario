import General from "../../components/general/General";
import CreateCompany from "../../components/modal/createCompany/CreateCompany";
import CreatePlace from "../../components/modal/createPlace/CreatePlace";
import CreateProduct from "../../components/modal/createProduct/CreateProduct";
import ManagePlace from "../../components/modal/managePlace/ManagePlace";
import Toolbar from "../../components/toolbar/Toolbar";
import { useAppSelector } from "../../hooks/redux";
import Dashboard from "../dashboard/Dashboard";
import ManageCompany from "../manageCompany/ManageCompany";
import ManageProduct from "../manageProduct/ManageProduct";
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
