import { Mail, Lock } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Register = () => {
  const navigate = useNavigate();


  const apiUrl = import.meta.env.VITE_API_URL;

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
      role: "personal",
      firstname: e.target.firstName.value,
      secondname: e.target.secondName.value,
      lastname: e.target.lastName.value,
      secondlastname: e.target.secondLastName.value,
      dni: e.target.dni.value,
      company: e.target.company.value,
      position: e.target.position.value,
      area: e.target.area.value,
    };

    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (resData.success) {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "Usuario registrado correctamente",
        }).then(() => navigate("/"));
      } else {
        Swal.fire({
          icon: "error",
          title: "Error en el registro",
          text: resData.message || "Ocurrió un error al registrar el usuario",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error en el registro",
      });
    }
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className="bg-black p-0 h-dvh flex justify-center items-center">
      <div className="rounded-lg w-5xl h-130 flex flex-row-reverse justify-center items-center border-0">
        
        {/* Sección derecha (imagen / invitación a iniciar sesión) */}
        <section className="w-1/2 max-md:hidden bg-white rounded-r-lg h-full flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold flex items-center gap-2">
            <span className="text-yellow-500 text-6xl">👋</span> HOLA
          </h1>
          <p className="text-xl text-gray-600 leading-20 italic mt-2">
            ¿Si tienes una cuenta, inicia sesión?
          </p>

          <button
            onClick={handleLogin}
            className="bg-[#FDD383] cursor-pointer py-3 px-8 rounded-4xl 
                       transition-all duration-300 ease-in-out transform hover:scale-105 
                       hover:shadow-lg focus:scale-95 hover:bg-gray-100"
          >
            Iniciar Sesión
          </button>
        </section>

        {/* Sección izquierda (formulario de registro) */}
        <section className="w-1/2 border-1 max-[768px]:w-full max-[768px]:mx-15 text-white border-gray-500 rounded-l-lg h-full flex justify-center items-center">
          <form onSubmit={handleRegister} className="w-full relative max-[768px]:w-auto px-8 -mt-3">
            
            <div className="flex justify-center mb-1">
              <img
                src="https://img.freepik.com/fotos-premium/ilustracion-logotipo-leon-icono-emblema-leon-impresion-logotipografica_911620-21708.jpg"
                className="w-35 rounded-full"
                alt="logo"
              />
            </div>

            <h1 className="text-lg text-center mb-3">Regístrate para continuar</h1>
            
            {/* Campos de nombre y apellidos */}
            <div className="flex gap-2 mb-4">
              <input
                name="firstName"
                type="text"
                placeholder="Primer Nombre"
                className="text-sm border rounded-sm border-gray-500 p-2 w-1/2 
                           focus:border-yellow-100 focus:ring-2 focus:ring-yellow-100"
                required
              />
              <input
                name="secondName"
                type="text"
                placeholder="Segundo Nombre"
                className="text-sm border rounded-sm border-gray-500 p-2 w-1/2 
                           focus:border-yellow-100 focus:ring-2 focus:ring-yellow-100"
              />
            </div>
            <div className="flex gap-2 mb-4">
              <input
                name="lastName"
                type="text"
                placeholder="Apellido Paterno"
                className="text-sm border rounded-sm border-gray-500 p-2 w-1/2 
                           focus:border-yellow-100 focus:ring-2 focus:ring-yellow-100"
                required
              />
              <input
                name="secondLastName"
                type="text"
                placeholder="Apellido Materno"
                className="text-sm border rounded-sm border-gray-500 p-2 w-1/2 
                           focus:border-yellow-100 focus:ring-2 focus:ring-yellow-100"
                required
              />
            </div>
            {/* DNI */}
            <div className="flex gap-2 mb-4">
              <input
                name="dni"
                type="text"
                placeholder="DNI"
                className="text-sm border rounded-sm border-gray-500 p-2 w-full 
                           focus:border-yellow-100 focus:ring-2 focus:ring-yellow-100"
                required
              />
              <input
                name="company"
                type="text"
                placeholder="Empresa"
                className="text-sm border rounded-sm border-gray-500 p-2 w-full 
                           focus:border-yellow-100 focus:ring-2 focus:ring-yellow-100"
                required
              />
            </div>

            {/* Cargo, Área */}
            <div className="flex gap-2 mb-4">
              <input
                name="position"
                type="text"
                placeholder="Cargo/Position"
                className="text-sm border rounded-sm border-gray-500 p-2 w-full 
                           focus:border-yellow-100 focus:ring-2 focus:ring-yellow-100"
                required
              />
              <input
                name="area"
                type="text"
                placeholder="Área"
                className="text-sm border rounded-sm border-gray-500 p-2 w-full 
                           focus:border-yellow-100 focus:ring-2 focus:ring-yellow-100"
                required
              />
            </div>

            <div className="flex gap-2 mb-4">

                <input
                    name="email"
                    className="text-sm border rounded-sm border-gray-500 p-2 w-full transition-all duration-300 ease-in-out 
                            focus:border-yellow-100 focus:ring-2 focus:ring-yellow-100"
                    type="email"
                    placeholder="Ingrese su correo"
                    required
                />

                <input
                    name="password"
                    className="text-sm border rounded-sm border-gray-500 p-2 w-full transition-all duration-300 ease-in-out 
                            focus:border-yellow-100 focus:ring-2 focus:ring-yellow-100"
                    type="password"
                    placeholder="Ingrese su contraseña"
                    required
                />
               
            </div>


            {/* Botón de envío */}
            <div className="w-full text-center">
              <button
                className="bg-[#FDD383] hover:bg-gray-100 text-black cursor-pointer py-3 px-10 rounded-4xl 
                           transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:scale-95"
              >
                Registrar
              </button>

            </div>

            
          </form>
        </section>
      </div>
    </div>
  );
};
