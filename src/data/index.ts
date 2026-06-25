import { SupabaseIdeaRepository } from "./SupabaseIdeaRepository";
import { supabase } from "./supabaseClient";
import type { IdeaRepository } from "./IdeaRepository";

/** 앱 전체에서 사용하는 단일 데이터 소스. */
export const ideaRepository: IdeaRepository = new SupabaseIdeaRepository(supabase);

export type { IdeaRepository } from "./IdeaRepository";
