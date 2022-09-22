import { ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dashboard } from './pages/Dashboard'

import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <>
      <Dashboard />
      <ToastContainer autoClose={1500} />
    </>
  )
}
