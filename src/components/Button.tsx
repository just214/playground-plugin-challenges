import React from "react";
import { css } from "goober";
import { colors } from "../theme";

type ButtonProps = {
  onClick(): void;
};

export const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

const buttonClass = css`
  display: inline-block;
  margin: 5px;
  padding: 5px;
  min-width: 120px;
  color: ${colors.blue};
  background: transparent;
  font-size: 0.9rem;
  border: 1px solid ${colors.blue};
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background: ${colors.gray};
  }
`;
