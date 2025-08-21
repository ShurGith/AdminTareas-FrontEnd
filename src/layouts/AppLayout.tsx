import { Outlet } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./partials/Header";
import Footer from "./partials/Footer";

export default function AppLayout() {

  return (
    <>
      <Header  />
      <section className="w-full md:max-w-screen-2xl mt-10 py-5 px-30 mx-auto">
        <Outlet  />
      </section>
      <Footer />
    </>
  )
}
