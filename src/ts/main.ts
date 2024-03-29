// Importerar modul för todo-interface
import { Todo } from "./interface";
// Importerar modul för todolist-klassen
import { TodoList } from "./todo";

// Initieringsfunktion som körs när webbsidan laddats
window.onload = init;
function init(): void {
    displayToDos(); // Anropar funktion för att visa befintliga todos
}

// Skapar en ny instans av TodoList för att hantera uppgifter
const todos: TodoList = new TodoList();

// Hämtar element från DOM
const formEl = document.getElementById("todo-form") as HTMLFormElement; // .. som formulär
const taskEl = document.getElementById("task-input") as HTMLInputElement; // .. som input
const priorityEl = document.getElementById("priority") as HTMLSelectElement; //.. som select
const tableEl = document.getElementById("todo-body") as HTMLTableSectionElement; // ..som tabellsektion
const popupEl = document.querySelector(".popup") as HTMLElement; // ..som HTML-element
const toDoContainer = document.getElementById("table-container") as HTMLDivElement; // ..som DIV
const errorEl = document.getElementById("error-message") as HTMLSpanElement // ..som span
const submitBtn = document.getElementById("submit") as HTMLButtonElement // ..som knapp

// Lägger till händelselyssnare för formuläret vid input
formEl.addEventListener("input", () => {
    // Kontrollerar om formuläret är giltigt
    if (formEl.checkValidity()) {
        errorEl.style.display = "none"; // Döljer felmeddelandet när formuläret är giltigt
    }
});

// Skapar händelselyssnare för formuläret vid klick på submit-knappen
submitBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Förhindrar formulärets standardbeteende
    // Kontrollerar om formuläret är giltigt
    if (!formEl.checkValidity()) {
        errorEl.style.display = "flex"; // Visar felmeddelandet om formuläret inte är giltigt
        return; // Avbryter funktionen om formuläret inte är giltigt
    } else {
        errorEl.style.display = "none"; // Döljer felmeddelandet om formuläret är giltigt
    }
    // Försöker lägga till en ny uppgift med användarens inmatade värden
    const newToDo = todos.addTodo(taskEl.value, parseInt(priorityEl.value));
    // Kontrollerar om det lyckades
    if (newToDo) {
        taskEl.value = ""; // Rensar inmatningsfältet för uppgifter
        displayToDos(); // Uppdaterar visningen av todos
        popupEl.classList.add("show"); // Lägger till klassen show vid klick på knappen
        popupEl.innerHTML = "Uppgift skapad <i class='fa-solid fa-check'></i>"; // Skapar innehållet för popupen

        // Döljer popup efter 3 sekunder
        setTimeout(function () {
            popupEl.classList.remove("show"); // Tar bort show-klassen
            popupEl.innerHTML = ''; // Tömmer innehållet
        }, 3000); // 3 sekunder
    }
});

// Funktion för att visa todos i en tabell
function displayToDos() {

    // Hämtar alla todos som finns sparade i listan, enligt interface-typ (array av objekt)
    const allToDos: Todo[] = todos.getTodos();

    // Kontrollerar om det finns sparade todos
    if (allToDos.length > 0) {
        toDoContainer.style.display = "block"; // Visar container för tabellen
        tableEl.innerHTML = ""; // Rensar innehållet i tabellen

        // Loopar genom varje todo och dess index i arrayen
        allToDos.forEach((todo, index) => {

            // Skapar en ny tabellrad för varje kurs
            const rowEl: HTMLTableRowElement = document.createElement("tr");
            tableEl.appendChild(rowEl); // Lägger till den nya raden i tabellens body

            // Skapar en cell för uppgiftsbeskrivningen
            const taskDesc: HTMLTableCellElement = document.createElement('td');
            taskDesc.innerHTML = todo.task; // Sätter cellens innehåll till todons task
            rowEl.appendChild(taskDesc); // Lägger till cellen i raden

            // Skapar en cell för prioritet
            const priorityType: HTMLTableCellElement = document.createElement('td');
            priorityType.innerHTML = todo.priority.toString(); // Konverterar prioritetssiffran till en sträng och sätter cellens innehåll till siffran
            rowEl.appendChild(priorityType); // Lägger till cellen i raden

            // Skapar en cell för status
            const taskStatus: HTMLTableCellElement = document.createElement('td');
            taskStatus.innerHTML = todo.completed ? "Genomförd" : "Pågående"; // Om todon är markerad som klar, sätt cellens innehåll till "Klar", annars till "Pågående"
            rowEl.appendChild(taskStatus); // Lägger till cellen i raden

            // Skapar en cell för statusknapp
            const btnEl: HTMLTableCellElement = document.createElement('td');
            btnEl.className = "btn-Cells"; // Lägger till en klass för cellen
            const completeBtn: HTMLButtonElement = document.createElement('button'); // Skapar en status-knapp för varje todo
            completeBtn.className = "complete-btn" // Sätter en klass för knappen
            completeBtn.innerHTML = "Klarmarkera"; // Sätter knappens innehåll
            btnEl.appendChild(completeBtn); // Lägger till knappen i cellen
            rowEl.appendChild(btnEl); // Lägger till cellen i raden

            // Skapar en klickhändelselyssnare för varje knapp
            completeBtn.addEventListener("click", () => {
                todos.markTodoCompleted(index); // Anropar metod för att klarmarkera uppgift, skickar med index för todon
                displayToDos(); // Anropar funktion för att uppdatera viningen av todos
            })

            // Kontrollerar om uppgiften är klarmarkerad
            if (todo.completed) {
                completeBtn.disabled = true; // Inaktiverar knappen
                completeBtn.innerHTML = "Klarmarkerad <i class='fa-solid fa-check'></i>"; // Ändrar text på knappen
                rowEl.classList.add("completed-task"); // Lägger till en klass på raden
            }
        });
    } else {
        toDoContainer.style.display = "none"; // Döljer tabell-container om inga sparade todos finns
    }
}