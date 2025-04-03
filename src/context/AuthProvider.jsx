import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (token && role) {
            setUser({ token, role });
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
    
            const data = await response.json();
    
            if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser({ token: data.token, role: data.role, user: data.user });
    
                navigate(data.role === "admin" || data.role === "personal" ? "/dashboard" : "/");
                return true; // Agregar este retorno
            } else {
                return false; // Agregar este retorno
            }
        } catch (error) {
            console.error("Error en la autenticación:", error);
            return false; // Agregar este retorno en caso de error
        }
    };
    
    

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user"); // Eliminar también el usuario almacenado
        setUser(null);
        navigate("/");
    };
    

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
