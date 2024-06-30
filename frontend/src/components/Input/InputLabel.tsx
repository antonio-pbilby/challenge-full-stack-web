import { Label } from "@radix-ui/react-label"
import { ReactNode } from "react";

interface InputLabelProps {
  htmlFor: string;
  children: ReactNode;
}

export const InputLabel = ({ children, htmlFor }: InputLabelProps) => {
  return <Label htmlFor={htmlFor}>{children}</Label>
}