import './App.css'
import Home from "./pages/Home"
import View from "./pages/View"
import Cart from "./pages/Cart"
import Wishlist from "./pages/Wishlist"
// import Header from './pages/Components/Headers.jsx'
import Footer from './pages/Components/Footers.jsx'
import { Route } from 'react-router-dom'
import { Routes,Navigate } from 'react-router-dom'

function App() {


  return (
    <>
    {/* <Header/> */}
    <Routes>
      <Route path='/' element={<Home insideHome/>}/>
      <Route path='/Cart' element={<Cart/>}/>
      <Route path='/View/:id' element={<View/>}/>
      <Route path='/Wishlist' element={<Wishlist/>}/>
      <Route path='**' element={<Navigate to ={'/'}/>}/>

    </Routes>
    <Footer/>

    </>

  )
}

export default App
