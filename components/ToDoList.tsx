import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'

export default function ToDoList() {
    const [newTodo, setNewTodo] = useState("");
    const [toDoList, setToDoList] = useState<string[]>([]);

    const handleRemoveTodo = (idx: number) => {
        const newList = [...toDoList]
        newList.splice(idx, 1)
        setToDoList(newList)
    }
    const handleAddTodo = (todo: string) => { 
        setToDoList([...toDoList, todo]) 
    }

    return (
        <div>
            <h1>Your Local Client Side ToDo List!</h1>
            <h3>Add a new Todo</h3>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleAddTodo(newTodo)
            }}>
                <input
                    type="text"
                    name="todo"
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter your TODO!"
                />
                <button type="submit">Submit</button>
            </form>

            <h3>Existing Todos:</h3>
            {toDoList.map((item, idx) => (
                <div key={item} className={styles.card}>
                    <p>{item}</p>
                    <button onClick={() => handleRemoveTodo(idx)}>
                        Delete {idx}
                    </button>
                </div>
            ))}
        </div>
    )
}