import { useState, useEffect, createContext } from "react";

export const UsersContext = createContext();
export const UsersProvider = ({ children }) => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    firstname: "",
    secondname: "",
    lastname: "",
    secondlastname: "",
    dni: "",
    company: "",
    position: "",
    area:""
  });
  const [dniToDelete, setDniToDelete] = useState("");
  const [dniOptions, setDniOptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [statusdeleteworker, setStatusdeleteworker] = useState("");

  const [showRegisterWorker, setShowRegisterWorker] = useState(true); // Controla si mostrar la sección de trabajadores
  const [showRegisterUnit, setShowRegisterUnit] = useState(false); // Controla si mostrar la sección de unidad móvil

  // Función para obtener la lista de DNIs (para el datalist)
  const fetchDniOptions = async () => {
    try {
      const response = await fetch(`${apiUrl}/get-dnis`);
      const data = await response.json();
      setDniOptions(data);
    } catch (error) {
      console.error("Error fetching DNI options:", error);
    }
  };
  // Función para obtener la lista completa de usuarios
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${apiUrl}/get-users`);
      const data = await response.json();
      setUsers(data); // Forzar actualización de estado
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchDniOptions();
    fetchUsers();
  
    const interval = setInterval(() => {
      fetchUsers();
    }, 10000); // Llama a fetchUsers cada 60 segundos
  
    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  useEffect(() => {
    //  console.log("Usuarios actualizados:", users);
  }, [users]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Actualizamos el valor en el formulario
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    // Validación condicional para el campo 'dni'
    if (name === 'dni') {
      // Si estamos registrando un trabajador, validamos el campo DNI
      if (showRegisterWorker) {
        // Aquí puedes poner tu lógica de validación del DNI (por ejemplo, asegurarte de que sea numérico y tenga 8 dígitos)
        if (value.length !== 8 || !/^\d+$/.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            dni: 'El DNI debe ser un número de 8 dígitos',
          }));
        } else {
          // Si la validación pasa, se limpia el error
          setErrors((prevErrors) => ({
            ...prevErrors,
            dni: '',
          }));
        }
      } else {
        // Si estamos en el modo de registrar unidad, no se realiza la validación
        setErrors((prevErrors) => ({
          ...prevErrors,
          dni: '', // Limpiamos cualquier error del campo dni
        }));
      }
    }
  };
  
  
  
  
  
  const validateForm = () => {
    let newErrors = {};
  
    if (!formData.firstname) newErrors.firstname = "Dato requerido.";
    if (!formData.lastname) newErrors.lastname = "Dato requerido.";
    if (!formData.secondlastname) newErrors.secondlastname = "Dato requerido.";
  
    // Validación de DNI solo si "Registrar Trabajadores" está activo
    if (showRegisterWorker) {
      if (!formData.dni) {
        newErrors.dni = "Dato requerido.";
      } else if (!/^\d{8}$/.test(formData.dni)) {
        newErrors.dni = "Dato requerido";
      }
    }
  
    if (!formData.company) newErrors.company = "Dato requerido.";
    if (!formData.position) newErrors.position = "Dato requerido.";
    if (!formData.area) newErrors.area = "Dato requerido.";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  
  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      const response = await fetch(`${apiUrl}/registro-usuario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Error en el registro.");
      }
  
      setStatus(data.message || "Usuario registrado con éxito");
      setFormData({
        firstname: "",
        secondname: "",
        lastname: "",
        secondlastname: "",
        dni: "",
        company: "",
        position: "",
        area: "",
      });
  
      // Esperar a que fetchUsers termine antes de continuar
      await Promise.all([fetchUsers(), fetchDniOptions()]);

  
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      console.error("Error en el registro:", error);
      setStatus(error.message);
    }
  };
  const handleDelete = async () => {
    // if (!dniToDelete || !/^[0-9]{8}$/.test(dniToDelete)) {
    //   setStatus("Ingrese un DNI válido");
    //   return;
    // }
  
    try {
      const response = await fetch(`${apiUrl}/delete-user/${dniToDelete}`, {
        method: "DELETE",
      });
  
      const data = await response.json();
  
      if (data.error) {
        setStatusdeleteworker(data.error);
        setDniToDelete(""); // limpia campo
        setTimeout(() => setStatusdeleteworker(""), 3000); // <-- Esto faltaba aquí
        return;
      }
      
  
      if (data.success) {
        const msg = data.message || "Trabajador eliminado con éxito.";
        setStatusdeleteworker(msg);
        setDniToDelete("");
        await fetchUsers();
        await fetchDniOptions();
      }else {
        // En caso de que no haya ni error ni success, por ejemplo 'NoExiste'
        alert("Respuesta inesperada del servidor");
        setStatusdeleteworker("Respuesta inesperada del servidor");
      }
  
    } catch (error) {
      console.error("Error eliminando worker:", error);
      alert("Error del servidor");
      setStatusdeleteworker("Error del servidor");
    }
  
    setTimeout(() => setStatusdeleteworker(""), 3000);
  };
  

  return (
    <UsersContext.Provider
      value={{
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
        fetchUsers,
        showRegisterWorker,
        setShowRegisterWorker,
        showRegisterUnit, 
        setShowRegisterUnit

      }}
    >
      {children}
    </UsersContext.Provider>
  );
};