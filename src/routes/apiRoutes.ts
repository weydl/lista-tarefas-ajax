import { Router } from "express";
import { readFileSync, writeFileSync } from "fs";

export const apiRoutes = Router();

interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
  criadaEm: string;
}

function carregar(): Tarefa[] {
  return JSON.parse(readFileSync("dados/tarefas.json", "utf-8"));
}

function salvar(t: Tarefa[]) {
  writeFileSync("dados/tarefas.json", JSON.stringify(t, null, 2));
}

// GET
apiRoutes.get("/api/tarefas", (req, res) => {
  const termo = String(req.query.q || "").toLowerCase();

  let tarefas = carregar();

  if (termo) {
    tarefas = tarefas.filter((t) =>
      t.titulo.toLowerCase().includes(termo)
    );
  }

  res.json({
    sucesso: true,
    dados: tarefas,
    total: tarefas.length,
  });
});

// POST
apiRoutes.post("/api/tarefas", (req, res) => {
  const { titulo } = req.body;

  if (!titulo || !titulo.trim()) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "Título é obrigatório",
    });
  }

  const tarefas = carregar();

  const nova: Tarefa = {
    id: tarefas.length ? Math.max(...tarefas.map((t) => t.id)) + 1 : 1,
    titulo: titulo.trim(),
    concluida: false,
    criadaEm: new Date().toISOString(),
  };

  tarefas.push(nova);
  salvar(tarefas);

  res.status(201).json({
    sucesso: true,
    dados: nova,
  });
});

// PUT editar
apiRoutes.put("/api/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);
  const { titulo } = req.body;

  const tarefas = carregar();

  const tarefa = tarefas.find((t) => t.id === id);

  if (!tarefa) {
    return res.status(404).json({
      sucesso: false,
      mensagem: "Tarefa não encontrada",
    });
  }

  tarefa.titulo = titulo.trim();

  salvar(tarefas);

  res.json({
    sucesso: true,
    dados: tarefa,
  });
});

// PUT toggle
apiRoutes.put("/api/tarefas/:id/toggle", (req, res) => {
  const id = Number(req.params.id);

  const tarefas = carregar();

  const tarefa = tarefas.find((t) => t.id === id);

  if (!tarefa) {
    return res.status(404).json({
      sucesso: false,
      mensagem: "Tarefa não encontrada",
    });
  }

  tarefa.concluida = !tarefa.concluida;

  salvar(tarefas);

  res.json({
    sucesso: true,
    dados: tarefa,
  });
});

// DELETE
apiRoutes.delete("/api/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);

  const tarefas = carregar();

  const novas = tarefas.filter((t) => t.id !== id);

  salvar(novas);

  res.json({
    sucesso: true,
  });
});