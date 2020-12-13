import React from "react";
import logo from "./images/logo.png";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home.js";
import Register from "./Register.js";
import Login from "./Login.js";
import Projects from "./Projects.js";
import CreateProject from "./CreateProject.js";
import ProjectView from "./ProjectView.js";
import CreateRequirement from "./CreateRequirement.js";
import EditRequirement from "./EditRequirement.js";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/actions/authActions.js";
import { Navbar, Nav } from "react-bootstrap";
import { Switch, Route, Link } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    dispatch(logout());
  };

  const isLogged = useSelector((store) => store.authReducer.isLogged);

  return (
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
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/projects">
              Projects
            </Nav.Link>
          </Nav>
          {isLogged ? (
            <Nav>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
              <Nav.Link as={Link} onClick={handleLogout} to="/home">
                Logout
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route exact path="/projects">
          <Projects />
        </Route>
        <Route exact path="/projects/:thisId">
          <ProjectView />
        </Route>
        <Route exact path="/projects/:idProject/newRequirement">
          <CreateRequirement />
        </Route>
        <Route exact path="/projects/:Project/:Requirement">
          <EditRequirement />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/newProject">
          <CreateProject />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
