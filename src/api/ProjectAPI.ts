import api from "@/lib/axios";
import { ProjectFormData } from "@/types/index";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post('/projects', formData);
    return data;
    
  } catch (error) {
    if(isAxiosError(error) && error.response){
     const errores = error.response.data.errors
      let message:string = ""
      for(let i =0 ; i < errores.length ;i++){
        message += (errores[i].msg +"\n");
      }
      message+= error.response.status
      console.log(message)
      throw new Error(message);
    }
  }
}