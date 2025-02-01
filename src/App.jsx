import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./components/Home/Home"
import Login from "./components/Authentication/Login"
import Signup from "./components/Authentication/Signup"
import Listings from "./components/Listings/Listings"
import ListingDetails from "./components/Listings/ListingDetails"
import { Toaster } from "react-hot-toast"
import Contact from "./components/Contact"
import HomePage from "./admin/Homepage"
import AddProperty from "./admin/AddProperty"
import AllProperties from "./admin/AllProperties"
import EditProperty from "./admin/EditProperty"
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/properties" element={<Listings />} />
          <Route path="/properties/details" element={<ListingDetails />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/admin/dashboard" element={<HomePage />} />
          <Route path="/admin/add-property" element={<AddProperty />} />
          <Route path="/admin/edit-property/:id" element={<EditProperty />} />
          <Route path="/admin/properties" element={<AllProperties />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App