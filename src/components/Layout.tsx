import React from "react";
import { css } from "goober";
import { colors } from "../theme";

type LayoutProps = {
  title?: string;
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
  min-height: 90vh;
  padding: 20px;
  color: ${colors.lightgray};

  main {
    max-width: 420px;
    margin: 0 auto;

    h1 {
      font-weight: 500;
      color: ${colors.lightgray};
      line-height: 1;
      font-size: 30px;
      margin: 20px 0px 10px 0px;
    }
  }
`;
