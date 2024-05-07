import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './Pages/Home'
import UserNav from './Pages/User/UserNav'
import UserHome from './Pages/User/UserHome'
import AdminNav from './Pages/admin/AdminNav'
import AdminHome from './Pages/admin/AdminHome'
import "./css/style.css"
import Chat from './Pages/User/Chat'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
function App() {
 

  return (
   <div className='grad-color'> 
<BrowserRouter>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/chat' element={<Chat/>}/>
  <Route path='/user'element={<UserHome/>}/>
  <Route path='/admin' element={<AdminHome/>}/>

</Routes>
</BrowserRouter>
<ToastContainer/>
   </div>
  )
}

export default App
