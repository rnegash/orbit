import { View, Text, Button } from "tamagui";

export default function State() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Add workout</Text>
      <Button> Add</Button>
    </View>
  );
}
