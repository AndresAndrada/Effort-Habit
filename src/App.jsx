import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import NavigatorRouter from './routes/routes'
import './index.css'
import './transition.css'

function App() {

  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <Toaster />
      <NavigatorRouter />
    </Router>
  )
}

export default App
