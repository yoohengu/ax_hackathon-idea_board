import { useEffect, useState } from "react";
import type { Feasibility, IdeaInput } from "../types/idea";
import { FEASIBILITY_LABEL } from "../types/idea";

const EMPTY_INPUT: IdeaInput = {
  title: "",
  description: "",
  feasibility: "medium",
  notes: "",
};

interface IdeaFormProps {
  initialValue?: IdeaInput;
  submitLabel: string;
  onSubmit: (input: IdeaInput) => void;
  onCancel?: () => void;
}

export function IdeaForm({ initialValue, submitLabel, onSubmit, onCancel }: IdeaFormProps) {
  const [form, setForm] = useState<IdeaInput>(initialValue ?? EMPTY_INPUT);

  useEffect(() => {
    setForm(initialValue ?? EMPTY_INPUT);
  }, [initialValue]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
    if (!initialValue) {
      setForm(EMPTY_INPUT);
    }
  }

  return (
    <form className="idea-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">아이디어 제목</label>
        <input
          id="title"
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="예: AI 기반 회의록 요약 서비스"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="description">아이디어 설명</label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="어떤 문제를 어떻게 해결하는지 설명해주세요"
          rows={3}
        />
      </div>

      <div className="field">
        <label htmlFor="feasibility">실현 가능성</label>
        <select
          id="feasibility"
          value={form.feasibility}
          onChange={(e) =>
            setForm({ ...form, feasibility: e.target.value as Feasibility })
          }
        >
          {Object.entries(FEASIBILITY_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="notes">메모</label>
        <textarea
          id="notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="추가로 기록해둘 내용"
          rows={2}
        />
      </div>

      <div className="form-actions">
        <button type="submit">{submitLabel}</button>
        {onCancel && (
          <button type="button" className="secondary" onClick={onCancel}>
            취소
          </button>
        )}
      </div>
    </form>
  );
}
