import { ReactNode } from "react"

interface InputErrorProps {
  children: ReactNode;
}

export const InputError = ({ children }: InputErrorProps) => {
  return <span className="text-red-500 text-sm">{children}</span>
}