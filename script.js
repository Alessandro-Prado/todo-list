const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const ul = document.getElementById("todo-list");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizarTarefas() {
  ul.innerHTML = "";
  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");
    li.textContent = tarefa.texto;
    if (tarefa.feita) li.classList.add("done");

    li.addEventListener("click", () => {
      tarefas[index].feita = !tarefas[index].feita;
      salvarTarefas();
      renderizarTarefas();
    });

    const btn = document.createElement("button");
    btn.textContent = "deletar";
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      tarefas.splice(index, 1);
      salvarTarefas();
      renderizarTarefas();
    });

    li.appendChild(btn);
    ul.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = input.value.trim();
  if (texto) {
    tarefas.push({ texto, feita: false });
    input.value = "";
    salvarTarefas();
    renderizarTarefas();
  }
});

renderizarTarefas();
