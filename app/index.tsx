import { Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import { XStack, Button, H1, View } from "tamagui";

export default function Index() {
  const db = useSQLiteContext();
  useEffect(() => {
    const test = async () => {
      const result = await db.getAllAsync("SELECT * FROM painLog");
      console.log(result);
    };
    test();
  }, []);
  return (
    <View
      gap="$10"
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
