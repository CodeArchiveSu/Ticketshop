import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Users } from "../store.tsx";

import { db } from "../config/firebaseConfig.ts";
import checkUserstatus from "../functions/checkUserstatus.tsx";
import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { Events } from "../@types/CustomTypes.ts";

type state = {
  userSlice: Users;
};

function Cart({ concerts }: { concerts: Events[] }) {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let LoggedinUser = useSelector((state: state) => {
    return state.userSlice;
  });

  type Product = {
    id: string;
    Count: number;
    ItemTitel: string;
    Price: string;
    UserId: string;
  };

  type newItems = {
    Image: string;
    Titel: string;
    userID: string;
    ItemId: string;
    timestamp: Timestamp;
  };

  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [recentItems, setRecentItems] = useState<newItems[]>([]);

  const showRecentSeenItems = () => {
    const unsubscribe = db
      .collection("RecentSeen")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const newItems: newItems[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as newItems;
          newItems.push(data);
        });
        console.log(newItems);
        const filteredbyUser = newItems.filter((item) => {
          return item.userID == LoggedinUser.id;
        });
        console.log(filteredbyUser);
        setRecentItems(filteredbyUser);
      });
    return unsubscribe;
  };

  const showCartItems = () => {
    const unsubscribe = db.collection("Cart").onSnapshot((snapshot) => {
      const products: Product[] = [];
      snapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() } as Product;
        products.push(data);
      });

      const filteredbyUser = products.filter((item) => {
        return item.UserId == LoggedinUser.id;
      });

      setCartItems(filteredbyUser);
      // console.log(filteredbyUser);
    });
    return unsubscribe;
  };

  useEffect(() => {
    checkUserstatus(dispatch);
  }, []);

  useEffect(() => {
    if (LoggedinUser) {
      showCartItems();
      showRecentSeenItems();
    }
  }, [LoggedinUser]);

  useEffect(() => {
    if (!LoggedinUser) {
      setCartItems([]);
    }
  }, [LoggedinUser]);

  const minusItem = (index: number) => {
    const docId = `${cartItems[index].id}`;
    const docRef = db.collection("Cart").doc(docId);
    docRef.get().then((doc) => {
      const data = doc.data() as Product;
      const currentCount = data.Count; // 현재의 수량이겠지
      const totalPrice = parseFloat(data.Price); // 현재 총 가격
      const unitPrice = totalPrice / currentCount; // 단가 계산
      const newCount = currentCount - 1;
      const newPrice = unitPrice * newCount;

      console.log("newPrice", newPrice);
      if (newCount <= 0) {
        docRef
          .delete()
          .then(() => {
            console.log("Item removed from cart");
          })
          .catch((error) => {
            console.error("Error removing item: ", error);
          });
      } else {
        docRef
          .update({
            Count: newCount,
            Price: newPrice,
          })
          .then(() => {
            console.log("Count updated successfully");
          })
          .catch((error) => {
            console.error("Error updating count: ", error);
          });
      }
    });
  };

  const plusItem = (index: number) => {
    const docId = `${cartItems[index].id}`;
    const docRef = db.collection("Cart").doc(docId);
    docRef.get().then((doc) => {
      const data = doc.data() as Product;
      const currentCount = data.Count; // 현재의 수량이겠지
      const totalPrice = parseFloat(data.Price); // 현재 총 가격
      const unitPrice = totalPrice / currentCount; // 단가 계산
      const newCount = currentCount + 1;
      const newPrice = newCount * unitPrice;

      docRef
        .update({
          Count: newCount,
          Price: newPrice,
        })
        .then(() => {
          console.log("Count plused successfully");
        })
        .catch((error) => {
          console.error("Error updating count: ", error);
        });
    });
  };

  const removeItem = (index: number) => {
    const docId = `${cartItems[index].id}`;
    const docRef = db.collection("Cart").doc(docId);
    docRef.get().then(() => {
      docRef
        .delete()
        .then(() => {
          console.log("successfullly removed");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const handleChangeIndex = (구멍: any) => {
    console.log("Clicked item index:", 구멍); // 디버깅 로그 추가
    console.log("Recent items:", recentItems); // 디버깅 로그 추가

    const findIndex = concerts.findIndex((item) => {
      return item.id == recentItems[구멍].ItemId;
    });
    navigate(`/detail/${findIndex}`);
    console.log(findIndex);
  };

  let [fade, setFade] = useState("");

  useEffect(() => {
    setFade("end");
  }, []);

  return (
    <>
      <div className={"Cart-container start " + fade}>
        {cartItems.length == 0 ? (
          <div className="warenkorb-message">Keine Artikel im Warenkorb</div>
        ) : (
          <div className="table">
            {cartItems.map((item, index): JSX.Element => {
              return (
                <div key={index} className="item-row">
                  <div>{item.ItemTitel}</div>
                  <div className="preis">{item.Price} Euro</div>
                  <div className="count">
                    <button
                      onClick={() => {
                        minusItem(index);
                      }}
                    >
                      -
                    </button>
                    {item.Count}
                    <button
                      onClick={() => {
                        plusItem(index);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        removeItem(index);
                      }}
                    >
                      Entfernen
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="recentwachted">Recently Viewed</div>
        <div className="cards-container">
          {LoggedinUser
            ? recentItems.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="cards"
                    style={{
                      backgroundImage: `url(${item.Image})`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                    onClick={() => handleChangeIndex(index)}
                  >
                    <div className="textBox">
                      <div>{item.Titel}</div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}

export default Cart;
