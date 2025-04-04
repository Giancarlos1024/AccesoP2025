import { useState, useEffect, createContext } from "react";

export const HistorialContext = createContext();
export const HistorialContextProvider = ({ children }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [historial1, setHistorial1] = useState([]);
    const [empresasworkers, setEmpresasWorkers] = useState([]);

    const handleSearch = async (filters) => {
        try {
            const response = await fetch(`${apiUrl}/historial`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(filters),
            });
            if (!response.ok) throw new Error("Error en la búsqueda");
            const data = await response.json();
            console.log("Resultados obtenidos:", data);
            // Validar que data sea un array antes de actualizar el estado
            if (Array.isArray(data)) {
                setHistorial1(data); // Se actualiza el estado directamente sin necesidad de setTimeout
            } else {
                console.warn("La respuesta no es un array:", data);
                setHistorial1([]); // Limpiar el historial si no hay datos válidos
            }
        } catch (error) {
            console.error("Error en la búsqueda:", error);
        }
    };
    const fetchHistorial = async (filters = null) => {
        try {
            setHistorial1([]); // Limpiar antes de la búsqueda
            let url = `${apiUrl}/dhistorial`;
    
            if (filters) {
                const queryParams = new URLSearchParams();
                if (filters[0].DNI.length > 0) queryParams.append("dni", filters[0].DNI.join(","));
                if (filters[0].MAC.length > 0) queryParams.append("mac", filters[0].MAC.join(","));
                if (filters[1].fechaInicio) queryParams.append("fechaInicio", filters[1].fechaInicio);
                if (filters[1].fechaFin) queryParams.append("fechaFin", filters[1].fechaFin);
    
                url += `?${queryParams.toString()}`;
            }
            const response = await fetch(url);
            if (!response.ok) throw new Error("Error al obtener historial");
            const data = await response.json();
            if (Array.isArray(data)) {
                setHistorial1(data);
            } else {
                // console.warn("Respuesta inesperada:", data);
                setHistorial1([]);
            }
        } catch (error) {
            // console.error("Error en fetchHistorial:", error);
            setHistorial1([]); // Limpiar en caso de error
        }
    };

    const fetchEmpresasWorkers = async () => {
        try {
          const response = await fetch(`${apiUrl}/get-empresa`);
          const data = await response.json();
          setEmpresasWorkers(data);
        } catch (error) {
          console.error("Error fetching DNI options:", error);
        }
      };

    useEffect(() => {
        fetchHistorial();
        fetchEmpresasWorkers();
    }, []);
    return (
        <HistorialContext.Provider value={{ historial1, handleSearch, fetchHistorial,empresasworkers }}>
            {children}
        </HistorialContext.Provider>
    );
};