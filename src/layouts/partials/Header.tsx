import Logo from '@/components/Logo'
import NavMenu from '@/components/NavMenu'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-gray-800 py-5">
            <div className="mx-auto max-w-screen-2xl flex flex-col lg:flex-row justify-between items-center gap-4 px-6">
              <div className="w-64">
                <Logo />
              </div>
              <div className="flex flex-col w-full justify-between  items-center gap-4">
                <h1 className="text-xl text-white font-bold">Administrador de Proyectos</h1>
                <div className="hidden lg:block">
                  <NavLink to="/auth/login" className="text-white hover:text-purple-400">Login</NavLink>
                </div>
              </div>
              <NavMenu />
            </div>
    </header>
    )
}

export default Header