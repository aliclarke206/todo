//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todos");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(e) {
  //Prevent natural behaviour
  e.preventDefault();
  //Create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create list
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  //Save to local - do this last
  //Save to local
  
  //
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
//save local todos
saveLocalTodos(todoInput.value);
  
  //Create Completed Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Create trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //attach final Todo
  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    // delete todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
        
    }
    //check mark
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
}
//filter todo
function filterTodo (e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
                case "completed":
                    if(todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                    }else {
                        todo.style.display = 'none';
                    }
                    break;
                case "uncompleted":
                    if(!todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                    }else {
                        todo.style.display = 'none';
                    }
                    break;
        }
    })
}
// save to local storage
function saveLocalTodos (todo){
//checking if something in there
let todos;
if(localStorage.getItem('todos') === null){
    todos = [];
}else{
    todos = JSON.parse(localStorage.getItem('todos'));
}
todos.push(todo);
localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos () {
    let todos;
    if(localStorage.getItem('todos') === null){
    todos = [];
}else{
    todos = JSON.parse(localStorage.getItem('todos'));
}
    todos.forEach(function(todo){
  //Create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create list
  const newTodo = document.createElement("li");
  newTodo.innerText = todo;
  //Save to local - do this last
  //Save to local
  
  //
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //Create Completed Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Create trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //attach final Todo
  todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos (todo){
    let todos;
if(localStorage.getItem('todos') === null){
    todos = [];
}else{
    todos = JSON.parse(localStorage.getItem('todos'));
}
const todoIndex = todo.children[0].innerText;
todos.splice(todos.indexOf(todoIndex), 1);
localStorage.setItem("todos", JSON.stringify(todos));
}