import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createTamagui, TamaguiProvider } from "tamagui";
import { defaultConfig } from "@tamagui/config/v5"; // for quick config install this
import { themes } from "../lib/themes";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDbIfNeeded } from "@/lib/db";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import * as SQLite from "expo-sqlite";
const config = createTamagui({ ...defaultConfig, themes });

export default function RootLayout() {
  const db = SQLite.openDatabaseSync("db");
  useDrizzleStudio(db);
  return (
    <TamaguiProvider defaultTheme="light" config={config}>
      <SQLiteProvider databaseName="orbit.db" onInit={migrateDbIfNeeded}>
        <Tabs>
          <Tabs.Screen name="index" />
          <Tabs.Screen name="logList" />
          <Tabs.Screen name="log/state" options={{ href: null }} />
          <Tabs.Screen name="log/workout" options={{ href: null }} />
        </Tabs>
        <StatusBar style="auto" />
      </SQLiteProvider>
    </TamaguiProvider>
  );
}
