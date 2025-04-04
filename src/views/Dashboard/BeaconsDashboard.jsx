import { useState, useContext, useEffect } from "react";
import { BeaconsContext } from "../../context/BeaconsContextProvider";
import BeaconListWithPagination from "../../components/ui/BeaconListWithPagination";
import { RotateCw } from 'lucide-react';

export const BeaconsDashboard = () => {
  const {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    macToDelete,
    setMacToDelete,
    beacons,
    handleDeleteBeacon,
    errors,
    status,
    statusdeletebeacon,
    fetchBeacons,
  } = useContext(BeaconsContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const beaconTypes = ["PERSONA", "UNIDAD MOVIL", "ACTIVOS", "OTROS"];

  // const filteredBeacons = beacons.filter(({ MacAddressiB, TypeBeacon }) =>
  //   [MacAddressiB, TypeBeacon].some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
  // );

  const filteredBeacons = beacons.filter(({ MacAddressiB, TypeBeacon }) => 
    searchQuery === "" || 
    (MacAddressiB?.toLowerCase().includes(searchQuery.toLowerCase()) || 
     TypeBeacon?.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  useEffect(() => {
    setCurrentPage(1); // Resetea la paginación cada vez que cambia el filtro
  }, [searchQuery]);
 

  return (
    <div className="p-2 bg-gray-100 min-h-screen">
      <section className="flex w-full gap-2">
        <div className="bg-white w-full p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Registrar Beacon</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                name="MacAddressiB"
                value={formData.MacAddressiB}
                onChange={handleChange}
                placeholder="MAC del Beacon"
                className={`p-2 border rounded w-full ${errors.MacAddressiB ? "border-red-500" : ""}`}
                autoComplete="off"
              />
              {errors.MacAddressiB && <p className="text-red-500 text-sm">{errors.MacAddressiB}</p>}
            </div>
            <select
              name="TypeBeacon"
              value={formData.TypeBeacon}
              onChange={handleChange}
              className={`p-2 border rounded w-full ${errors.TypeBeacon ? "border-red-500" : ""}`}
            >
              <option value="">Seleccione un tipo de Beacon</option>
              {beaconTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.TypeBeacon && <p className="text-red-500 text-sm">{errors.TypeBeacon}</p>}
          </div>
          <div className="mt-4 flex space-x-2">
            <button onClick={handleSubmit} className="bg-[#17326b] cursor-pointer text-white px-4 py-2 rounded">
              Registrar
            </button>
            <button onClick={() => setFormData({ MacAddressiB: "", TypeBeacon: "" })} className="border cursor-pointer px-4 py-2 rounded">
              Limpiar
            </button>
          </div>
          {status && <div className="mt-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">{status}</div>}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Eliminar Beacon</h2>
          <input
            type="text"
            value={macToDelete}
            onChange={(e) => setMacToDelete(e.target.value)}
            placeholder="Ingrese la MAC del Beacon"
            list="beaconsList"
            className="p-2 border rounded w-full mb-2"
          />
          <datalist id="beaconsList">
            {beacons.map((beacon, index) => (
              <option key={index} value={beacon.MacAddressiB} />
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
          <h2 className="text-xl font-semibold my-0 text-center">Lista de Beacons</h2>
          <div className=" flex justify-end">
            <RotateCw
              size={35}
              strokeWidth={1.5}
              onClick={() => {
              fetchBeacons();
              console.log("datos de recarga beacons",beacons);
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
            placeholder="Buscar por MAC Beacon o Tipo de Beacon "
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
       
        <BeaconListWithPagination 
          beacons={filteredBeacons} // Aquí pasamos los datos filtrados
          totalItems={filteredBeacons.length} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          itemsPerPage={itemsPerPage} 
        />

      </div>
    </div>
  );
};
