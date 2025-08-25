import { NoteFormData } from "@/types"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/api/NoteAPI"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

function AddNoteForm() {
  const initialValues: NoteFormData = { 
    content: '' 
  }
  const params = useParams()
  const location = useLocation()
  const queryClient = useQueryClient();

  const queryParams = new URLSearchParams(location.search);
  const projectId = params.projectId!
  const taskId = queryParams.get("viewTask")!

  const {register, handleSubmit, reset,formState: {errors}} = useForm({defaultValues:initialValues})

  const { mutate } = useMutation({
    mutationFn: createNote,
    onError:(error)=>{
      toast.error(error.message)
    },
    onSuccess:(data)=>{
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ['task', taskId]})
    }
  })

  const handleAddNote = (formData: NoteFormData) => {
    mutate({formData, projectId, taskId})
    reset()
  }
  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className='space-y-3'
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label className="font-bold">Crear Nota
          <input id="content"
            type="text" placeholder="Contenido de la nota..." 
            className="font-normal outline-none focus:bg-yellow-50 focus:border-fuchsia-600  w-full p-3 border border-gray-300"
            {...register('content',
              {required:'El contenido de la nota es obligatorio.'})}
            />
            {errors.content && (
              <ErrorMessage>{errors.content.message}</ErrorMessage>)}
        </label>
        <input type="submit" value="Crear Nota" 
        className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-black w-full cursor-pointer py-2 px-4 rounded"/>
      </div>
    </form>
  )
}

export default AddNoteForm