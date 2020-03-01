import React from "react";
// @ts-ignore
import devFocus from "../assets/dev_quiz.svg";
import { css } from "goober";

export const DevFocus = () => {
  return <img src={devFocus} alt="Dev Focus" className={style} />;
};

const style = css`
  display: block;
  position: relative;
  bottom: 0;
  margin: 40px auto 0px auto;
  width: 130%;
`;
