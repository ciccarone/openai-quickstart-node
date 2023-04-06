import Head from "next/head";
import { useState } from "react";
import React from "react";
import { Container, Card, Row, Col, Spacer, Button } from "@nextui-org/react";

import { useTheme, Text } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Radio } from "@nextui-org/react";
import { Dropdown } from "@nextui-org/react";

import { holidayMenuItems } from "./utils/MenuItems";
import { moralMenuItems } from "./utils/MenuItems";
import { shapeMenuItems } from "./utils/MenuItems";
import { numbMenuItems } from "./utils/MenuItems";

export default function Home(props) {
  const [childInput, SetChildNameInput] = useState("");
  const [result, setResult] = useState();
  const [generateLoading, setGeneratingLoading] = useState(false);

  const [moralInput, SetMoralInput] = React.useState(new Set(["Select Moral"]));
  const [holidayInput, SetHolidayInput] = React.useState(
    new Set(["Select Holiday"])
  );
  const [shapeInput, SetShapeInput] = React.useState(new Set(["Select Shape"]));
  const [numbInput, SetNumbInput] = React.useState(new Set(["Select Number"]));

  const selectedHoliday = React.useMemo(
    () => Array.from(holidayInput).join(", ").replace("_", " "),
    [holidayInput]
  );

  const selectedMoral = React.useMemo(
    () => Array.from(moralInput).join(", ").replace("_", " "),
    [moralInput]
  );

  const selectedShape = React.useMemo(
    () => Array.from(shapeInput).join(", ").replace("_", " "),
    [shapeInput]
  );

  const selectedNumb = React.useMemo(
    () => Array.from(numbInput).join(", ").replace("_", " "),
    [numbInput]
  );

  async function onSubmit(event) {
    event.preventDefault();
    try {
      setGeneratingLoading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          child: childInput,
          moral: selectedMoral,
          holiday: selectedHoliday,
          shape: selectedShape,
          numb: selectedNumb,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
        setGeneratingLoading(false);
      }

      setResult(data.result);
      setGeneratingLoading(false);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      setGeneratingLoading(false);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Tiny Tales</title>
        <link rel="icon" href="/logo.svg" />
      </Head>

      <main>
        <Container gap={0}>
          <Row gap={1}>
            <Col>
              <img src="/logo.svg" className="logo" />
              <h3>Generate your 2-minute bedtime story</h3>
              <form onSubmit={onSubmit}>
                <Spacer y={1.5} />
                <Card className="story-type-card">
                  <Spacer y={0.7} />
                  <Input
                    clearable
                    bordered
                    label="Child's Name"
                    type="text"
                    name="child"
                    value={childInput}
                    onChange={(e) => SetChildNameInput(e.target.value)}
                  />
                  <Spacer y={0.7} />
                </Card>
                <Card className="story-type-card story-type-card__name">
                  <Radio.Group label="Story Types" className="story-type">
                    <Radio value="Morals">Morals</Radio>

                    <span id="Morals" className="story-dropdown">
                      <Spacer y={0.7} />
                      <Dropdown>
                        <Dropdown.Button
                          flat
                          color="secondary"
                          css={{ tt: "capitalize" }}
                        >
                          {"Moral: " + selectedMoral}
                        </Dropdown.Button>
                        <Dropdown.Menu
                          aria-label="Single selection actions"
                          color="secondary"
                          disallowEmptySelection
                          selectionMode="single"
                          selectedKeys={moralInput}
                          onSelectionChange={SetMoralInput}
                          items={moralMenuItems}
                        >
                          {(item) => (
                            <Dropdown.Item key={item.key}>
                              {item.content}
                            </Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </span>

                    <Radio value="Holidays">Holidays</Radio>

                    <span id="Holidays" className="story-dropdown">
                      <Spacer y={0.7} />
                      <Dropdown>
                        <Dropdown.Button
                          flat
                          color="secondary"
                          css={{ tt: "capitalize" }}
                        >
                          {"Holiday: " + selectedHoliday}
                        </Dropdown.Button>
                        <Dropdown.Menu
                          aria-label="Single selection actions"
                          color="secondary"
                          disallowEmptySelection
                          selectionMode="single"
                          selectedKeys={holidayInput}
                          onSelectionChange={SetHolidayInput}
                          items={holidayMenuItems}
                        >
                          {(item) => (
                            <Dropdown.Item key={item.key}>
                              {item.content}
                            </Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </span>

                    <Radio value="Shapes">Shapes</Radio>

                    <span id="Shapes" className="story-dropdown">
                      <Spacer y={0.7} />
                      <Dropdown>
                        <Dropdown.Button
                          flat
                          color="secondary"
                          css={{ tt: "capitalize" }}
                        >
                          {"Shape: " + selectedShape}
                        </Dropdown.Button>
                        <Dropdown.Menu
                          aria-label="Single selection actions"
                          color="secondary"
                          disallowEmptySelection
                          selectionMode="single"
                          selectedKeys={shapeInput}
                          onSelectionChange={SetShapeInput}
                          items={shapeMenuItems}
                        >
                          {(item) => (
                            <Dropdown.Item key={item.key}>
                              {item.content}
                            </Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </span>

                    <Radio value="Numbs">Numbers</Radio>

                    <span id="Numbs" className="story-dropdown">
                      <Spacer y={0.7} />
                      <Dropdown>
                        <Dropdown.Button
                          flat
                          color="secondary"
                          css={{ tt: "capitalize" }}
                        >
                          {"Number: " + selectedNumb}
                        </Dropdown.Button>
                        <Dropdown.Menu
                          aria-label="Single selection actions"
                          color="secondary"
                          disallowEmptySelection
                          selectionMode="single"
                          selectedKeys={numbInput}
                          onSelectionChange={SetNumbInput}
                          items={numbMenuItems}
                        >
                          {(item) => (
                            <Dropdown.Item key={item.key}>
                              {item.content}
                            </Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </span>
                  </Radio.Group>
                </Card>

                <Button color="warning" type="submit" auto ghost>
                  Generate Story
                </Button>
              </form>
              <Spacer y={1.5} />
              <Card className="story-type-card">
                <Spacer y={0.7} />
                {!generateLoading ? (
                  <div>{result}</div>
                ) : (
                  <div>Story generating ...</div>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
