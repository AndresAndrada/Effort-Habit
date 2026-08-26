import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import NavigatorRouter from './routes/routes'
import { Theme } from "@radix-ui/themes";
import { AuthProvider } from './contexts/AuthProvider';
import './index.css'
import './transition.css'

function App() {

  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <Toaster />
      <Theme>
        <AuthProvider>
          <NavigatorRouter />
        </AuthProvider>
        {/* <ThemePanel /> */}
      </Theme>
    </Router>
  )
}

export default App
