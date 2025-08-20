import api from "@/lib/axios";
import { dashboardProjectsSchema, Project, ProjectFormData, projectSchema } from "@/types/index";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post('/projects', formData);
    return data;

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errores = error.response.data.errors
      let message: string = `Lista de Errores(${errores.length}):\n`
      for (let i = 0; i < errores.length; i++) {
        message += i + 1 + " - " + (errores[i].msg + "\n");
      }
      //message+= error.response.status
      console.log(message)
      throw new Error(`Tienes un error ${error.response.status} - Revisa la consola para ver los errores`);
    }
  }
}

export async function getProjects() {

  const token = localStorage.getItem('AUTH_TOKEN')

  try {
    const { data } = await api.get("/projects",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const response = dashboardProjectsSchema.safeParse(data);
    if (!response.success) {
      throw new Error("No se pudo obtener los proyectos")
    }
    if (response.success) {
      return response.data
    }
  } catch (err) {
    console.error("Error al obtener proyectos", err)
  }
}

export async function getProjectById(id: Project['_id']) {
  try {
    const { data } = await api.get(`/projects/${id}`)
    const response = projectSchema.safeParse(data);
    if (!response.success) {
      throw new Error("No se pudo obtener el proyecto")
    }
    if (response.success) {
      return response.data
    }
  } catch (err) {
    console.error("Error al obtener el proyecto", err)
  }
}


type ProjectApiType = {
  formData: ProjectFormData
  projectId: Project['_id']
}
export async function updateProject({ formData, projectId }: ProjectApiType) {
  try {
    const { data } = await api.put<string>(`/projects/${projectId}`, formData);
    return data;

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errores = error.response.data.errors
      let message: string = `Lista de Errores(${errores.length}):\n`
      for (let i = 0; i < errores.length; i++) {
        message += i + 1 + " - " + (errores[i].msg + "\n");
      }
      //message+= error.response.status
      console.log(message)
      throw new Error(`Tienes un error ${error.response.status} - Revisa la consola para ver los errores`);
    }
  }
}

export async function deleteProject(id: Project['_id']) {
  try {
    const { data } = await api.delete<string>(`/projects/${id}`);
    return data;

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errores = error.response.data.errors
      let message: string = `Lista de Errores(${errores.length}):\n`
      for (let i = 0; i < errores.length; i++) {
        message += i + 1 + " - " + (errores[i].msg + "\n");
      }
      //message+= error.response.status
      console.log(message)
      throw new Error(`Tienes un error ${error.response.status} - Revisa la consola para ver los errores`);
    }
  }
}