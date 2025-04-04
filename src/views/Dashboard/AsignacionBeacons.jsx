import { useState, useContext, useEffect } from "react";
import AsignacionListWithPagination from "../../components/ui/AsignacionListWithPagination";
import { AsignacionContext } from "../../context/AsignacionContextProvider";
import { RotateCw } from 'lucide-react';
import { useLocation } from "react-router-dom";

export const AsignacionBeacons = () =>{
const {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    macToDelete,
    dniOptions,
    macBeacon,
    setMacToDelete,
    asignacionbeacons,
    handleDeleteBeacon,
    errors,
    status,
    statusdeletebeacon,
    fetchDniOptions,
    fetchMacBeacon,
    fetchAsignacion,
    asigmacbeaconsOptiones,
  } = useContext(AsignacionContext);
 console.log("datos de asignaciones", asignacionbeacons)
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation(); // Obtener la ubicación actual
  // console.log("asignaciones data",asignacionbeacons);
  
  const filtersasignacionbeacons = asignacionbeacons.filter(asigbeacon => {
    const search = searchQuery.toLowerCase().replace(/-/g, "/"); // Normaliza la búsqueda reemplazando "-" por "/"
  
    // Convertir la fecha del objeto a formato buscable
    const formattedDate = asigbeacon.Timestamp
      ? new Date(asigbeacon.Timestamp).toLocaleDateString("es-PE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        })
      : "";
  
    return `${asigbeacon.FirstName} ${asigbeacon.SecondName || ''} ${asigbeacon.LastName} ${asigbeacon.SecondLastName} ${asigbeacon.DNI} ${asigbeacon.Company} ${asigbeacon.Position} ${asigbeacon.MacAddressiB} ${asigbeacon.TypeBeacon} ${formattedDate}`
      .toLowerCase()
      .includes(search);
  });
  
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  

  useEffect(() => {
    setCurrentPage(1); // Resetea la paginación cada vez que cambia el filtro
  }, [searchQuery]);


  useEffect(() => {
    fetchDniOptions(); // Recargar los datos al navegar a esta página
    fetchMacBeacon();
  }, [location]); // Solo se ejecuta cuando la ubicación cambie


  return (
    <div className="p-2 bg-gray-100 min-h-screen">
      <section className="flex w-full gap-2">
        <div className="bg-white w-full p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Registro de Asignaciones</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                name="dni"
                list="dniList"
                value={formData.dni}
                onChange={handleChange}
                placeholder="DNI (8 digitos)"
                className="p-2 border rounded w-full"
                autoComplete="off"
              />
             <datalist id="dniList">
                {dniOptions.map((option, index) => (
                <option key={index} value={option.DNI} />
                ))}
            </datalist>
              {errors.dni && <p className="text-red-500 text-sm">{errors.dni}</p>}
            </div>
            <input
                name="MacAddressiB"
                list="MacAddressiBList"
                value={formData.MacAddressiB}
                onChange={handleChange}
                placeholder="MAC del Beacon"
                className={`p-2 border rounded w-full ${errors.MacAddressiB ? "border-red-500" : ""}`}
              />
              <datalist id="MacAddressiBList">
                {macBeacon.map((mac, index) => (
                <option key={index} value={mac.MacAddressiB} />
                ))}
            </datalist>
            {errors.MacAddressiB && <p className="text-red-500 text-sm">{errors.MacAddressiB}</p>}
          </div>
          <div className="mt-4 flex space-x-2">
            <button onClick={handleSubmit} className="bg-[#17326b] cursor-pointer text-white px-4 py-2 rounded">
              Insertar
            </button>
          </div>
          {status && <div className="mt-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">{status}</div>}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Eliminar Asignación</h2>
          <input
            type="text"
            value={macToDelete}
            onChange={(e) => setMacToDelete(e.target.value)}
            placeholder="MAC asignacion"
            list="beaconsList"
            className="p-2 border rounded w-full mb-2"
          />
          <datalist id="beaconsList">
            {asigmacbeaconsOptiones.map((asignacion, index) => (
              <option key={index} value={asignacion.MacAddressiB} />
            ))}
          </datalist>
          <button
            onClick={handleDeleteBeacon}
            className="bg-[#17326b] cursor-pointer text-white px-4 py-2 rounded mb-2"
          >
            Eliminar
          </button>
          {statusdeletebeacon && (
          <div className="p-2 bg-green-200 text-green-800 rounded-md mb-4">
            {statusdeletebeacon}
          </div>
          )}
        </div>
      </section>


      {/* TABLA */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <div></div>
          <h2 className="text-xl font-semibold my-0 text-center">Lista de Asignaciones</h2>
          <div className=" flex justify-end">
            <RotateCw
              size={35}
              strokeWidth={1.5}
              onClick={() => {
              fetchAsignacion();
              console.log("datos de recarga asignaciones", asignacionbeacons);
              }}
              className="text-white bg-[rgb(23,50,107)] p-1.5 w-15 rounded-xs cursor-pointer 
                        hover:scale-105 transition-all duration-200 
                      active:opacity-50"
            />
          </div>
        </div>

        <div className='flex mt-3'>
          <input
            type="text"
            placeholder="Buscar por dni, nombre, empresa, cargo, área, tipo de beacon o fecha..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 border rounded-md h-10"
          />
          <button
            onClick={() => setSearchQuery(searchTerm)}
            className="ml-2 mt-0 bg-[rgb(23,50,107)] text-white text-lg px-4 py-1 rounded-lg cursor-pointer hover:bg-cyan-400 hover:scale-102 transition-all duration-200 
            active:opacity-50"
          >
            Buscar
          </button>
        </div>
       
        <AsignacionListWithPagination 
          asignacion={filtersasignacionbeacons}
          totalItems={filtersasignacionbeacons.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />

      </div>
    </div>
  );
};