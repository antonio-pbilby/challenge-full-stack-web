import { ReactNode } from "react"

interface InputWrapperProps {
  children: ReactNode
}

export const InputWrapper = ({ children }: InputWrapperProps) => {
  return <div className="flex flex-col">
    {children}
  </div>
}