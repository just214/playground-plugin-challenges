import React from "react";
import Confetti from "react-confetti";
import { css } from "goober";
import data from "./data";
import { usePlugin } from "./plugin/usePlugin";
import { Layout, Button, Badge, ErrorText, Landing } from "./components";
import { colors } from "./theme";

const { useState, useEffect, useCallback, useMemo } = React;

const messages = [
  "Great job!",
  "Looks great!",
  "Excellent!",
  "There it is!",
  "Nailed it!",
  "Way to go!",
  "Looks good!",
  "Got it!",
  "Nice!",
  "Well done!"
];

function getRandomMessage() {
  const randomNumber = Math.floor(Math.random() * messages.length);
  return messages[randomNumber];
}

function minify(str: string) {
  return str
    .trim()
    .replace(/"use strict"|\\"use strict\\"|\s|;/g, "")
    .replace(/'/g, '"');
}

type Error = {
  type: "type" | "source";
  value: string;
};

type Status = "NEW" | "TOUCHED" | "ANSWERED" | "SOLUTION";

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState([] as Error[]);
  const { setDebounce, setCode, code, markers, sandbox } = usePlugin();
  const [status, setStatus] = useState<Status>("NEW");
  setDebounce(true);

  const current = useMemo(() => {
    return data[currentIndex];
  }, [currentIndex]);

  // Initially set the editor to blank (for the start screen)
  useEffect(() => {
    setCode("");
  }, [setCode]);

  useEffect(() => {
    if (started) {
      setCode(current.start, { format: "prettier" });
    }
  }, [setCode, current, started]);

  useEffect(() => {
    if (markers.length && status !== "SOLUTION") {
      setStatus("TOUCHED");
    }
  }, [markers, status]);

  useEffect(() => {
    if (errors.length && status !== "SOLUTION") {
      setStatus("TOUCHED");
    }
  }, [errors, status]);

  const handleCheck = useCallback(() => {
    if (["SOLUTION", "ANSWERED"].includes(status)) {
      return;
    }

    const startingCode = minify(current.start);
    const editorCode = minify(code);

    if (editorCode === startingCode) {
      return;
    }

    if (status === "NEW" && editorCode !== startingCode) {
      return;
    }

    setStatus("TOUCHED");

    sandbox.getRunnableJS().then(js => {
      const compiledJS = minify(js);

      const errorsList: Error[] = [];

      current.exclude.forEach(v => {
        if (editorCode.includes(v)) {
          errorsList.push({
            type: "type",
            value: v
          });
        }
      });

      if (compiledJS !== startingCode) {
        errorsList.push({
          type: "source",
          value: "You can't change the source code."
        });
      }

      setErrors(errorsList);

      if (errorsList.length || markers.length) {
        setStatus("TOUCHED");
        return;
      }

      if (!markers.length && !errorsList.length) {
        setStatus("ANSWERED");
      }
    });
  }, [code, current.exclude, current.start, markers.length, sandbox, status]);

  const cb = useCallback(() => {
    handleCheck();
  }, [handleCheck]);

  useEffect(() => {
    let timeout: any = null;
    if (code === "start") {
      setStarted(true);
    } else if (started && status !== "SOLUTION") {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(cb, 500);
    }
  }, [cb, code, handleCheck, setCode, started, status]);

  useEffect(() => {
    if (status === "SOLUTION") {
      setErrors([]);
      setCode(current.end, { format: "prettier" });
    }
  }, [current.end, setCode, status]);

  function showSolution() {
    setStatus("SOLUTION");
  }

  function handleGoToNextQuestion() {
    setStatus("NEW");
    setCurrentIndex(c => c + 1);
  }

  function handleReset() {
    setCode(current.start, { format: "prettier" });
    setStatus("NEW");
  }

  const renderMarkers = markers
    .sort((a, b) => (a.startLineNumber >= b.startLineNumber ? 1 : -1))
    .map(marker => {
      return (
        <ErrorText key={marker.key}>
          Line {marker.startLineNumber}:&nbsp;
          {marker.message}
        </ErrorText>
      );
    });

  const renderErrorMessages = errors.map((error, idx) => {
    if (error.type === "type") {
      return (
        <ErrorText>
          Type <b style={{ color: colors.blue }}>{error.value}</b> is not
          allowed.
        </ErrorText>
      );
    } else {
      return <ErrorText>{error.value}</ErrorText>;
    }
  });

  const renderProhibitedTypes = current.exclude.map(name => {
    return <Badge key={name}>{name}</Badge>;
  });

  const showNextButton =
    ["SOLUTION", "ANSWERED"].includes(status) &&
    currentIndex + 1 < data.length &&
    !markers.length;

  if (!started) {
    return <Landing />;
  }

  return (
    <Layout title={`Challenge #${currentIndex + 1}`}>
      <p>Prohibited Types: {renderProhibitedTypes}</p>
      <Button onClick={handleReset}>Reset</Button>
      <Button onClick={showSolution}>Show Solution</Button>

      <br />
      <br />
      {status === "ANSWERED" && (
        <>
          <Confetti recycle={false} />
          <h2
            className={css`
              font-weight: 300;
              margin: 0px;
            `}
          >
            {getRandomMessage()}
          </h2>
        </>
      )}

      <div>
        {renderMarkers}
        {renderErrorMessages}
      </div>

      {showNextButton && (
        <div>
          <Button onClick={handleGoToNextQuestion}>Next</Button>
        </div>
      )}
    </Layout>
  );
};

export default App;
