import React from "react";
import { Navbar,Nav} from "react-bootstrap";

function NavbarCustom() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Drivy Frontend test</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/cars">Tous les véhicules</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}


export default NavbarCustom;