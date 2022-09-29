import type { NextApiRequest, NextApiResponse } from 'next'
import { ToDo, ToDoList } from '../../temp_data/todos';
import todoList from '../../temp_data/todos';

console.log(todoList)

export default (req: NextApiRequest, res: NextApiResponse<ToDo[]>) => {
    const {
        body,
        method,
    } = req

    switch (method) {
        case 'GET':
            res.status(200).json(todoList.getTodos());
            break
        case 'POST':
            todoList.setTodos(JSON.parse(body))
            res.status(200).json(todoList.getTodos());
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
};