import React from "react";
import logo from "../img/logo.jpg";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import home from "../img/icon_home.png"
import ticket from "../img/icon_ticket.png"
import geren from "../img/icon_engine.png"
import hist from "../img/icon_historico.png"


const NavBar = () => {
  return (
    <>
      <Navbar fixed="top" variant="dark" className="shadow">
        
        <Container>
          <Navbar.Brand href="/">
            <div className="logo">
              <img  className="logoEt"src={logo} alt="Logo" height={80} width={200}></img>
            </div>
          </Navbar.Brand>
          <Nav className="nav-links">

            <Nav.Link href="/">
              <div>
                <img className="img-home" src={home} alt="Home"></img>
              </div>  
              Home
            </Nav.Link>

            <Nav.Link href="/Bilhetes">
              <div>
                <img className="img-bil" src={ticket} alt="Tickets"></img>
              </div>  
              Bilhetes
            </Nav.Link>
            
            <Nav.Link href="/Gerenciamento">
              <div>
                <img className="img-hist" src={hist} alt="Histórico"></img>
              </div>
              Histórico
            </Nav.Link>
            
            <Nav.Link href="/use">
              <div>
                <img className="img-ger" src={geren} alt="Gerenciamento"></img>
              </div>
              Sobre</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar