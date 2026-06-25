import type { Idea } from "../types/idea";
import { IdeaCard } from "./IdeaCard";

interface IdeaListProps {
  ideas: Idea[];
  onEdit: (idea: Idea) => void;
  onDelete: (idea: Idea) => void;
  onToggleCompleted: (idea: Idea, completed: boolean) => void;
}

export function IdeaList({ ideas, onEdit, onDelete, onToggleCompleted }: IdeaListProps) {
  if (ideas.length === 0) {
    return <p className="empty-state">아직 등록된 아이디어가 없어요. 위에서 추가해보세요!</p>;
  }

  return (
    <ul className="idea-list">
      {ideas.map((idea) => (
        <IdeaCard
          key={idea.id}
          idea={idea}
          onEdit={() => onEdit(idea)}
          onDelete={() => onDelete(idea)}
          onToggleCompleted={(completed) => onToggleCompleted(idea, completed)}
        />
      ))}
    </ul>
  );
}
