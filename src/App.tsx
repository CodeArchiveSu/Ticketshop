import { useRef, useEffect, useState } from 'react'

import Navigationbar from './components/Navigationbar';
import Mainpage from './pages/Mainpage';
import Login from './pages/Login';


import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'




function App() {

  const [concerts, setconcerts] = useState([])


  let latitude = null; // 예시 위도
  let longitude = null; // 예시 경도

  function accessToGeo(position: GeolocationPosition) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    fetchAPI(latitude, longitude)
  }

  function getUserLocation() {
    if (!navigator.geolocation) {
      throw "Geolocation is not supported";
    }
    navigator.geolocation.getCurrentPosition(accessToGeo);
  }


  useEffect(() => { getUserLocation() }, [])


  const fetchAPI = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events?locale=*&page=1&size=20&latlong=${latitude},${longitude}&apikey=${import.meta.env.VITE_API_KE}`);

      if (!response.ok) {
        throw new Error('no network response')
      }
      const data = await response.json();

      if (data._embedded && data._embedded.events) {
        setconcerts(data._embedded.events)
        console.log('concerts', data._embedded.events)
      }



    } catch (error) {
      console.log(error);
    }
  }

 


  return (
    <div>

      <Navigationbar />
      <Routes>
        <Route path='/' element={<Mainpage concerts={concerts} />} />
        <Route path='/detail/:id' element={<div>detail</div>} />
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Login/Register' element={<div>Register</div>}></Route>
      </Routes>     

    </div>
  )
}






export default App
