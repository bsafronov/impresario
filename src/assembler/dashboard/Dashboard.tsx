import CompanyList from "../../components/companyList/CompanyList";
import News from "../../components/news/News";
import { useAppSelector } from "../../hooks/redux";
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
