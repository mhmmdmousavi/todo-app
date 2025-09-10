import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { addTodo, deleteTodo, getTodos, logOut, updateTodo } from "../TodoServices";
import { MdDelete } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import { data } from "react-router";
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";


export default function Todos() {
    const[todos, setTodos] = useState([])
    const [newTodo, setNewTodo] = useState("")
    const [reload, setReload] = useState(false)
    const [editedTodos, setEditedTodos] = useState({})
    async function getTodosList()  {
        try {
            const data = await getTodos()
            setTodos(data)
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=> {
        getTodosList();
    }, [reload])

    async function handleAdd() {
        if (!newTodo.trim()) return;
        const added = await addTodo(newTodo)
        setTodos((todos) => [...todos, added])
        setNewTodo("")
        setReload(!reload)
    }


    return(
        <div className="flex flex-col items-center m-6 gap-4 relative">
            <h1 className="text-4xl font-bold">Todo <span className="text-green-300">List</span></h1>
            <RiLogoutBoxLine onClick={logOut} className="text-2xl absolute left-0 top-0"/>
            <div className="flex flex-row w-10/12 items-center justify-center gap-2">
                <textarea value={newTodo} onChange={(e)=> setNewTodo(e.target.value)} className={`border pl-2 rounded-4xl w-10/12" type="text" placeholder="Enter text here `} placeholder="Enter your task here"/>
                <button onClick={handleAdd} className="text-4xl"><FaCirclePlus /></button>
            </div>
            <ul className="flex flex-col-reverse items-center gap-2 w-10/12 ">
                {todos.map((todo)=> (
                    <li key={todo.id}  className={`flex flex-row items-center justify-between  p-4 rounded-2xl border gap-2 w-[90%] ${todo.completed ? "bg-red-300" : "bg-sky-200"}`} >
                        <div className="flex flex-row justify-start w-[80%] gap-2">
                            <button onClick={() => {updateTodo(todo.id, {completed: !todo.completed}),setReload(!reload)}}>
                                <MdOutlineDone className={todo.completed?"text-2xl text-green-700" :"text-gray-400 text-2xl"}/>
                            </button>
                            <textarea value={editedTodos[todo.id] ?? todo.text} onChange={(e)=> {setEditedTodos((prev)=> ({...prev, [todo.id]:e.target.value}))}}  className={`w-10/12 break-words ${todo.completed ? "line-through text-gray-500" : ""}`}>{todo.text}</textarea>
                        </div>
                        <FaSave onClick={()=>{updateTodo(todo.id, {text: editedTodos[todo.id]}),setReload(!reload)}} className="text-2xl"/>
                        <MdDelete onClick={()=> {deleteTodo(todo.id), setReload(!reload)}} className="text-3xl"/>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}