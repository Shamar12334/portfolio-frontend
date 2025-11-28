import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {api} from "../../api/client";

function AdminLogin(){
    const[username,setUsername] = useState("");
    const[password,setPassword]=useState("");
    const[error,setError]= useState("");
    const navigate = useNavigate();
    async function handleLogin(e){
        e.preventDefault();
        try{
            const res = await api.post("/auth/login",
                null,{
                    params:{
                        username,
                        password
                    }
            });
            localStorage.setItem("token",res.data.access_token);
            navigate("/admin/dashboard");
        }catch(err){
            setError("Invalid login credentials")
        }
    }
    return(
         <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black px-4">

      <form 
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-xl shadow-xl w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
        >
          Login
        </button>
      </form>

    </div>
    );
}
export default AdminLogin;