// ============================================================
// Este JS roda no NAVEGADOR (public/js/), NÃO no servidor!
// ============================================================

let timerBusca = null;

// Carregar tarefas
async function carregarTarefas(termo = '') {
  const loading = document.getElementById('loading');
  const lista = document.getElementById('lista-tarefas');

  loading.style.display = 'block';
  lista.style.opacity = '0.5';

  try {
    const url = termo
      ? `/api/tarefas?q=${encodeURIComponent(termo)}`
      : '/api/tarefas';

    const response = await fetch(url);
    const json = await response.json();

    exibirTarefas(json.dados);
    exibirTotal(json.total);
  } catch (e) {
    lista.innerHTML = '<p class="erro">Falha ao carregar.</p>';
  } finally {
    loading.style.display = 'none';
    lista.style.opacity = '1';
  }
}

// Exibir tarefas
function exibirTarefas(tarefas) {
  const lista = document.getElementById('lista-tarefas');

  if (tarefas.length === 0) {
    lista.innerHTML = '<p class="vazio">Nenhuma tarefa.</p>';
    return;
  }

  lista.innerHTML = tarefas
    .map(
      (t) => `
      <div
        id="tarefa-${t.id}"
        class="tarefa ${t.concluida ? 'concluida' : ''}"
      >
        <input
          type="checkbox"
          ${t.concluida ? 'checked' : ''}
          onclick="toggleConcluida(${t.id})"
        />

        <span class="titulo">
          <span class="emoji">
            ${t.concluida ? '✅' : '📌'}
          </span>
          <span class="texto">${t.titulo}</span>
        </span>

        <div class="acoes">
          <button onclick="editarTarefa(${t.id})">
            ✏️ Editar
          </button>

          <button onclick="removerTarefa(${t.id})">
            🗑️ Remover
          </button>
        </div>
      </div>
    `
    )
    .join('');
}

function exibirTotal(total) {
  document.getElementById('total').textContent = total;
}

// Criar tarefa
async function criarTarefa(event) {
  event.preventDefault();

  const btn = event.target.querySelector('button');
  const input = document.getElementById('inp-titulo');

  btn.disabled = true;
  btn.textContent = 'Salvando...';

  try {
    const response = await fetch('/api/tarefas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo: input.value.trim(),
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.mensagem);
    }

    input.value = '';

    await carregarTarefas();
  } catch (e) {
    alert('Falha ao criar.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Adicionar';
  }
}

// Editar tarefa
async function editarTarefa(id) {
  const novoTitulo = prompt('Novo título:');

  if (!novoTitulo || !novoTitulo.trim()) return;

  try {
    const response = await fetch(`/api/tarefas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo: novoTitulo.trim(),
      }),
    });

    const json = await response.json();

    const texto = document.querySelector(
      `#tarefa-${id} .texto`
    );

    if (texto) {
      texto.textContent = json.dados.titulo;
    }
  } catch (e) {
    alert('Falha ao editar.');
  }
}

// Toggle concluída
async function toggleConcluida(id) {
  try {
    const response = await fetch(
      `/api/tarefas/${id}/toggle`,
      {
        method: 'PUT',
      }
    );

    const json = await response.json();
    const tarefa = json.dados;

    const item = document.getElementById(
      `tarefa-${id}`
    );

    if (!item) return;

    item.classList.toggle(
      'concluida',
      tarefa.concluida
    );

    const emoji = item.querySelector('.emoji');

    if (emoji) {
      emoji.textContent = tarefa.concluida
        ? '✅'
        : '📌';
    }
  } catch (e) {
    alert('Falha ao atualizar.');
  }
}

// Remover tarefa
async function removerTarefa(id) {
  if (!confirm('Remover esta tarefa?')) return;

  try {
    await fetch(`/api/tarefas/${id}`, {
      method: 'DELETE',
    });

    await carregarTarefas();
  } catch (e) {
    alert('Falha ao remover.');
  }
}

// Busca com debounce
function buscarComDebounce(event) {
  const termo = event.target.value.trim();

  clearTimeout(timerBusca);

  timerBusca = setTimeout(() => {
    carregarTarefas(termo);
  }, 300);
}

// Carregar ao abrir
carregarTarefas();