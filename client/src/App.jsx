
import { useDispatch, useSelector } from 'react-redux'
import './App.scss'
import { Login } from './components/auth/Login'
import { Registration } from './components/auth/Registration'
import { Navbar } from './components/navbar/navbar'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import { auth } from './actions/user'
import { useEffect } from 'react'
import { Disk } from './components/disk/disk'

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
            !isAuth ?
              <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/registration' element={<Registration/>}/>
                <Route path='*' element={<Navigate to="/login"/>}/>

              </Routes>
              : 
              <Routes>
                <Route  path='/login' element={<Disk/>}/>
                <Route path='/' element={<Navigate to="/"/>}/>
              </Routes>
              
              

        }
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
