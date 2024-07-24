import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../App.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { Events } from "../@types/CustomTypes";

interface MainpageProps {
  concerts: Events[];
  search: any;
  fetchErorr: any;
  catchError: boolean;
  setSearch?: React.Dispatch<React.SetStateAction<any>>;
  // setconcerts: React.Dispatch<React.SetStateAction<Event[]>>;
}

function Mainpage({ concerts, search, fetchErorr, catchError }: MainpageProps) {
  let navigate = useNavigate();
  const [fade, setFade] = useState("");

  const filteredItems = concerts.filter((item: Events) => {
    return item.name.toLowerCase().includes(search);
  });

  useEffect(() => {
    if (catchError) {
      setFade("erorr");
    }
  });

  return (
    <>
      <div className={"imageSlider no-erorr " + fade}>
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
          {concerts.length > 0 &&
            concerts.slice(0, 3).map((item: Events) => (
              <div key={item.promoter.id} className="image-box">
                <SwiperSlide>
                  <img className="banner-image" src={item.images[0].url}></img>
                </SwiperSlide>
              </div>
            ))}
        </Swiper>

        <p className="neuigkeiten">NEUIGKEITEN</p>
        {/* <Fade direction={"left"}>{"이건 왼쪽에서"}</Fade> */}

        <div className="cards-container">
          {filteredItems &&
            filteredItems.map((item: Events, index: number) => (
              <div
                className="cards"
                key={item.id}
                onClick={() => navigate(`/detail/${index}`)}
                style={{
                  backgroundImage: `url(${item.images[1]?.url})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <div className="textBox">
                  <div>{item.name}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {catchError && <div className="Erorr-modal">Erorr: {fetchErorr}</div>}
    </>
  );
}

export default Mainpage;
