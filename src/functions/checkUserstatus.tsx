import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { setUser } from "../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const checkUserstatus = (dispatch: any) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user", user);
      const userData = {
        id: user.uid,
        email: user.email,
        name: user.displayName,
      };
      dispatch(setUser(userData));
    } else {
      console.log("로그아웃");
    }
  });
};

export default checkUserstatus;
