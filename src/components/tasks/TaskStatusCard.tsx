import { TASK_STATUS_CONFIG } from '@/utils/utils';

export type TaskStatus = keyof typeof TASK_STATUS_CONFIG

type TaskStatusCardProps = {
    activityLog: {
        _id: string;
        status: TaskStatus;
        user: {
            name: string;
        }
    }
}

function TaskStatusCard({activityLog}: TaskStatusCardProps) {
    const config = TASK_STATUS_CONFIG[activityLog.status];
  return (
    <div>         
      <p key={activityLog._id} className="flex items-center gap-1">
        <span
          className={`text-sm rounded-md px-2 py-0.5 inline-block border ${config.bgColorClass} ${config.textColorClass} ${config.borderColorClass} `}
        >
          {config.label} - {activityLog.user.name}
        </span>
      </p>
    </div>
  )
}

export default TaskStatusCard