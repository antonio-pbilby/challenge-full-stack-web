import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

export const PrimaryButton = (props: ButtonProps) => {
  return (<button
    className="bg-lime-800 text-white p-2 rounded-md hover:brightness-110 transition-all"
    {...props}>{props.children}</button>)
}