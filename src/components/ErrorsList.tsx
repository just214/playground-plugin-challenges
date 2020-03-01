import React from "react";
import { css } from "goober";
import { colors } from "../theme";
import { MarkerWithKey } from "../plugin";
import { Card } from "./Card";
import { Show } from "./Show";

type Error = {
  type: "type" | "source";
  value: string;
};

type ErrorsListProps = {
  errors: Error[];
  markers: MarkerWithKey[];
};

function sortMarkers(a: MarkerWithKey, b: MarkerWithKey): number {
  return a.startLineNumber >= b.startLineNumber ? 1 : -1;
}

const ErrorsListComponent: React.FC<ErrorsListProps> = ({
  markers,
  errors
}) => {
  const renderMarkers = markers.sort(sortMarkers).map(marker => {
    return (
      <ErrorText key={marker.key}>
        Line {marker.startLineNumber}:&nbsp;
        {marker.message}
      </ErrorText>
    );
  });

  const renderErrors = errors.map((error, idx) => {
    if (error.type === "type") {
      return (
        <ErrorText key={idx}>
          Type <b style={{ color: colors.blue }}>{error.value}</b> is not
          allowed.
        </ErrorText>
      );
    } else {
      return <ErrorText key={idx}>{error.value}</ErrorText>;
    }
  });

  const errorCount = errors.length + markers.length;
  const maybeS = errorCount === 1 ? "" : "s";

  return (
    <Show when={errorCount > 0}>
      <Card>
        <p className={errorCountStyle}>
          {errorCount} problem{maybeS}
        </p>
        {renderMarkers}
        {renderErrors}
      </Card>
    </Show>
  );
};

const errorCountStyle = css`
  margin-top: 0px;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ErrorText: React.FC = ({ children }) => {
  return <p className={errorTextStyle}>{children}</p>;
};

const errorTextStyle = css`
  margin: 5px;
  padding: 0px;
  font-size: 0.9rem;
  color: ${colors.warning};
  font-weight: 500;
`;

export const ErrorsList = React.memo(ErrorsListComponent);
