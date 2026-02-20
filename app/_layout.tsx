import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Tabs>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="logList" />
        <Tabs.Screen name="log/state" options={{ href: null }} />
        <Tabs.Screen name="log/workout" options={{ href: null }} />
      </Tabs>
      <StatusBar style="auto" />
    </>
  );
}
