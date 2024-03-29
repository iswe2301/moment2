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
const popupEl = document.querySelector('.popup') as HTMLElement; // ..som HTML-element

// Skapar händelselyssnare för formuläret vid klick på submit-knappen
formEl.addEventListener("submit", (event) => {
    event.preventDefault(); // Förhindrar formulärets standardbeteende
    // Försöker lägga till en ny uppgift med användarens inmatade värden
    const newToDo = todos.addTodo(taskEl.value, parseInt(priorityEl.value));
    // Kontrollerar om det lyckades
    if (newToDo) {
        taskEl.value = ""; // Rensar inmatningsfältet för uppgifter
        displayToDos(); // Uppdaterar visningen av todos
        popupEl.classList.add("show"); // Lägger till klassen show vid klick på knappen
        popupEl.innerHTML = "Uppgift skapad!"; // Skapar innehållet för popupen

        // Döljer popup efter 3 sekunder
        setTimeout(function () {
            popupEl.classList.remove("show"); // Tar bort show-klassen
            popupEl.innerHTML = ''; // Tömmer innehållet
        }, 3000); // 3 sekunder
    } else {
        alert("Vänligen fyll i alla obligatoriska fält!"); // Visar ett felmeddelande om det inte gick att lägga till uppgiften
    }
});

// Funktion för att visa todos i en tabell
function displayToDos() {
    tableEl.innerHTML = ""; // Rensar tidigare innehåll i tabellen

    // Hämtar alla todos som finns sparade i listan, enligt interface-typ (array av objekt)
    const allToDos: Todo[] = todos.getTodos();

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
        taskStatus.innerHTML = todo.completed ? "Klar" : "Pågående"; // Om todon är markerad som klar, sätt cellens innehåll till "Klar", annars till "Pågående"
        rowEl.appendChild(taskStatus); // Lägger till cellen i raden

        // Skapar en cell för statusknapp
        const btnEl: HTMLTableCellElement = document.createElement('td');
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
            rowEl.classList.add("completed-task"); // Lägger till en klass på raden
        }
    });
}