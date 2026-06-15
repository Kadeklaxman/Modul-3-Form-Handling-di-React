import { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import TimeForm from './components/TimeForm'
import SimpleForm from './components/SimpleForm'
import UncontrolledForm from './components/UncontrolledForm'

function App() {
  return (
    <>
     <LoginForm/>
     <TimeForm/>
    <SimpleForm/>
    <UncontrolledForm/>
    </>
  )
}

export default App
