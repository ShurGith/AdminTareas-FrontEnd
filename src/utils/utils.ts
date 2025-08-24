import { TaskStatus, taskStatusSchema } from "@/types";
import { statusTranslations } from "@/locales/es";

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const formater = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  return formater.format(date);
}

interface StatusConfig {
    label: string; 
    bgColorClass: string; 
    textColorClass: string;
    borderColorClass: string; 
    borderTColorClass: string;
}

export const TASK_STATUS_CONFIG: Record<TaskStatus, StatusConfig> = {
    pending: {
        label: statusTranslations.pending,
        bgColorClass: "bg-yellow-100/75",
        textColorClass: "text-yellow-500",
        borderColorClass: "border-yellow-500",
        borderTColorClass: "border-t-yellow-500"
    },
    onHold: {
        label:statusTranslations.onHold,
        bgColorClass: "bg-orange-100/75",
        textColorClass: "text-orange-500",
        borderColorClass: "border-orange-500",
        borderTColorClass: "border-t-orange-500"
    },
    inProgress: {
        label: statusTranslations.inProgress,
        bgColorClass: "bg-blue-100/75",
        textColorClass: "text-blue-500",
        borderColorClass: "border-blue-500",
        borderTColorClass: "border-t-blue-500"
    },
    underReview: {
        label: statusTranslations.underReview,
        bgColorClass: "bg-purple-100/75",
        textColorClass: "text-purple-500",
        borderColorClass: "border-purple-500",
        borderTColorClass: "border-t-purple-500"
    },
    completed: {
        label: statusTranslations.completed,
        bgColorClass: "bg-green-100/75",
        textColorClass: "text-green-500",
        borderColorClass: "border-green-500",
        borderTColorClass: "border-t-green-400"
    },
};


export const TASK_STATUS_VALUES = taskStatusSchema.options;