import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { useMemo } from "react";

export default function ProjectDetailsView() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;
  const { data: userAuth, isLoading: authLoading } = useAuth()

  //& Obtenemos los datos de la API para editar el proyecto  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId),
    retry: false, // Intenta nuevamente si falla// No vuelve a consultar hasta que se actualice manualmente o expire el tiempo de vida
  });

  console.log(data);

  const canEdit = useMemo(() => {
     userAuth?._id === data?.manager
  }, [userAuth, data])


  console.log(canEdit);

  if (isLoading && authLoading) return <p>Cargando...</p>
  if (isError) return <Navigate to="/404" />
  if (data && userAuth) return (
    <>
      <h1 className="text-5xl font-black">{data.projectName}</h1>
      <p className="text-2xl font-light text-gray-500 mb-5">{data.description}</p>

      {isManager(userAuth._id, data.manager) && (
        <nav className="flex gap-2 mb-10  text-white">
          <button
            type="button"
            onClick={() => navigate(location.pathname + '?newTask=true')}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 px-3 py-2 rounded-md cursor-pointer">
            Añadir tarea</button>
          <Link
            to={'team'}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 py-2 px-3 rounded-md cursor-pointer">
            Colaboradores </Link>
        </nav>)}
      <TaskList
        tasks={data?.tasks || []}
      />
      <AddTaskModal />
      <EditTaskData />
      <TaskModalDetails />
    </>
  )
}
