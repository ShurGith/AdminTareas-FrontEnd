import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { Project, Task, TaskFormData, taskSchema } from "../types"

type TaskAPI = {
    formData: TaskFormData,
    projectId: Project['_id']
    taskId: Task['_id']
    status: Task['status']
}

export async function createTask({ formData, projectId }: Pick<TaskAPI, 'formData' | 'projectId'>) {
    try {
        const url = `/projects/${projectId}/tasks`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const errores = error.response.data.errors
            let message: string = `Lista de Errores(${errores.length}):\n`
            for (let i = 0; i < errores.length; i++) {
                message += i + 1 + " - " + (errores[i].msg + "\n");
            }
            console.log(message)
            throw new Error(`Tienes un error ${error.response.status} - Revisa la consola para ver los errores`);
        }
    }
}
export async function getTaskById({ projectId, taskId }: Pick<TaskAPI, 'projectId' | 'taskId' >) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api(url)
        //return data
        const response = taskSchema.safeParse(data)
        console.log(response);
        if(response.success) return response.data
        else throw new Error(response.error.message)

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateTask({ projectId, taskId, formData }: Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.put<string>(url, formData)
        const response = taskSchema.safeParse(data)
        if (response.success) return response.data
        else throw new Error(response.error.message)
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteTask({ projectId, taskId }: Pick<TaskAPI, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.delete<string>(url)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
export async function updateStatus({ projectId, taskId,status }: Pick<TaskAPI, 'projectId' | 'taskId' | 'status'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/status`
        const { data } = await api.post<string>(url, {status})
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}