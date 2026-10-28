# lista-de-tarefas

Lista de tarefas com persistência local

CRUD completo de tarefas (criar, marcar como concluída, editar, excluir), com dados salvos no navegador via LocalStorage. Projeto feito para praticar manipulação de DOM e lógica de estado.


Funcionalidades
° Adicionar tarefas (Enter ou botão);
° Marcar e desmarcar como concluída;
° Editar o texto da tarefa (Enter salva, Esc cancela);
° Excluir tarefas e limpar todas as concluídas;
° Contador de tarefas pendentes;
° Persistência com LocalStorage: os dados continuam ali após recarregar a página;
° Tema claro e escuro automático, conforme o sistema.


Tecnologias

° HTML, CSS, JavaScript (sem frameworks ou bibliotecas) e LocalStorage.

Como rodar

° Não precisa instalar nada. Baixe o repositório e abra o index.html no navegador.

bash
git clone https://https://github.com/BrunaFerreira50/lista-de-tarefas
cd lista-de-tarefas
# abra o index.html no navegador

Estrutura
lista-de-tarefas/
├── index.html   # estrutura da página
├── style.css    # estilos e tema
└── script.js    # estado, renderização e LocalStorage


Como funciona

O estado fica em um array tarefas. Toda ação (adicionar, concluir, editar, excluir) altera o array, chama salvar() para gravar no LocalStorage e depois renderizar() para redesenhar a lista no DOM. Os elementos são criados com createElement e textContent, evitando innerHTML com texto digitado pelo usuário.

Próximos passos
° Filtros (todas, pendentes, concluídas);
° Reordenar tarefas arrastando;
° Datas e prioridades.
