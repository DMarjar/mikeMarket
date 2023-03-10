import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../modules/auth/authContext";

export const AdminNavbar = () => {
  const { dispatch } = useContext(AuthContext); // dispatch is a function that will be used to update the state
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth", { replace: true }); // replace: true will remove the current page from the history stack
  };

  return (
    <Navbar bg="light" variant="light" sticky="top">
      <Container>
        <Navbar.Brand href="#home">LOGO</Navbar.Brand>
        <Nav className="me-auto">
          <Link to="/" className="ms-1 nav-link">
            Products
          </Link>
          <Link to="/category" className="ms-1 nav-link">
            Categories
          </Link>
          <Link to="/subcategory" className="ms-1 nav-link">
            Subcategories
          </Link>
        </Nav>
        <Button variant="primary" onClick={handleLogout}>
          Log Out
        </Button>
      </Container>
    </Navbar>
  );
};
