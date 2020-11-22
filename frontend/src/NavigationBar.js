import logo from './logo.png';
import React, { useState, useEffect } from "react";
import { Navbar, Nav} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import { logout } from './redux/actions/authActions.js';
import { useSelector, useDispatch } from 'react-redux';
import Register from "./Register.js";
import Login from "./Login.js";
import jwt_decode from 'jwt-decode';

function NavigationBar(props){

    const dispatch = useDispatch();

    const handleLogout = (e) => {
        dispatch(logout());
    }

    const isLogged = useSelector((store) => store.authReducer.isLogged);
    var canRegister = false;
    useEffect(() => {
        if (isLogged){
            const user = jwt_decode(localStorage.getItem('token'));
            const accountType = user.type;
            canRegister = accountType === 'Manager' || accountType === 'Analyst' ? true : false;
        } 
    });

    

    return(
        <Router>
            <div className="App">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>
            <img
            src={logo}
            width="70"
            height="50"
            className="d-inline-block align-top"
            alt="logo"
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            </Nav>
        {isLogged ? 
            canRegister ? 
                <Nav>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} onClick={handleLogout} to="/home">Logout</Nav.Link> 
                </Nav>
            :
                <Nav>
                <Nav.Link as={Link} onClick={handleLogout} to="/home">Logout</Nav.Link> 
                </Nav>
            : 
            <Nav>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
        }
        </Navbar.Collapse>    
        </Navbar>

        <Switch>
        <Route path="/login">
        <Login />
        </Route>
        <Route path="/register">
        <Register />
        </Route>
        <Route path="/">
        <div></div>
        </Route>
        </Switch>

        </div>
        </Router>

    );
}

export default NavigationBar;