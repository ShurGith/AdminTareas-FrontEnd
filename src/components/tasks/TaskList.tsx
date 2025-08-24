import { Task } from "@/types";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/es";

type TaskListProps = {
  tasks: Task[];
}

type GroupedTasks = {
  [key: string]: Task[];
};

const initiaStatusGroups: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
}
const statusColors: {[key: string]: string} = {
  pending: 'border-t-blue-300',
  onHold: 'border-t-red-300',
  inProgress: 'border-t-orange-300',
  underReview: 'border-t-yellow-300',
  completed: 'border-t-green-300',
}
export default function TaskList({ tasks }: TaskListProps) {
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup };
  }, initiaStatusGroups);
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
                tasks.map(task => <TaskCard key={task._id} task={task} />)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}
