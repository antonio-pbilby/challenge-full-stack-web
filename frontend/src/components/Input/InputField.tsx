import { InputHTMLAttributes, forwardRef } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> { }

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
  return (<input className="px-2 py-1 rounded-sm" {...props} ref={ref} />);
})
InputField.displayName = "InputField"