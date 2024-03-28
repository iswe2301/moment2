// Skapar ett interface som modul (export) för att göra-uppgifter
export interface Todo {
    task: string; // Texten för själva uppgiften av string-typ
    completed: boolean; // Variabel för att markera om uppgiften är klar eller inte (true/false)
    priority: 1 | 2 | 3; // Variablel för prioritet, kan bara vara 1, 2 eller 3
}