import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICompanies,
  ICompany,
  ICompanyAd,
  ICompanyMoney,
} from "./company.interface";

const initialState: ICompanies = {
  totalCreated: 0,
  freeMoney: 25000,
  companies: [],
};

export const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setStateCompanies(state, action: PayloadAction<ICompanies | null>) {
      if (action.payload) {
        state.totalCreated = action.payload.totalCreated;
        state.freeMoney = action.payload.freeMoney;
        state.companies = action.payload.companies;
      } else {
        state.totalCreated = initialState.totalCreated;
        state.freeMoney = initialState.freeMoney;
        state.companies = initialState.companies;
      }
    },
    createCompany(state, action: PayloadAction<string>) {
      const companyData: ICompany = {
        id: state.totalCreated + 1,
        name: action.payload,
        balance: 0,
        adLevel: 10,
      };
      state.totalCreated += 1;
      state.companies = [...state.companies, companyData];
    },
    deleteCompany(state, action: PayloadAction<number>) {
      state.companies = state.companies.filter(
        company => company.id !== action.payload
      );
    },
    moneyToCompany(state, action: PayloadAction<ICompanyMoney>) {
      state.companies = state.companies.map(company => {
        if (company.id === action.payload.companyId) {
          company.balance += action.payload.amount;
        }
        return company;
      });
    },
    moneyFromCompany(state, action: PayloadAction<ICompanyMoney>) {
      state.companies = state.companies.map(company => {
        if (company.id === action.payload.companyId) {
          company.balance -= action.payload.amount;
        }
        return company;
      });
    },
    moneyToAll(state, action: PayloadAction<ICompanyMoney>) {
      state.freeMoney += action.payload.amount;
    },
    moneyFromAll(state, action: PayloadAction<ICompanyMoney>) {
      state.freeMoney -= action.payload.amount;
    },
    moneyFromCompanyToAll(state, action: PayloadAction<ICompanyMoney>) {
      state.companies = state.companies.map(company => {
        if (company.id === action.payload.companyId) {
          company.balance -= action.payload.amount;
          state.freeMoney += action.payload.amount;
        }
        return company;
      });
    },
    moneyFromAllToCompany(state, action: PayloadAction<ICompanyMoney>) {
      state.companies = state.companies.map(company => {
        if (company.id === action.payload.companyId) {
          company.balance += action.payload.amount;
          state.freeMoney -= action.payload.amount;
        }
        return company;
      });
    },
    setAdLvl(state, action: PayloadAction<ICompanyAd>) {
      state.companies = state.companies.map(company => {
        if (company.id === action.payload.companyId) {
          company.adLevel += action.payload.amount;
        }
        return company;
      });
    },
  },
});

export default companySlice.reducer;
