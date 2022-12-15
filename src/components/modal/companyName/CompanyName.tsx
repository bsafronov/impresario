import { FC } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../UI/button/Button";
import ManageCompanyItemBox from "../../UI/manageCompanyItemBox/ManageCompanyItemBox";
import "./companyName.scss";

interface ICompanyName {
  name: string;
}
const CompanyName: FC<ICompanyName> = ({ name }) => {
  const { t } = useTranslation();

  function changeName() {}

  return (
    <ManageCompanyItemBox>
      <p className="company-name__form">
        <span>{t("manage-company.name")}</span>
        <Button onClick={changeName}>{name}</Button>
      </p>
    </ManageCompanyItemBox>
  );
};

export default CompanyName;
