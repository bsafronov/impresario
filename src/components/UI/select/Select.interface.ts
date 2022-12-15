import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export interface ISelect {
  initial?: string | number;
  options: ISelectOption[];
  action: ActionCreatorWithPayload<any>;
}

export interface ISelectOption {
  title: string;
  subtitle?: string;
  action: any;
}
