import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createTamagui, TamaguiProvider } from "tamagui";
import { defaultConfig } from "@tamagui/config/v5"; // for quick config install this
import { themes } from "../lib/themes";
const config = createTamagui({ ...defaultConfig, themes });

export default function RootLayout() {
  return (
    <TamaguiProvider defaultTheme={"light"} config={config}>
      <Tabs>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="logList" />
        <Tabs.Screen name="log/state" options={{ href: null }} />
        <Tabs.Screen name="log/workout" options={{ href: null }} />
      </Tabs>
      <StatusBar style="auto" />
    </TamaguiProvider>
  );
}
