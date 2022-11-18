import CompanyList from "../companyList/CompanyList";
import "./dashboard.scss";

const Dashboard = () => {
  return (
    <section className="dashboard">
      <CompanyList />
      {/* <News /> */}
    </section>
  );
};

export default Dashboard;
