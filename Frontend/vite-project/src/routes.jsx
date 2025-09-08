import { createBrowserRouter } from "react-router";
import { Login, Register, Todos } from "./assets/components/pages";



export const routes = createBrowserRouter([
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/',
        element: <Login/>
    },
    {
        path: '/todos',
        element: <Todos/>
    }
]) 