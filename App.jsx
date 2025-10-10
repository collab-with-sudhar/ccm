import {useAuth0} from '@auth0/auth0-react'
import './App.css'

function App() {
  const {isAuthenticated,isLoading,logout,user,loginWithRedirect}=useAuth0()

  if(isLoading) return <>Loading</>

  return (
    <>
      {!isAuthenticated?
            <><h3>welcome</h3> <button onClick={()=>loginWithRedirect()}>login</button></>
            :
            <>
              <h2>welcome {user.name}</h2>
              <img src={user.picture} alt="" srcset="" />
              {user.email}
              <button onClick={()=>logout({logoutParams:{returnTo:window.location.origin}})}>logout</button>
            </>}
    </>
  )
}

export default App
