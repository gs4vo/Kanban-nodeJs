// Dados de exemplo: Quadros e Listas
let quadros = [
  { id: 1, name: "Quadro 1" },
  { id: 2, name: "Quadro 2" }
];

let listas = [
  { id: 1, title: "Lista 1", boardId: 1 },
  { id: 2, title: "Lista 2", boardId: 1 },
  { id: 3, title: "Lista 3", boardId: 2 }
];

// Função para adicionar lista ao quadro
function addList(boardId) {
  const title = prompt("Digite o título da lista:");
  if (title) {
      const newList = {
          id: listas.length + 1,
          title: title,
          boardId: boardId
      };
      listas.push(newList);
      renderBoards();
  }
}

// Função para renderizar quadros e listas
function renderBoards() {
  const boardContainers = document.querySelectorAll('.list-container');

  boardContainers.forEach(boardContainer => {
      const boardId = parseInt(boardContainer.getAttribute('data-board-id'));
      const boardLists = listas.filter(lista => lista.boardId === boardId);

      // Limpar o conteúdo atual das listas
      boardContainer.innerHTML = '';

      // Adicionar as listas ao quadro
      boardLists.forEach(lista => {
          const listDiv = document.createElement('div');
          listDiv.classList.add('list');
          listDiv.setAttribute('draggable', 'true');
          listDiv.setAttribute('data-list-id', lista.id);
          listDiv.textContent = lista.title;

          // Permitir arrastar
          listDiv.addEventListener('dragstart', dragStart);
          listDiv.addEventListener('dragend', dragEnd);

          boardContainer.appendChild(listDiv);
      });
  });
}

// Função de início do arrasto
function dragStart(event) {
  event.dataTransfer.setData('text', event.target.getAttribute('data-list-id'));
}

// Função de fim do arrasto
function dragEnd(event) {
  event.target.style.opacity = '1';
}

// Permitir que as listas sejam arrastadas entre os quadros
const boardContainers = document.querySelectorAll('.list-container');

boardContainers.forEach(boardContainer => {
  boardContainer.addEventListener('dragover', (event) => {
      event.preventDefault();
      boardContainer.style.backgroundColor = '#f5f5f5';
  });

  boardContainer.addEventListener('dragleave', () => {
      boardContainer.style.backgroundColor = '';
  });

  boardContainer.addEventListener('drop', (event) => {
      event.preventDefault();
      const listId = event.dataTransfer.getData('text');
      const list = listas.find(lista => lista.id == listId);
      const newBoardId = parseInt(boardContainer.getAttribute('data-board-id'));

      if (list && list.boardId !== newBoardId) {
          list.boardId = newBoardId;
          renderBoards();
      }
      boardContainer.style.backgroundColor = '';
  });
});


// Inicializar o kanban
renderBoards();
