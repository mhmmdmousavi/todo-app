import { Input } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, } from "react-hook-form";
import { NavLink } from "react-router";
import z from "zod";
import { client } from "../../lib";

export default function Login() {
    const validationSchema = z.object({
        username: z.string().min(2),
        password: z.string().min(2)
    })

    const{handleSubmit, register, formState: { errors }} = useForm({
        resolver: zodResolver(validationSchema)

    })

    async function submitLogin(user) {
        try {
            const response = await client.post("/login", {username: user.username, password: user.password})
        } catch (error) {
            console.log(error);
            
        }
    }


  return (
    <div className="flex flex-col items-center gap-6 m-10 bg-white rounded-2xl p-4">
        <h1 className="text-3xl font-bold">Login</h1>
        <form onSubmit={handleSubmit(submitLogin)} className="flex flex-col gap-4">
            <input {...register("username")} className="bg-gray-200 border rounded-xl p-2" type="text" placeholder="username"/>
            <input {...register("password")} className="bg-gray-200 border rounded-xl p-2" type="text" placeholder="password"/>
            <button className="bg-green-200 p-2 rounded-xl">Login</button>
        </form>
        <p>If you don't have an account click 
            here to <NavLink to={""} className="text-green-500">
            Register
        </NavLink></p>
        
    </div>
  );
}
