import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div>
      <h1 className="text-5xl font-bold text-red-500 text-center">
        Error 404: Página no encontrada
      </h1>
      <Link to="/" className="mt-8 block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-fit">Volver al inicio</Link>
    </div>
  )
}
