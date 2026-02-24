import { SQLiteDatabase } from "expo-sqlite";

const dropTables = async (db: SQLiteDatabase) => {
  await db.execAsync(`
      DROP TABLE painLog; DROP TABLE  workoutLog`);

  console.log("TABLES DROPPED");
};

export const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
  const DATABASE_VERSION = 0;

  const result = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");

  let currentDbVersion = result?.user_version ?? 0;

  console.log(currentDbVersion);

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS painLog (id INTEGER PRIMARY KEY NOT NULL, painLocation TEXT, painLevel INTEGER, painType TEXT, painTrigger Text);
        INSERT INTO painLog (painLocation, painLevel, painType, painTrigger) VALUES ('right knee inside', 2, "throbbing", "training");
      `);
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS workoutLog (id INTEGER PRIMARY KEY NOT NULL, workoutType TEXT, workoutIntensity INTEGER, workoutDuration INTEGER, workoutNotes Text);
        INSERT INTO workoutLog (workoutType, workoutIntensity, workoutDuration, workoutNotes) VALUES ('gym', 7, 60, 'Everything went fine');
      `);
    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
};
