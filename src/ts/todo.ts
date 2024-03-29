// Importerar modul för todo-interface
import { Todo } from "./interface";

// Definierar en klass för todolist
export class TodoList {

    // Privat egenskap som är en array av Todo objekt, finns endast tillgänglig inuti klassen.
    private todos: Todo[];

    // Konstruktor
    constructor() {
        // Initierar todos-arrayen
        this.todos = [];
        // Laddar todos från localStorage vid skapandet av ett nytt TodoList-objekt
        this.loadFromLocalStorage();
    }

    // Metod för att lägga till en ny uppgift till listan. Argument av typ sträng och nummer som returnerar true/false
    addTodo(task: string, priority: number): boolean {
        // Kontrollerar om task är en tom sträng eller om prioriteten inte är 1/2/3
        if (!task || priority < 1 || priority > 3) {
            return false; // Returnerar false och avrbyter metoden isåfall
        }

        // Skapar ett nytt Todo-objekt enligt typen av interfacet
        const newTodo: Todo = {
            task: task,
            completed: false, // Sätter false initialt på completed
            priority: priority as 1 | 2 | 3 // Specificerar number till 1, 2 eller 3 baserat på interfacet
        };

        this.todos.push(newTodo); // Lägger till det nya Todo-objektet till todos-listan.
        this.saveToLocalStorage(); // Anropar metod för att spara listan i localStorage
        return true; // Returnerar true för att giltiga värden har matats in och objektet lagts till i listan
    }

    // Metod för att markera en specifik todo som genomförd baserat på dess index, returnerar inget
    markTodoCompleted(todoIndex: number): void {
        // Markerar todon som genomförd genom att sätta completed till true istället för false
        this.todos[todoIndex].completed = true;
        // Sparar den uppdaterade listan av todos till localStorage genom att anropa metod
        this.saveToLocalStorage();
    }

    // Metod för att radera todo från tabellen baserat på index
    deleteToDo(index: number): void {
        this.todos.splice(index, 1); // Tar bort todon från arrayen baserat på index (1 st)
        this.saveToLocalStorage(); // Sparar den uppdaterade listan till localStorage
    }

    // Metod för att hämta alla todos, returnerar en array av todo-objekt
    getTodos(): Todo[] {
        return this.todos; // Returnerar hela listan av todo-objekt
    }

    // Metod för att spara listan av todos till webbläsarens localStorage
    saveToLocalStorage(): void {
        // Konverterar todos-arrayen till en sträng i JSON-format och sparar i localStorage
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    // Metod för att ladda listan av todos från webbläsarens localStorage
    loadFromLocalStorage(): void {
        // Hämtar sparade todos från localStorage och lagrar i variabel av typen sträng/null
        const savedTodos: string | null = localStorage.getItem("todos");
        // Kontrollerar om det finns några sparade todos
        if (savedTodos) {
            // Konverterar tillbaka strängen till en array av objekt om det finns sparade todos och uppdaterar listan med todos
            this.todos = JSON.parse(savedTodos);
        }
    }
}
