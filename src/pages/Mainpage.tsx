import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import '../App.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


type Event = {
    id: string;
    name: string;
    images: Image[];
    dates: Dates;
    promoter: Promoter;
}

interface Promoter {
    id: number;
}
interface Image {
    url: string;
}
interface Dates {
    start: Start
}

interface Start {
    localDate: string
}

function Mainpage({ concerts }: { concerts: Event[] }) {
    return (

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

                {concerts.length > 0 && concerts
                    .slice(0, 3)
                    .map((item, index) => (
                        <div key={concerts[index].promoter.id} className='image-box'>
                            <SwiperSlide><img className="banner-image" src={item.images[2]?.url}></img></SwiperSlide>
                        </div>))
                }
            </Swiper>

            <p className='neuigkeiten'>NEUIGKEITEN</p>

            <div className='cards-container'>

                {
                    concerts.map((item, index) => (
                        <div className='cards' key={concerts[index].id}>
                            <div className="textBox">
                                <div>{concerts[index]?.name}</div>
                                {/* <div>{concerts[index]?.dates.start.localDate}</div> */}
                                {/* <div className="button">Jetzt Ticket Sichern!</div> */}
                            </div>
                            <div className='concert-image-box'>
                                <img className='concert-image' src={item.images[1]?.url} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Mainpage