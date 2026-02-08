import { Activities, Note } from "@/src/models/Note";
import { db } from "./index";

// Insert
export const createNote = async (
  date: string,
  content: string,
  score: number,
) => {
  await db.runAsync(
    "INSERT INTO daily_notes (date, content, score) VALUES (?, ?, ?)",
    date,
    content,
    score,
  );
};

// Get note by date
export const getNoteByDate = async (date: string): Promise<Note | null> => {
  const result = await db.getFirstAsync<Note>(
    "SELECT * FROM daily_notes WHERE date = ?",
    date,
  );
  return result ?? null;
};

// Get all notes
export const getAllNotes = async (): Promise<Note[]> => {
  return await db.getAllAsync<Note>("SELECT * FROM daily_notes");
};

// Update note
export const updateNote = async (date: string, content: string) => {
  await db.runAsync(
    "UPDATE daily_notes SET content = ? WHERE date = ?",
    content,
    date,
  );
};

// Delete note
export const deleteNote = async (date: string) => {
  await db.runAsync("DELETE FROM daily_notes WHERE date = ?", date);
};

// Get all activities
export const getActivitiesByNoteDate = async (noteDate: string) => {
  return await db.getAllAsync<Activities>(
    "SELECT * FROM activities WHERE note_date = ?",
    noteDate,
  );
};

// Create activity
export const createActivity = async (
  noteDate: string,
  label: string,
  icon?: string,
) => {
  await db.runAsync(
    "INSERT INTO activities (note_date, label, icon) VALUES (?, ?, ?)",
    noteDate,
    label,
    icon || null,
  );
};

// Update selected activitiy
export const updateActivity = async (
  id: number,
  label: string,
  done: boolean,
  icon?: string,
) => {
  await db.runAsync(
    "UPDATE activities SET label = ?, done = ?, icon = ? WHERE id = ?",
    label,
    done ? 1 : 0,
    icon || null,
    id,
  );
};

// Update all activities
export const updateAllActivities = async (
  activities: Activities[],
): Promise<boolean> => {
  await db.execAsync("BEGIN TRANSACTION");

  try {
    for (const activity of activities) {
      // Label boşsa sil
      if (activity.label.trim().length === 0) {
        // Sadece DB'de varsa sil
        if (activity.id > 0) {
          await db.runAsync("DELETE FROM activities WHERE id = ?", activity.id);
        }
        continue;
      }

      // DB'de var → UPDATE
      if (activity.id > 0) {
        await db.runAsync(
          "UPDATE activities SET label = ?, done = ?, icon = ? WHERE id = ?",
          activity.label,
          activity.done ? 1 : 0,
          activity.icon || null,
          activity.id,
        );
      }
      // DB'de yok → INSERT
      else {
        await db.runAsync(
          "INSERT INTO activities (note_date, label, done, icon) VALUES (?, ?, ?, ?)",
          activity.note_date,
          activity.label,
          activity.done ? 1 : 0,
          activity.icon || null,
        );
      }
    }

    await db.execAsync("COMMIT");
    return true;
  } catch (e) {
    console.log("updateAllActivities error:", e);
    await db.execAsync("ROLLBACK");
    return false;
  }
};

//Delete selected activity
export const deleteActivity = async (id: number) => {
  await db.runAsync("DELETE FROM activities WHERE id = ?", id);
};
