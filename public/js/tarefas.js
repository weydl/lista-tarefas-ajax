// ============================================================
// Este JS roda no NAVEGADOR (public/js/), NÃO no servidor!
// ============================================================

let timerBusca = null;

// 🎯 TODO 6: carregarTarefas(termo) — fetch GET com loading state
// Mostrar #loading, ocultar no finally
// Se termo: /api/tarefas?q=termo, senão /api/tarefas
async function carregarTarefas(termo = '') {
  const loading = document.getElementById('loading');
  const lista = document.getElementById('lista-tarefas');
  loading.style.display = 'block';
  lista.style.opacity = '0.5';
  try {
    // TODO: fetch GET + exibirTarefas(json.dados)
  } catch (e) {
    lista.innerHTML = '<p class="erro">Falha ao carregar.</p>';
  } finally {
    loading.style.display = 'none';
    lista.style.opacity = '1';
  }
}

// 🎯 TODO 7: exibirTarefas(tarefas) — gerar HTML com template literals
// Cada tarefa precisa de id="tarefa-${t.id}" para DOM parcial!
// Checkbox: onclick="toggleConcluida(${t.id})"
// Botão editar: onclick="editarTarefa(${t.id})"
// Botão remover: onclick="removerTarefa(${t.id})"
function exibirTarefas(tarefas) {
  const lista = document.getElementById('lista-tarefas');
  if (tarefas.length === 0) {
    lista.innerHTML = '<p class="vazio">Nenhuma tarefa.</p>';
    return;
  }
  // TODO: lista.innerHTML = tarefas.map(t => `...`).join('');
}

function exibirTotal(total) {
  document.getElementById('total').textContent = total;
}

// 🎯 TODO 8: criarTarefa(event) — fetch POST com botão disabled
async function criarTarefa(event) {
  event.preventDefault();
  const btn = event.target.querySelector('button');
  const input = document.getElementById('inp-titulo');
  btn.disabled = true;
  btn.textContent = 'Salvando...';
  try {
    // TODO: fetch POST + limpar input + carregarTarefas()
  } catch (e) {
    alert('Falha ao criar.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Adicionar';
  }
}

// 🎯 TODO 9: editarTarefa(id) — fetch PUT (prompt para novo título)
async function editarTarefa(id) {
  const novoTitulo = prompt('Novo título:');
  if (!novoTitulo || !novoTitulo.trim()) return;
  // TODO: fetch PUT /api/tarefas/${id} com { titulo: novoTitulo }
  // Depois: DOM parcial — atualizar SÓ o textContent do título
}

// 🎯 TODO 10: toggleConcluida(id) — fetch PUT /api/tarefas/:id/toggle
// DOM parcial: toggle a classe 'concluida' e trocar emoji
async function toggleConcluida(id) {
  // TODO: fetch PUT toggle + atualizar SÓ o item
}

// 🎯 TODO 11: removerTarefa(id) — fetch DELETE com confirm
async function removerTarefa(id) {
  if (!confirm('Remover esta tarefa?')) return;
  // TODO: fetch DELETE + carregarTarefas()
}

// 🎯 TODO 12: buscarComDebounce(event) — debounce 300ms
function buscarComDebounce(event) {
  const termo = event.target.value.trim();
  clearTimeout(timerBusca);
  timerBusca = setTimeout(() => {
    carregarTarefas(termo);
  }, 300);
}

// Carregar ao abrir
carregarTarefas();
