import AddMemberModal from "@/components/team/AddMemberModal";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ProjectTeamView() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;
  return (
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
      <AddMemberModal />
    </>
  )
}
