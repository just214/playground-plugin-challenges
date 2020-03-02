import React from "react";
import { getData, File, Meta, usePlugin } from "./plugin";

// Pages
import { LandingPage } from "./pages/LandingPage";
import { ChallengeLandingPage } from "./pages/ChallengeLandingPage";
import { ChallengePage } from "./pages/ChallengePage";

const { useState, useMemo, useEffect, useCallback } = React;

const App = () => {
  const { code, setCode } = usePlugin();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startedChallenge, setStartedChallenge] = useState(false);

  // Data that comes from the GitHub Gist
  const [data, setData] = useState<File[]>();
  const [meta, setMeta] = useState<Meta | null>(null);

  const setGreetingCode = useCallback(() => {
    setCode("// 🎉 Welcome to Challenges!");
  }, [setCode]);

  const currentItem = useMemo(() => {
    return data?.length ? data[currentIndex] : null;
  }, [currentIndex, data]);

  useEffect(() => {
    if (code === "start") {
      setStartedChallenge(true);
    }
  }, [code]);

  useEffect(() => {
    if (currentItem) {
      if (startedChallenge) {
        setCode(currentItem.start, { format: "monaco" });
      } else {
        setCode("");
      }
    }
  }, [currentItem, setCode, startedChallenge]);

  useEffect(() => {
    setGreetingCode();
  }, [setGreetingCode]);

  function handleFetchData(gistId: string) {
    getData(gistId).then(datum => {
      setData(datum.files);
      setMeta(datum.meta);
    });
  }

  function handleGoToNextQuestion() {
    setCurrentIndex(i => i + 1);
  }

  function handleOnDone() {
    setData([]);
    setMeta(null);
    setCurrentIndex(0);
    setGreetingCode();
  }

  if (!data?.length) {
    return <LandingPage onSubmit={handleFetchData} />;
  }

  if (!startedChallenge) {
    return <ChallengeLandingPage meta={meta} />;
  }

  return (
    <ChallengePage
      data={data}
      currentItem={currentItem as File}
      currentIndex={currentIndex}
      onNext={handleGoToNextQuestion}
      onDone={handleOnDone}
    />
  );
};

export default App;
