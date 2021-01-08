import React, { useEffect, useState } from "react";
import { Card, ListGroup, Button, Form } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import User from "./User.js";
import { hideRequirement } from "./redux/actions/requirementActions.js";

function Module(props) {
  const {
    id,
    name,
    description,
    finished,
    estimated_time,
    deadline,
    id_project,
    id_developer,
    priority,
    createdAt,
    updatedAt,
  } = useSelector((s) =>
    s.requirementReducer.requirements.find((r) => r.id === props.id)
  );

  const [quotations, setQuotations] = useState([]);
  const user = User();

  useEffect(() => {
    axios
      .post(
        "http://localhost:8080/developer/devquotations",
        { email: user.email },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setQuotations(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const quoted = quotations.map((q) => q.id_requirement);

  const [showForm, setShowForm] = useState(false);
  const [value, setValue] = useState(0);
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();

  const handleForm = () => {
    setShowForm(!showForm);
  };

  const handleValue = (e) => {
    setValue(e.target.value);
  };

  const handleSumbit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      axios
        .post(
          "http://localhost:8080/developer/quotation",
          {
            value: value,
            id_requirement: props.id,
            email: user.email,
          },
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        )
        .then((data) => {
          dispatch(hideRequirement(props.id));
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setValidated(true);
  };

  if (quoted.includes(props.id)) {
    return <></>;
  }

  return (
    <div class="card-container-module">
	        <img class="round" src={
          "https://avatars.dicebear.com/api/jdenticon/" + id+ ".svg"
                } alt="user" />
	    <h3><b>{name}</b></h3>
      <p>{"Descripción  " + description}</p>
      <p>{"Prioridad:  " + priority}</p>
      <p>{"Tiempo estimado:  " + estimated_time}</p>
      <p>{"Fecha límite:  " + moment(deadline).format("DD/MM/YY")}</p>
      {showForm && (
        <div>
        
              <Form noValidate validated={validated} onSubmit={handleSumbit}>
              <div class="formulario">
                <Form.Control onChange={handleValue} type="number" required/>
                </div>
                <button type="submit" class="primary-module" placeholder="valor">
                  Enviar
                </button>
                <button onClick={handleForm} class="danger-module">
              Cancelar
            </button>
              </Form>
     
        
        
        </div>
          )}
          {showForm ? (
            <></>
          ) : (
            <button onClick={handleForm} class="primary">
              Enviar cotización
            </button>
          )}
    </div>
  );
}

export default Module;
