import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { client } from "../../lib";
import { ZodObject } from "zod/v3";
import z from "zod";

export default function Register() {
    const validationSchema = z.object({
        email: z.email({message:"email is not valid"}),
        username: z.string().min(3,"username is too short"),
        password: z.string().min(2, "password is too short")
    })
    const {handleSubmit, register, formState:{ errors }} = useForm({
        resolver: zodResolver(validationSchema)
    })

    const [isloading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
async function submitRegister(user){
    try {
        setIsLoading(true)
        const response = await client.post("accounts/register/", {email: user.email, username: user.username, password: user.password})
        if (response.status === 201) {
            // navigate("")
            window.location.href = "/";
        }
    } catch (error) {
        console.log(error);
        setIsError(true)
    }
    setIsLoading(false)
}

const navigate = useNavigate()
// useEffect(() => {
//   if (isError) setIsError(false);
// }, [email, username, password]);

  return (
    <div className="flex flex-col items-center gap-6 m-10 bg-sky-200 rounded-2xl p-4">
        <h1 className="text-3xl font-bold">REGSTER</h1>
        <form onSubmit={handleSubmit(submitRegister)} className="flex flex-col gap-4">
            <input {...register("email")} className="bg-white border rounded-xl p-2" type="text" placeholder="email"/>
            <input {...register("username")} className="bg-white border rounded-xl p-2" type="text" placeholder="username"/>
            <input {...register("password")} className="bg-white border rounded-xl p-2" type="password" placeholder="password"/>
            <button className="bg-green-200 p-2 rounded-xl">REGISTER</button>
        </form>
        <p>If you have an account click 
            here to <NavLink to={"/"} className="text-green-500">
            login
        </NavLink></p>
        
    </div>
  );
}
