// Importerar modul för todo-interface
import { Todo } from "./interface";
// Importerar modul för todolist-klassen
import { TodoList } from "./todo";

// Skapar en ny instans av TodoList för att hantera uppgifter
const todos: TodoList = new TodoList();

// Hämtar element från DOM
const formEl = document.getElementById("todo-form") as HTMLFormElement; // .. som formulär
const taskEl = document.getElementById("task-input") as HTMLInputElement; // .. som input
const priorityEl = document.getElementById("priority") as HTMLSelectElement; //.. som select

// Skapar händelselyssnare för formuläret vid klick på submit-knappen
formEl.addEventListener("submit", (event) => {
    event.preventDefault(); // Förhindrar formulärets standardbeteende
    // Försöker lägga till en ny uppgift med användarens inmatade värden
    const newToDo = todos.addTodo(taskEl.value, parseInt(priorityEl.value));
    // Kontrollerar om det lyckades
    if (newToDo) {
        taskEl.value = ""; // Rensar inmatningsfältet för uppgifter
    } else {
        alert("Vänligen fyll i alla obligatoriska fält!"); // Visar ett felmeddelande om det inte gick att lägga till uppgiften
    }
});