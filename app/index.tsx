import { Link } from "expo-router";
import { XStack, Button, H1, View } from "tamagui";

export default function Index() {
  return (
    <View
      gap={"$10"}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <H1>Add log</H1>

      <View>
        <XStack gap="$2">
          <Link href="/log/state" asChild>
            <Button>State</Button>
          </Link>
          <Link href="/log/workout" asChild>
            <Button>Workout </Button>
          </Link>
        </XStack>
      </View>
    </View>
  );
}
