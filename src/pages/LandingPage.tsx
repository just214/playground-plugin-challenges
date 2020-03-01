import React from "react";
import {
  Layout,
  Title,
  Input,
  Button,
  Card,
  Label,
  ReadMeLink,
  DemoGif,
  DevFocus
} from "../components";
import { colors } from "../theme";
const { useState } = React;

const sampleGistId = "f75f76e5c196ccdcec0e95cb3877e6f8";
const usageSteps = [
  "Create a GitHub Gist with some markdown files.",
  "Drop in the Gist Id and enjoy your challenges."
];

type Props = {
  onSubmit(gistId: string): void;
};

export const LandingPage: React.FC<Props> = ({ onSubmit }) => {
  const [gistId, setGistId] = useState("");

  function handleSubmit() {
    onSubmit(gistId);
  }

  function handleSetSample() {
    setGistId(sampleGistId);
  }

  return (
    <Layout>
      <Title style={{ position: "relative", left: 10 }} color={colors.blue}>
        Welcome to Challenges!
      </Title>
      <br />
      <Card>
        <Input
          placeholder="Gist Id"
          value={gistId}
          onChange={e => setGistId((e.target as any).value)}
        />

        <Button onClick={handleSetSample} variant="link">
          Load Demo
        </Button>

        <div>
          <Button
            size="lg"
            onClick={handleSubmit}
            // Not sure of length of id. Demo is 32. 20 seems safe for now.
            disabled={gistId.length < 20}
          >
            Submit
          </Button>
        </div>
      </Card>

      <DevFocus />
      <h3 style={{ color: colors.warning, margin: 0, marginTop: "-40px" }}>
        Turn your Gists into Interactive Coding Challenges!
      </h3>
      <br />
      <div style={{ width: "130%" }}>
        {usageSteps.map((step, idx) => {
          return (
            <div style={{ display: "flex", alignItems: "center" }} key={step}>
              <Label>{idx + 1}.</Label>
              <h4 style={{ margin: 0, marginLeft: "10px" }}>{step}</h4>
            </div>
          );
        })}
      </div>
      <ReadMeLink />
      <DemoGif />
    </Layout>
  );
};
