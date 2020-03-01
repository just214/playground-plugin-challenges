import React from "react";
import { css } from "goober";
import { colors } from "../theme";

export const Title: React.FC<{
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, color, style }) => {
  return (
    <h1 className={titleStyle(color || colors.lightgray)} style={style}>
      {children}
    </h1>
  );
};

const titleStyle = (color: string) => css`
  font-weight: 500;
  color: ${color} !important;
  line-height: 1;
  font-size: 2rem !important;
  margin: 20px 0px 10px 0px;
`;
