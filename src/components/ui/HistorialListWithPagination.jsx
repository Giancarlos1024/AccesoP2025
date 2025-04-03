import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';

export default function HistorialListWithPagination({ historial, totalItems, currentPage, setCurrentPage, itemsPerPage, setModalOpen }) {
    
    const [searchTerm, setSearchTerm] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    console.log("datos de historial", historial);

    const filterhistorial1 = historial.filter(historia => {
        const search = searchQuery.toLowerCase().replace(/-/g, "/");
    
        const formattedDate = historia.FECHA
            ? historia.FECHA.split(" ")[0] // Extraer solo la fecha sin la hora
            : "";
    
        return `${historia["NOMBRES Y APELLIDOS"]} ${historia.DNI} ${historia["COMPAÑIA"]} ${historia["PUESTO"]} ${historia["MAC BEACON"]} ${formattedDate} ${historia["TIPO DE BEACON"]}`
            .toLowerCase()
            .includes(search);
    });
    
    


    // Aplicar la paginación después del filtrado
    const totalFilteredItems = filterhistorial1.length; // Total de registros filtrados
    const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentHistorial = filterhistorial1.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const getPageNumbers = () => {
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = startPage + maxVisiblePages - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        return [...Array(endPage - startPage + 1)].map((_, index) => startPage + index);
    };
 
    useEffect(() => {
        setCurrentPage(1); // Resetea la paginación cada vez que cambia el filtro
    }, [searchQuery]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50 bg-opacity-50">
            <div className="bg-white p-5 mx-30 rounded-lg shadow-xl w-auto max-h-[90vh] relative overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4 text-center">Lista de Historial</h2>
                <button
                    onClick={() => {
                        setModalOpen(false);

                    }}
                    className="absolute cursor-pointer text-xl right-5 top-0 mt-4 px-5 py-2 text-black rounded-lg transition duration-300"
                >
                    x
                </button>
                <div className='flex my-3'>
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
                <div className="max-h-[70vh] overflow-y-auto">
                    <table className="w-full border-collapse shadow-md">
                        <thead>
                            <tr className="bg-[#17326b] text-left">
                                <th className="px-4 py-3 text-white text-xs">Nombre</th>
                                <th className="px-4 py-3 text-white text-xs">DNI</th>
                                <th className="px-4 py-3 text-white text-xs">MAC</th>
                                <th className="px-4 py-3 text-white text-xs">Puesto</th>
                                <th className="px-4 py-3 text-white text-xs">Compañía</th>
                                <th className="px-4 py-3 text-white text-xs">Área</th>
                                <th className="px-4 py-3 text-white text-xs">Asistencia</th>
                                <th className="px-4 py-3 text-white text-xs">Fecha</th>
                                <th className="px-4 py-3 text-white text-xs">Punto de Control</th>
                                <th className="px-4 py-3 text-white text-xs">Tipo de Beacon</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentHistorial.length > 0 ? (
                                currentHistorial.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="px-4 py-2 text-xs">{item["NOMBRES Y APELLIDOS"]}</td>
                                        <td className="px-4 py-2 text-xs">{item.DNI}</td>
                                        <td className="px-4 py-2 text-xs">{item["MAC BEACON"]}</td>
                                        <td className="px-4 py-2 text-xs">{item.PUESTO}</td>
                                        <td className="px-4 py-2 text-xs">{item.COMPAÑIA}</td>
                                        <td className="px-4 py-2 text-xs">{item.AREA}</td>
                                        <td className="px-4 py-2 text-xs">{item.ASISTENCIA}</td>
                                        <td className="px-4 py-2 text-xs">{item.FECHA}</td>
                                        <td className="px-4 py-2 text-xs">{item["PUNTO CONTROL"]}</td>
                                        <td className="px-4 py-2 text-xs">{item["TIPO DE BEACON"]}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center py-4 text-gray-500">
                                        No hay datos disponibles
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Paginación */}
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between mt-4">
                    <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{' '}
                        <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> de{' '}
                        <span className="font-medium">{totalItems}</span> resultados
                    </p>
                    <nav className="inline-flex items-center space-x-0 border border-gray-300 rounded-lg">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="cursor-pointer px-3 py-2 rounded-l-lg border-r border-gray-300 disabled:opacity-50"
                        >
                            <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                        </button>
                        {getPageNumbers().map((page) => (
                            <button
                                key={page}
                                onClick={() => paginate(page)}
                                className={`cursor-pointer px-3 py-2 text-sm border-r border-gray-300 ${
                                    currentPage === page ? "cursor-pointer bg-[#17326b] text-white font-bold" : "text-gray-700"
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="cursor-pointer px-3 py-2 rounded-r-lg border-gray-300 disabled:opacity-50"
                        >
                            <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}