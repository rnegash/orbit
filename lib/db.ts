import { SQLiteDatabase } from "expo-sqlite";

export const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
  const DATABASE_VERSION = 1;

  const result = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");

  let currentDbVersion = result?.user_version ?? 0;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS painLog (id INTEGER PRIMARY KEY NOT NULL, painLocation TEXT, painLevel INTEGER, painType TEXT, painTrigger Text);
        INSERT INTO painLog (painLocation, painLevel, painType, painTrigger) VALUES ('right knee inside', 2, "throbbing", "training");
      `);

    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
};
