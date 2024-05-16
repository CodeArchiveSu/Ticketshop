import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'



function Navigationbar() {
    let navigate = useNavigate()

    
  return (
    <Navbar className='nav-container'>
    <Container>
      <Navbar.Brand href="#home">TICKEMASTERS</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link onClick={() => navigate('/')} className='link'> HOME </Nav.Link>
        <Nav.Link onClick={() => navigate('/')} className='link'>POP</Nav.Link>
        <Nav.Link onClick={() => navigate('/')} className='link'>DANCE</Nav.Link>
        <Nav.Link onClick={() => navigate('/')} className='link'>CLASSIC</Nav.Link>
        <Nav.Link onClick={() => navigate('/')} className='link'>SPORTS</Nav.Link>
        <input className='input'></input>
        <Nav.Link onClick={() => navigate('/Login')} className='link'>ANMELDEN</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  )
}

export default Navigationbar