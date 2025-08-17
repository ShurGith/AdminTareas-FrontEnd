import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";

export default function ProjectDetailsView() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  //*Obtenemos los datos de la API para editar el proyecto
  const { data, isLoading, isError } = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: () => getProjectById(projectId as string),
    retry: false, // Intenta nuevamente si falla// No vuelve a consultar hasta que se actualice manualmente o expire el tiempo de vida
  });
  console.log(data); 

  return (
    <div>
      {isLoading && <p>Cargando...</p>}
      {isError && <Navigate to="/404"/>}
      {!isLoading && data && 
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>
    
        {/* Botón para ir al formulario de edición */}
        <button 
          type="button"
          onClick={() => navigate(location.pathname + '?newTask=true')}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 px-3 py-2 rounded-md text-white mt-5 cursor-pointer">
          Añadir tarea</button>
      </>}    
      <AddTaskModal/>
      <TaskList 
        tasks={data?.tasks || []}
      /> 
    </div>
  )
}
