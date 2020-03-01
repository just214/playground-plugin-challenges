import React from "react";
import Typewriter from "typewriter-effect";
import { css } from "goober";
import { Layout, Title, Card, Label } from "../components";
import { colors } from "../theme";
import { Meta } from "../plugin";
// @ts-ignore
import leftArrow from "../assets/left-arrow.svg";

export const ChallengeLandingPage = ({ meta }: { meta: Meta }) => {
  return (
    <Layout>
      <Title>{meta.gistDescription || "TypeScript Challenges"}</Title>

      <div className={ownerInfoStyle}>
        by{" "}
        <a
          style={{
            color: colors.blue,
            marginLeft: "10px",
            textDecoration: "none"
          }}
          href={meta.ownerUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={meta.ownerAvatarUrl}
            className={avatarStyle}
            alt="profile-pic"
          />{" "}
          {meta.ownerName}
        </a>
      </div>
      <br />
      <Card>
        <Label>Objective</Label>
        <p>
          For each challenge, you will be provided some TypeScript code with
          errors. Supply the necessary type annotations to make all of the
          errors go away.
        </p>
        <Label>Rules</Label>
        <ol style={{ listStylePosition: "inside" }}>
          <li>You cannot modify the source code.</li>
          <li>You cannot use the prohibited types.</li>
        </ol>
      </Card>

      <div className={startClass}>
        <img src={leftArrow} className="arrow-icon" alt="Left Arrow" />
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
        in the editor to begin.
      </div>
    </Layout>
  );
};

const startClass = css`
  @keyframes moveleft {
    from {
      left: 0px;
    }
    to {
      left: -10px;
    }
  }

  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.1rem;
  .arrow-icon {
    height: 40px;
    margin-right: 5px;
    position: relative;
    animation: moveleft 1s infinite ease-out;
    animation-direction: alternate;
  }
  .typewriter {
    color: ${colors.blue};
    width: 45px;
    display: flex;
    justify-content: start;
    padding: 4px;
    margin: 0px 5px;
    background: rgba(0, 0, 0, 0.8);
    font-weight: bold;
  }
`;

const ownerInfoStyle = css`
  display: flex;
  align-items: center;
  padding-left: 8px;
`;

const avatarStyle = css`
  height: 15px;
  width: 15px;
  border-radius: 60px;
`;
