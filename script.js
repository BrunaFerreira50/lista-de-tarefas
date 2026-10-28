const KEY = "tarefas-v1";
let tarefas = carregar();

function carregar(){
  try{
    const raw = localStorage.getItem(KEY);
    const dados = raw ? JSON.parse(raw) : [];
    return Array.isArray(dados) ? dados : [];
  }catch(e){ return []; }
}
function salvar(){
  try{ localStorage.setItem(KEY, JSON.stringify(tarefas)); }catch(e){}
}

const lista = document.getElementById("lista");
const contador = document.getElementById("contador");
const novo = document.getElementById("novo");
let editandoId = null;

function renderizar(){
  lista.innerHTML = "";
  if(!tarefas.length){
    const vazio = document.createElement("div");
    vazio.className = "empty";
    vazio.textContent = "Nenhuma tarefa por aqui. Adicione a primeira!";
    lista.appendChild(vazio);
  }
  tarefas.forEach(t => lista.appendChild(criarItem(t)));
  const pendentes = tarefas.filter(t => !t.done).length;
  contador.textContent = pendentes + (pendentes === 1 ? " tarefa pendente" : " tarefas pendentes");
}

function criarItem(t){
  const li = document.createElement("li");
  if(t.done) li.classList.add("done");

  const chk = document.createElement("input");
  chk.type = "checkbox";
  chk.checked = t.done;
  chk.setAttribute("aria-label", "Marcar como concluída");
  chk.addEventListener("change", () => { t.done = chk.checked; salvar(); renderizar(); });
  li.appendChild(chk);

  if(editandoId === t.id){
    const inp = document.createElement("input");
    inp.type = "text";
    inp.value = t.text;
    inp.maxLength = 200;
    const confirmar = () => {
      const v = inp.value.trim();
      if(v) t.text = v;
      editandoId = null; salvar(); renderizar();
    };
    inp.addEventListener("keydown", e => {
      if(e.key === "Enter") confirmar();
      if(e.key === "Escape"){ editandoId = null; renderizar(); }
    });
    li.appendChild(inp);
    li.appendChild(botao("Salvar", "ico", confirmar));
    setTimeout(() => { inp.focus(); inp.select(); }, 0);
  }else{
    const span = document.createElement("span");
    span.className = "txt";
    span.textContent = t.text;
    li.appendChild(span);
    li.appendChild(botao("Editar", "ico", () => { editandoId = t.id; renderizar(); }));
    li.appendChild(botao("Excluir", "ico del", () => {
      tarefas = tarefas.filter(x => x.id !== t.id); salvar(); renderizar();
    }));
  }
  return li;
}

function botao(rotulo, classe, fn){
  const b = document.createElement("button");
  b.type = "button"; b.className = classe; b.textContent = rotulo;
  b.addEventListener("click", fn);
  return b;
}

document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const texto = novo.value.trim();
  if(!texto) return;
  tarefas.push({ id: Date.now() + Math.random(), text: texto, done: false });
  novo.value = "";
  salvar(); renderizar();
});

document.getElementById("limpar").addEventListener("click", () => {
  tarefas = tarefas.filter(t => !t.done); salvar(); renderizar();
});

renderizar();
