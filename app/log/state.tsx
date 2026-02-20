import { navigate } from "expo-router/build/global-state/routing";
import { Text, View, Button } from "react-native";

export default function State() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>comfort level</Text>
      <Button title="Save" />
    </View>
  );
}
