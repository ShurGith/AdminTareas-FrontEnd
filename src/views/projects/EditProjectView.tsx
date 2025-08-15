import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/ProjectAPI";
import EditProjectForm from "@/components/projects/EditProjectForm";

export default function EditProjectView() {
  const params = useParams();
  const projectId = params.projectId!;

  //*Obtenemos los datos de la API para editar el proyecto
  const { data, isLoading, isError } = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: () => getProjectById(projectId as string),
    retry: false, // Intenta nuevamente si falla// No vuelve a consultar hasta que se actualice manualmente o expire el tiempo de vida
  });

  return (
    <div>
      {isLoading && <p>Cargando...</p>}
      {isError && <Navigate to="/404"/>}
      {!isLoading && data && <EditProjectForm  data={data} projectId={projectId} />}      
    </div>
  )
}

