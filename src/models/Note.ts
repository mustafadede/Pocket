import { MaterialIconName } from "@/constants/activities";

export interface Note {
  id: number;
  date: string;
  content: string;
  activities?: string;
  score: number;
}

export type Activities = {
  id: number;
  note_date: string;
  label: string;
  done: boolean;
  icon?: MaterialIconName;
};

type PieChartData = {
  value: number;
  color: string;
  label?: string;
};

export type ActivitiesResponse = {
  activities: string | { label: string; done: boolean }[];
};
