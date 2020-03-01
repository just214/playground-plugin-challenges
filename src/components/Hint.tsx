import React from "react";
import { css } from "goober";
import { colors } from "../theme";

export const Hint: React.FC = ({ children }) => {
  return <div className={hintStyle}>{children}</div>;
};

const hintStyle = css`
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0px;
  color: ${colors.blue};
`;
