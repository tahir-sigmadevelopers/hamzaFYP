import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./components/Home/Home"
import Login from "./components/Authentication/Login"
import Signup from "./components/Authentication/Signup"
import Listings from "./components/Listings/Listings"
import ListingDetails from "./components/Listings/ListingDetails"
import { Toaster } from "react-hot-toast"
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Listings />} />
          <Route path="/properties/details" element={<ListingDetails />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Login />} />

        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App