import { Input } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import z from "zod";
import { client } from "../../lib";
import { useState } from "react";

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
            const response = await client.post("accounts/login/", {username: user.username, password: user.password})
            const access = response.data.access
            const refresh = response.data.refresh
            localStorage.setItem("access", access)
            localStorage.setItem("refresh", refresh)
            alert("you are logged in")
            if (response.status === 200) {
            window.location.href = "/todos";
        }
        } catch (error) {
            console.log(error);
            alert("username or password is incorrect!")
        }
    }


  return (
    <div className="flex flex-col items-center gap-6 m-10 bg-sky-200 rounded-2xl p-4">
        <h1 className="text-3xl font-bold">Login</h1>
        <form onSubmit={handleSubmit(submitLogin)} className="flex flex-col gap-4">
            <input {...register("username")} className="bg-white border rounded-xl p-2" type="text" placeholder="username"/>
            <input {...register("password")} className="bg-white border rounded-xl p-2" type="text" placeholder="password"/>
            <button className="bg-green-200 p-2 rounded-xl">Login</button>
        </form>
        <p>If you don't have an account click 
            here to <NavLink to={"register/"} className="text-green-500">
            Register
        </NavLink></p>
        
    </div>
  );
}
