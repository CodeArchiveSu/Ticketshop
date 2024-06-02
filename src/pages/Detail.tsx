import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Events } from "../@types/CustomTypes.ts";
import { useDispatch, useSelector } from "react-redux";
import { UserItem, Users, addItem } from "../store.tsx";
import { db } from "../config/firebaseConfig.ts";
import { collection, getDocs, serverTimestamp } from "firebase/firestore";
import checkUserstatus from "../functions/checkUserstatus.tsx";

type QuizParams = {
  id: string;
};

function Detail({ concerts }: { concerts: Events[] }) {
  let { id } = useParams<QuizParams>();
  const eventId = parseInt(id);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  console.log(concerts);

  const addRecent = () => {
    const itemTitle = `${concerts[eventId].name}`;
    const itemImage = `${concerts[eventId].images[0].url}`;
    const userId = `${LoggedinUser.id}`;
    const ItemId = `${concerts[eventId].id}`;
    db.collection("RecentSeen")
      .where("Titel", "==", itemTitle)
      .where("userID", "==", userId)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          db.collection("RecentSeen")
            .add({
              Image: itemImage,
              Titel: itemTitle,
              userID: userId,
              ItemId: ItemId,
              timestamp: serverTimestamp(),
            })
            .then(() => {
              console.log("Item added successfully");
            })
            .catch((error) => {
              console.log("Error adding item: ", error);
            });
        } else {
          console.log("Item already exists in RecentSeen");
        }
      })
      .catch((error) => {
        console.log("Error adding item: ", error);
      });
  };

  type state = {
    userSlice: Users;
  };

  let LoggedinUser = useSelector((state: state) => {
    return state.userSlice;
  });

  useEffect(() => {
    if (LoggedinUser) {
      addRecent();
    }
  }, []);

  useEffect(() => {
    checkUserstatus(dispatch);
  }, []);

  //페이지 들어오면

  const addItemCart = () => {
    const itemTitle = `${concerts[eventId].name}`;
    const userId = `${LoggedinUser.id}`;
    db.collection("Cart")
      .where("ItemTitel", "==", itemTitle)
      .where("UserId", "==", userId)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          snapshot.forEach((doc) => {
            db.collection("Cart")
              .doc(doc.id)
              .update({
                Count: doc.data().Count + 1,
              })
              .then(() => {
                console.log("Count updated successfully");
                navigate("/Cart");
              })
              .catch((error) => {
                console.log("Error updating count: ", error);
              });
          });
        } else {
          db.collection("Cart")
            .add({
              Count: 1,
              ItemTitel: itemTitle,
              Price: `${concerts[eventId].priceRanges[0].max}`,
              UserId: userId,
            })
            .then(() => {
              console.log("Item added successfully");
              navigate("/Cart");
            })
            .catch((error) => {
              console.log("Error adding item: ", error);
            });
        }
      });
  };

  let [fade, setFade] = useState("");

  useEffect(() => {
    setFade("end");
  }, []);

  return (
    <div className={"Detail-page start " + fade}>
      <div className="detailPageDisplay">
        <div className="detail-image">
          <img src={concerts[eventId].images[0].url} />
        </div>
        <div className="detail-info">
          <div> {concerts[eventId].name}</div>
          <div className="detail-box">
            <p className="detail-title">DATUM</p>
            <div className="detail">
              {concerts[eventId].dates.start.localDate}
            </div>
            <p className="detail-title">ORT</p>
            <div className="detail">
              {concerts[eventId]._embedded.venues[0].name}
            </div>
            <div>{concerts[eventId].priceRanges[0].max}EURO</div>
          </div>
          <button
            className="Cart-button"
            onClick={() => {
              if (LoggedinUser) {
                addItemCart();
                // navigate(`/Cart`);
              } else {
                navigate(`/Login`);
              }
            }}
          >
            TICKES SICHERN
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
