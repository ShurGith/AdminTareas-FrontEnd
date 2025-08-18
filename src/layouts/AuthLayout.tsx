import Logo from '@/components/Logo';
import NavMenu from '@/components/NavMenu';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <>
      <div className="bg-gray-800 min-h-screen">
              <header className="bg-gray-800 py-5">
                <div className="mx-auto max-w-screen-2xl flex flex-col lg:flex-row justify-between items-center gap-4 px-6">
                  <div className="w-64">
                    <Logo />
                  </div>
                  <NavMenu />
                </div>
              </header>
        <div className="py-10 lg:py-20 mx-auto w-[450px]">
          <Logo />
          <div className='mt-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
