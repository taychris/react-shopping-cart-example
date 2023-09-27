import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string
}

const Button = ({ className, children, ...props }: Props) => {
  return <button {...props} className={`${className} rounded-full bg-gray-800 p-3 text-white font-light`}>{children}</button>;
};
export default Button;
