import React from "react";
import { css } from "goober";
import { colors } from "../theme";

export const ReadMeLink = () => {
  return (
    <p style={{ fontWeight: "bold" }}>
      View the{" "}
      <a
        href="https://github.com/gojutin/playground-plugin-challenges/blob/master/README.md"
        target="_blank"
        rel="noopener noreferrer"
        className={readmeLinkStyle}
      >
        README
      </a>{" "}
      for detailed usage instructions.
    </p>
  );
};

const readmeLinkStyle = css`
  color: ${colors.blue} !important;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: border-bottom-color 0.5s;
  &:hover {
    border-bottom-color: ${colors.blue};
  }
`;
