import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import UserFormZod from './components/UserFormZod'
import CreatePostForm from './components/CreatePostForm'
import ProductForm from './components/ProductForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      {/* <CreatePostForm /> */}
            <ProductForm />

    </div>

  )
}

export default App
