import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './Pages/Home'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Buses from './components/Buses'
import Contact from './components/Contact'
import Signup from './components/Signup'
import Login from './components/Login'

function App() {

  const [count, setcount] = useState<number>(0)

  const IncrementCount = (val: number): number => {
    return val + 1
  }


  const handleClick = () => {
    setcount(IncrementCount(count))
  }

  return (
    <>
      <Router>
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buses" element={<Buses />} />
            <Route path="/contact" element={<Contact />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/login" element={<Login />}/>
          </Routes>
        </div>
        <Footer />
      </Router>

    </>
  )
}

export default App
