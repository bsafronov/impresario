import { useAppSelector } from "../../../../hooks/redux";
import CompanyList from "../companyList/CompanyList";
import News from "../news/News";
import s from "./Dashboard.module.scss";

const Dashboard = () => {
  const { companies } = useAppSelector(state => state.companyReducer);
  if (!companies.length) return null;
  return (
    <section className={s.item}>
      <CompanyList />
      <News />
    </section>
  );
};

export default Dashboard;
