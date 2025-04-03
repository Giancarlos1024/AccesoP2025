import { useState, useEffect } from "react";
import { useApi } from "../../context/EventosContextProvider";



export const Distribucion = () => {
  const { data, fetchData } = useApi();
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
      setLastUpdated(new Date().toLocaleTimeString());
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-2 w-auto mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h1 className="uppercase text-xs text-cyan-600">Distribución por Ubicación</h1>
        <span className="text-xs text-gray-500">Última actualización: {lastUpdated}</span>
      </div>

      {data.length === 0 ? (
        <p>No hay datos disponibles</p>
      ) : (
        <table className="border-collapse border border-gray-300 text-gray-600 w-full">
          <thead>
            <tr className="bg-[#17326b] text-white font-normal text-[10px]">
              <th className="border border-gray-300 px-4 py-2">Ubicación</th>
              <th className="border font-bold border-gray-300 px-4 py-2">Total Personas</th>
              <th className="border border-gray-300 px-4 py-2">Ingresos de Personal</th>
              <th className="border border-gray-300 px-4 py-2">Personal en Otras Áreas</th>
              <th className="border border-gray-300 px-4 py-2">Total de UM</th>
              <th className="border border-gray-300 px-4 py-2">Ingresos de UM</th>
              <th className="border border-gray-300 px-4 py-2">UM en Otras Áreas</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 text-xs cursor-pointer">
                <td className="text-[12px] text-[#17326b] font-bold border border-gray-300 px-4 py-2 text-center">
                  Acceso zona oeste
                </td>
                <td className="text-[14px] text-green-500 font-bold border border-gray-300 px-4 py-2 text-center">
                  {item.total_personas}
                </td>
                <td className="text-[12px] border border-gray-300 px-4 py-2 text-center">{item.entrada_personas}</td>
                <td className="text-[12px] border border-gray-300 px-4 py-2 text-center">{item.salida_personas}</td>
                <td className="text-[14px] text-green-500 font-bold border border-gray-300 px-4 py-2 text-center">
                  {item.total_unidades_moviles}
                </td>
                <td className="text-[12px] border border-gray-300 px-4 py-2 text-center">{item.entrada_unidades_moviles}</td>
                <td className="text-[12px] border border-gray-300 px-4 py-2 text-center">{item.salida_unidades_moviles}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
