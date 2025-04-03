import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export default function UserListWithPagination({ users, totalItems, currentPage, setCurrentPage, itemsPerPage }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxVisiblePages = 5;
    const [startPage, setStartPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);

            if (pageNumber >= startPage + maxVisiblePages) {
                setStartPage(startPage + 1);
            } else if (pageNumber < startPage) {
                setStartPage(startPage - 1);
            }
        }
    };

    const visiblePages = Array.from(
        { length: Math.min(maxVisiblePages, totalPages) },
        (_, i) => startPage + i
    );

    return (
        <div className="mt-4">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-[#17326b] text-left text-white text-xs">
                        <th className="px-4 py-3">Nombre Completo</th>
                        <th className="px-4 py-3">DNI</th>
                        <th className="px-4 py-3">Empresa</th>
                        <th className="px-4 py-3">Cargo</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user, index) => (
                        <tr key={user.DNI || index} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-xs border-b">
                                {`${user.FirstName} ${user.SecondName || ''} ${user.LastName} ${user.SecondLastName}`}
                            </td>
                            <td className="px-4 py-2 text-xs border-b">{user.DNI}</td>
                            <td className="px-4 py-2 text-xs border-b">{user.Company}</td>
                            <td className="px-4 py-2 text-xs border-b">{user.Position}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginación */}
            <div className="hidden sm:flex sm:items-center sm:justify-between mt-4">
                <p className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a
                    <span className="font-medium"> {Math.min(indexOfLastItem, totalItems)}</span> de
                    <span className="font-medium"> {totalItems}</span> resultados
                </p>
                <nav className="inline-flex items-center border border-gray-300 rounded-lg">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 rounded-l-lg border-r border-gray-300 disabled:opacity-50"
                    >
                        <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                    </button>

                    {visiblePages.map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 text-sm border-r border-gray-300 ${
                                currentPage === page ? 'bg-[#17326b] text-white font-bold' : 'text-gray-700'
                            }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 rounded-r-lg border-gray-300 disabled:opacity-50"
                    >
                        <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                    </button>
                </nav>
            </div>
        </div>
    );
}
