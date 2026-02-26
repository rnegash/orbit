import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { Text, View } from "tamagui";

export default function LogList() {
  const db = useSQLiteContext();
  useEffect(() => {
    const test = async () => {
      const pain = await db.getAllAsync("SELECT * FROM painLog");
      const workout = await db.getAllAsync("SELECT * FROM workoutLog");
      console.log(pain);
      console.log(workout);
    };
    test();
  }, [db]);

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
