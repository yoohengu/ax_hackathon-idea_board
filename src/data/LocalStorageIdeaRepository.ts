import type { Idea, IdeaInput } from "../types/idea";
import type { IdeaRepository } from "./IdeaRepository";

const STORAGE_KEY = "hackathon-idea-board:ideas";

function readAll(): Idea[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const ideas = JSON.parse(raw) as Idea[];
    return ideas.map((idea) => ({ ...idea, completed: idea.completed ?? false }));
  } catch {
    return [];
  }
}

function writeAll(ideas: Idea[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
}

function createId(): string {
  return crypto.randomUUID();
}

/**
 * localStorage 기반 구현체. 모든 메서드는 Promise를 반환해서
 * 추후 Supabase(SupabaseIdeaRepository)로 교체해도 호출부 코드는 바뀌지 않는다.
 */
export class LocalStorageIdeaRepository implements IdeaRepository {
  async getAll(): Promise<Idea[]> {
    return [...readAll()].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getById(id: string): Promise<Idea | undefined> {
    return readAll().find((idea) => idea.id === id);
  }

  async create(input: IdeaInput): Promise<Idea> {
    const now = new Date().toISOString();
    const idea: Idea = {
      id: createId(),
      ...input,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    const ideas = readAll();
    ideas.push(idea);
    writeAll(ideas);
    return idea;
  }

  async update(id: string, input: IdeaInput): Promise<Idea> {
    const ideas = readAll();
    const index = ideas.findIndex((idea) => idea.id === id);
    if (index === -1) {
      throw new Error(`Idea not found: ${id}`);
    }
    const updated: Idea = {
      ...ideas[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    ideas[index] = updated;
    writeAll(ideas);
    return updated;
  }

  async setCompleted(id: string, completed: boolean): Promise<Idea> {
    const ideas = readAll();
    const index = ideas.findIndex((idea) => idea.id === id);
    if (index === -1) {
      throw new Error(`Idea not found: ${id}`);
    }
    const updated: Idea = {
      ...ideas[index],
      completed,
      updatedAt: new Date().toISOString(),
    };
    ideas[index] = updated;
    writeAll(ideas);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const ideas = readAll().filter((idea) => idea.id !== id);
    writeAll(ideas);
  }
}
