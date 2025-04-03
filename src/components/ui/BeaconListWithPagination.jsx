import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function BeaconListWithPagination({ beacons, totalItems, currentPage, setCurrentPage, itemsPerPage }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBeacons = beacons.slice(indexOfFirstItem, indexOfLastItem);

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

    return (
        <div className="mt-4">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-[#17326b] text-left">
                        <th className="px-4 py-3 text-white text-xs">MacAddressiB</th>
                        <th className="px-4 py-3 text-white text-xs">TypeBeacon</th>
                    </tr>
                </thead>
                <tbody>
                    {currentBeacons.map((beacon, index) => (
                        <tr key={beacon.MacAddressiB || index} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-xs border-b">{beacon.MacAddressiB}</td>
                            <td className="px-4 py-2 text-xs border-b">{beacon.TypeBeacon}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginación */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between mt-4">
                <p className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{' '}
                    <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> de{' '}
                    <span className="font-medium">{totalItems}</span> resultados
                </p>
                <nav className="inline-flex items-center space-x-0 border border-gray-300 rounded-lg">
                    {/* Botón Anterior */}
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="cursor-pointer px-3 py-2 rounded-l-lg border-r border-gray-300 disabled:opacity-50"
                    >
                        <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                    </button>

                    {/* Números de Página */}
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

                    {/* Botón Siguiente */}
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
    );
}
