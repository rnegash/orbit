import {
  Input,
  Button,
  Label,
  XStack,
  RadioGroup,
  YStack,
  AlertDialog,
} from "tamagui";
import { LogView } from "@/components/logView";
import { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { useRouter } from "expo-router";
import { table } from "@/lib/db";

const workoutIntensity: { [key: number]: string } = {
  1: "light",
  2: "medium",
  3: "hard",
};

export default function Workout() {
  const db = useSQLiteContext();
  const router = useRouter();

  const [workoutType, setWorkoutType] = useState("");
  const [intensity, setIntensity] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  const allFieldsEmpty = !workoutType && !intensity && !duration && !notes;

  const desc = () => {
    const intensityLabel =
      intensity && workoutIntensity[Number(intensity)]
        ? workoutIntensity[Number(intensity)]
        : "—";

    return (
      <YStack gap="$2">
        {allFieldsEmpty
          ? "At least one field needs to be filled"
          : `
        Workout Type: ${workoutType || "—"}\n
        Workout Intensity: ${intensityLabel}\n
        Workout Duration: ${duration || "—"}\n
        Workout Notes: ${notes || "—"}
        `}
      </YStack>
    );
  };

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

      <AlertDialog native>
        <AlertDialog.Trigger asChild>
          <Button>Add log</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay key="overlay" />
          <AlertDialog.Content>
            <AlertDialog.Title>
              {allFieldsEmpty ? "Empty Fields" : "Confirm Entry"}
            </AlertDialog.Title>
            <AlertDialog.Description>{desc()}</AlertDialog.Description>
            <XStack gap="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild>
                <Button variant="outlined">Dismiss</Button>
              </AlertDialog.Cancel>
              {!allFieldsEmpty && (
                <AlertDialog.Action
                  asChild
                  onPress={async () => {
                    const statement = await db.prepareAsync(
                      `
                        INSERT INTO ${table.workout.name} (workoutType, workoutIntensity, workoutDuration, workoutNotes) VALUES ($workoutType, $workoutIntensity, $workoutDuration, $workoutNotes);
                      `,
                    );

                    try {
                      await statement.executeAsync({
                        $workoutType: workoutType,
                        $workoutIntensity: Number(intensity),
                        $workoutDuration: Number(duration),
                        $workoutNotes: notes,
                      });
                      router.navigate("/");
                    } finally {
                      await statement.finalizeAsync();
                    }
                  }}
                >
                  <Button>Confirm</Button>
                </AlertDialog.Action>
              )}
            </XStack>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    </LogView>
  );
}
