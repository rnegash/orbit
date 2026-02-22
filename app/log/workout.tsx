import { LogView } from "@/components/logView";
import { Input, Text, Button, Label, Slider } from "tamagui";

export default function State() {
  return (
    <LogView>
      <Label htmlFor="workout-type">Workout type:</Label>
      <Input id="workout-type" size="$4" borderWidth={2} />
      <Label htmlFor="workout-intensity">workout intensity:</Label>
      <Slider
        id="workout-intensity"
        size="$4"
        defaultValue={[5]}
        max={10}
        step={1}
      >
        <Slider.Track>
          <Slider.TrackActive />
        </Slider.Track>
        <Slider.Thumb circular index={0} />
      </Slider>
      <Label htmlFor="workout-duration">Workout duration:</Label>
      <Input id="workout-duration" size="$4" borderWidth={2} />

      <Label htmlFor="workout-notes">Workout notes:</Label>
      <Input id="workout-notes" size="$4" borderWidth={2} />

      <Button>Add log</Button>
    </LogView>
  );
}
