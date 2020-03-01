import React from "react";
import Confetti from "react-confetti";
import { Emoji } from "./Emoji";
import { getRandomMessage } from "../utils";

export const CelebrateComponent = () => {
  return (
    <>
      <Confetti recycle={false} />
      <h2 style={{ marginTop: "0px", fontWeight: 500 }}>
        <Emoji label="Party" value="🎉" /> {getRandomMessage()}
      </h2>
    </>
  );
};

// Memoize to avoid the message from updating on each change to the editor after answered.
export const Celebrate = React.memo(CelebrateComponent);
