import React from "react";
import Typewriter from "typewriter-effect";
import { css } from "goober";
import { Layout } from "./Layout";
import { colors } from "../theme";

const Title = ({ children }: { children: React.ReactNode }) => {
  return <h3 className={titleClass}>{children}</h3>;
};

export const Landing = () => {
  return (
    <Layout title={`TSChallenges`}>
      <div className={wrapperClass}>
        <Title>Objective</Title>
        <p>
          For each challenge, you will be provided some untyped TypeScript code.
          Supply the necessary type annotations to make all of the errors go
          away.
        </p>

        <Title>Rules</Title>
        <ol style={{ listStylePosition: "inside" }}>
          <li>You cannot modify the JavaScript code.</li>
          <li>You cannot use the prohibited types.</li>
        </ol>

        <div className={dividerClass} />
        <div className={startClass}>
          Type
          <span className="typewriter">
            <Typewriter
              options={{
                strings: ["start"],
                autoStart: true,
                loop: true
              }}
            />
          </span>
          to begin.
        </div>
      </div>
    </Layout>
  );
};

const wrapperClass = css`
  text-align: left;
  max-width: 400px;
  margin: 0 auto;
`;

const startClass = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.2rem;
  .typewriter {
    color: ${colors.blue};
    width: 45px;
    display: flex;
    justify-content: start;
    padding: 1px 4px;
    margin: 0px 5px;
    background: rgba(0, 0, 0, 0.8);
    font-weight: bold;
  }
`;

const titleClass = css`
  /* Collides with Playground styles (.raised) */
  margin: 5px 0px !important;
  padding: 5px 0px;
  text-transform: uppercase;
`;

const dividerClass = css`
  border-bottom: 1px solid #666;
  height: 1px;
  margin: 10px 0px;
`;
