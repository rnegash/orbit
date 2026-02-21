import { Link } from "expo-router";
import { Text, View, Pressable } from "react-native";
import { XStack, Button } from "tamagui";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Add log</Text>

      <XStack gap="$2">
        <Link href="/log/state" asChild>
          <Button>State</Button>
        </Link>
        <Link href="/log/workout" asChild>
          <Button>Workout </Button>
        </Link>
      </XStack>
    </View>
  );
}
