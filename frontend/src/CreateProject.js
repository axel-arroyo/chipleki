import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import User from "./User";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "./redux/actions/userActions";

function CreateProject(props) {
  const user = User();
  const accountType = user ? user.type : undefined;
  const hasPermission =
    accountType === "Manager" || accountType === "Analyst" ? true : false;
  const [deliver, setDeliver] = useState("");
  const [client, setClient] = useState("");
  const [analyst, setAnalyst] = useState("");
  const [manager, setManager] = useState("");
  const [estado, setEstado] = useState("");
  const [validated, setValidated] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/", {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((data) => {
        dispatch(fetchUsers(data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const users = useSelector((store) => store.userReducer.users);

  const handleDeliver = (e) => {
    setDeliver(e.target.value);
  };

  const handleClient = (e) => {
    setClient(e.target.value);
  };

  const handleAnalyst = (e) => {
    setAnalyst(e.target.value);
  };

  const handleManager = (e) => {
    setManager(e.target.value);
  };

  const handleBack = (e) => {
    history.push("/projects/");
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      axios
        .post(
          "http://localhost:8080/project",
          {
            deliver_date: deliver,
            client_email: client,
            analyst_email: analyst,
            manager_email: manager,
          },
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        )
        .then((data) => {
          setEstado("Proyecto creado");
          history.push("/projects");
        })
        .catch((error) => {
          setEstado("Error creando el proyecto");
        });
    }
    setValidated(true);
  };

  return hasPermission ? (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {estado !== "" && (
        <Alert variant={estado === "Proyecto creado" ? "success" : "danger"}>
          {estado}
        </Alert>
      )}
      <Form.Group>
        <Form.Label>Deliver date</Form.Label>
        <div className="row">
          <div className="col-md-4 col-md-offset-3"></div>
          <Form.Control onChange={handleDeliver} type="date" required />
        </div>
      </Form.Group>

      <Form.Group>
        <Form.Label>Manager</Form.Label>
        <div className="row">
          <div className="col-md-4 col-md-offset-3"></div>
          <Form.Control required onChange={handleManager} as="select">
            <option value=""></option>
            {users ? (
              users
                .filter((u) => u.type === "Manager")
                .map((u) => (
                  <option key={u.email} value={u.email}>
                    {u.email}
                  </option>
                ))
            ) : (
              <></>
            )}
          </Form.Control>
        </div>
      </Form.Group>

      <Form.Group>
        <Form.Label>Analyst</Form.Label>
        <div className="row">
          <div className="col-md-4 col-md-offset-3"></div>
          <Form.Control required onChange={handleAnalyst} as="select">
            <option value=""></option>
            {users ? (
              users
                .filter((u) => u.type === "Analyst")
                .map((u) => (
                  <option key={u.email} value={u.email}>
                    {u.email}
                  </option>
                ))
            ) : (
              <></>
            )}
          </Form.Control>
        </div>
      </Form.Group>

      <Form.Group>
        <Form.Label>Client</Form.Label>
        <div className="row">
          <div className="col-md-4 col-md-offset-3"></div>
          <Form.Control required onChange={handleClient} as="select">
            <option value=""></option>
            {users ? (
              users
                .filter((u) => u.type === "Client")
                .map((u) => (
                  <option key={u.email} value={u.email}>
                    {u.email}
                  </option>
                ))
            ) : (
              <></>
            )}
          </Form.Control>
        </div>
      </Form.Group>

      <Button variant="primary mr-3" type="submit">
        Enviar
      </Button>

      <Button onClick={handleBack} variant="danger " type="back">
        Cancelar
      </Button>
    </Form>
  ) : (
    <Alert variant="danger">Acceso Restringido</Alert>
  );
}

export default CreateProject;
