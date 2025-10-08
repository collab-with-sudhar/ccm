import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'

const domain = "dev-rxp1uikokpcarq8z.us.auth0.com";
const clientId = "jSWTP0UXQlfzXBdJKqbLNuwYF4zRMCsy";

createRoot(document.getElementById('root')).render(
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
)
