import { addUserToProject } from '@/api/TeamAPI';
import { TeamMember, User } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


type SearchResultProps = {
  user: TeamMember
  reset: () => void
  managerId: User['_id']
}
export default function SearchResult({ user, managerId, reset }: SearchResultProps) {
  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId!;
  const isManager = managerId === user._id;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onSuccess: (data) => {
      toast.success(data);
      reset();
      queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]});
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleAddUser = () => {
    mutate({ projectId, id: user._id });
  }

  return (
    <>
      <div className="bg-white p-5 rounded shadow-md">
          {isManager && 
         <p className="text-lg bg-blue-500 text-white text-center mx-auto w-fit px-4 py-2 rounded-lg shadow-sm shadow-sky-500">
          {user.name} es el <b><u>Manager</u></b> del proyecto por lo tanto y pertenece al equipo. </p>}

        {!isManager &&
          <button
            className="mt-4 bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-2 px-4 rounded cursor-pointer flex justify-center items-center transition-all duration-150 ease-in-out"
            onClick={handleAddUser}
          >
            Agregar a <span className="text-2xl font-black text-lime-500">&nbsp; {user.name} &nbsp; </span> al Proyecto
          </button>}

      </div>
    </>
  )
}
