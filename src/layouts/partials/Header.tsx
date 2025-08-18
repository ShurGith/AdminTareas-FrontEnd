import Logo from '@/components/Logo'
import NavMenu from '@/components/NavMenu'

function Header() {
  return (
    <header className="bg-gray-800 py-5">
            <div className="mx-auto max-w-screen-2xl flex flex-col lg:flex-row justify-between items-center gap-4 px-6">
              <div className="w-64">
                <Logo />
              </div>
              <NavMenu />
            </div>
    </header>
    )
}

export default Header