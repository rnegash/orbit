import { SQLiteDatabase } from "expo-sqlite";

export const table = {
  state: {
    name: "painLog",
    fields: {
      painLocation: "TEXT",
      painLevel: "INTEGER",
      painType: "TEXT",
      painTrigger: "TEXT",
      createdAt: "TEXT",
    },
  },
  workout: {
    name: "workoutLog",
    fields: {
      workoutType: "TEXT",
      workoutIntensity: "INTEGER",
      workoutDuration: "INTEGER",
      workoutNotes: "TEXT",
      createdAt: "TEXT",
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
  const DATABASE_VERSION = 2;

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
        INSERT INTO workoutLog (workoutType, workoutIntensity, workoutDuration, workoutNotes, createdAt) VALUES ('gym', 7, 60, 'Everything went fine', CURRENT_TIMESTAMP);
      `);
    currentDbVersion = 2;
  }

  if (currentDbVersion === 1) {
    await db.execAsync(`
        ALTER TABLE ${table.state.name} ADD COLUMN createdAt TEXT;
        ALTER TABLE ${table.workout.name} ADD COLUMN createdAt TEXT;
        UPDATE ${table.state.name} SET createdAt = CURRENT_TIMESTAMP WHERE createdAt IS NULL;
        UPDATE ${table.workout.name} SET createdAt = CURRENT_TIMESTAMP WHERE createdAt IS NULL;
      `);
    currentDbVersion = 2;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
};
