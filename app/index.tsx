import { Link } from "expo-router";
import { Text, View, Pressable } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>comfort level</Text>
      <Link href="/log/state" asChild>
        <Pressable>
          <Text>State</Text>
        </Pressable>
      </Link>
      <Link href="/log/workout" asChild>
        <Pressable>
          <Text>Workout</Text>
        </Pressable>
      </Link>
    </View>
  );
}
