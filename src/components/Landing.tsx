import React from "react";
import Typewriter from "typewriter-effect";
import { css } from "goober";
import { Layout } from "./Layout";
import { colors } from "../theme";

const startClass = css`
  display: flex;
  align-items: center;
  justify-content: center;
  b {
    color: ${colors.blue};
    width: 45px;
    display: flex;
    justify-content: start;
    padding: 0px 4px;
  }
`;

export const Landing = () => {
  return (
    <Layout title={`TypeScript Challenges`}>
      <p>For each challenge, you will be provided some JavaScript code.</p>
      <p>Provide the necessary types to make the errors go away.</p>
      <p>You cannot modify the JavaScript code.</p>
      <p>You cannot use the prohibited types.</p>
      <p className={startClass}>
        Type{" "}
        <b>
          <Typewriter
            options={{
              strings: ["start"],
              autoStart: true,
              loop: true
            }}
          />{" "}
        </b>
        in the editor to begin.
      </p>
      <p>Good luck!</p>
    </Layout>
  );
};
