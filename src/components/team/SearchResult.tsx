import { addUserToProject } from '@/api/TeamAPI';
import { TeamMember } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type SearchResultProps = {
  user: TeamMember
  reset: () => void
}
export default function SearchResult( {user, reset}: SearchResultProps) {
  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId!;

  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
    onError: (error) => {
      toast.error( error.message);
    }
  });

  const handleAddUser = () => {
    mutate({ projectId, id: user._id });
  }

  return (
    <>
      <div className="bg-white p-5 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Resultado</h2>
        <p className="text-lg">Nombre: {user.name}</p>
        <button
          className="mt-4 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={handleAddUser}
        >
          Agregar al Proyecto
        </button>
      </div>
    </>
  )
}
