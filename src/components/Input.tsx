import React from "react";
import { css } from "goober";
import { colors } from "../theme";

type InputProps = {
  placeholder?: string;
  value: string;
  onChange(e: React.SyntheticEvent<HTMLInputElement>): void;
};

export const Input: React.FC<InputProps> = ({
  onChange,
  value,
  placeholder
}) => {
  return (
    <input
      className={inputStyle}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

const inputStyle = css`
  display: inline-block;
  box-sizing: border-box;
  padding: 8px;
  font-weight: 500;
  width: 100%;
  color: ${colors.lightgray};
  background: ${colors.gray};
  font-size: 1em;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
  &:hover {
  }
`;
