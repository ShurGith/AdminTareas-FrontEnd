import Logo from '@/components/Logo'
import NavMenu from '@/components/NavMenu'
import UserHeader  from './UserHeader'
import { useAuth } from "@/hooks/useAuth";
import { User } from '@/types';

type HeaderProps = {
  name: User['name'];
}
function Header() {
  const { data, isError } = useAuth();
  const name: HeaderProps['name'] = data?.name || '';

  return (
    <header className="bg-gray-800 py-5">
      <div className="mx-auto max-w-screen-2xl flex flex-col lg:flex-row justify-between items-center gap-4 px-6">
        <div className="w-64">
          <Logo />
        </div>
        <div className="flex flex-col w-full justify-between  items-center gap-4">
          <h1 className="text-xl text-white font-bold">Administrador de Proyectos</h1>
          <div className="hidden lg:block">
            <UserHeader name={name} isError={isError} />
          </div>
        </div>
        <NavMenu name={name} />
      </div>
    </header>
  )
}

export default Header