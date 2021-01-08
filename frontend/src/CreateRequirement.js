import React, { useState } from "react";
import axios from "axios";
import {Alert} from "react-bootstrap";
import User from "./User";
import { useHistory, useParams } from "react-router-dom";

function CreateRequirement(props) {
  const user = User();
  const accountType = user ? user.type : undefined;
  const hasPermission =
    accountType === "Manager" || accountType === "Analyst" ? true : false;

  const { idProject } = useParams();
  const history = useHistory();

  const [name, setName] = useState(null);
  const [desc, setDesc] = useState(null);
  const [estimated, setEstimated] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [priority, setPriority] = useState("Alta");
  const [estado, setEstado] = useState("");
  const [setValidated] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleEstimated = (e) => {
    setEstimated(e.target.value);
  };

  const handleDeadline = (e) => {
    setDeadline(e.target.value);
  };

  const handlePriority = (e) => {
    setPriority(e.target.value);
  };

  const handleBack = (e) => {
    history.push("/projects/" + idProject);
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
          "http://localhost:8080/requirement",
          {
            name: name,
            description: desc,
            finished: false,
            estimated_time: estimated,
            deadline: deadline,
            id_project: parseInt(idProject),
            priority: priority,
          },
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        )
        .then((data) => {
          setEstado("Requerimiento creado");
          history.push("/projects/" + idProject);
        })
        .catch((error) => {
          setEstado("Error creando el requerimiento");
        });
    }
    setValidated(true);
  };

  return hasPermission ? (
    <form id="msform" onSubmit={handleSubmit}  >

      {estado !== "" && (
        <Alert
          variant={estado === "Requerimiento creado" ? "success" : "danger"}
        >
          {estado}
        </Alert>
      )}
      <ul id="progressbar">
    <li>Login</li>
    <li>Proyectos</li>
    <li class="active">Requerimientos</li>
  </ul>
  <fieldset>
    <h2 class="fs-title">Creación de requerimientos</h2>
    <h3 class="fs-subtitle">Asegúrese de rellenar los campos</h3>
    <input type="text" name="name" onChange={handleName} placeholder="Enter name" required></input>
    <input type="description" name="desc" onChange={handleDesc} placeholder="Enter description" required></input>
    <input type="text" name="time" onChange={handleEstimated} placeholder="Enter estimated time"></input>
    <input type="date" name="deadline" onChange={handleDeadline}></input>
    <input type="text" onChange={handlePriority} list="priorities" placeholder="Enter priority" />
    <datalist id="priorities">
    <select name="{NameOfYourField}">
      <option value="Alta">Alta</option>
      <option value="Media">Media</option>
      <option value="Baja">Baja</option>
        ...
    </select>
    </datalist>
    <button class="next action-button" onclick="thanks()">Submit</button>
    <button onClick={handleBack} type="back" className="next action-button-2">
        Cancelar
      </button>
  </fieldset>
  
</form>
  ) : (
    <Alert variant="danger">Acceso Restringido</Alert>
  );
}

export default CreateRequirement;
