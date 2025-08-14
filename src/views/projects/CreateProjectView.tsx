import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import ProjectForm from "@/components/ProjectForm";

export default function CreateProjectView() {
  function handleForm(data) {
    console.log(data);
  }

  const initialValues = {
    projectName: "",
    clientName: "",
    description: "",
  };
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues }) //register es una funcion que nos permite registrar los inputs del formulario y handleSubmit es una funcion que nos permite enviar el formulario. formState es un objeto que contiene la informacion de los campos del formulario. 
  return (
    <>
      <h1 className="text-5xl font-black ">Mis Proyectos</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Llena el siguiente formulario para crear un nuevo proyecto.
      </p>
      <nav className="my-5">
        <Link
          to="/"
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-sm rounded-lg uppercase font-bold transition-colors">
          Home Projectos
        </Link>
      </nav>

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
        <input
          type="submit"
          value="Crear Proyecto"
          className="mx-auto block bg-fuchsia-600 hover:bg-fuchsia-800 p-5 text-white uppercase font-bold cursor-pointer rounded-sm"
        />
      </form>
    </>
  )
}
