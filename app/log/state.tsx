import { View, Text, Button, Input, Slider, YStack, Select } from "tamagui";

const painTypes = ["sharp", "throbbing", "pressing"];

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
        <Text>Type of pain:</Text>
        <Select defaultValue="">
          <Select.Trigger>
            <Select.Value placeholder="Select..." />
          </Select.Trigger>
          {painTypes.map((painType, idx) => (
            <Select.Item key={idx} index={idx} value={painType} />
          ))}
        </Select>

        <Text>Trigger:</Text>
        <Input size="$4" borderWidth={2} />

        <Button>Save</Button>
      </YStack>
    </View>
  );
}
