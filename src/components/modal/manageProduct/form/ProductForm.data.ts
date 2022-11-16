import { IProductForm } from "./ProductForm.interface";

export const productTaskData = (props: IProductForm) => {
  const minSalary = Math.round(props.calc.conditions.minSalary);
  const maxSalary = Math.round(Math.min(
    props.balance - +props.costs,
    props.balance - props.calc.conditions.minCosts
  ))
  const maxCosts = Math.round(Math.min(props.calc.conditions.maxCosts, props.balance - +props.salary));
  const content = [
    {
      text: "Расходы на материалы",
      max: maxCosts,
      min: props.calc.conditions.minCosts,
      placeholder:
      props.balance >= props.calc.conditions.minCosts &&
        maxCosts >= props.calc.conditions.minCosts
          ? `От ${props.calc.conditions.minCosts} до ${maxCosts} $`
          : "Недостаточно средств",
      value: props.costs,
      set: props.setCosts,
      prompt: "Ограничены балансом компании и площадью размещения",
    },
    {
      text: "Зарплата работникам",
      min: minSalary,
      max: maxSalary,
      placeholder:
      props.balance >= props.calc.conditions.minCosts
          ? `От ${minSalary} до ${maxSalary} $`
          : "Пополните баланс",
      value: props.salary,
      set: props.setSalary,
      prompt: "Ограничена балансом компании",
    },
    {
      text: "Добавочная стоимость",
      value: props.addedValue,
      placeholder:
      props.balance >= props.calc.conditions.minCosts
          ? "От 0 до " + props.calc.conditions.maxAddedValue + " %"
          : "Иначе не сработаемся...",
      set: props.setAddedValue,
      max: props.calc.conditions.maxAddedValue,
      min: 0,
      prompt: "Ограничена уровнем рекламы компании",
    },
  ];

  return {content}
}