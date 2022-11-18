export interface ICompanies {
  totalCreated: number;
  freeMoney: number;
  companies: ICompany[];
}

export interface ICompany {
  id: number;
  name: string;
  balance: number;
  adLevel: number;
}

export interface ICompanyTransferMoney {
  type: TransferTypes;
  object: TransferObject;
  companyId?: number;
  amount: number;
}

export interface ICompanyMoney {
  companyId?: number;
  amount: number;
}

export interface ICompanyAd {
  companyId: number;
  amount: number;
}

export type TransferTypes = "to" | "from";
export type TransferObject = "company" | "free money";
