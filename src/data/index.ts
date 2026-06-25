import { LocalStorageIdeaRepository } from "./LocalStorageIdeaRepository";
import type { IdeaRepository } from "./IdeaRepository";

/**
 * 앱 전체에서 사용하는 단일 데이터 소스.
 *
 * Supabase로 전환하는 방법:
 * 1. IdeaRepository를 구현하는 SupabaseIdeaRepository를 작성 (예: src/data/SupabaseIdeaRepository.ts)
 * 2. 아래 한 줄만 교체:
 *      export const ideaRepository: IdeaRepository = new SupabaseIdeaRepository(supabaseClient);
 * 다른 컴포넌트/코드는 전혀 수정할 필요 없음.
 */
export const ideaRepository: IdeaRepository = new LocalStorageIdeaRepository();

export type { IdeaRepository } from "./IdeaRepository";
