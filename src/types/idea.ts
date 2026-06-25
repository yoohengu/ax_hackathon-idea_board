export type Feasibility = "low" | "medium" | "high";

export interface Idea {
  id: string;
  title: string;
  description: string;
  feasibility: Feasibility;
  notes: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type IdeaInput = Pick<Idea, "title" | "description" | "feasibility" | "notes">;

export const FEASIBILITY_LABEL: Record<Feasibility, string> = {
  low: "낮음",
  medium: "보통",
  high: "높음",
};
