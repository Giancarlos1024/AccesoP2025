import { useContext, useEffect } from "react";
import { GatewayContext } from "../../context/GatewayContextProvider";

const gateways = [
    {
        title: "GATEWAY BOCAMINAS",
        locations: [
            {
                name: "BOCAMINA HUACRACOCHA",
                devices: [
                    { mac: "AC:23:3F:C1:92:6B", ip: "192.168.18.90", key: "x3" },
                    { mac: "AC:23:3F:C1:BC:19", ip: "192.168.18.91", key: "x1" },
                    
                ],
            },
            {
                name: "BOCAMINA RP-212",
                devices: [
                    { mac: "AC:23:3F:C1:8C:FB", ip: "192.168.18.92", key: "x4" },
                    { mac: "AC:23:3F:C1:77:5A", ip: "192.168.18.93", key: "x2" },
                    
                ],
            },
        ],
    },
    {
        title: "GATEWAY ACCESO ZONA OESTE",
        locations: [
            {
                name: "ACCESO ZONA OESTE",
                devices: [
                    { mac: "AC:23:3F:C1:8C:FB", ip: "192.168.18.92", key: "x7" },
                    { mac: "AC:23:3F:C1:77:5A", ip: "192.168.18.93", key: "x5" },
                    
                ],
            },
        ],
    },
];

export const Gateway = () => {
    // Gateway.jsx
    const { x1, x2, x3, x4, x5, x7, setX1, setX2, setX3, setX4, setX5, setX7, fetchData } = useContext(GatewayContext);

    useEffect(() => {
        const fetchAllData = () => {
            fetchData('x1', setX1);
            fetchData('x2', setX2);
            fetchData('x3', setX3);
            fetchData('x4', setX4);
            fetchData('x5', setX5);
            fetchData('x7', setX7);
        };
    
        // Llamar la primera vez
        fetchAllData();
    
        // Configurar la actualización cada 10 segundos
        const interval = setInterval(fetchAllData, 5000);
    
        // Limpiar el intervalo al desmontar el componente
        return () => clearInterval(interval);
    }, []);


    const states = { x1, x2, x3, x4, x5, x7 };

    return (
        <div className="min-h-screen p-0">
            <div className="w-full">
                <div className="py-0 flex gap-4">
                    {gateways.map((gateway) => (
                        <div key={gateway.title} className="bg-white p-0 mt-2 shadow-xl flex flex-col py-1 rounded-lg text-center w-full">
                            <h3 className="text-[10px] font-semibold text-cyan-600 mb-2">{gateway.title}</h3>
                            <div className="my-0 m-2 text-xs flex justify-between gap-2">
                                {gateway.locations.map((location) => (
                                    <div key={location.name} className="mb-4 text-xs rounded-lg flex flex-col w-full">
                                        <h4 className="text-gray-600 font-semibold text-[9px] border-b pb-2 mb-2">{location.name}</h4>
                                        <div className="text-left flex flex-col justify-center items-center gap-1">
                                            {location.devices.map((device) => (
                                                <div key={device.mac} className="bg-white w-[255px] flex p-3 justify-between rounded-lg shadow-sm">
                                                    <div>
                                                        <p className="text-[9px] font-medium text-gray-600"><strong>MAC:</strong> {device.mac}</p>
                                                        <p className="text-[9px] text-gray-500"><strong>IP:</strong> {device.ip}</p>
                                                    </div>
                                                    <div 
                                                        className={`w-4 h-4 rounded-full transition-all duration-500 
                                                            ${states[device.key] ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
                                                    ></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
