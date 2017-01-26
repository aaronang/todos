var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    this.todos.forEach((todo) => {
      if (todo.completed) completedTodos++;
    });

    this.todos.forEach((todo) => {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });
  }
};

var handlers = {
  addTodo: function() {
    var input = document.getElementsByClassName('new-todo')[0];
    todoList.addTodo(input.value);
    input.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  },
};

var view = {
  displayTodos: function() {
    var ul = document.querySelector('ul');
    ul.innerHTML = '';

    todoList.todos.forEach(function(todo, i) {
      var li = document.createElement('li');
      li.id = i;
      li.appendChild(view.createTodoItem(todo));
      ul.appendChild(li);
    }, this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.className = 'destroy';
    return deleteButton;
  },
  createTodoItem: function(todo) {
    var div = document.createElement('div');
    div.className = 'view';

    var toggle = document.createElement('input');
    toggle.className = 'toggle';
    toggle.type = 'checkbox';

    var label = document.createElement('label');
    label.textContent = todo.todoText;

    div.appendChild(toggle);
    div.appendChild(label);

    div.appendChild(view.createDeleteButton());

    return div;
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');
    var newTodo = document.getElementsByClassName('new-todo')[0];

    todosUl.addEventListener('click', (e) => {
      var clickedElement = e.target;
      if (clickedElement.className === 'destroy') {
        handlers.deleteTodo(parseInt(clickedElement.parentNode.id));
      }
    });

    newTodo.addEventListener('keyup', (e) => {
      if (e.keyCode == 13) {
        handlers.addTodo();
      }
    });
  }
};

view.setUpEventListeners();
