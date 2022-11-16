import { FC, PropsWithChildren } from "react";
import "./manageCompanyItemBox.scss";

const ManageCompanyItemBox: FC<PropsWithChildren> = props => {
  return <div className="manage-company-item__box">{props.children}</div>;
};

export default ManageCompanyItemBox;
