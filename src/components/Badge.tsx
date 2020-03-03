import React from "react";
import { css } from "goober";
import { colors } from "../theme";

export const Badge: React.FC = ({ children }) => {
  return <span className={badgeClass}>{children}</span>;
};

const badgeClass = css`
  position: inline-block;
  border-radius: 0.7rem;
  background: ${colors.darkblue};
  color: ${colors.blue};
  margin: 3px;
  font-size: 0.9rem;
  padding: 2px 8px;
  line-height: 0.9rem;
  font-weight: 600;
`;
