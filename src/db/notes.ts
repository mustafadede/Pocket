import { Note } from "@/src/models/Note";
import { db } from "./index";

// Insert
export const createNote = async (
  date: string,
  content: string,
  activities: string,
  score: number
) => {
  await db.runAsync(
    "INSERT INTO daily_notes (date, content, activities, score) VALUES (?, ?, ? , ?)",
    date,
    content,
    activities,
    score
  );
};

// Get note by date
export const getNoteByDate = async (date: string): Promise<Note | null> => {
  const result = await db.getFirstAsync<Note>(
    "SELECT * FROM daily_notes WHERE date = ?",
    date
  );
  return result ?? null;
};

// Get all notes
export const getAllNotes = async (): Promise<Note[]> => {
  return await db.getAllAsync<Note>("SELECT * FROM daily_notes");
};

// Update note
export const updateNote = async (date: number, content: string) => {
  await db.runAsync(
    "UPDATE daily_notes SET content = ? WHERE date = ?",
    content,
    date
  );
};

// Delete note
export const deleteNote = async (date: string) => {
  await db.runAsync("DELETE FROM daily_notes WHERE date = ?", date);
};
