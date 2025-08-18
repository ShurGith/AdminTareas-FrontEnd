import { Bounce, ToastContainer } from 'react-toastify'

function ToastMensaje() {
  return (
          <ToastContainer
        pauseOnHover={true}
        pauseOnFocusLoss={false}
        autoClose={3000}
        theme='colored'
        closeOnClick={true}
        position='top-right'
        draggable={true}
        transition={Bounce}
      />
  )
}

export default ToastMensaje