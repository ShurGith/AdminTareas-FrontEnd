
import { Outlet } from 'react-router-dom';
import Header from './partials/Header';
import Footer from './partials/Footer';

export default function AuthLayout() {
  return (
    <>
      <Header />
      <div className="bg-gray-800">
          <div className='mt-10 mx-auto max-w-[485px]'>
            <Outlet />
        </div>
      </div>
      <Footer />
    </>
  )
}
