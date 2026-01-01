import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("main.db");

// Tablo oluşturma
export const initializeDatabase = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS daily_notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL UNIQUE,
      content TEXT,
      score INTEGER
    );

    CREATE TABLE IF NOT EXISTS activities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      note_date TEXT NOT NULL,
      label TEXT NOT NULL,
      done INTEGER DEFAULT 0,
      FOREIGN KEY (note_date) REFERENCES daily_notes(date) ON DELETE CASCADE
    );
  `);
};
