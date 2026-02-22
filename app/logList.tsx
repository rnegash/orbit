import { FlatList } from "react-native";
import { Text, View } from "tamagui";

export default function LogList() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={[{ id: 0, day: "2026/15/5", type: "workout" }]}
        renderItem={({ item }) => <Text>{item.id}</Text>}
      />
    </View>
  );
}
