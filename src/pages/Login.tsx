import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { Users, setUser, userLogout } from "../store";
import { useDispatch, useSelector } from "react-redux";
import checkUserstatus from "../functions/checkUserstatus";
import firebase from "../config/firebaseConfig";

function Login() {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  type state = {
    userSlice: Users;
  };

  let LoggedinUser = useSelector((state: state) => {
    return state.userSlice;
  });

  console.log("LoggedinUser", LoggedinUser);

  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [erorrMessage, setErorrMessage] = useState("");
  const [erorrStatus, seterorrStatus] = useState(false);

  const saveId = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    let id1 = e.target.value;
    setUserID(id1);
  };

  const savePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    let id2 = e.target.value;
    setPassword(id2);
  };

  // type resultLogin = {
  //   Id:string;
  //   id: string;
  //   name?:string;
  // }

  const Login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(userID, password)
      .then((result) => {
        console.log("유저", result.user);

        const user = {
          Id: userID,
          id: result.user?.uid,
          name: result.user?.displayName,
        };

        dispatch(setUser(user));

        console.log();
      })
      .catch((error: any) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setErorrMessage(errorMessage);
        seterorrStatus(true);
        // ..
      });
  };

  useEffect(() => {
    checkUserstatus(dispatch);
  }, [dispatch]);

  const Logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(userLogout());
        checkUserstatus(dispatch);
      })
      .catch((error: any) => {
        // 로그아웃 실패 시 처리
        console.error("Logout failed: ", error);
      });
  };

  return (
    <>
      {LoggedinUser ? (
        <div className="loggedIn">
          <div>Erfolgreich Eingeloggt</div>
          <button onClick={() => Logout()}>Logout</button>
        </div>
      ) : (
        <div className="Login-page">
          <div className="Login-container">
            <div className="login ">Email address</div>
            <input type="email form-control" onChange={(e) => saveId(e)} />
            <div className="login">Password</div>
            <input
              type="password form-control"
              onChange={(e) => savePassword(e)}
            />
            <Error erorrMessage={erorrMessage} />
            <button
              type="button"
              className="btn btn-light"
              disabled={erorrStatus}
              onClick={() => {
                Login();
              }}
            >
              LOGIN
            </button>
            <button
              type="button"
              className="btn btn-light"
              // disabled={erorrStatus}
              onClick={() => navigate("/Login/Register")}
              // onChange={(e) => {
              //   이름저장(e);
              // }}
            >
              CREATE AN ACCOUNT
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Error({ erorrMessage }: { erorrMessage: string }) {
  if (erorrMessage !== "") {
    return <div className="register-error">{erorrMessage}</div>;
  }
}

export default Login;
