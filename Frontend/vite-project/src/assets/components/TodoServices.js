import { client } from "../lib";

export async function getTodos() {
    try {
        let access_token = localStorage.getItem("access")
        let response = await client.get("todos/", {
            headers: {Authorization:`Bearer ${access_token}`}
        })
        return response.data || []
    } catch (error) {
        console.log(error);
        
        if (error.response?.status === 401) {
            try {
                const newaccess_token = await refreshAccessToken();
                if (!newaccess_token) return;

                const respones = await client.get("todos/", {
                    headers: {Authorization:`Bearer ${newaccess_token}`}
                })
                return respones.data || []
            } catch (error) {
                console.log(error);
                logOut()
                
            }
        }
        return []
        
    }
}

export async function addTodo(text) {
    try {
        let access_token = localStorage.getItem("access")
        let respones = await client.post("todos/", 
        { text },
        {
            headers: { Authorization:`Bearer ${access_token}` },
        })
        return respones.data
    } catch (error) {
        console.log(error);
        if (error.response?.status === 401) {
            try {
                const newaccess_token = await refreshAccessToken();
                if (!newaccess_token) return;

                const respones = await client.post("todos/", text, {
                    headers: {Authorization:`Bearer ${newaccess_token}`}
                })
                return respones.data || []
            } catch (error) {
                console.log(error);
                logOut()
            }
        }
        
    }
}

export async function updateTodo(id, data) {
    try {
        let access_token = localStorage.getItem("access")
        let response = await client.patch(`todos/${id}/`, data, {
            headers: {Authorization:`Bearer ${access_token}`}
        })
        return response.data || []
    } catch (error) {
        console.log(error);
        if (error.response?.status === 401) {
            try {
                const newaccess_token = await refreshAccessToken();
                if (!newaccess_token) return;

                const respones = await client.patch(`todos/${id}/`, data, {
                    headers: {Authorization:`Bearer ${newaccess_token}`}
                })
                return respones.data || []
            } catch (error) {
                console.log(error);
                logOut()
            }
        }
        
    }
}

export async function deleteTodo(id) {
    try {
        let access_token = localStorage.getItem("access")
        let response = await client.delete(`todos/${id}/`, {
            headers: {Authorization: `Bearer ${access_token}`}
        })
        return response.data || []
    } catch (error) {
        console.log(error);
        if (error.response?.status === 401) {
            try {
                const newaccess_token = await refreshAccessToken();
                if (!newaccess_token) return;

                const respones = await client.delete(`todos/${id}/`, {
                    headers: {Authorization:`Bearer ${newaccess_token}`}
                })
                return respones.data || []
            } catch (error) {
                console.log(error);
                logOut()
            }
        }
        
    }
}

export async function refreshAccessToken() {
    try {
        let refresh_token = localStorage.getItem("refresh")
        let respones = await client.post("accounts/token/refresh/",{refresh: refresh_token})
        localStorage.setItem("access", respones.data.access)
        localStorage.setItem("refresh", respones.data.refresh)
        return respones.data.access
    } catch (error) {
        console.log(error);
        logOut()
    }
}

export async function logOut() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    window.location.href = "/"
}