const cargarLS = (clave) => {
  let lista = [];
  if (localStorage.getItem(clave)) {
    lista = JSON.parse(localStorage.getItem(clave));
  }
  return lista;
};

const guardarLS = (clave, arreglo) => {
  localStorage.setItem(clave, JSON.stringify(arreglo));
};
const keyLS = "todos"
let listaTodos = cargarLS(keyLS);

const changeDone = (index) => {
  listaTodos[index].done = !listaTodos[index].done;
  guardarLS(keyLS, listaTodos);
};

const deleteTodo = (index) => {
  listaTodos.splice(index, 1);
  guardarLS(keyLS, listaTodos);
  printTodos();
};

const addTodo = (todo) => {
  listaTodos.push(todo);
  guardarLS(keyLS, listaTodos);
  printTodos();
};

const printTodos = () => {
  const tBody = document.getElementById("tBody");
  tBody.innerHTML = "";
  listaTodos.forEach((element, index) => {
    tBody.innerHTML += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element.description}</td>
        <td><input class="form-check-input" type="checkbox" ${
          element.done ? "checked" : ""
        } onchange="changeDone(${index})"></td>
        <td><button class="btn btn-danger" onclick="deleteTodo(${index})">Eliminar</button></td>
        </tr>
        `;
  });
};

const handleForm = (event) => {
  event.preventDefault();
  const todoInput = document.getElementById("todoInput");
  const todo = {
    description: todoInput.value,
    done: false,
  };
  addTodo(todo);
};

printTodos();
