import React from "react";

export type EmojiProps = {
  label: string;
  value: string;
};

export const Emoji = ({ label, value }: EmojiProps) => {
  return (
    <span role="img" aria-label={label}>
      {value}
    </span>
  );
};
