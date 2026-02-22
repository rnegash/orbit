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
  ScrollView,
} from "tamagui";

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
    <ScrollView>
      <YStack gap="$4" padding="$6" paddingBottom="$10">
        <Text>location:</Text>
        <Input size="$4" borderWidth={2} />
        <Text>level:</Text>

        <Slider size="$4" defaultValue={[5]} max={10} step={1}>
          <Slider.Track>
            <Slider.TrackActive />
          </Slider.Track>
          <Slider.Thumb circular index={0} />
        </Slider>
        <Label htmlFor="pain-type-select">Type of pain:</Label>
        <YStack gap="$4">
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
        <Text>Trigger:</Text>
        <Input size="$4" borderWidth={2} />
        <Button>Save</Button>
      </YStack>
    </ScrollView>
  );
}
