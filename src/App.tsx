import { useRef,useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './App.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'


import { Autoplay, Pagination, Navigation } from 'swiper/modules';


function App() {

  type Event = {
    id: string;
    name: string;
    images: Image[];
    dates:Dates;
    promoter: Promoter;
  }

  interface Promoter {
    id: number;
  }
  interface Image {
    url: string;
  }
  interface Dates{
    start: Start
  }

  interface Start {
    localDate:string
  }

  let [concerts,setconcerts] = useState<Event[]>([])
  let [banner,setbanner] = useState<Event[]>([])



  
  let latitude = null; // 예시 위도
  let longitude = null; // 예시 경도

function accessToGeo (position: GeolocationPosition) {
      latitude = position.coords.latitude;
      longitude= position.coords.longitude;
  fetchAPI(latitude,longitude)
}

function getUserLocation() {
  if (!navigator.geolocation) {
      throw "Geolocation is not supported";
  }
  navigator.geolocation.getCurrentPosition(accessToGeo);
}


useEffect(()=>{getUserLocation()},[])


  const fetchAPI =async (latitude:number, longitude:number)=>{
    try {
      const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events?locale=*&page=1&size=20&latlong=${latitude},${longitude}&apikey=${import.meta.env.VITE_API_KE}`);

      if(!response.ok){
        throw new Error('no network response')
      }
      const data = await response.json();

      if(data._embedded && data._embedded.events){
         setconcerts(data._embedded.events)
         console.log('concerts',data._embedded.events)
      }


 
  } catch (error) {
    console.log(error);
  }
}

console.log(banner)



let navigate = useNavigate()
  

  return (
    <div>

   
    <Navbar  className='nav-container'>
        <Container>
        <Navbar.Brand href="#home">TICKEMASTERS</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link onClick={() => navigate('/')} className='link'> HOME </Nav.Link>
              <Nav.Link onClick={() => navigate('/detail')} className='link'>POP</Nav.Link>
              <Nav.Link onClick={() => navigate('/event')} className='link'>DANCE</Nav.Link>
              <Nav.Link onClick={() => navigate('/event')} className='link'>CLASSIC</Nav.Link>
              <Nav.Link onClick={() => navigate('/event')} className='link'>SPORTS</Nav.Link>
              <input className='input'></input>
              <Nav.Link onClick={() => navigate('/event')} className='link'>ANMELDEN</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={App}/>
      </Routes>

      <div className='imageSlider'>
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
     
      {concerts.length>0&&concerts
      .slice(0,3)
      .map((item,index)=>(
        <div key={concerts[index].promoter.id} className='image-box'>
        <SwiperSlide><img className="banner-image" src={item.images[2]?.url}></img></SwiperSlide>
       </div>)) 
     }
      </Swiper>
      </div> 
      {/* 이미지슬라이더끝나는디브 */}
      <p className='neuigkeiten'>NEUIGKEITEN</p>
      
      <div className='cards-container'>
   
    {
      concerts.map((item, index)=>(
        <div className='cards' key={concerts[index].id}>
          <div className="textBox">
          <div>{concerts[index]?.name}</div>
          {/* <div>{concerts[index]?.dates.start.localDate}</div> */}
          {/* <div className="button">Jetzt Ticket Sichern!</div> */}
          </div>
          <div className='concert-image-box'>
          <img className='concert-image' src={item.images[1]?.url}/>
          </div>
          </div>
      ))
    }
    </div>
    
    </div>
  )
}


 



export default App
