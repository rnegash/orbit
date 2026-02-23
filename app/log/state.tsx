import React, { useState } from "react";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import {
  Button,
  Input,
  Slider,
  YStack,
  Label,
  XStack,
  Checkbox,
  TextArea,
  Text,
} from "tamagui";
import { LogView } from "@/components/logView";

const painTypes = [
  "sharp",
  "dull",
  "burning",
  "stiffness",
  "cramping",
  "throbbing",
  "pressing",
  "tenderness",
];

const initialPainLevel = 5;

export default function State() {
  const [painLevel, setPainLevel] = useState(initialPainLevel);
  return (
    <LogView>
      <Label htmlFor="pain-location">Pain location</Label>
      <Input id="pain-location" size="$4" borderWidth={2} />

      <Label htmlFor="pain-level">Pain level</Label>
      <Slider
        id="pain-level"
        size="$4"
        defaultValue={[initialPainLevel]}
        max={10}
        step={1}
        onValueChange={(e) => setPainLevel(e[0])}
      >
        <Slider.Track>
          <Slider.TrackActive />
        </Slider.Track>
        <Slider.Thumb circular index={0} />
      </Slider>
      <Text>{painLevel}/10</Text>

      <Label htmlFor="pain-type">Types of pain:</Label>
      <YStack gap="$4" id="pain-type">
        {painTypes.map((painType) => (
          <XStack key={painType} gap="$4" alignItems="center">
            <Checkbox id={painType} value={painType} size="$6">
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox>
            <Label size="$3" htmlFor={painType}>
              {painType}
            </Label>
          </XStack>
        ))}
      </YStack>

      <Label htmlFor="pain-trigger">Trigger:</Label>
      <TextArea id="pain-trigger" size="$4" borderWidth={2} />

      <Button>Add log</Button>
    </LogView>
  );
}
