import React from "react";
import { css } from "goober";
import { colors } from "../theme";

type LayoutProps = {
  title: string;
};

export const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <main className={layoutClass}>
      <header>
        <h1>{title}</h1>
      </header>
      {children}
    </main>
  );
};

const layoutClass = css`
  background: ${colors.darkgray};
  text-align: center;
  min-height: 100vh;
  padding: 10px;
  color: white;

  h1 {
    font-weight: bold;
    line-height: 1;
  }
`;
