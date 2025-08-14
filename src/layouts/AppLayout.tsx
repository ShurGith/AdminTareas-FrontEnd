import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";

export default function AppLayout() {
  return (
        <>
      <header className="bg-gray-800 py-5">
        <div className="mx-auto max-w-screen-2xl flex flex-col lg:flex-row justify-between items-center gap-4 px-6">
          <div className="w-64">
            <Logo />
          </div>
          <NavMenu />
        </div>
      </header>
      <section className="w-full md:max-w-screen-2xl mt-10 py-5 px-30 mx-auto">
        <Outlet />
      </section>
      <footer className="py-5 bg-gray-900">
        <p className="text-center text-white">
          © Admin Tareas - Todos los derechos reservados. - 2020 - {new Date().getFullYear()}
        </p>
      </footer>
      <ToastContainer 
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        autoClose={5000}
        theme='dark'
        closeOnClick={true}
        position='top-right' />
    </>
  )
}
