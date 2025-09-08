import { FaCirclePlus } from "react-icons/fa6";
import { client } from "../../lib";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";


export default function Todos() {
    const[todos, setTodos] = useState([])
    async function getTodos()  {
        try {
            const response = await client.get("/todos")
            const data = response.todo 
            setTodos(data)
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=> {
        getTodos();
    }, [])

    return(
        <div className="flex flex-col items-center m-6 gap-4">
            <h1 className="text-3xl font-bold">Todo <span className="text-green-300">List</span></h1>
            <div className="flex flex-row items-center gap-2">
                <textarea className="border pl-2 rounded-4xl " type="text" placeholder="Enter text here"/>
                <button className="text-4xl"><FaCirclePlus /></button>
            </div>
            <ul>
                <li className="flex flex-row items-center bg-sky-200 p-4 rounded-2xl border gap-2">
                    <input className="" type="checkbox" />
                    <p>
                        Integer urna interdum massa libero auctor neque turpis turpis semper.
                    </p>
                    <MdDelete className="text-3xl"/>
                </li>
            </ul>
        </div>
    )
}