import React from "react";
import { css } from "goober";
import { colors } from "../theme";

export const Label = ({ children }: { children: React.ReactNode }) => {
  return <h3 className={labelStyle}>{children}</h3>;
};

const labelStyle = css`
  /* Collides with Playground styles (.raised) */
  margin: 5px 0px !important;
  padding: 5px 0px;
  text-transform: uppercase;
  color: ${colors.warning};
`;
