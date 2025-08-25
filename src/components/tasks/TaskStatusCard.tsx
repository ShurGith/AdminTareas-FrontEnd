import { TASK_STATUS_CONFIG } from '@/utils/utils';

export type TaskStatus = keyof typeof TASK_STATUS_CONFIG

type TaskStatusCardProps = {
  num:  number;
    activityLog: {
        _id: string;
        status: TaskStatus;
        user: {
            name: string;
        }
    }
}

function TaskStatusCard({activityLog, num}: TaskStatusCardProps) {
    const config = TASK_STATUS_CONFIG[activityLog.status];
  return (
    <li>         
      <p key={activityLog._id}  className="flex items-center gap-1">
        <span
        className={`text-sm flex justify-center items-center rounded-full w-6 h-6 border ${config.bgColorClass} ${config.textColorClass} ${config.borderColorClass} `}>
          {num}</span>
        <span
          className={`text-sm rounded-md p-1 border ${config.bgColorClass} ${config.textColorClass} ${config.borderColorClass} `}
        >
         {config.label} - {activityLog.user.name}
        </span>
      </p>
    </li>
  )
}

export default TaskStatusCard