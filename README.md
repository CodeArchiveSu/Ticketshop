
## 🎟️ Ticketmaster  
Ticketmaster is an e-commerce platform that sells event tickets based on user location, utilizing the Ticketmaster API and Geolocation services.
 
| 🖥️ |📱| 
| --- | --- | 
 | <img src="https://imgur.com/wh8t3uP.png" width="500"  /> | <img src="https://imgur.com/z0XoK6A.png" height="500" /> | 


## Features
- Register and Login
- Detail page

Detail Page Loading UI animation
```js
  let [fade, setFade] = useState("");

  useEffect(() => {
    setFade("end");
  }, []);

 <div className={"Detail-page start " + fade}>

CSS 
.start {
  opacity: 0;
}
.end {
  opacity: 1;
  transition: opacity 1s;
}
```


| 🖥️ |📱| 
| --- | --- | 
 | <img src="https://imgur.com/hKP6jwZ.png" width="500"  /> | <img src="https://imgur.com/7WQKC7k.png" height="500" /> | 

- Recent Seen


| 🖥️ |📱| 
| --- | --- | 
 | <img src="https://imgur.com/FZjQqVK.png" width="500"  /> | <img src="https://imgur.com/nyfhJib.png" height="500" /> | 

- shopping cart

| 🖥️ |📱| 
| --- | --- | 
 | <img src="https://imgur.com/FZjQqVK.png" width="500"  /> | <img src="https://imgur.com/nyfhJib.png" height="500" /> | 



## Technologies used
- Frontend
  - React (with TypeScript)
  - Redux Toolkit (for state management)
  - CSS

-Backend
 - Firebase
 - Firestore
