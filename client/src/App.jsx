import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import DashBoard from './Projects/Project1/DashBoard'
import Login from './Projects/Project1/Login'
import SignUp from './Projects/Project1/SignUp'
import Todo from './Projects/Project2/Todo'
import NoteDashboard from './Projects/Project3/components/NoteDashboard'
import AddNote from './Projects/Project3/components/AddNote'
import SeeNotes from './Projects/Project3/components/SeeNotes'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/todo' element={<Todo />} />
        <Route path='/note' element={<NoteDashboard />} />
        <Route path='/add-note' element={<AddNote />} />
        <Route path='/see-note' element={<SeeNotes />} />
      </Routes>
    </>
  )
}

export default App
