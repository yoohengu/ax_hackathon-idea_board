import type { Idea, IdeaInput } from "../types/idea";

/**
 * 데이터 소스에 대한 추상 인터페이스.
 * 지금은 LocalStorageIdeaRepository가 구현체지만,
 * 추후 Supabase로 교체할 때는 이 인터페이스를 구현하는
 * SupabaseIdeaRepository만 추가하고 src/data/index.ts에서 교체하면 된다.
 */
export interface IdeaRepository {
  getAll(): Promise<Idea[]>;
  getById(id: string): Promise<Idea | undefined>;
  create(input: IdeaInput): Promise<Idea>;
  update(id: string, input: IdeaInput): Promise<Idea>;
  setCompleted(id: string, completed: boolean): Promise<Idea>;
  remove(id: string): Promise<void>;
}
