import { useContext, useState, useEffect } from "react";
import { UsersContext } from "../../context/UsersProvider";
import UserListWithPagination from "../../components/ui/UserListWithPagination";
import { RotateCw } from 'lucide-react';

export const UsuariosDashboard = () => {

  const {
    formData,
    setFormData,
    dniToDelete,
    setDniToDelete,
    dniOptions,
    users,
    errors,
    status,
    statusdeleteworker,
    handleChange,
    handleSubmit,
    handleDelete,
    fetchUsers
  } = useContext(UsersContext);

  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showRegisterWorker, setShowRegisterWorker] = useState(true); // Controla si mostrar la sección de trabajadores
  const [showRegisterUnit, setShowRegisterUnit] = useState(false); // Controla si mostrar la sección de unidad móvil

  console.log("datos de users",users);
  const filteredUsers = users.filter(user =>
    `${user.FirstName} ${user.SecondName || ''} ${user.LastName} ${user.SecondLastName} ${user.DNI} ${user.Company} ${user.Position}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;


  useEffect(() => {
    setCurrentPage(1); // Resetea la paginación cada vez que cambia el filtro
  }, [searchQuery]);

  useEffect(() => {
    if (showRegisterWorker) {
      setFormData({
        firstname: "",
        secondname: "",
        lastname: "",
        secondlastname: "",
        dni: "",
        company: "",
        position: "",
        area: ""
      });
    } else if (showRegisterUnit) {
      setFormData({
        firstname: "",  
        secondname: "", 
        lastname: "", 
        secondlastname: "-", 
        dni: "", 
        company: "", 
        position: "", 
        area: "" 
      });
    }
  }, [showRegisterWorker, showRegisterUnit]);
  
  // Efecto para sincronizar `lastname` con `area`
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      lastname: prev.area  // Se asigna el valor de `area` a `lastname`
    }));
  }, [formData.area]);  // Se ejecuta cada vez que `area` cambie
  
  
    
    
  return (
    <div className="p-2 bg-gray-100 min-h-screen">
       <div className="bg-white w-full p-4 rounded-lg shadow-md mb-2 flex gap-4">
        <button
          className={`p-3 cursor-pointer text-[13px] rounded-lg ${
            showRegisterWorker ? "bg-cyan-600 text-white" : "border border-gray-400 text-black"
          }`}
          onClick={() => {
            setShowRegisterWorker(true);
            setShowRegisterUnit(false);
          }}
        >
          Registrar Trabajador
        </button>
        <button
          className={`p-3 cursor-pointer text-[13px] rounded-lg ${
            showRegisterUnit ? "bg-cyan-600 text-white" : "border border-gray-400 text-black"
          }`}
          onClick={() => {
            setShowRegisterWorker(false);
            setShowRegisterUnit(true);
          }}
        >
          Registrar Unidad Movil
        </button>

      </div>

      {showRegisterWorker && (
      <section className="flex w-full gap-2">
        <div className="bg-white w-full p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Registrar Trabajadores</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* ... (los inputs del formulario de registro) */}
            <div>
              <input
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="Primer nombre"
                className="p-2 border rounded w-full"
              />
              {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
            </div>
            <div>
              <input
                name="secondname"
                value={formData.secondname}
                onChange={handleChange}
                placeholder="Segundo nombre"
                className="p-2 border rounded w-full"
              />
            </div>
            <div>
              <input
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Primer Apellido"
                className="p-2 border rounded w-full"
              />
              {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
            </div>
            <div>
              <input
                name="secondlastname"
                value={formData.secondlastname}
                onChange={handleChange}
                placeholder="Segundo Apellido"
                className="p-2 border rounded w-full"
              />
              {errors.secondlastname && <p className="text-red-500 text-sm">{errors.secondlastname}</p>}
            </div>
            <div>
              <input
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                placeholder="DNI (8 digitos)"
                className="p-2 border rounded w-full"
              />
              {errors.dni && <p className="text-red-500 text-sm">{errors.dni}</p>}
            </div>
            <div>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Empresa"
                className="p-2 border rounded w-full"
              />
              {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
            </div>
            <div>
              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Cargo"
                className="p-2 border rounded w-full"
              />
              {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
            </div>
            <div >
              <input
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Area"
                className="p-2 border rounded w-full"
              />
              {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button onClick={handleSubmit} className="bg-[#17326b] cursor-pointer text-white px-4 py-2 rounded">
              Enviar
            </button>
            <button
              onClick={() => {
                setFormData({
                  firstname: "",
                  secondname: "",
                  lastname: "",
                  secondlastname: "",
                  dni: "",
                  company: "",
                  position: "",
                  area:""
                });
                setErrors({});
                setStatus("");
              }}
              className="border cursor-pointer px-4 py-2 rounded"
            >
              Limpiar
            </button>
          </div>
          {status && (
            <div className="mt-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
              {status}
            </div>
          )}
        </div>
        
        <div className="bg-white w-1/3 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Eliminar Trabajador</h2>
          <input
            type="text"
            list="dniList"
            value={dniToDelete}
            onChange={(e) => setDniToDelete(e.target.value)}
            placeholder="DNI Trabajador"
            className="p-2 border rounded w-full mb-2"
          />
          <datalist id="dniList">
            {dniOptions.map((option, index) => (
              <option key={index} value={option.DNI} />
            ))}
          </datalist>
          <button onClick={handleDelete} className="bg-[#17326b] cursor-pointer  text-white px-4 py-2 rounded mb-2">
            Eliminar
          </button>
          {statusdeleteworker && (
          <div className="p-2 bg-green-200 text-green-800 rounded-md mb-4">
            {statusdeleteworker}
          </div>
          )}
        </div>
       
      </section>
      )}

      {showRegisterUnit && (
      <section className="flex w-full gap-2">
        <div className="bg-white w-full p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Registrar Unidad Móvil</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* ... (los inputs del formulario de registro) */}
            <div>
              <input
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="Tipo de vehículo"
                className="p-2 border rounded w-full"
              />
              {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
            </div>
            {/* <div>
              <input
                name="secondname"
                value={formData.secondname}
                onChange={handleChange}
                placeholder="Segundo nombre"
                className="p-2 border rounded w-full"
              />
            </div> */}
            <div>
              <input
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Area copia"
                className="p-2 border rounded w-full"
              />
              {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
            </div>
            {/* <div>
              <input
                name="secondlastname"
                value={formData.secondlastname}
                onChange={handleChange}
                placeholder="Segundo Apellido"
                className="p-2 border rounded w-full"
              />
              {errors.secondlastname && <p className="text-red-500 text-sm">{errors.secondlastname}</p>}
            </div> */}
            <div>
              <input
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                placeholder="Placa"
                className="p-2 border rounded w-full"
              />
              {errors.dni && <p className="text-red-500 text-sm">{errors.dni}</p>}
            </div>
            <div>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Empresa"
                className="p-2 border rounded w-full"
              />
              {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
            </div>
            <div>
              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Modelo de unidad"
                className="p-2 border rounded w-full"
              />
              {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
            </div>
            <div >
              <input
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Area"
                className="p-2 border rounded w-full"
              />
              {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button onClick={handleSubmit} className="bg-[#17326b] cursor-pointer text-white px-4 py-2 rounded">
              Enviar
            </button>
            <button
              onClick={() => {
                setFormData({
                  firstname: "",
                  secondname: "",
                  lastname: "",
                  secondlastname: "",
                  dni: "",
                  company: "",
                  position: "",
                  area:""
                });
                setErrors({});
                setStatus("");
              }}
              className="border cursor-pointer px-4 py-2 rounded"
            >
              Limpiar
            </button>
          </div>
          {status && (
            <div className="mt-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
              {status}
            </div>
          )}
        </div>
        
        <div className="bg-white w-1/3 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Eliminar Vehículos</h2>
          <input
            type="text"
            list="dniList"
            value={dniToDelete}
            onChange={(e) => setDniToDelete(e.target.value)}
            placeholder="Placa de vehículo"
            className="p-2 border rounded w-full mb-2"
          />
          <datalist id="dniList">
            {dniOptions.map((option, index) => (
              <option key={index} value={option.DNI} />
            ))}
          </datalist>
          <button onClick={handleDelete} className="bg-[#17326b] cursor-pointer  text-white px-4 py-2 rounded mb-2">
            Eliminar
          </button>
          {statusdeleteworker && (
          <div className="p-2 bg-green-200 text-green-800 rounded-md mb-4">
            {statusdeleteworker}
          </div>
          )}
        </div>
       
      </section>
      )}
      {/* Tabla de Usuarios */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <div>

          </div>
          <h2 className="text-xl mt-0 font-semibold mb-0 text-center">Lista de Trabajadores</h2>
          <div className=" flex justify-end">
            <RotateCw
              size={35}
              strokeWidth={1.5}
              onClick={() => {
              fetchUsers();
              console.log("datos de recarga users",users);
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
            placeholder="Buscar por dni, nombre, empresa, cargo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 border rounded-md h-10"
          />
          <button
            onClick={() => setSearchQuery(searchTerm)} // Solo busca al hacer clic
            className="ml-2 mt-0 bg-[rgb(23,50,107)] text-white text-lg px-4 py-1 rounded-lg cursor-pointer hover:bg-cyan-400 hover:scale-102 transition-all duration-200 
            active:opacity-50"
          >
            Buscar
          </button>
        </div>
        <UserListWithPagination
          users={filteredUsers}
          totalItems={filteredUsers.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>

    </div>
  );
};
