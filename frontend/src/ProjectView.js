import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Container, Alert, Form, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { fetchRequirements } from "./redux/actions/requirementActions";
import Requirement from "./Requirement.js";
import User from "./User";
import CommentSection from "./CommentSection";

function ProjectView(props) {
  const user = User();
  const accountType = user ? user.type : undefined;
  const canCreate =
    accountType === "Manager" || accountType === "Analyst" ? true : false;
  const isLogged = useSelector((store) => store.authReducer.isLogged);
  const { thisId } = useParams();
  const dispatch = useDispatch();
  const requirements = useSelector(
    (store) => store.requirementReducer.requirements
  );

  useEffect(() => {
    if (isLogged) {
      axios
        .get("http://localhost:8080/requirement", {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          dispatch(fetchRequirements(response.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return isLogged ? (
    <Container fluid>
      {canCreate ? (
        <Link to={"/projects/" + thisId + "/newRequirement"}>
         <button class="icon-btn add-btn">
                <div class="add-icon"></div>
                  <div class="btn-txt">Agregar requerimiento</div>
              </button>
        </Link>
      ) : (
        <></>
      )}
      <Row>
        {requirements ? (
          requirements
            .filter((r) => r.id_project == thisId)
            .map((v) => (
              <Col key={v.id} md={3}>
                <Requirement id={v.id} flag={canCreate} />
              </Col>
            ))
        ) : (
          <Col></Col>
        )}
      </Row>
      <CommentSection project={thisId} />
    </Container>
  ) : (
    <Alert variant="danger">Necesitas permisos para acceder.</Alert>
  );
}

export default ProjectView;
