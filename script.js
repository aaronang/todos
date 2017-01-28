var todos = {
  todos: [],
  add: function(text) {
    if (this.valid(text))
      this.todos.push({
        text: text,
        completed: false
      });
    this.persist();
  },
  edit: function(position, text) {
    if (this.valid(text))
      this.todos[position].text = text;
    this.persist();
  },
  destroy: function(position) {
    this.todos.splice(position, 1);
    this.persist();
  },
  toggle: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    this.persist();
  },
  toggleAll: function() {
    var completed = this.completed().length;

    this.todos.forEach((t) => {
      t.completed = !(completed === this.size());
    }, this);
    this.persist();
  },
  size: function() {
    return this.todos.length;
  },
  completed: function() {
    return this.todos.filter((t) => {
      return t.completed;
    });
  },
  valid: function(text) {
    return text.replace(/\s+/g, '');
  },
  persist: function() {
    localStorage.setItem('data', JSON.stringify(this.todos));
  }
};

var handlers = {
  add: function() {
    var input = document.getElementsByClassName('new-todo')[0];
    todos.add(input.value);
    input.value = '';
    view.displayTodos();
  },
  edit: function(position, text) {
    todos.edit(position, text);
    view.displayTodos();
  },
  destroy: function(position) {
    todos.destroy(position);
    view.displayTodos();
  },
  toggle: function(position) {
    todos.toggle(position);
    view.displayTodos();
  },
  toggleAll: function() {
    todos.toggleAll();
    view.displayTodos();
  },
};

var view = {
  displayTodos: function() {
    var ul = document.querySelector('ul');
    ul.innerHTML = '';

    todos.todos.forEach(function(todo, i) {
      ul.appendChild(this.createListItem(todo, i));
    }, this);
  },
  createListItem: function(todo, i) {
    var li = document.createElement('li');
    li.id = i;
    li.className = todo.completed ? 'completed' : '';
    li.appendChild(this.createTodoItem(todo));
    return li;
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.className = 'destroy';
    return deleteButton;
  },
  createEditInput: function() {
    var edit = document.createElement('input');
    edit.className = 'edit';

    edit.addEventListener('keyup', (e) => {
      if (e.keyCode == 13) {
        handlers.edit(Number(e.target.parentElement.id), e.target.value);
        edit.parentNode.removeChild(edit);
      }
    });

    return edit;
  },
  createToggle: function() {
    var toggle = document.createElement('input');
    toggle.className = 'toggle';
    toggle.type = 'checkbox';

    toggle.addEventListener('click', function(e) {
      var parent = e.target.parentNode.parentNode;
      var id = parent.id;
      parent.className = parent.className === 'completed' ? '' : 'completed';
      handlers.toggle(Number(id));
    });

    return toggle;
  },
  createTodoItem: function(todo) {
    var div = document.createElement('div');
    div.className = 'view';

    var toggle = this.createToggle();
    toggle.checked = todo.completed;

    var label = document.createElement('label');
    label.textContent = todo.text;

    var edit = this.createEditInput();

    label.addEventListener('dblclick', (e) => {
      var val = e.target.textContent;
      e.target.parentNode.insertAdjacentElement('afterend', edit);
      e.target.parentNode.parentNode.className = 'editing';
      edit.value = val;
      edit.focus();
    });

    div.appendChild(toggle);
    div.appendChild(label);

    div.appendChild(this.createDeleteButton());

    return div;
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', (e) => {
      var clickedElement = e.target;
      if (clickedElement.className === 'destroy') {
        handlers.destroy(parseInt(clickedElement.parentNode.id));
      }
    });

    var newTodo = document.getElementsByClassName('new-todo')[0];
    newTodo.addEventListener('keyup', (e) => {
      if (e.keyCode == 13) {
        handlers.add();
      }
    });

    document.addEventListener('click', function(e) {
      var edit = document.getElementsByClassName('edit')[0];
      if (edit && e.target.className !== 'edit') {
        handlers.edit(Number(edit.parentElement.id), edit.value);
        edit.parentNode.removeChild(edit);
      }
    });
  }
};

function main() {
  view.setUpEventListeners();
  if (localStorage.length) {
    todos.todos = JSON.parse(localStorage.getItem('data'));
    view.displayTodos();
  }
}

main();
