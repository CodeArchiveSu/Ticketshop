import { useEffect, useState } from "react";

import Navigationbar from "./components/Navigationbar";
import Mainpage from "./pages/Mainpage";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import Register from "./pages/Register";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Routes, Route } from "react-router-dom";
import { Events } from "./@types/CustomTypes";
import Cart from "./pages/Cart";

function App() {
  const [concerts, setconcerts] = useState([]);
  const [search, setSearch] = useState("");
  const [fetchErorr, setFetchErorr] = useState("");
  const [catchError, setCatchError] = useState(false);

  let latitude = null; // 예시 위도
  let longitude = null; // 예시 경도

  function accessToGeo(position: GeolocationPosition) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    // if(latitude){

    // }
    fetchAPI(latitude, longitude);
  }

  function getUserLocation() {
    if (!navigator.geolocation) {
      throw "Geolocation is not supported";
    }
    navigator.geolocation.getCurrentPosition(accessToGeo);
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  const fetchAPI = async (latitude: number, longitude: number) => {
    try {
      // const response = await fetch(
      //   `https://app.ticketmaster.com/discovery/v2/events?locale=*&page=1&size=20&latlong=${latitude},${longitude}&apikey=${
      //     import.meta.env.VITE_API_KE
      //   }`
      // );
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events?locale=*&page=1&size=20&latlong=${latitude},${longitude}&apikey=${
          import.meta.env.VITE_API_KEY
        }`
      );
      if (!response.ok) {
        throw new Error("no network response");
      }
      const data = await response.json();
      console.log(data._embedded.events);

      if (data._embedded && data._embedded.events) {
        setconcerts(data._embedded.events);

        const events = data._embedded.events.map((event: Events) => {
          const filteredImages = event.images.filter(
            (image) => image.width === 1024
          );
          return { ...event, images: filteredImages };
        });

        setconcerts(events);
      }
    } catch (error: any) {
      console.log(error.message);
      setFetchErorr(error.message);
      setCatchError(true);
    }
  };

  return (
    <div>
      <Navigationbar
        concerts={concerts}
        // setconcerts={setconcerts}
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Mainpage
              concerts={concerts}
              search={search}
              fetchErorr={fetchErorr}
              catchError={catchError}
            />
          }
        />
        <Route path="/detail/:id" element={<Detail concerts={concerts} />} />
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Login/Register" element={<Register />}></Route>
        <Route path="/Cart" element={<Cart concerts={concerts} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
