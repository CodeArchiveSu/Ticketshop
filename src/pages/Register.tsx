import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebase from "../config/firebaseConfig";

function Register() {
  let navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [Registerform, setRegisterform] = useState(true);
  const [erorrMessage, setErorrMessage] = useState("");
  const [erorrStatus, seterorrStatus] = useState(false);

  const saveDisplayName = (e: any) => {
    console.log(e.target.value);
    let id = e.target.value;
    setName(id);
  };

  const saveUserId = (e: any) => {
    console.log(e.target.value);
    let id = e.target.value;
    setUserID(id);
  };

  const savePassword = (e: any) => {
    console.log(e.target.value);
    let id = e.target.value;
    setPassword(id);
  };

  const 가입하기 = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userID, password)
      .then((result) => {
        console.log(result);
        console.log(result.user);
        navigate(-2);
        setRegisterform(false);
        if (result.user) {
          result.user.updateProfile({ displayName: name });
        }
      })
      .catch((error) => {
        console.log(error.message);
        setErorrMessage(error.message);
        seterorrStatus(true);
      });
  };

  return (
    <>
      {Registerform && (
        <div className="Login-page">
          <div className="Login-container">
            <div className="login">Name</div>
            <input
              type="text"
              onChange={(e) => {
                saveDisplayName(e);
              }}
            />
            <div className="login">Email address</div>
            <input
              type="email"
              onChange={(e) => {
                saveUserId(e);
              }}
            />
            <div className="login">Password</div>
            <input
              type="password"
              onChange={(e) => {
                savePassword(e);
              }}
            />
            <div className="login">Confirm Password</div>
            <input type="password" />
            <Error erorrMessage={erorrMessage} />
            <button
              type="button"
              className="btn btn-light"
              disabled={erorrStatus}
              onClick={() => {
                가입하기();
              }}
            >
              REGISTER
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

export default Register;
