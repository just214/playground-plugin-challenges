import React from "react";
import { css } from "goober";
import { colors } from "../theme";

export const Badge: React.FC = ({ children }) => {
  return <span className={badgeClass}>{children}</span>;
};

const badgeClass = css`
  position: inline-block;
  /* border-radius: 0.5rem;
  background: ${colors.darkblue}; */
  color: ${colors.blue};
  margin: 3px;
  font-size: .8rem;
  padding: 2px 6px;
  line-height: 0.7rem;
  font-weight: 600;
`;
