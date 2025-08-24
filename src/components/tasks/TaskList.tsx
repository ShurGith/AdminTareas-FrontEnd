import { TaskProject } from "@/types";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/es";
import { TASK_STATUS_VALUES, TASK_STATUS_CONFIG } from "@/utils/utils";

type TaskListProps = {
  tasks: TaskProject[];
  canEdit: boolean
}

type GroupedTasks = {
  [key: string]: TaskProject[]
}
const losValores = TASK_STATUS_VALUES;
const losColores = TASK_STATUS_CONFIG;

const initialStatusGroups: GroupedTasks = {}

const statusColors: { [key: string]: string } = {}

for (let i = 0; i < losValores.length; i++) {
  const value = losValores[i];
  initialStatusGroups[value] = [];
  statusColors[value] = losColores[value].borderTColorClass;
}

export default function TaskList({ tasks, canEdit }: TaskListProps) {
  const groupedTasks = tasks!.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);



  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32 w-full'>
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className='min-w-[500px] 2xl:min-w-0 2xl:w-1/5'>
            <h3 className={`capitalize text-sm font-light border border-slate-300  ${statusColors[status]} border-t-8  bg-white p-3`}>{statusTranslations[status]}</h3>
            <ul className='mt-5 space-y-5'>
              {tasks.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
              ) : (
                tasks.map(task =>
                  <TaskCard key={task._id} task={task} canEdit={canEdit} />)
              )}
            </ul>
          </div>
        ))}

      </div>
    </>
  )
}
