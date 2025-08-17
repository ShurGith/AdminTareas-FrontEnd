import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatus } from '@/api/TasksAPI';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/utils';
import { statusTranslations } from "@/locales/es";
import { TaskStatus } from '@/types';

export default function TaskModalDetails() {
  const navigate = useNavigate();
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const showModal = queryParams.has('viewTask');
  const taskId = queryParams.get('viewTask')!;
  const params = useParams();
  const projectId = params.projectId!;
  const queryClient = useQueryClient();

  const { data, isError, error } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId && !!projectId, // Only run the query if taskId is available
    retry: false, // Disable retries for this query
  });

  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
      toast.success(data);
      navigate(location.pathname, { replace: true });
    }

  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus
    const data = { projectId, taskId, status }
    mutate(data)

  };

  if (isError) {
    toast.error(error.message, { toastId: 'error' });
    return <Navigate to={`/projects/${params.projectId}`} />;
  }

  if (data) return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <div className='flex gap-2 text-sm text-slate-400'>
                    <p className='text-sm text-slate-400 underline'>Agregada el:</p>
                    <p>{formatDate(data.createdAt)}</p>
                  </div>
                  <div className='flex gap-2 text-sm text-slate-400'>
                    <p className='text-sm text-slate-400 underline'>Última actualización:</p>
                    <p> {formatDate(data.updatedAt)}</p>
                  </div>
                  <DialogTitle
                    as="h3"
                    className="font-black text-4xl text-slate-600 my-5"
                  >{data.name}
                  </DialogTitle>
                  <p className='text-lg text-slate-500 mb-2'>Descripción: {data.description}</p>
                  <div className='my-5 space-y-3'>
                    <label className='text-sm text-slate-500'>Estado Actual:{statusTranslations[data.status]}
                      <select
                        onChange={handleChange}
                        defaultValue={data.status}
                        className='w-full p-3 border border-slate-300 rounded-md'>
                        {Object.entries(statusTranslations).map(([key, value]) => (
                          <option key={key} value={key} >
                            {value}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}