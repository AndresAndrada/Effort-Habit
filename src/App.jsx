import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import NavigatorRouter from './routes/routes'
import { Theme, ThemePanel } from "@radix-ui/themes";
import './index.css'
import './transition.css'

function App() {

  return (
    <Router>
      <Toaster />
      <Theme>
        <NavigatorRouter />
        <ThemePanel />
      </Theme>
    </Router>
  )
}

export default App
