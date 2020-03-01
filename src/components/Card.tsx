import React from "react";
import { css } from "goober";

export const Card: React.FC = ({ children }) => {
  return <div className={rulesStyles}>{children}</div>;
};

// These colors are just for the shadow colors of this card.
// That is why they are not in the theme.
const lighterGray = "rgba(43, 43, 43, 0.4)";
const darkerGray = "rgba(0, 0, 0, 0.4)";

const rulesStyles = css`
  border-radius: 0.4rem;
  border: 1px solid ${lighterGray};
  /* neumorphic effect- It's the new buzzword */
  box-shadow: -4px -4px 10px 0px ${lighterGray}, 6px 6px 16px 0px ${darkerGray};
  padding: 1rem;
  margin-bottom: 15px;
`;
