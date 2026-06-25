import type { Idea } from "../types/idea";
import { FEASIBILITY_LABEL } from "../types/idea";

interface IdeaCardProps {
  idea: Idea;
  onEdit: () => void;
  onDelete: () => void;
  onToggleCompleted: (completed: boolean) => void;
}

export function IdeaCard({ idea, onEdit, onDelete, onToggleCompleted }: IdeaCardProps) {
  return (
    <li
      className={`idea-card feasibility-${idea.feasibility}${
        idea.completed ? " completed" : ""
      }`}
    >
      <div className="idea-card-header">
        <label className="idea-checkbox">
          <input
            type="checkbox"
            checked={idea.completed}
            onChange={(e) => onToggleCompleted(e.target.checked)}
            aria-label="완료 여부"
          />
          <h3>{idea.title}</h3>
        </label>
        <span className="feasibility-badge">
          {FEASIBILITY_LABEL[idea.feasibility]}
        </span>
      </div>

      {idea.description && <p className="idea-description">{idea.description}</p>}

      {idea.notes && (
        <p className="idea-notes">
          <strong>메모</strong> {idea.notes}
        </p>
      )}

      <div className="idea-card-footer">
        <span className="idea-date">
          {idea.completed ? "완료 · " : ""}
          {new Date(idea.updatedAt).toLocaleString()}
        </span>
        <div className="idea-card-actions">
          <button type="button" onClick={onEdit}>
            수정
          </button>
          <button type="button" className="danger" onClick={onDelete}>
            삭제
          </button>
        </div>
      </div>
    </li>
  );
}
