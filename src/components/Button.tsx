import React, { CSSProperties } from "react";
import { css } from "goober";
import { colors } from "../theme";

type ButtonProps = {
  onClick(): void;
  style?: CSSProperties;
  disabled?: boolean;
  size?: "lg";
  variant?: "link";
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  style,
  disabled,
  size,
  variant
}) => {
  return (
    <button
      className={buttonClass(disabled || false, size, variant)}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const buttonClass = (disabled: boolean, size?: "lg", variant?: "link") => css`
  display: inline-block;
  padding: ${size === "lg" || variant === "link" ? "8px" : "5px"};
  min-width: 120px;
  text-align: ${variant === "link" ? "left" : "center"};
  width: 100%;
  color: ${disabled ? "#666" : colors.blue};
  outline: none;
  background: transparent;
  font-size: ${size === "lg" || variant === "link" ? "1em" : ".9em"};
  font-weight: ${size === "lg" ? 700 : 500};
  border: ${variant === "link" ? "none" : `1px solid ${colors.blue}`};
  border-radius: 4px;
  cursor: ${disabled ? "default" : "pointer"};
  transition: background-color 0.3s;
  &:hover {
    background: ${disabled || variant === "link" ? "transparent" : colors.gray};
  }
`;
