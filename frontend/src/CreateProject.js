import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
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
  };

  return hasPermission ? (
    <form id="msform" onSubmit={handleSubmit}>
      {estado !== "" && (
        <Alert variant={estado === "Proyecto creado" ? "success" : "danger"}>
          {estado}
        </Alert>
      )}
      <ul id="progressbar">
        <li>Login</li>
        <li class="active">Proyectos</li>
        <li>Requerimientos</li>
      </ul>
      <fieldset>
        <h2 class="fs-title">Creación de proyectos</h2>
        <h3 class="fs-subtitle">Asegúrese de rellenar los campos</h3>
        <input
          type="date"
          name="date"
          onChange={handleDeliver}
          placeholder="Enter estimated deliver date"
          required
        ></input>
        <div class="form-group" float="center">
          <input
            type="text"
            name="manager_sb"
            onChange={handleManager}
            placeholder="Select Manager"
            list="managers"
            required
            as="select"
          ></input>
          <datalist id="managers">
            <select name="managers">
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
            </select>
          </datalist>
        </div>
        <div class="form-group" float="center">
          <input
            type="text"
            name="analyst_sb"
            onChange={handleAnalyst}
            placeholder="Select Analyst"
            list="analysts"
            required
            as="select"
          ></input>
          <datalist id="analysts">
            <select name="analysts">
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
            </select>
          </datalist>
        </div>
        <div class="form-group" float="center">
          <input
            type="text"
            name="client_sb"
            onChange={handleClient}
            placeholder="Select Client"
            list="clients"
            required
            as="select"
          ></input>
          <datalist id="clients">
            <select name="clients">
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
            </select>
          </datalist>
        </div>
        <button class="next action-button" onclick="thanks()">
          Submit
        </button>
        <button
          onClick={handleBack}
          type="back"
          className="next action-button-2"
        >
          Cancelar
        </button>
      </fieldset>
    </form>
  ) : (
    <Alert variant="danger">Acceso Restringido</Alert>
  );
}

export default CreateProject;
