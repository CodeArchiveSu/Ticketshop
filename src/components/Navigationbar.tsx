import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Users, setUser, userLogout } from "../store";
import firebase, { auth } from "../config/firebaseConfig"; // Firebase 초기화 코드 포함 파일에서 import
import { Events } from "../@types/CustomTypes";
import { onAuthStateChanged } from "firebase/auth";
import checkUserstatus from "../functions/checkUserstatus";

interface MainpageProps {
  concerts: Events[];
  search: any;
  setSearch: React.Dispatch<React.SetStateAction<any>>;
  // setconcerts: React.Dispatch<React.SetStateAction<Event[]>>;
}

function Navigationbar({ concerts, search, setSearch }: MainpageProps) {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };

  type state = {
    userSlice: Users;
  };

  let LoggedinUser = useSelector((state: state) => {
    return state.userSlice;
  });

  useEffect(() => {
    checkUserstatus(dispatch);
  }, [dispatch]);

  const 로그아웃 = () => {
    firebase.auth().signOut();
    dispatch(userLogout());
    console.log("로그아웃됨");
  };

  return (
    <>
      <Navbar className="nav-container">
        <Container className="link-container ">
          <button className="responsive-nav">=</button>
          <Navbar.Brand href="#home" className="brand">
            TICKEMASTERS
          </Navbar.Brand>
          <input
            className="input-res"
            onChange={(e) => {
              handleChange(e);
            }}
          ></input>

          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")} className="link">
              {" "}
              HOME{" "}
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/")} className="link">
              POP
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/")} className="link">
              DANCE
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/")} className="link">
              CLASSIC
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/")} className="link">
              SPORTS
            </Nav.Link>
            <input
              className="input"
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>
            {LoggedinUser ? (
              <Nav.Link
                onClick={() => {
                  로그아웃();
                }}
                className="link"
              >
                Loggout
              </Nav.Link>
            ) : (
              <Nav.Link onClick={() => navigate("/Login")} className="link">
                ANMELDEN
              </Nav.Link>
            )}

            <Nav.Link onClick={() => navigate("/Cart")} className="link">
              CART
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigationbar;
