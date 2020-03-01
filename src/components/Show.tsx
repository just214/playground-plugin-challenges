import React from "react";

type Props = {
  when: boolean;
};

export const Show: React.FC<Props> = ({ when, children }) => {
  return <>{when && children}</>;
};
