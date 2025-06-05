import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './Pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Buses from './components/Buses'
import Contact from './components/Contact'
import Signup from './components/Signup'
import Login from './components/Login'
import { useCookies } from 'react-cookie'
import AddBus from './components/AddBus'
import MyBooking from './components/MyBooking'
import ShowAddedBus from './components/ShowAddedBus'
import PaymentCallback from './components/PaymentCallback'

function App() {

  const [userCookie]=useCookies(["role"]);


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
            <Route path="/mybookings" element={<MyBooking />}/>
            { userCookie.role === "admin" && (<Route path="/addBus" element={<AddBus />}/>)}
            { userCookie.role === "admin" && (<Route path="/showAddBus" element={<ShowAddedBus />}/>)}
            <Route path="/payment/callback" element={<PaymentCallback />} />
          </Routes>
        </div>
        <Footer />
      </Router>

    </>
  )
}

export default App
