import { ICompany } from "../../store/reducers/company/company.interface";
import { IProduct } from "../../store/reducers/product/product.interface";
import { useAppSelector } from "../redux";
import { IProductConditions, IProductExpected, IProductFinalState, IProductFunc, IProductModifier } from "./productCalculations.interface";

const MIN_COSTS = 1000;
const PLACE_PRICE = 5000;
const MAX_COSTS_BY_PLACE = 10000;

export function useProductCalculations(costs: number, salary: number, addedValue: number, company: ICompany, product: IProduct) {
  const {inflation} = useAppSelector(state => state.rulesReducer)
  // Expected (Standart) income
  const recommendedSalary = costs * 0.15;
  const workersEfficiency = recommendedSalary? Math.floor(
    (salary / recommendedSalary) ** (1 / 2) * 100
  ) : 0;
  const beforeTaxes = costs + (costs * addedValue) / 100;
  const afterTaxes = beforeTaxes * 0.9;
  const profit = afterTaxes - costs;
  const netProfit = profit - salary;
    
  // Modifiers
  const priceModifier = (100 - addedValue) / 10;
  const salaryModifier = (workersEfficiency - 100) / 100;
  const adLvlUpBySalaryModifier = (1 + salaryModifier)**(1/2)

  // Conditions
  const minCoefficient = afterTaxes && (afterTaxes - profit + salary) / afterTaxes;
  const minCosts = Math.round((inflation + 100) / 100 * MIN_COSTS);
  const minSalary = Math.round(Math.max(+costs * 0.05, minCosts * 0.05));

  const productionMaxPercent = 90 + 10 * (priceModifier + company.adLevel);
  const maxAddedValue = 100 + Math.round(company.adLevel) * 10;
  
  
  const maxCostsByPlace = MAX_COSTS_BY_PLACE * product.area;
  const maxCosts = Math.min(maxCostsByPlace, company.balance * .95);

  // Final state
  const productionTimeValue = 30 + (30 - 30 * workersEfficiency / 100)
  const productionTime = productionTimeValue > 10 ? productionTimeValue : 5;
  const adLvlUp = (costs / PLACE_PRICE) ** (1/2) * adLvlUpBySalaryModifier / 2
  
  const profitChanceValue = (productionMaxPercent - minCoefficient * 100)/ productionMaxPercent;
  const profitChance = minCoefficient <= 1 ? profitChanceValue : 0;
    
  function isValid() {
    if (costs + salary > company.balance) return false;
    if (costs < MIN_COSTS || costs > maxCosts) return false
    if (salary < minSalary) return false
    if (addedValue < 0 || addedValue > maxAddedValue) return false

    return true
  }

  const expected:IProductExpected = {
    recommendedSalary, workersEfficiency, beforeTaxes, afterTaxes, profit, netProfit
  }

  const modifier:IProductModifier = {
    priceModifier, salaryModifier, 
  }

  const conditions:IProductConditions = {
    minCoefficient, minSalary, productionMaxPercent, maxAddedValue, maxCosts, minCosts
  }

  const finalState:IProductFinalState = {
    productionTime, adLvlUp, profitChance
  }
  
  const func:IProductFunc = {
    isValid
  }
  return {expected, modifier, conditions, finalState, func}
}