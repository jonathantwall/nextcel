export type ToDo = string

export class ToDoList {
    private todoList: ToDo[] = [] 
    constructor() {}

    getTodos(): ToDo[] {
        return this.todoList
    }

    setTodos(newList: ToDo[]) {
        console.log("Setting new ToDos!", newList)
        this.todoList = newList
    }
}

const todoList: ToDoList = new ToDoList()
export default todoList