import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
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
    <div id="login-box">
      <div class="left">
        <h1>Registro</h1>
        <form noValidate validated={validated} onSubmit={handleSubmit}>
          {estado !== "" && (
            <Alert
              variant={estado === "Usuario registrado" ? "success" : "danger"}
            >
              {estado}
            </Alert>
          )}
          <div class="form-group">
            <input
              type="text"
              name="email"
              onChange={handleEmail}
              placeholder="Enter email"
              required
            ></input>
          </div>
          <div class="form-group">
            <input
              type="text"
              name="name"
              onChange={handleName}
              placeholder="Enter name"
              required
            ></input>
          </div>
          <div class="form-group"></div>
          <input
            type="text"
            onChange={handleType}
            list="types"
            placeholder="Select user type"
          />
          <datalist id="types">
            <select name="{NameOfYourField}">
              <option>Manager</option>
              <option>Analyst</option>
              <option>Client</option>
              <option>Developer</option>
              ...
            </select>
          </datalist>

          <div class="form-group">
            <input
              type="password"
              name="pass"
              onChange={handlePass}
              placeholder="Enter password"
              required
            ></input>
          </div>

          <input type="submit" name="signup_submit" value="Registrar" />
        </form>
      </div>

      <div class="right"></div>
    </div>
  ) : (
    <Alert variant="danger">Acceso Restringido</Alert>
  );
}

export default Register;
