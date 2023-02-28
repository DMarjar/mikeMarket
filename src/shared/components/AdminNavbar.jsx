import { Link } from 'react-router-dom';
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';

export const AdminNavbar = () => {
  return (
    <Navbar bg="light" variant="light" sticky='top'>
        <Container>
          <Navbar.Brand href="#home">LOGO</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/">Products</Link>
            <Link to="/category">Categories</Link>
            <Link to="/subcategory">Subcategories</Link>
          </Nav>
          <Button variant='primary'>Log Out</Button>
        </Container>
      </Navbar>
  )
}
