import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("main.db");

// Tablo oluşturma
export const initializeDatabase = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS daily_notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      content TEXT,
      activities TEXT,
      score INTEGER
    );
  `);
};
