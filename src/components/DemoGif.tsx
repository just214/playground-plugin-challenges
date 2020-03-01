import React from "react";
import { css } from "goober";
// @ts-ignore
import exampleGIF from "../assets/example.gif";

export const DemoGif = () => {
  return <img src={exampleGIF} alt="Demo GIF" className={demoStyle} />;
};

const demoStyle = css`
  display: block;
  position: relative;
  bottom: 0;
  margin: 40px auto 0px auto;
  width: 130%;
`;
