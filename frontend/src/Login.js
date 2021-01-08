import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
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
        localStorage.setItem("token", response.data);
        dispatch(login());
        setEstado("OK");
        history.push("/home");
      })
      .catch((error) => {
        setEstado("Usuario o contrasena incorrecto");
      });
  };

  return (
    <div id="login-box">
      <div class="left">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {estado !== "" && (
            <Alert variant={estado === "OK" ? "success" : "danger"}>
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
              type="password"
              name="pass"
              onChange={handlePass}
              placeholder="Enter password"
              required
            ></input>
          </div>
          <div class="form-group"></div>
          <input type="submit" name="login_submit" value="Ingresar" />
        </form>
      </div>

      <div class="right">
        <span class="loginwith"></span>
      </div>
    </div>
  );
}

export default Login;
