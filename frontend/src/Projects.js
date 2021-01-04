import React, { useEffect } from "react";
import "./styles.css";
import axios from "axios";
import Project from "./Project.js";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Container, Alert, Image } from "react-bootstrap";
import { fetchProjects } from "./redux/actions/projectActions";
import { fetchUsers } from "./redux/actions/userActions.js";
import { Link } from "react-router-dom";
import User from "./User";
import Button from "react-bootstrap/Button";
import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-identicon-sprites';

function Projects(props) {
  const isLogged = useSelector((store) => store.authReducer.isLogged);
  const user = User();
  const accountType = user ? user.type : undefined;

  const canCreate =
    accountType === "Manager" || accountType === "Analyst" ? true : false;
  const projects = useSelector((store) => store.projectReducer.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogged) {
      axios
        .get("http://localhost:8080/project", {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        })
        .then((data) => {
          dispatch(fetchProjects(data.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return isLogged ? (
    <Container fluid>
      {canCreate ? (
        <Link to="/newProject">
              <button class="icon-btn add-btn">
                <div class="add-icon"></div>
                  <div class="btn-txt">Agregar proyecto</div>
              </button>
        </Link>
      ) : (
        <></>
      )}
      <Row>
        {projects !== undefined ? (
          projects
            .filter(
              (p) =>
                p.manager_email === user.email ||
                p.analyst_email === user.email ||
                p.client_email === user.email
            )
            .map((v) => (
              
              <Col key={v.id} md={3}>
                
                <div class="card-container">
	<span class="pro">No Finalizado</span>
	<img class="round" src={
                  "https://avatars.dicebear.com/api/bottts/" +
                              v.client_email +
                              ".svg"
                } alt="user" />
	<h3><b>{"Proyecto #" + v.id}</b></h3>
	<p>{"Analista: " + v.analyst_email}</p>
	<p>{"Manager: " + v.manager_email}</p>
  <p>{"Cliente:  " + v.client_email}</p>
	<div class="buttons">
		<Button class="primary" as={Link} to={"/projects/" + v.id}>
			Ver
		</Button>

	</div>
	<div class="skills">
		<h6><b>Requerimientos</b></h6>
		<ul>
			<li>UI / UX</li>
			<li>Front End Development</li>
			<li>HTML</li>
			<li>CSS</li>
			<li>JavaScript</li>
			<li>React</li>
			<li>Node</li>
		</ul>
	</div>
</div>
              </Col>
            ))
        ) : (
          <Col></Col>
        )}
      </Row>
    </Container>
  ) : (
    <Alert variant="danger">Necesitas permisos para acceder.</Alert>
  );
}

export default Projects;
