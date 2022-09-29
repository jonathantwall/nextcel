import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import todoList from "../temp_data/todos";

export default function ToDoList() {
    const [loading, setLoading] = useState(false);
    const [newTodo, setNewTodo] = useState("");
    const [toDoList, setToDoList] = useState<string[]>([]);

    let handleAddTodo = (todo: string) => {
        setLoading(true);
        fetch("/api/todo", {
            method: 'POST',
            body: JSON.stringify([...toDoList, todo])
        })
            .then((res) => res.json())
            .then((data: string[]) => {
                setToDoList(data);
                setLoading(false);
            });
    };

    let handleRemoveTodo = (idx: number) => {
        setLoading(true);
        const newList = [...toDoList]
        newList.splice(idx, 1)
        fetch("/api/todo", {
            method: 'POST',
            body: JSON.stringify(newList)
        })
            .then((res) => res.json())
            .then((data) => {
                setToDoList(data);
                setLoading(false);
            });
    };

    let loadTodos = () => {
        console.log("load todos");
        fetch("/api/todo")
            .then((res) => res.json())
            .then((data) => {
                console.log(typeof(data))
                setToDoList(data);
                setLoading(false);
            });
    };

    useEffect(() => {
        console.log("Booting up")
        setLoading(true);
        loadTodos();
      }, []);

    return (
        <div>
            <h1>Your Local Client Side ToDo List!</h1>
            <h3>Add a new Todo</h3>
            {
                loading ? (
                    <h2>Loading...</h2>
                ) :
                    (
                        <>
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

                        </>)}
        </div>
    )
}