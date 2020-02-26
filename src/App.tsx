import React from "react";
import Confetti from "react-confetti";
import { css } from "goober";
import data from "./data";
import { usePlugin } from "./plugin/usePlugin";
import { Layout, Button, Badge, ErrorText } from "./components";

const messages = [
  "Great job!",
  "Looks great!",
  "Excellent!",
  "There it is!",
  "Nailed it!",
  "Way to go!",
  "Looks good!"
];

function getRandomMessage() {
  const randomNumber = Math.floor(Math.random() * messages.length);
  return messages[randomNumber];
}

const { useState, useEffect, useCallback, useMemo } = React;

function minify(str: string) {
  return str
    .trim()
    .replace(/"use strict"|\\"use strict\\"|\s|;/g, "")
    .replace(/'/g, '"');
}

type Data = {
  start: string;
  end: string;
  exclude: string[];
};

const App: React.FC = () => {
  const { setDebounce, setCode, code, markers, sandbox } = usePlugin();
  setDebounce(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [markersSet, setMarkersSet] = useState(false);
  const [errors, setErrors] = useState([] as string[]);
  const [status, setStatus] = useState<
    "NEW" | "TOUCHED" | "ANSWERED" | "SOLUTION"
  >("NEW");

  useEffect(() => {
    if (markers.length) {
      setMarkersSet(true);
    }
  }, [markers]);

  const current = useMemo(() => {
    return data[currentIndex];
  }, [currentIndex]);

  useEffect(() => {
    setCode(current.start, { format: "prettier" });
  }, [setCode, current]);

  function showSolution() {
    setStatus("SOLUTION");
    setErrors([]);
    setCode(current.end, { format: "prettier" });
  }

  function handleGoToNextQuestion() {
    setStatus("NEW");
    setMarkersSet(false);
    setCurrentIndex(c => c + 1);
  }

  function handleReset() {
    setCode(current.start, { format: "prettier" });
    setMarkersSet(false);
    setStatus("NEW");
  }

  const handleCheck = useCallback(() => {
    const startingCode = minify(current.start);
    const editorCode = minify(code);

    if (!markersSet) return;

    if (["SOLUTION", "ANSWERED"].includes(status)) {
      return;
    }

    // if (status === "NEW" && editorCode !== startingCode) {
    //   return;
    // }

    sandbox.getRunnableJS().then(js => {
      const compiledJS = minify(js);
      console.log("STATUS", status);

      let errorsList = [];

      current.exclude.forEach(v => {
        if (editorCode.includes(v)) {
          errorsList.push(`${v} is not allowed.`);
        }
      });

      if (compiledJS !== startingCode) {
        errorsList.push("You can't change the source code.");
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
  }, [
    code,
    current.exclude,
    current.start,
    markers.length,
    markersSet,
    sandbox,
    status
  ]);

  useEffect(() => {
    handleCheck();
  }, [code, handleCheck]);

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

  const renderErrorMessages = errors.map(
    (errorMessage: string, idx: number) => (
      <ErrorText key={idx}>{errorMessage}</ErrorText>
    )
  );

  const renderProhibitedTypes = current.exclude.map(name => {
    return <Badge key={name}>{name}</Badge>;
  });

  const showNextButton =
    ["SOLUTION", "ANSWERED"].includes(status) &&
    currentIndex + 1 < data.length &&
    !markers.length;

  return (
    <Layout title={`Challenge #${currentIndex + 1}`}>
      {!["ANSWERED", "SOLUTION"].includes(status) && (
        <>
          <p>Prohibited Types: {renderProhibitedTypes}</p>
          <Button onClick={handleReset}>Reset</Button>
          <Button onClick={showSolution}>Show Solution</Button>
        </>
      )}
      <br />
      <br />
      {status === "ANSWERED" && (
        <>
          <Confetti recycle={false} />
          <h2
            className={css`
              font-weight: 300;
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
