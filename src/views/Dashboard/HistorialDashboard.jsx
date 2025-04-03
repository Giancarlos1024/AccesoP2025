import Select from "react-select";
import { useState, useContext, useEffect } from "react";
import { UsersContext } from "../../context/UsersProvider";
import { BeaconsContext } from "../../context/BeaconsContextProvider";
import HistorialListWithPagination from "../../components/ui/HistorialListWithPagination";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { HistorialContext } from "../../context/HistorialContextProvider";

const exportToExcel = (historial1) => {
    if (!historial1 || historial1.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }
    // Convertir los datos en formato de hoja de cálculo
    const worksheet = XLSX.utils.json_to_sheet(historial1);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Historial");

    // Generar archivo y descargarlo
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(data, "Historial.xlsx");
};

export const HistorialDashboard = () => {
    const { dniOptions, users } = useContext(UsersContext);
    const {historial1, handleSearch, fetchHistorial} = useContext(HistorialContext)
    const { beacons } = useContext(BeaconsContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;


    // Estado de los filtros
    const [filters, setFilters] = useState([
        {
            Names: [],
            DNI: [],
            MAC: [],
            Type: [],
            Company: [],
            Assistance: []
        },
        {
            fechaInicio: "",
            fechaFin: "",
            horaInicio: "",
            horaFin: ""
        }
    ]);

    // Opciones de nombres
    const userOptions = users.map(user => ({
        value: `${user.FirstName} ${user.SecondName || ""} ${user.LastName} ${user.SecondLastName || ""}`.trim(),
        label: `${user.FirstName} ${user.SecondName || ""} ${user.LastName} ${user.SecondLastName || ""}`.trim()
    }));

    // Opciones de DNI
    const dniSelectOptions = dniOptions.map(obj => ({
        value: obj.DNI,
        label: obj.DNI
    }));

    // Opciones de MAC
    const macOptions = beacons.map(beacon => ({
        value: beacon.MacAddressiB,
        label: beacon.MacAddressiB
    }));

    // Opciones fijas
    const tipoBeaconOptions = [
        { value: "Persona", label: "Persona" },
        { value: "Unidad Movil", label: "Unidad Movil" },
        { value: "Flota liviana", label: "Flota liviana" }
    ];
    const companyOptions = [
        { value: "Company 1", label: "Company 1" },
        { value: "Company 2", label: "Company 2" }
    ];
    const asistenciaOptions = [
        { value: "Entrada", label: "Entrada" },
        { value: "Salida", label: "Salida" }
    ];

    // ✅ Actualiza el primer objeto (Names, DNI, MAC, Type, etc.)
    const updateFirstObject = (key, selectedOptions) => {
        const values = selectedOptions.map(option => option.value);
        console.log(`Actualizando ${key}:`, values); // 🛠 Ver qué valores se están asignando
        setFilters(prevFilters => [
            { ...prevFilters[0], [key]: values },
            prevFilters[1]
        ]);
    };
    
    // ✅ Actualiza el segundo objeto (fechas y horas)
    const updateSecondObject = (key, value) => {
        setFilters(prevFilters => [
            prevFilters[0],
            { ...prevFilters[1], [key]: value }
        ]);
    };

    const openModal = () => {
      
        setModalOpen(true);
        setCurrentPage(1);
    };
    
    const handleApplyFilters = () => {
        // console.log("Aplicando filtros:", filters);
        handleSearch(filters) ; // Pequeño retraso para asegurar que el estado se actualice
        setModalOpen(true);
        
    };

    
    useEffect(() => {
        // console.log("Filtros aplicados:", filters);
    }, [filters]);
    
    return (
        <div className="p-2 bg-gray-100 h-dvh min-user-screen flex gap-4">
            <div className="gap-4 w-full">
                <div className="bg-white p-4 shadow rounded-lg col-span-1">
                    <h2 className="text-lg font-semibold mb-4">Filtro Historial</h2>
                    <div className="flex flex-row gap-2">
                        {/* Multi-selección de nombres */}
                        <Select 
                            options={userOptions} 
                            isMulti
                            className="mb-2 w-1/2"
                            placeholder="Selecciona nombres"
                            value={filters[0].Names.map(name => ({ value: name, label: name }))} // Aquí asignamos el valor desde el estado
                            onChange={selected => updateFirstObject("Names", selected)}
                        />
                        {/* Multi-selección de DNI */}
                        <Select 
                            options={dniSelectOptions} 
                            isMulti
                            className="mb-2 w-1/2"
                            placeholder="Selecciona DNI"
                            value={filters[0].DNI.map(dni => ({ value: dni, label: dni }))} // Aquí asignamos el valor desde el estado
                            onChange={selected => updateFirstObject("DNI", selected)}
                        />
                    </div>
                    <div  className="flex flex-row gap-2">
                        {/* Multi-selección de MAC */}
                        <Select 
                            options={macOptions} 
                            isMulti
                            className="mb-2 w-1/2"
                            placeholder="Selecciona MAC del Beacon"
                            value={filters[0].MAC.map(mac => ({ value: mac, label: mac }))} // Aquí asignamos el valor desde el estado
                            onChange={selected => updateFirstObject("MAC", selected)}
                        />

                        {/* Multi-selección de Tipo de Beacon */}
                        <Select 
                            options={tipoBeaconOptions} 
                            isMulti
                            className="mb-2 w-1/2"
                            placeholder="Selecciona Tipo de Beacon"
                            value={filters[0].Type.map(type => ({ value: type, label: type }))} // Aquí asignamos el valor desde el estado
                            onChange={selected => updateFirstObject("Type", selected)}
                        />
                    </div>
                    <div className="flex flex-row gap-2">
                        {/* Multi-selección de Empresa */}
                        <Select 
                            options={companyOptions} 
                            isMulti
                            className="mb-2 w-1/2 "
                            placeholder="Selecciona Empresa"
                            value={filters[0].Company.map(company => ({ value: company, label: company }))} // Aquí asignamos el valor desde el estado
                            onChange={selected => updateFirstObject("Company", selected)}
                        />
                        {/* Multi-selección de Asistencia */}
                        <Select 
                            options={asistenciaOptions} 
                            isMulti
                            className="mb-2 w-1/2"
                            placeholder="Selecciona Asistencia"
                            value={filters[0].Assistance.map(assistance => ({ value: assistance, label: assistance }))} // Aquí asignamos el valor desde el estado
                            onChange={selected => updateFirstObject("Assistance", selected)}
                        />
                    </div>
                    <div className="flex flex-row gap-2">
                        {/* Fecha y Hora de Inicio */}
                        <div className="flex gap-2 w-1/2">
                            {/* Fecha y Hora de Inicio */}
                            <div className="w-full">
                                <label htmlFor="" className="text-[10px] uppercase">Fecha y Hora de Inicio</label>
                                <input 
                                    type="datetime-local"
                                    className="p-2 border border-gray-300 rounded w-full"
                                    value={
                                        filters[1].fechaInicio && filters[1].horaInicio 
                                            ? `${filters[1].fechaInicio}T${filters[1].horaInicio}` 
                                            : ""
                                    }
                                    onChange={(e) => {
                                        const [date, time] = e.target.value.split("T");
                                        updateSecondObject("fechaInicio", date);
                                        updateSecondObject("horaInicio", time);
                                    }}
                                />
                            </div>
                        </div>
                        {/* Fecha y Hora de Fin */}
                        <div className="flex gap-2 w-1/2">
                            <div className="w-full">
                                <label htmlFor="" className="text-[10px] uppercase">Fecha y Hora de Fin</label>
                                <input 
                                    type="datetime-local"
                                    className="p-2 border border-gray-300 rounded w-full"
                                    value={
                                        filters[1].fechaFin && filters[1].horaFin 
                                            ? `${filters[1].fechaFin}T${filters[1].horaFin}` 
                                            : ""
                                    }
                                    onChange={(e) => {
                                        const [date, time] = e.target.value.split("T");
                                        updateSecondObject("fechaFin", date);
                                        updateSecondObject("horaFin", time);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Botones de acción */}
                    <div className="flex gap-2 mt-2">
                        <button 
                            className="cursor-pointer bg-[#17326b] text-white px-4 py-2 rounded"
                            onClick={handleApplyFilters}
                        >
                            Buscar
                        </button>
                        <button 
                            className="cursor-pointer border border-gray-300 px-4 py-2 rounded"
                            onClick={() => setFilters([
                                {
                                    Names: [],
                                    DNI: [],
                                    MAC: [],
                                    Type: [],
                                    Company: [],
                                    Assistance: []
                                },
                                {
                                    fechaInicio: "",
                                    horaInicio: "",
                                    fechaFin: "",
                                    horaFin: ""
                                }
                            ])}
                        >
                            Limpiar
                        </button>
                    </div>
                    <button 
                        className="bg-green-500 text-white px-4 py-2 rounded w-full mt-4"
                        onClick={() => exportToExcel(historial1)}>Descargar Historial
                    </button>
                </div>
            </div>
            {modalOpen && historial1.length > 0 && (
                
                <HistorialListWithPagination 
                    historial={historial1} 
                    totalItems={historial1.length} 
                    currentPage={currentPage} 
                    setCurrentPage={setCurrentPage} 
                    itemsPerPage={itemsPerPage} 
                    setModalOpen={setModalOpen} 
                    
                />
            )}
        </div>
    );
};
