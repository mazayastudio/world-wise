import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Homepage from "./pages/Homepage.jsx";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";

function App() {
  const [cities, setCitites] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const BASE_URL = "http://localhost:8000"

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCitites(data)
      } catch {
        alert("Something went wrong")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities();
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path='login' element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path='cities' element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path='countries' element={<CountryList cities={cities} isLoading={isLoading} />} />
          <Route path='form' element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App