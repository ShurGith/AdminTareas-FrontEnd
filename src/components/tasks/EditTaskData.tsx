import { getTaskById } from "@/api/TasksAPI";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import EditTaskModal from "./EditTaskModal";


export default function EditTaskData() {
  const params = useParams();
  const projectId = params.projectId!;
  //console.log(projectId);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("editTask")!
//  console.log(taskId);

  const { data, isError } = useQuery({
    queryKey: ["editTask", taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId,
    retry: false
  });
//console.log(data);

if(isError) return <Navigate to={'/404'}/>;

if(data) return <EditTaskModal data={data} taskId={taskId}/> 


}