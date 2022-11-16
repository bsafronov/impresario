export interface IMainButton {
  children?: any,
  onClick: () => void,
  disabled?: boolean,
  className?: string,
  type?: IButtonType
}

export type IButtonType = "main-accept" | "add-accept" | "remove"