import React, { useState, useEffect, useCallback } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./headerStyle.css"
import { Link, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../Redux/Fetures/Authslice";
import { jwtDecode } from "jwt-decode";
import { hideloading, showloading } from "../../Redux/AlertSclice";

function HeaderNav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkExp = useCallback( () => {
    const decodeToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodeToken > currentTime) {
      dispatch(clearToken());
      navigate("/singIn")
    } else {
      const remainingTime = (decodeToken.exp - currentTime) * 1000;
      setTimeout(() => {
        dispatch(clearToken());
        navigate("/singIn")

      }, remainingTime);
    }
  },[token, dispatch, navigate])


  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      checkExp();
    } else {
      setIsAuthenticated(false);
    }
  }, [token,checkExp]);
  const handleLogout = () => {
    const confirm = window.confirm("logout");
    if (!confirm) return;
    dispatch(showloading());
    dispatch(clearToken());
    setIsAuthenticated(false);
    dispatch(hideloading());
  };

  return (
    <Navbar expand="lg" className="mb-4 fs-5 fw-bold">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated ?
              (<>
                <Nav.Link as={Link} to="/" className="text-primary">Home</Nav.Link>
                <Nav.Link as={Link} to="/" className="text-primary">Contact us</Nav.Link>
                <NavDropdown title="Product" id="basic-nav-dropdown" className="custom-dropdown">
                  <NavDropdown.Item as={Link} to="/addProduct">Add Product</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/listProduct">List Product</NavDropdown.Item>
                  {/* <NavDropdown.Item as="button" onClick={ProductList}>List Product</NavDropdown.Item> */}

                  <NavDropdown.Item as={Link} to="/updateProduct">Update Product</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Users" id="basic-nav-dropdown" className="custom-dropdown">
                  <NavDropdown.Item as={Link} to="/createuser">Create User</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/showusers">Show Users</NavDropdown.Item>
                  {/* <NavDropdown.Item as="button" onClick={ProductList}>List Product</NavDropdown.Item> */}

                  {/* <NavDropdown.Item as={Link} to="/updateProduct">Update Product</NavDropdown.Item> */}
                </NavDropdown>
              </>)
              : ("")
            }
          </Nav>

          <Nav className="ms-auto">
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/registration" className="text-primary">Registration</Nav.Link>
                <Nav.Link as={Link} to="/singIn" className="text-primary">Login</Nav.Link>
              </>
            ) : (
              <Nav.Link as="button" onClick={handleLogout} className="text-primary">Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderNav;
