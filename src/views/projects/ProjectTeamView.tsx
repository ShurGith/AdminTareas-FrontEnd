import { getProjectTeam, removeUserFromProject } from "@/api/TeamAPI";
import AddMemberModal from "@/components/team/AddMemberModal";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react";
import { toast } from "react-toastify";

export default function ProjectTeamView() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['projectTeam', projectId],
    queryFn: () => getProjectTeam(projectId),
    retry: false,
  })
console.log(data);
  const { mutate } = useMutation({
    mutationFn: removeUserFromProject,
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] });
    },
    onError: (error) => {
      toast.error(error.message)
    }

  })

  if (isLoading) return <p>Cargando...</p>
  if (isError) return <p className="text-red-600 font-bold">Error al cargar los integrantes del equipo</p>
  if (data) return (
    <>
      <h1 className="text-5xl font-black">Administrar Equipo</h1>
      <p className="text-2xl font-light text-gray-500 mb-5">Administra el equipo de trabajo para este proyecto.</p>
      <nav className="flex gap-2 mb-10  text-white">
        <button
          type="button"
          onClick={() => navigate(location.pathname + '?addMember=true')}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 px-3 py-2 rounded-md cursor-pointer">
          Añadir Miembro</button>
        <Link
          to={`/projects/${projectId}`}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 py-2 px-3 rounded-md cursor-pointer">
          Volver al Proyecto </Link>
      </nav>
      {data.length ? <h2 className="text-3xl font-black my-10">Miembros actuales</h2> : <p className='text-center py-20'>No hay miembros en este equipo</p>}
      {data.length > 0 &&
        <ul role="list" 
        className="grid grid-cols-2 mt-10  ">
          {data?.map((member) => (
            <li key={member._id} className="flex justify-between gap-x-6 px-5 py-10 bg-white shadow-lg rounded">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto space-y-2">
                  <p className="text-2xl font-black text-gray-600">
                    {member.name}
                  </p>
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {member.email}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                  <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">opciones</span>
                    <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                  </MenuButton>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <MenuItem>
                        <button
                          onClick={() => mutate({ projectId, userId: member._id })}
                          type='button'
                          className='block px-3 py-1 text-sm leading-6 w-full text-left  text-red-500 cursor-pointer hover:bg-red-500 hover:text-white'
                        >  Eliminar Colaborador
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </li>))}

        </ul>}
      <AddMemberModal />
    </>
  )
}
