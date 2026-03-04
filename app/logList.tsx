import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Text, View, YStack, XStack } from "tamagui";

export default function LogList() {
  const db = useSQLiteContext();
  const [events, setEvents] = useState<
    Array<{
      id: string;
      type: "pain" | "workout";
      createdAt: string;
      title: string;
      subtitle: string;
    }>
  >([]);

  useEffect(() => {
    const load = async () => {
      const painRows = await db.getAllAsync<{
        id: number;
        painLocation: string | null;
        painLevel: string | number | null;
        painType: string | null;
        painTrigger: string | null;
        createdAt: string | null;
      }>("SELECT * FROM painLog");

      const workoutRows = await db.getAllAsync<{
        id: number;
        workoutType: "pain" | "workout" | null;
        workoutIntensity: string | number | null;
        workoutDuration: string | number | null;
        workoutNotes: string | null;
        createdAt: string | null;
      }>("SELECT * FROM workoutLog");

      const painEvents =
        painRows?.map((row) => ({
          id: `pain-${row.id}`,
          type: "pain" as const,
          createdAt: row.createdAt ?? "",
          title: `Pain – ${row.painLocation || "Unknown location"}`,
          subtitle: `Level: ${
            row.painLevel ?? "—"
          }/10 • Type: ${row.painType || "—"} • Trigger: ${
            row.painTrigger || "—"
          }`,
        })) || [];

      const workoutEvents =
        workoutRows?.map((row) => ({
          id: `workout-${row.id}`,
          type: "workout" as const,
          createdAt: row.createdAt ?? "",
          title: `Workout – ${row.workoutType || "Unnamed"}`,
          subtitle: `Intensity: ${
            row.workoutIntensity ?? "—"
          } • Duration: ${row.workoutDuration ?? "—"} min • Notes: ${
            row.workoutNotes || "—"
          }`,
        })) || [];

      const merged = [...painEvents, ...workoutEvents]?.sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0,
      );

      setEvents(merged);
    };

    load();
  }, [db]);

  if (events?.length === 0) {
    return (
      <View style={{ padding: 16 }}>
        <Text>No events found</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={{ padding: 16 }}
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <XStack
          borderLeftWidth={2}
          borderLeftColor={item.type === "workout" ? "#3b82f6" : "#ef4444"}
          gap="$3"
          alignItems="flex-start"
          marginBottom="$3"
        >
          <YStack gap="$1" padding={"$3"}>
            <Text fontWeight="700">{item.title}</Text>
            <Text fontSize="$2" color="$gray10">
              {item.subtitle}
            </Text>
            <Text fontSize="$1" color="$gray9">
              {item.createdAt}
            </Text>
          </YStack>
        </XStack>
      )}
    />
  );
}
