import { useState, useEffect } from "react";

export const PerfilHome = () => {


    const apiUrl = import.meta.env.VITE_API_URL;

    const [modalOpen, setModalOpen] = useState(false);
    const [userData, setUserData] = useState({
        dni: "",
        role: "",
        firstname: "",
        secondname: "",
        lastname: "",
        secondlastname: "",
        company: "",
        position: "",
        area: "",
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
    }, []);

    const handleChange = (e) => {
        const updatedUser = { ...userData, [e.target.name]: e.target.value };
        setUserData(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };



    const handleSubmit = async () => {
        console.log("Enviando datos:", userData); // Verifica la data antes de enviarla
    
        try {
            const response = await fetch(`${apiUrl}/upprofile/${userData.dni}`, { // Añade el dni en la URL
                method: "PUT", // Cambia el método a PUT
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
    
            const data = await response.json();
            console.log("Respuesta del servidor:", data); // Verifica la respuesta del backend
    
            if (data.success) {
                alert("Perfil actualizado con éxito.");
                setModalOpen(false);
            } else {
                alert("Error al actualizar el perfil.");
            }
        } catch (error) {
            console.error("Error en la actualización:", error);
            alert("Hubo un problema con la actualización.");
        }
    };
    
    

    return (
        <div className="mt-5 flex flex-col bg-white text-black">
            <h1 className="text-2xl ml-10 mb-2 font-bold text-cyan-600">Perfil</h1>
            <div className="shadow-lg flex flex-row w-full">
                <div className="w-1/4 flex flex-col items-center">
                    <img 
                        src="/img/perfil.jpg" 
                        alt="Perfil" 
                        className="w-48 h-48 object-cover rounded-lg border-2 border-gray-500/50"
                    />
                    <button 
                        onClick={() => setModalOpen(true)}
                        className="mt-4 bg-cyan-600 text-white text-lg px-4 py-2 rounded-lg cursor-pointer hover:bg-cyan-400 hover:scale-102 transition-all duration-200 active:opacity-50"
                    >
                        Editar Información
                    </button>
                </div>
                <div className="w-2/3 pl-10">
                    <h2 className="text-2xl font-bold mb-4">Información Personal</h2>
                    <div className="grid grid-cols-2 gap-4 text-lg">
                        <p><span className="font-semibold">Nombre:</span> {userData.firstname} {userData.secondname}</p>
                        <p><span className="font-semibold">Apellido:</span> {userData.lastname} {userData.secondlastname}</p>
                        <p><span className="font-semibold">DNI:</span> {userData.dni}</p>
                        <p><span className="font-semibold">Empresa:</span> {userData.company}</p>
                        <p><span className="font-semibold">Cargo:</span> {userData.position}</p>
                        <p><span className="font-semibold">Área:</span> {userData.area}</p>
                    </div>
                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800/50 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
                        <button 
                            onClick={() => setModalOpen(false)}
                            className="absolute top-2 right-4 text-black text-2xl cursor-pointer"
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-gray-500">
                            Modificar <span className="text-cyan-500">Perfil</span>
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="text-gray-700 font-semibold" htmlFor="firstname">Nombre</label>
                                <input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    value={userData.firstname}
                                    onChange={handleChange}
                                    className="text-sm border rounded-sm border-gray-500 p-2 w-full"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-700 font-semibold" htmlFor="secondname">Segundo Nombre</label>
                                <input
                                    type="text"
                                    id="secondname"
                                    name="secondname"
                                    value={userData.secondname}
                                    onChange={handleChange}
                                    className="text-sm border rounded-sm border-gray-500 p-2 w-full"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-700 font-semibold" htmlFor="lastname">Apellido</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    value={userData.lastname}
                                    onChange={handleChange}
                                    className="text-sm border rounded-sm border-gray-500 p-2 w-full"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-700 font-semibold" htmlFor="secondlastname">Segundo Apellido</label>
                                <input
                                    type="text"
                                    id="secondlastname"
                                    name="secondlastname"
                                    value={userData.secondlastname}
                                    onChange={handleChange}
                                    className="text-sm border rounded-sm border-gray-500 p-2 w-full"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-700 font-semibold" htmlFor="dni">DNI</label>
                                <input
                                    type="text"
                                    id="dni"
                                    name="dni"
                                    value={userData.dni}
                                    onChange={handleChange}
                                    className="text-sm border rounded-sm border-gray-500 p-2 w-full bg-gray-200 cursor-not-allowed"
                                    disabled
                                />

                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-700 font-semibold" htmlFor="company">Empresa</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={userData.company}
                                    onChange={handleChange}
                                    className="text-sm border rounded-sm border-gray-500 p-2 w-full"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-700 font-semibold" htmlFor="position">Cargo</label>
                                <input
                                    type="text"
                                    id="position"
                                    name="position"
                                    value={userData.position}
                                    onChange={handleChange}
                                    className="text-sm border rounded-sm border-gray-500 p-2 w-full"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-700 font-semibold" htmlFor="area">Área</label>
                                <input
                                    type="text"
                                    id="area"
                                    name="area"
                                    value={userData.area}
                                    onChange={handleChange}
                                    className="text-sm border rounded-sm border-gray-500 p-2 w-full"
                                />
                            </div>
                        </div>

                        <div className="flex mt-4">
                            <button 
                                onClick={handleSubmit}
                                className="mt-4 bg-cyan-600 text-white text-lg px-4 py-2 rounded-lg cursor-pointer hover:bg-cyan-400 hover:scale-102 transition-all duration-200 active:opacity-50"
                            >
                                Guardar
                            </button>

                            <button 
                                onClick={() => setModalOpen(false)}
                                className="ml-4 mt-4 bg-gray-500 text-white text-lg px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-400 transition-all duration-200"
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
