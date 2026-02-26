import { SQLiteDatabase } from "expo-sqlite";

export const table = {
  state: {
    name: "painLog",
    fields: {
      painLocation: "TEXT",
      painLevel: "INTEGER",
      painType: "TEXT",
      painTrigger: "TEXT",
    },
  },
  workout: {
    name: "workoutLog",
    fields: {
      workoutType: "TEXT",
      workoutIntensity: "INTEGER",
      workoutDuration: "INTEGER",
      workoutNotes: "TEXT",
    },
  },
};

const generateFields = (fields: { [key: string]: string }) =>
  Object.entries(fields)
    .map(([field, value]) => `${field} ${value}`)
    .join(", ");

const dropTables = async (db: SQLiteDatabase) => {
  await db.execAsync(`
      DROP TABLE ${table.state}; DROP TABLE ${table.workout}`);

  console.log("TABLES DROPPED");
};

export const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
  const DATABASE_VERSION = 1;

  const result = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");

  let currentDbVersion = result?.user_version ?? 0;
  console.log("currentDbVersion", currentDbVersion);

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS ${table.state.name} (id INTEGER PRIMARY KEY NOT NULL, ${generateFields(table.state.fields)});
      `);
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS ${table.workout.name} (id INTEGER PRIMARY KEY NOT NULL, ${generateFields(table.workout.fields)});
        INSERT INTO workoutLog (workoutType, workoutIntensity, workoutDuration, workoutNotes) VALUES ('gym', 7, 60, 'Everything went fine');
      `);
    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
};
