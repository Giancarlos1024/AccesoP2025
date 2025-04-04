import { useState, useEffect} from 'react';
import { useApi } from '../../context/EventosContextProvider';
import { Distribucion } from '../../components/ui/Distribucion';
import { Header } from '../../components/ui/Header';
import Pagination from '../../components/ui/Pagination';
import { Gateway } from '../../components/ui/Gateway';

export const HomeDashboard = () => {

  const { datosSuperficie, datosInteriorMina } = useApi();
  const [searchTerm, setSearchTerm] = useState("")
  const [searchQuery, setSearchQuery] = useState("");

  

  // Filtrar personas y unidades móviles de interior mina y superficie
  const personasSuperficie = datosSuperficie.filter(evento => evento.TypeBeacon === "PERSONA");
  const unidadesMovilesSuperficie = datosSuperficie.filter(evento => evento.TypeBeacon === "UNIDAD MOVIL");
  const personasInteriorMina = datosInteriorMina.filter(evento => evento.TypeBeacon === "PERSONA");
  const unidadesMovilesInteriorMina = datosInteriorMina.filter(evento => evento.TypeBeacon === "UNIDAD MOVIL");

  // Calcular totales
  const totalPersonasInterior = personasInteriorMina.length;
  const totalPersonasSuperficie = personasSuperficie.length;
  const totalPersonas = totalPersonasInterior + totalPersonasSuperficie;
  const totalUnidadesInterior = unidadesMovilesInteriorMina.length;
  const totalUnidadesSuperficie = unidadesMovilesSuperficie.length;
  const totalUnidades = totalUnidadesInterior + totalUnidadesSuperficie;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: "", data: [] });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  

  useEffect(() => {
    setCurrentPage(1); // Resetea la paginación cada vez que cambia el filtro
  }, [searchQuery]);

  const openModal = (type) => {
    let data = [];
    let video = ""; // Agregar la variable para el video
  
    if (type === "Interior Mina") {
      data = datosInteriorMina.filter(e => e.TypeBeacon === "PERSONA");
      video = "/media/interior_mina_personal.mp4";
    } else if (type === "Superficie") {
      data = datosSuperficie.filter(e => e.TypeBeacon === "PERSONA");
      video = "/media/superficie_personal.mp4";
    } else if (type === "Unidades Interior Mina") {
      data = datosInteriorMina.filter(e => e.TypeBeacon === "UNIDAD MOVIL");
      video = "/media/interior_mina_unidad.mp4";
    } else if (type === "Unidades Superficie") {
      data = datosSuperficie.filter(e => e.TypeBeacon === "UNIDAD MOVIL");
      video = "/media/superficie_unidad.mp4";
    }
  
    setModalData({ title: type, data, video }); // Ahora se pasa el video al estado
    setModalOpen(true);
    setCurrentPage(1);
  };
  

  const formatFechaBusqueda = (fecha) => {
    if (!fecha) return "";
  
    // Si fecha es un string, intenta parsearlo
    let date;
    if (typeof fecha === "string") {
        // Reemplazar '/' por '-' si vienen en otro formato
        fecha = fecha.replace(/\//g, "-");

        // Intentar parsear
        const partes = fecha.split("-");
        if (partes.length === 3) {
            // Si está en formato YYYY-MM-DD o DD-MM-YYYY
            if (partes[0].length === 4) {
                date = new Date(`${partes[0]}-${partes[1]}-${partes[2]}`);
            } else {
                date = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`);
            }
        }
    } else {
        date = new Date(fecha);
    }

    if (isNaN(date)) return "";

    return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
};

  
  
  const normalizeSearchQuery = (query) => {
    if (/\d{2}\/\d{2}\/\d{4}/.test(query)) {
      const [day, month, year] = query.split("/");
      return `${year}-${month}-${day}`; // Convertir "dd/mm/yyyy" a "yyyy-mm-dd"
    }
    return query;
  };
  
  const searchLower = normalizeSearchQuery(searchQuery.toLowerCase());
  
  const filteredData = modalData.data.filter((item) => {
    return Object.values(item).some((value) => {
      const stringValue = String(value).toLowerCase();
      const formattedDate = formatFechaBusqueda(value);
      const alternateFormat = formattedDate.split("-").reverse().join("/");
  
      return stringValue.includes(searchLower) || formattedDate.includes(searchLower) || alternateFormat.includes(searchLower);
    });
  });
  
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  console.log("datos cccc",currentItems)
  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const formatFecha = (fecha) => {
    if (!fecha) return "";
    const date = new Date(fecha);
    return new Intl.DateTimeFormat("es-PE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  return (
    <div className="pl-2 bg-gray-50 min-h-screen">
      <Header />
      <section className="flex gap-3 ">
        <div className=' w-full flex flex-row gap-2 '>
          {/* Total Personal y Unidades */}
          <div className="bg-white shadow-md rounded-lg p-4 w-full">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xs font-medium text-cyan-600">TOTAL PERSONAL</h2>
                <p className="text-[10px] text-gray-500">MINA</p>
                
              </div>
              <div className="text-xl font-semibold text-gray-800">{totalPersonas}</div>
            </div>

            {/* Detalles */}
            <div className="space-y-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => openModal("Interior Mina")}
              >
                <p className="text-xs font-medium text-gray-600">Interior Mina</p>
                <p className="text-ms bg-green-600 px-6 rounded-2xl font-semibold text-white">
                  {totalPersonasInterior}
                </p>
              </div>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => openModal("Superficie")}
              >
                <p className="text-xs font-medium text-gray-600">Superficie</p>
                <p className="text-ms bg-green-600 px-6 rounded-2xl font-semibold text-white">
                  {totalPersonasSuperficie}
                </p>
              </div>
            </div>
          </div>

          {/* Total Unidades Móviles */}
          <div className="bg-white shadow-md rounded-lg p-4 w-full">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xs font-medium text-cyan-600">TOTAL UNIDADES MÓVILES</h2>
                <p className="text-[10px] text-gray-500">MINA</p>
              </div>
              <div className="text-xl font-semibold text-gray-800">{totalUnidades}</div>
            </div>

            {/* Detalles */}
            <div className="space-y-4">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => openModal("Unidades Interior Mina")}>
                <p className="text-xs font-medium text-gray-600">Interior Mina</p>
                <p className="text-ms bg-green-600 px-6 rounded-2xl font-semibold text-white">{totalUnidadesInterior}</p>
              </div>

              <div className="flex justify-between items-center cursor-pointer" onClick={() => openModal("Unidades Superficie")}>
                <p className="text-xs font-medium text-gray-600">Superficie</p>
                <p className="text-ms bg-green-600 px-6 rounded-2xl font-semibold text-white">{totalUnidadesSuperficie}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <Distribucion />
        </div>
      </section>
      <Gateway />
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-xl w-auto h-auto relative">
            
            <div className="mb-1 flex items-center">
              <video className="w-20 rounded-lg" autoPlay loop muted>
                <source src={modalData.video} type="video/mp4" />
                Tu navegador no soporta videos.
              </video>
              <h2 className="ml-4 text-xl font-semibold text-cyan-600 mb-2 text-center">{modalData.title}</h2>
            </div>

            <button
              onClick={() => setModalOpen(false)}
              className="absolute cursor-pointer text-xl right-5 top-0 mt-4 px-5 py-2  text-black rounded-lg transition duration-300"
            >
              x
            </button>

            <div className='flex'>
              <input
                type="text"
                placeholder="Buscar por dni, nombre, empresa, cargo, área o fecha..."
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
            <p className="text-sm text-center text-gray-600 mt-2">{modalData.descripcion}</p>
            <div className="mt-2 overflow-x-auto overflow-y-auto max-h-[350px] ">
              <table className="w-full border-collapse shadow-md ">
                <thead className="sticky top-0 bg-gray-100">
                  <tr className="bg-[rgb(23,50,107)] text-white uppercase text-sm leading-normal">
                    <th className="py-3 px-4 text-left">DNI</th>
                    <th className="py-3 px-4 text-left">Nombre completo</th>
                    <th className="py-3 px-4 text-left">Punto control</th>
                    
                    <th className="py-3 px-4 text-left">Cargo</th>
                    <th className="py-3 px-4 text-left">Área</th>
                    <th className="py-3 px-4 text-left">Beacon</th>
                    <th className="py-3 px-4 text-left">Fecha</th>
                    <th className="py-3 px-4 text-left">Empresa</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {currentItems.map((persona, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-4">{persona.DNI}</td>
                      <td className="py-3 px-4">
                        {persona.FirstName} {persona.SecondName} {persona.LastName} {persona.SecondLastName}
                      </td>
                      <td className="py-3 px-4">{persona.Punto_Control}</td>
                      
                      <td className="py-3 px-4">{persona.Position}</td>
                      <td className="py-3 px-4">{persona.Area}</td>
                      <td className="py-3 px-4">{persona.MacAddressiB}</td>
                      <td className="py-3 px-4">{formatFecha(persona.Fecha)}</td>
                      <td className="py-3 px-4">{persona.Company}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredData.length} // Asegúrate de pasar el total de registros filtrados
              paginate={paginate}
            />

          </div>
        </div>
      )}

    </div>
  );
};
