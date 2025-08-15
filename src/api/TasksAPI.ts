import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { Project, TaskFormData   } from "../types"

type TaskAPI ={
  formData: TaskFormData,
  projectId: Project['_id'] 
}

export async function createTask ({ formData, projectId}: Pick<TaskAPI,'formData'|'projectId'>) {
    try{
      const url = `/projects/${projectId}/tasks`
        const {data}= await api.post<string>(url,formData)
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