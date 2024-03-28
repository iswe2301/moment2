// Importerar modul för todo-interface
import { Todo } from './interface';

// Definierar en klass för todolist
class TodoList {
    
    // Privat egenskap som är en array av Todo objekt, finns endast tillgänglig inuti klassen.
    private todos: Todo[];

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

        // Lägger till det nya Todo-objektet till todos-listan.
        this.todos.push(newTodo);
        return true; // Returnerar true för att giltiga värden har matats in och objektet lagts till i listan
    }
}
