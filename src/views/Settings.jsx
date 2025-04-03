import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";


export const Settings = () => {
  
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);



  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        setUserData(JSON.parse(storedUser));
    }
  }, []);
  

  console.log("datos ", userData);
  const handleChange = (e) => {
    const updatedUser = { ...userData, [e.target.name]: e.target.value };
    setUserData(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
};


  return (
    <div className="mt-5 ml-5 flex flex-col bg-white text-black">
      <div className="w-96 p-6 rounded-lg">
        <h2 className="text-2xl ml-0 mb-2 font-bold text-cyan-600">Configuración</h2>

        {/* Correo Electrónico */}
        <div className="mb-4">
          <label className="block text-gray-400 mb-1">Correo Electrónico</label>
          <input
            type="email"
            value={userData.email}
            disabled
            className="text-sm border rounded-sm border-gray-500 p-2 w-full bg-gray-100"
          />
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-gray-400 mb-1">Contraseña</label>
          <input
            type="password"
            value={userData.password}
            disabled
            className="text-sm border rounded-sm border-gray-500 p-2 w-full bg-gray-100"
          />
        </div>

        {/* Botón para abrir el modal */}
        <button
          onClick={openModal}
          className="ml-0 mt-4 bg-cyan-600 text-white text-lg px-4 py-2 rounded-lg cursor-pointer hover:bg-cyan-400 hover:scale-102 transition-all duration-200 active:opacity-50"
        >
          Editar Datos
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-xl font-bold mb-4">Editar Datos</h2>
            <button onClick={closeModal} className="text-black py-2 px-4 rounded cursor-pointer absolute right-2 top-0">
              x
            </button>

            <label className="block text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              value={userData.email || ""}
              disabled
              className="text-sm border rounded-sm border-gray-500 p-2 w-full bg-gray-100"
            />


            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              value={userData.password || ""}
              disabled
              className="text-sm border rounded-sm border-gray-500 p-2 w-full bg-gray-100"
            />
            <div className="flex justify-start space-x-2">
              <button
                onClick={closeModal}
                className="ml-2 mt-4 bg-cyan-600 text-white text-lg px-4 py-2 rounded-lg cursor-pointer hover:bg-cyan-400"
              >
                Guardar
              </button>
              <button
                onClick={closeModal}
                className="ml-0 mt-4 bg-gray-400 text-white text-lg px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-500"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
