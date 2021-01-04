import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import User from "./User";

function Register(props) {
  const user = User();
  const accountType = user ? user.type : undefined;
  const hasPermission =
    accountType === "Manager" || accountType === "Analyst" ? true : false;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState(null);
  const [type, setType] = useState("");
  const [estado, setEstado] = useState("");
  const [validated, setValidated] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const handleType = (e) => {
    setType(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
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
          "http://localhost:8080/auth/register",
          {
            email: email,
            pass: pass,
            name: name,
            type: type,
          },
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        )
        .then((data) => {
          setEstado("Usuario registrado");
        })
        .catch((error) => {
          setEstado("El correo ya está en uso");
        });
    }
    setValidated(true);
  };

  return hasPermission ? (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {estado !== "" && (
        <Alert variant={estado === "Usuario registrado" ? "success" : "danger"}>
          {estado}
        </Alert>
      )}
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <div className="row">
          <div className="col-md-4 col-md-offset-3"></div>
          <Form.Control
            required
            onChange={handleEmail}
            type="email"
            placeholder="Enter email"
          />
        </div>
      </Form.Group>

      <Form.Group>
        <Form.Label>Name</Form.Label>
        <div className="row">
          <div className="col-md-4 col-md-offset-3"></div>
          <Form.Control
            onChange={handleName}
            type="text"
            placeholder="Enter name"
          />
        </div>
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Account Type</Form.Label>
        <div className="row">
          <div className="col-md-4 col-md-offset-3"></div>
          <Form.Control required onChange={handleType} as="select">
            <option value=""></option>
            {accountType === "Manager" ? (
              <>
                <option value="Manager">Manager</option>
                <option value="Analyst">Analyst</option>
                <option value="Developer">Developer</option>
                <option value="Client">Client</option>
              </>
            ) : (
              <option value="Client">Client</option>
            )}
          </Form.Control>
        </div>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <div className="row">
          <div className="col-md-4 col-md-offset-3"></div>
          <Form.Control
            required
            onChange={handlePass}
            type="password"
            placeholder="Password"
          />
        </div>
      </Form.Group>

      <Button variant="primary" type="submit">
        Registrar
      </Button>
    </Form>
  ) : (
    <Alert variant="danger">Acceso Restringido</Alert>
  );
}

export default Register;
