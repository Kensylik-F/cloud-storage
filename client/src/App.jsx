
import { useDispatch, useSelector } from 'react-redux'
import './App.scss'
import { Login } from './components/auth/Login'
import { Registration } from './components/auth/Registration'
import { Navbar } from './components/navbar/navbar'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { auth } from './actions/user'
import { useEffect } from 'react'

function App() {

  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(auth())
  },[dispatch])

  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar/>  
        <div className="wrapper">
          {
            !isAuth && 
              <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/registration' element={<Registration/>}/>
              </Routes>
        }
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
