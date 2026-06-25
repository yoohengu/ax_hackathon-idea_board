import type { SupabaseClient } from "@supabase/supabase-js";
import type { Idea, IdeaInput } from "../types/idea";
import type { IdeaRepository } from "./IdeaRepository";

interface IdeaRow {
  id: string;
  title: string;
  description: string;
  feasibility: Idea["feasibility"];
  notes: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

function toIdea(row: IdeaRow): Idea {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    feasibility: row.feasibility,
    notes: row.notes,
    completed: row.completed,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class SupabaseIdeaRepository implements IdeaRepository {
  private readonly client: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.client = client;
  }

  async getAll(): Promise<Idea[]> {
    const { data, error } = await this.client
      .from("ideas")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as IdeaRow[]).map(toIdea);
  }

  async getById(id: string): Promise<Idea | undefined> {
    const { data, error } = await this.client
      .from("ideas")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data ? toIdea(data as IdeaRow) : undefined;
  }

  async create(input: IdeaInput): Promise<Idea> {
    const { data, error } = await this.client
      .from("ideas")
      .insert(input)
      .select()
      .single();
    if (error) throw error;
    return toIdea(data as IdeaRow);
  }

  async update(id: string, input: IdeaInput): Promise<Idea> {
    const { data, error } = await this.client
      .from("ideas")
      .update({ ...input, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return toIdea(data as IdeaRow);
  }

  async setCompleted(id: string, completed: boolean): Promise<Idea> {
    const { data, error } = await this.client
      .from("ideas")
      .update({ completed, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return toIdea(data as IdeaRow);
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.client.from("ideas").delete().eq("id", id);
    if (error) throw error;
  }
}
