import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "./redux/actions/authActions.js";
import { useHistory } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [estado, setEstado] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/auth/login", {
        email: email,
        pass: pass,
      })
      .then((response) => {
        dispatch(login());
        setEstado("OK");
        localStorage.setItem("token", response.headers["auth-token"]);
        history.push("/home");
      })
      .catch((error) => {
        setEstado("Usuario o contrasena incorrecto");
      });
  };

  return (
    <Form>
      {estado !== "" && (
        <Alert variant={estado === "OK" ? "success" : "danger"}>{estado}</Alert>
      )}
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <div className="row">
          <div className="col-md-4 col-md-offset-3"></div>
          <Form.Control
            onChange={handleEmail}
            type="email"
            placeholder="Enter email"
          />
        </div>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <div className="row">
          <div className="col-md-4 col-md-offset-3"></div>
          <Form.Control
            onChange={handlePass}
            type="password"
            placeholder="Password"
          />
        </div>
      </Form.Group>

      <Button onClick={handleSubmit} variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
  );
}

export default Login;
