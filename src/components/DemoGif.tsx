import React from "react";
import { css } from "goober";
const GIF_URL =
  "https://res.cloudinary.com/gojutin/image/upload/v1583169134/playground-plugin-challenges/about.gif";

export const DemoGif = () => {
  return <img src={GIF_URL} alt="Demo GIF" className={demoStyle} />;
};

const demoStyle = css`
  display: block;
  position: relative;
  bottom: 0;
  margin: 40px auto 0px auto;
  width: 120%;
`;
