// 228
import React from "react";
import { css } from "goober";
import {
  Layout,
  Button,
  Badge,
  Celebrate,
  Title,
  ErrorsList,
  Show,
  Hint
} from "../components";
import { usePlugin, File } from "../plugin";
import { minify } from "../utils";

const { useState, useEffect, useCallback } = React;

type Error = {
  type: "type" | "source";
  value: string;
};

type Status = "ERROR" | "ANSWERED" | "SOLUTION";

type Props = {
  currentItem: File;
  data: File[];
  onNext: () => void;
  onDone: () => void;
  currentIndex: number;
};
const ChallengePageComponent: React.FC<Props> = ({
  currentItem,
  currentIndex,
  data,
  onNext,
  onDone
}) => {
  const { setDebounce, setCode, code, sandbox, markers } = usePlugin();
  setDebounce(true);

  const [errors, setErrors] = useState([] as Error[]);
  const [showHint, setShowHint] = useState(false);
  // const [correctCount, setCorrectCount] = useState(0);
  const [status, setStatus] = useState<Status>("ERROR");

  useEffect(() => {
    if (status === "SOLUTION") return;
    if (markers.length) {
      setStatus("ERROR");
    }
  }, [markers, status]);

  useEffect(() => {
    if (status === "SOLUTION") return;
    if (errors.length) {
      setStatus("ERROR");
    }
  }, [errors, status]);

  const handleCheck = useCallback(() => {
    const minStartingCode = minify(currentItem.start);
    const minEndingCode = minify(currentItem.end);
    const minEditorCode = minify(code);

    if (status === "SOLUTION") {
      if (minEditorCode !== minEndingCode) {
        setCode(currentItem.end, { format: "prettier" });
      }
      return;
    }

    sandbox.getRunnableJS().then(js => {
      const minCompiledJS = minify(js);
      const errorsList: Error[] = [];

      currentItem.exclude.forEach(excludedType => {
        if (minEditorCode.includes(excludedType)) {
          errorsList.push({
            type: "type",
            value: excludedType
          });
        }
      });

      if (minCompiledJS !== minStartingCode) {
        errorsList.push({
          type: "source",
          value: "You can't change the source code."
        });
      }

      setErrors(errorsList);

      if (errorsList.length || markers.length) {
        setStatus("ERROR");
        return;
      }

      if ([minStartingCode, "start"].includes(minEditorCode)) {
        // The challenge is untouched. Return to prevent a false positive.
        return;
      }

      if (!markers.length && !errorsList.length) {
        setStatus("ANSWERED");
      }
    });
  }, [
    code,
    currentItem.end,
    currentItem.exclude,
    currentItem.start,
    markers,
    sandbox,
    setCode,
    status
  ]);

  // This timeout is a kind of hacky way to give the compiler time to catch up
  // to prevent false positives.
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const timeoutCallback = () => {
      handleCheck();
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(timeoutCallback, 500);
  }, [code, currentItem.end, handleCheck, setCode, status]);

  function showSolution() {
    setStatus("SOLUTION");
  }

  function handleGoToNextQuestion() {
    onNext();
    // if (status === "ANSWERED") {
    //   setCorrectCount(c => c + 1);
    // }
    setStatus("ERROR");
    setShowHint(false);
  }

  function handleReset() {
    setCode(currentItem.start, { format: "prettier" });
    setStatus("ERROR");
    setShowHint(false);
  }

  const renderProhibitedTypes = currentItem.exclude.map((typeName: string) => {
    return <Badge key={typeName}>{typeName}</Badge>;
  });

  const isAnsweredOrSolution = ["SOLUTION", "ANSWERED"].includes(status);
  const isLastOne = currentIndex + 1 === data.length;
  const showNextButton = isAnsweredOrSolution && !isLastOne && !markers.length;
  const showDoneButton = isAnsweredOrSolution && isLastOne && !markers.length;
  const title = currentItem.title || `Challenge #${currentIndex + 1}`;
  const countText = `Challenge ${currentIndex + 1} of ${data.length}`;

  return (
    <Layout>
      <Title>{title}</Title>
      <Badge>{countText}</Badge>
      <p>{currentItem.description}</p>
      <p>Prohibited Types: {renderProhibitedTypes}</p>

      <div className={buttonGroupStyle}>
        <Button onClick={handleReset} style={{ margin: "3px", flex: 1 }}>
          Reset
        </Button>
        <Button onClick={showSolution} style={{ margin: "3px", flex: 1 }}>
          Show Solution
        </Button>
        <Show when={!!currentItem.hint}>
          <Button
            onClick={() => setShowHint(v => !v)}
            style={{ margin: "3px", flex: 1 }}
          >
            {showHint ? "Hide" : "Show"} Hint
          </Button>
        </Show>
      </div>

      <div style={{ minHeight: "40px" }}>
        <Show when={showHint}>
          <Hint>Hint: {currentItem.hint}</Hint>
        </Show>
      </div>

      <Show when={status === "ANSWERED"}>
        <Celebrate />
      </Show>

      <ErrorsList errors={errors} markers={markers} />

      <div>
        <Show when={showNextButton}>
          <Button size="lg" onClick={handleGoToNextQuestion}>
            Next
          </Button>
        </Show>
        <Show when={showDoneButton}>
          <Button size="lg" onClick={onDone}>
            Done
          </Button>
        </Show>
      </div>
    </Layout>
  );
};

const buttonGroupStyle = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export const ChallengePage = React.memo(ChallengePageComponent);
