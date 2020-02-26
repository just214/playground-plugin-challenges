import React from "react";
import { css } from "goober";
// import { colors } from "../theme";

export const ErrorText: React.FC = ({ children }) => {
  return <p className={errorClass}>{children}</p>;
};

const errorClass = css`
  margin: 5px;
  padding: 0px;
  font-size: 0.9rem;
  color: #f5f5f5;
  font-weight: 500;
`;
