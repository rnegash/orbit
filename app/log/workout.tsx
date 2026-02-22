import { Input, Button, Label, XStack, RadioGroup } from "tamagui";
import { LogView } from "@/components/logView";

const workoutIntensity = { 1: "light", 2: "medium", 3: "hard" };

export default function State() {
  return (
    <LogView>
      <Label htmlFor="workout-type">Workout type:</Label>
      <Input id="workout-type" size="$4" borderWidth={2} />

      <Label htmlFor="workout-intensity">Workout intensity:</Label>

      {Object.entries(workoutIntensity).map(([value, label]) => (
        <XStack
          id="workout-intensity"
          key={label}
          width={300}
          alignItems="center"
          gap="$4"
        >
          <RadioGroup.Item value={value} id={label} size="$4">
            <RadioGroup.Indicator />
          </RadioGroup.Item>

          <Label size="$4" htmlFor={label}>
            {label}
          </Label>
        </XStack>
      ))}

      <Label htmlFor="workout-duration">Workout duration:</Label>
      <Input id="workout-duration" size="$4" borderWidth={2} />

      <Label htmlFor="workout-notes">Workout notes:</Label>
      <Input id="workout-notes" size="$4" borderWidth={2} />

      <Button>Add log</Button>
    </LogView>
  );
}
