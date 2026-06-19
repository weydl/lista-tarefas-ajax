import { Router } from "express";
import { readFileSync, writeFileSync } from "fs";
export const apiRoutes = Router();

interface Tarefa { id:number; titulo:string; concluida:boolean; criadaEm:string; }
function carregar(): Tarefa[] { return JSON.parse(readFileSync("dados/tarefas.json","utf-8")); }
function salvar(t: Tarefa[]) { writeFileSync("dados/tarefas.json", JSON.stringify(t,null,2)); }

// 🎯 TODO 1: GET /api/tarefas — listar com filtro ?q=termo
// Filtrar por titulo.toLowerCase().includes(termo)
// res.json({ sucesso:true, dados:tarefas, total:tarefas.length })
apiRoutes.get("/api/tarefas", (req, res) => {
  // TODO: implementar
  res.json({ sucesso: true, dados: [], total: 0 });
});

// 🎯 TODO 2: POST /api/tarefas — criar
// Validar titulo obrigatório
// res.status(201).json({ sucesso:true, dados:nova })
apiRoutes.post("/api/tarefas", (req, res) => {
  // TODO: implementar
  res.status(201).json({ sucesso: true, dados: {} });
});

// 🎯 TODO 3: PUT /api/tarefas/:id — editar título
// Receber { titulo } no body, atualizar a tarefa
// res.json({ sucesso:true, dados:tarefa })
apiRoutes.put("/api/tarefas/:id", (req, res) => {
  // TODO: implementar
  res.json({ sucesso: true });
});

// 🎯 TODO 4: PUT /api/tarefas/:id/toggle — marcar/desmarcar concluída
// Inverter concluida: !tarefa.concluida
// res.json({ sucesso:true, dados:tarefa })
apiRoutes.put("/api/tarefas/:id/toggle", (req, res) => {
  // TODO: implementar
  res.json({ sucesso: true });
});

// 🎯 TODO 5: DELETE /api/tarefas/:id — remover
apiRoutes.delete("/api/tarefas/:id", (req, res) => {
  // TODO: implementar
  res.json({ sucesso: true });
});
