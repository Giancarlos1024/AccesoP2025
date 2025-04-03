import { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, User, Settings, CircleHelp, MoonStar, Sun, LucideLanguages, LogInIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useTheme } from "../../context/ThemeProvider";

export const Perfil = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const menuRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handlePerfil = () => navigate("/dashboard/perfil");
  const handleConfiguracion = () => navigate("/dashboard/configuracion");
  const handleCerrarSesion = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={`flex items-center justify-end px-4 py-1 shadow-md relative 
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      
      <button className="relative mr-6 p-2 rounded-full hover:bg-white/10 focus:outline-none">
        <Bell className="w-6 h-6" />
        <span className="absolute top-2 right-1 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      <div ref={menuRef} className="relative">
        <div
          className="flex items-center gap-2 p-2 rounded-full hover:bg-white/10 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src={user?.user?.avatar || "/img/perfil.jpg"}
            alt="Avatar Usuario"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{userData.firstname && userData.lastname ? `${userData.firstname} ${userData.lastname}` : "Anónimo"}</span>
          <ChevronDown className="w-4 h-4" />
        </div>

        {isOpen && (
          <div className={`absolute right-0 mt-1 w-45  shadow-lg z-10 
              ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
            <ul className="py-2">
              <li onClick={handlePerfil} className={`px-4 py-2 cursor-pointer flex items-center gap-2 
                  ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
                <User className="w-5 h-5" /> Ver Perfil
              </li>
              {/* <li onClick={handleConfiguracion} className={`px-4 py-2 cursor-pointer flex items-center gap-2 
                  ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
                <Settings className="w-5 h-5" /> Configuración
              </li> */}
              <li className={`px-4 py-2 cursor-pointer flex items-center gap-2 
                  ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
                <CircleHelp className="w-5 h-5" /> Ayuda
              </li>
              <li className={`px-4 py-2 cursor-pointer flex items-center gap-2 
                  ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
                onClick={toggleTheme}
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <MoonStar className="w-5 h-5" />}
                {theme === "dark" ? "Modo Claro" : "Modo Oscuro"}
              </li>
              {/* <li className={`px-4 py-2 cursor-pointer flex items-center gap-2 
                  ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
                <LucideLanguages className="w-5 h-5" /> Idioma: Español
              </li> */}
              <li className={`px-4 py-2 cursor-pointer flex items-center gap-2 border-t border-gray-600 mt-2 
                  ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"}`} onClick={handleCerrarSesion}>
                <LogInIcon /> Cerrar Sesión
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
