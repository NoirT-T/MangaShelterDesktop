import * as React from "react";

interface IButtonProps {
  disable?: boolean,
  className: string,
  type?: 'button',
  onClick?: void
}

const Button: React.SFC<IButtonProps> = (prop) => {
  return (
    <button className={prop.className} type={prop.type }/>
  )
};

export default Button;
