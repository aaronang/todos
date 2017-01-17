var todos = ['task 1', 'task 2', 'task 3'];

function displayTodos() {
  console.log(todos);
}

function addTodo(todo) {
  todos.push(todo);
  displayTodos();
}

function changeTodo(position, todo) {
  todos[position] = todo;
  displayTodos();
}

function deleteTodo(position) {
  todos.splice(position, 1);
  displayTodos();
}
