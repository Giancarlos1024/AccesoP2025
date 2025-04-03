import { RotateCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApi } from '../../context/EventosContextProvider'; // Importar el contexto

export const Header = () => {
    const { fetchEventos, fetchData } = useApi();

    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [period, setPeriod] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            const period = hours >= 12 ? 'PM' : 'AM';
            const hours12 = hours % 12 || 12;

            setTime(`${hours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            setPeriod(period);
        };

        updateTime();
        const clockInterval = setInterval(updateTime, 1000);

        return () => clearInterval(clockInterval);
    }, []);

    return (
        <div className="flex justify-between items-center bg-white shadow-md rounded-lg mb-4 p-3 mt-0 w-full">
            <h1 className="text-xl font-semibold text-gray-500">
                Personal en Mina | <span className="text-xs">Protocolo AAAA</span>
            </h1>
            <span className="text-2xl text-gray-600">
                {time} <span className="text-lg font-medium">{period}</span>
            </span>
            <div className="flex space-x-3 items-center">
                <RotateCw
                    size={35}
                    strokeWidth={1.5}
                    onClick={() => {
                    fetchEventos();
                    fetchData();
                    }}
                    className="text-white bg-[rgb(23,50,107)] p-1.5 w-15 rounded-xs cursor-pointer 
                             hover:scale-105 transition-all duration-200 
                            active:opacity-50"
                />
            </div>
        </div>
    );
};
