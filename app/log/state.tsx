import React from "react";
import { Check as CheckIcon } from "@tamagui/lucide-icons";
import {
  View,
  Text,
  Button,
  Input,
  Slider,
  YStack,
  Label,
  XStack,
  Checkbox,
} from "tamagui";

const painTypes = [
  "sharp",
  "dull",
  "burning",
  "stiffness",
  "cramping",
  "throbbing",
  "pressing",
  "cramping",
  "tenderness",
];

const PainTypeSelect = () => {
  return painTypes.map((painType, idx) => (
    <XStack width={300} gap="$4" alignContent="center">
      <Checkbox id={painType} key={idx} value={painType}>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox>
      <Label size={"$3"} htmlFor={painType}>
        {painType}
      </Label>
    </XStack>
  ));
};

export default function State() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <YStack gap={"$4"}>
        <Text>location:</Text>
        <Input size="$4" borderWidth={2} />
        <Text>level:</Text>

        <Slider size="$4" width={200} defaultValue={[50]} max={100} step={1}>
          <Slider.Track>
            <Slider.TrackActive />
          </Slider.Track>
          <Slider.Thumb circular index={0} />
        </Slider>
        <Label htmlFor="pain-type-select">Type of pain:</Label>
        <PainTypeSelect />
        <Text>Trigger:</Text>
        <Input size="$4" borderWidth={2} />

        <Button>Save</Button>
      </YStack>
    </View>
  );
}
