import React, { useEffect } from "react";
import "./styles.css";
import axios from "axios";
import Project from "./Project.js";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Container, Alert} from "react-bootstrap";
import { fetchProjects } from "./redux/actions/projectActions";
import { Link } from "react-router-dom";
import User from "./User";

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
  },[]);

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
                <Project id={v.id} flag={canCreate} />
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
