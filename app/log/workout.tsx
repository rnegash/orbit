import { Input, Button, Label, XStack, RadioGroup } from "tamagui";
import { LogView } from "@/components/logView";
import { useState } from "react";

const workoutIntensity = { 1: "light", 2: "medium", 3: "hard" };

export default function Workout() {
  const [workoutType, setWorkoutType] = useState("");
  const [intensity, setIntensity] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <LogView>
      <Label htmlFor="workout-type">Workout type:</Label>
      <Input
        id="workout-type"
        size="$4"
        borderWidth={2}
        value={workoutType}
        onChangeText={setWorkoutType}
      />

      <Label htmlFor="workout-intensity">Workout intensity:</Label>

      <RadioGroup value={intensity} onValueChange={setIntensity}>
        {Object.entries(workoutIntensity).map(([value, label]) => (
          <XStack key={label} width={300} alignItems="center" gap="$4">
            <RadioGroup.Item value={value} id={label} size="$4">
              <RadioGroup.Indicator />
            </RadioGroup.Item>

            <Label size="$4" htmlFor={label}>
              {label}
            </Label>
          </XStack>
        ))}
      </RadioGroup>

      <Label htmlFor="workout-duration">Workout duration:</Label>
      <Input
        id="workout-duration"
        size="$4"
        borderWidth={2}
        value={duration}
        onChangeText={setDuration}
      />

      <Label htmlFor="workout-notes">Workout notes:</Label>
      <Input
        id="workout-notes"
        size="$4"
        borderWidth={2}
        value={notes}
        onChangeText={setNotes}
      />

      <Button>Add log</Button>
    </LogView>
  );
}
