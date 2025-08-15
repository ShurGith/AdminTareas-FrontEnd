import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { Project, ProjectFormData } from "@/types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
  data: ProjectFormData;
  projectId: Project['_id'];
};
export default function EditProjectForm({data, projectId}: EditProjectFormProps) {

  const navigate = useNavigate();
  const initialValues: ProjectFormData = { 
    projectName: data.projectName ,
    clientName: data.clientName ,
    description: data.description 
  };
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues }) 
  //register es una funcion que nos permite registrar los inputs del formulario y handleSubmit es una funcion que nos permite enviar el formulario. formState es un objeto que contiene la informacion de los campos del formulario. 

  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      //* Invalidate and refetch projects list after edit project
      queryClient.invalidateQueries({queryKey: ['projects']});
      queryClient.invalidateQueries({queryKey: ['editProject', projectId]});
      
      toast.success(`El proyecto se ha actualizado correctamente.`);
      console.log(data);
      navigate('/');
    }
  });

  const handleForm = (formData: ProjectFormData) => {
    const dataform = {formData, projectId};
    mutate(dataform);
  }

return (
    <>
      <h1 className="text-5xl font-black ">Mis Proyectos</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Edita el siguiente formulario para cambiar los datos del proyecto.
      </p>
  

      <form
        className="mt-10 p-10 bg-white shadow-lg dark:bg-slate-900 rounded-lg  w-full  mx-auto"
        onSubmit={handleSubmit(handleForm)}
        noValidate
        autoComplete='off'
      >
        <ProjectForm
          register={register}
          errors={errors}
        />
        <div className="flex justify-between items-center">
        <input
          type="submit"
          value="Guardar Cambios"
          className="mx-auto block bg-fuchsia-700 hover:bg-fuchsia-800 p-5 text-white uppercase font-bold cursor-pointer rounded-sm"
        />
        <Link to={'/'} className="mx-auto block bg-fuchsia-700 hover:bg-fuchsia-800 p-5 text-white uppercase font-bold cursor-pointer rounded-sm">Cancelar</Link>
        </div>
      </form>
    </>
  )
}
