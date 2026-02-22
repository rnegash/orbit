import React from "react";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import {
  Text,
  Button,
  Input,
  Slider,
  YStack,
  Label,
  XStack,
  Checkbox,
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

export default function State() {
  return (
    <LogView>
      <Label htmlFor="pain-location">location:</Label>
      <Input id="pain-location" size="$4" borderWidth={2} />

      <Label htmlFor="pain-level">level:</Label>
      <Slider id="pain-level" size="$4" defaultValue={[5]} max={10} step={1}>
        <Slider.Track>
          <Slider.TrackActive />
        </Slider.Track>
        <Slider.Thumb circular index={0} />
      </Slider>

      <Label htmlFor="pain-type">Type of pain:</Label>
      <YStack gap="$4">
        {painTypes.map((painType) => (
          <XStack key={painType} gap="$4" alignItems="center">
            <Checkbox id="pain-type" value={painType} size="$6">
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
      <Input id="pain-trigger" size="$4" borderWidth={2} />

      <Button>Add log</Button>
    </LogView>
  );
}
