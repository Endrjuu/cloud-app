import { useEffect, useState } from "react";
import api from "../services/api";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Błąd pobierania zadań");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async () => {
    if (!newTitle.trim()) {
      setError("Tytuł jest wymagany");
      return;
    }
    try {
      setSubmitting(true);
      setError(null);
      await api.post("/tasks", { title: newTitle, completed: false });
      setNewTitle("");
      await fetchTasks();
    } catch (err: any) {
      setError(err.response?.data?.error || "Błąd tworzenia zadania");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id: number, completed: boolean) => {
    try {
      setError(null);
      await api.patch(`/tasks/${id}`, { completed: !completed });
      await fetchTasks();
    } catch (err: any) {
      setError(err.response?.data?.error || "Błąd aktualizacji zadania");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Usunąć to zadanie?")) return;
    try {
      setError(null);
      await api.delete(`/tasks/${id}`);
      await fetchTasks();
    } catch (err: any) {
      setError(err.response?.data?.error || "Błąd usuwania zadania");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
      <h1>☁️ StudyPlanner Dashboard</h1>

      {/* Formularz dodawania */}
      <div style={{ marginBottom: "1.5rem", display: "flex", gap: "0.5rem" }}>
        <input
          placeholder="Tytuł zadania *"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          style={{ flex: 1, padding: "0.5rem", borderRadius: "4px", border: "1px solid #cbd5e1" }}
        />
        <button
          onClick={handleCreate}
          disabled={submitting}
          style={{ padding: "0.5rem 1.25rem", background: "#22c55e", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          {submitting ? "..." : "Dodaj"}
        </button>
      </div>

      {error && (
        <p style={{ color: "#dc2626", background: "#fee2e2", padding: "0.75rem", borderRadius: "4px", marginBottom: "1rem" }}>
          ⚠️ {error}
        </p>
      )}

      {loading ? (
        <p>Ładowanie...</p>
      ) : tasks.length === 0 ? (
        <p style={{ color: "#64748b" }}>Brak zadań. Dodaj pierwsze!</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0.75rem 1rem", marginBottom: "0.5rem",
            background: task.completed ? "#f0fdf4" : "#fff",
            border: "1px solid #e2e8f0", borderRadius: "8px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.id, task.completed)}
                style={{ width: "18px", height: "18px", cursor: "pointer" }}
              />
              <span style={{ textDecoration: task.completed ? "line-through" : "none", color: task.completed ? "#94a3b8" : "#1e293b" }}>
                {task.title}
              </span>
            </div>
            <button
              onClick={() => handleDelete(task.id)}
              style={{ padding: "0.25rem 0.75rem", background: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Usuń
            </button>
          </div>
        ))
      )}
    </div>
  );
}
