import { createContext, useState } from "react";

export const GatewayContext = createContext();

export const GatewayContextProvider = ({ children }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [x1, setX1] = useState(false);
    const [x2, setX2] = useState(false);
    const [x3, setX3] = useState(false);
    const [x4, setX4] = useState(false);
    const [x5, setX5] = useState(false);
    const [x7, setX7] = useState(false);

    const fetchData = async (key, setState) => {
        try {
            const response = await fetch(`${apiUrl}/${key}`);
            if (!response.ok) throw new Error("Error en la respuesta del servidor");
    
            const data = await response.json();
            console.log(`Respuesta de la API ${key}:`, data); // Debugging
            setState(data[key.toUpperCase()]); // Establecer el estado con el valor recibido
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    };

    return (
        <GatewayContext.Provider
            value={{
                x1, x2, x3, x4, x5, x7,
                setX1, setX2, setX3, setX4, setX5, setX7,  // Pasamos los setters
                fetchData,
            }}
        >
            {children}
        </GatewayContext.Provider>
    );

};
