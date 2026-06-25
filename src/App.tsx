import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { IdeaForm } from "./components/IdeaForm";
import { IdeaList } from "./components/IdeaList";
import { ideaRepository } from "./data";
import type { Feasibility, Idea, IdeaInput } from "./types/idea";

type FeasibilityFilter = "all" | Feasibility;

function App() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
  const [filter, setFilter] = useState<FeasibilityFilter>("all");

  useEffect(() => {
    ideaRepository.getAll().then((data) => {
      setIdeas(data);
      setLoading(false);
    });
  }, []);

  const visibleIdeas = useMemo(
    () => (filter === "all" ? ideas : ideas.filter((idea) => idea.feasibility === filter)),
    [ideas, filter]
  );

  async function handleCreate(input: IdeaInput) {
    const created = await ideaRepository.create(input);
    setIdeas((prev) => [created, ...prev]);
  }

  async function handleUpdate(input: IdeaInput) {
    if (!editingIdea) return;
    const updated = await ideaRepository.update(editingIdea.id, input);
    setIdeas((prev) => prev.map((idea) => (idea.id === updated.id ? updated : idea)));
    setEditingIdea(null);
  }

  async function handleDelete(idea: Idea) {
    if (!confirm(`"${idea.title}" 아이디어를 삭제할까요?`)) return;
    await ideaRepository.remove(idea.id);
    setIdeas((prev) => prev.filter((item) => item.id !== idea.id));
    if (editingIdea?.id === idea.id) {
      setEditingIdea(null);
    }
  }

  async function handleToggleCompleted(idea: Idea, completed: boolean) {
    const updated = await ideaRepository.setCompleted(idea.id, completed);
    setIdeas((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 해커톤 아이디어 보드</h1>
        <p>아이디어, 실현 가능성, 메모를 한곳에서 관리하세요.</p>
      </header>

      <section className="card">
        <h2>{editingIdea ? "아이디어 수정" : "새 아이디어 추가"}</h2>
        <IdeaForm
          key={editingIdea?.id ?? "new"}
          initialValue={editingIdea ?? undefined}
          submitLabel={editingIdea ? "수정 완료" : "추가하기"}
          onSubmit={editingIdea ? handleUpdate : handleCreate}
          onCancel={editingIdea ? () => setEditingIdea(null) : undefined}
        />
      </section>

      <section className="card">
        <div className="list-header">
          <h2>아이디어 목록 ({visibleIdeas.length})</h2>
          <select value={filter} onChange={(e) => setFilter(e.target.value as FeasibilityFilter)}>
            <option value="all">전체</option>
            <option value="high">실현 가능성: 높음</option>
            <option value="medium">실현 가능성: 보통</option>
            <option value="low">실현 가능성: 낮음</option>
          </select>
        </div>

        {loading ? (
          <p className="empty-state">불러오는 중...</p>
        ) : (
          <IdeaList
            ideas={visibleIdeas}
            onEdit={setEditingIdea}
            onDelete={handleDelete}
            onToggleCompleted={handleToggleCompleted}
          />
        )}
      </section>
    </div>
  );
}

export default App;
