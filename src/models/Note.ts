export interface Note {
  id: number;
  date: string;
  content: string;
  activities?: string;
  score: number;
}

export type Activities = {
  label: string;
  done?: boolean;
};

type PieChartData = {
  value: number;
  color: string;
  label?: string;
};

export type ActivitiesResponse = {
  activities: string | { label: string; done: boolean }[];
};
