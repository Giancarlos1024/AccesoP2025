import React, { createContext, useContext, useState, useEffect } from "react";

// Creamos el contexto para las APIs
const EventosContext = createContext();

// Hook personalizado para usar el contexto
export const useApi = () => {
  return useContext(EventosContext);
};

// Proveedor que envuelve la aplicación
export const EventosContextProvider = ({ children }) => {
  const [datosSuperficie, setDatosSuperficie] = useState([]);
  const [datosInteriorMina, setDatosInteriorMina] = useState([]);
  const [data, setData] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchEventos = async () => {
    try {
      const response = await fetch(`${apiUrl}/eventos`);
      const dataEventos = await response.json();

      const eventosSuperficie = dataEventos.filter(
        (evento) => evento.MacAddressGw === "SUPERFICIE"
      );

      const eventosInteriorMina = dataEventos.filter(
        (evento) => evento.MacAddressGw === "INTERIOR MINA"
      );

      setDatosSuperficie(prev =>
        JSON.stringify(prev) !== JSON.stringify(eventosSuperficie) ? eventosSuperficie : prev
      );
      setDatosInteriorMina(prev =>
        JSON.stringify(prev) !== JSON.stringify(eventosInteriorMina) ? eventosInteriorMina : prev
      );
    } catch (error) {
      console.error("Error al obtener eventos:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/distribucion`);
      if (!response.ok) throw new Error("Error al obtener los datos");
      const responseData = await response.json();
      setData(Array.isArray(responseData) ? responseData : []);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchEventos();
    fetchData();
    const intervalId = setInterval(() => {
      fetchEventos();
      fetchData();
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <EventosContext.Provider value={{ 
      datosSuperficie, 
      datosInteriorMina, 
      fetchEventos, 
      fetchData, 
      data 
    }}>
      {children}
    </EventosContext.Provider>
    
  );
};
