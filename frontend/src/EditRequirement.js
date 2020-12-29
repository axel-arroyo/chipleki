import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import User from "./User";

function EditRequirement(props) {
  const user = User();
  const accountType = user ? user.type : undefined;
  const hasPermission =
    accountType === "Manager" || accountType === "Analyst" ? true : false;
  const { Project, Requirement } = useParams();
  const history = useHistory();

  const requirements = useSelector(
    (store) => store.requirementReducer.requirements
  );
  const requirement = requirements.find((req) => req.id == Requirement);
  
  const [name, setName] = useState(requirement.name);
  console.log(name);
  const [desc, setDesc] = useState(requirement.description);
  const [estimated, setEstimated] = useState(requirement.estimated_time);
  const [deadline, setDeadline] = useState(requirement.deadline);
  const [priority, setPriority] = useState(requirement.priority);
  const [finished, setFinished] = useState(requirement.finished);
  const [estado, setEstado] = useState("");

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

  const handleFinished = (e) => {
    setFinished(e.target.value);
  };

  const handleBack = (e) => {
    history.push("/projects/" + Project);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/requirement/edit",
        {
          id: requirement.id,
          name: name,
          description: desc,
          finished: finished,
          estimated_time: estimated,
          deadline: deadline,
          id_project: parseInt(Project),
          priority: priority,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((data) => {
        setEstado("Requerimiento actualizado");
        history.push("/projects/" + Project);
      })
      .catch((error) => {
        setEstado("Error actualizando el requerimiento");
      });
  };

  return hasPermission ? (
<form id="msform" onSubmit={handleSubmit}  >
      {estado !== "" && (
        <Alert
          variant={
            estado === "Requerimiento actualizado" ? "success" : "danger"
          }
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
    <h2 class="fs-title">Edición de requerimiento</h2>
    <h3 class="fs-subtitle">Asegúrese de rellenar los campos</h3>
    <input type="text" name="name" onChange={handleName} value={name} required></input>
    <input type="description" name="desc" onChange={handleDesc} value={desc} required></input>
    <input type="text" name="time" onChange={handleEstimated} value={estimated} required></input>
    <input type="date" name="deadline" onChange={handleDeadline} value={deadline} required></input>
    <input type="text" onChange={handlePriority} list="priorities" value={priority} />
    <datalist id="priorities">
    <select name="{NameOfYourField}">
      <option value="Alta">Alta</option>
      <option value="Media">Media</option>
      <option value="Baja">Baja</option>
        ...
    </select>
    </datalist>
    <input type="text" onChange={handleFinished} list="finished" value={finished} />
    <datalist id="finished">
    <select name="{NameOfYourField}">
      <option value={true}>Finalizado</option>
      <option value={false}>No Finalizado</option>
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

export default EditRequirement;
