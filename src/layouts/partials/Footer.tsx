import ToastMensaje from "./ToastMensaje"

function Footer() {
  return (
    <>
    <footer className="py-5 bg-gray-900">
      <p className="text-center text-white">
        © Admin Tareas - Todos los derechos reservados. - 2020 - {new Date().getFullYear()}
      </p>
    </footer>
    <ToastMensaje />
    </>
  )
}

export default Footer