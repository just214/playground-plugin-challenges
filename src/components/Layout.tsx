import React from "react";
import { css } from "goober";
import { colors } from "../theme";

type LayoutProps = {
  title: string;
};

export const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <div className={layoutClass}>
      <main>
        <header>
          <h1>{title}</h1>
        </header>
        {children}
      </main>
    </div>
  );
};

const layoutClass = css`
  background: ${colors.darkgray};
  text-align: center;
  min-height: 100vh;
  padding: 10px;
  color: ${colors.lightgray};

  main {
    max-width: 80%;
    margin: 0 auto;
  }

  h1 {
    font-weight: 500;
    color: ${colors.blue};
    line-height: 1;
  }
`;
