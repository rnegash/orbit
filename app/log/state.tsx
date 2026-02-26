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
import { useSQLiteContext } from "expo-sqlite";
import { table } from "@/lib/db";

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
  const db = useSQLiteContext();
  const [painLocationInput, setPainLocationInput] = useState("");
  const [painLevel, setPainLevel] = useState<number>();
  const [painTypeInput, setPainTypeInput] = useState<string[]>([]);
  const [painTriggerInput, setPainTriggerInput] = useState("");

  const formattedPainTypeInput = painTypeInput.join(", ");

  return (
    <LogView>
      <Label htmlFor="pain-location">Pain location</Label>
      <Input
        id="pain-location"
        size="$4"
        borderWidth={2}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPainLocationInput(e.target.value)
        }
      />

      <Label htmlFor="pain-level">Pain level</Label>
      <Slider
        id="pain-level"
        size="$4"
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
            <Checkbox
              id={painType}
              value={painType}
              size="$6"
              onCheckedChange={(isChecked) => {
                if (isChecked) {
                  setPainTypeInput((prev) => [...prev, painType]);
                } else {
                  setPainTypeInput((prev) =>
                    [...prev].filter(
                      (addedPainType) => addedPainType !== painType,
                    ),
                  );
                }
              }}
            >
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
      <TextArea
        id="pain-trigger"
        size="$4"
        borderWidth={2}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPainTriggerInput(e.target.value)
        }
      />

      <Button
        onPress={async () => {
          console.log("clicked");
          if (
            !painLocationInput &&
            !painLevel &&
            !formattedPainTypeInput &&
            !painTriggerInput
          ) {
            console.log("all values are empty");
          }

          const statement = await db.prepareAsync(`
            INSERT INTO ${table.state.name} (painLocation, painLevel, painType, painTrigger) VALUES ($painLocationInput, $painLevel, $formattedPainTypeInput, $painTriggerInput);
          `);
          try {
            const result = await statement.executeAsync({
              $painLocationInput: painLocationInput,
              $painLevel: String(painLevel),
              $formattedPainTypeInput: formattedPainTypeInput,
              $painTriggerInput: painTriggerInput,
            });
          } finally {
            await statement.finalizeAsync();
          }
        }}
      >
        Add log
      </Button>
    </LogView>
  );
}
