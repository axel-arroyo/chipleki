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
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Descripción: {description}</ListGroup.Item>
          <ListGroup.Item>Prioridad: {priority}</ListGroup.Item>
          <ListGroup.Item>
            Tiempo estimado: {estimated_time ? estimated_time : "No definido"}
          </ListGroup.Item>
          <ListGroup.Item>
            Fecha límite: {moment(deadline).format("DD/MM/YY")}
          </ListGroup.Item>
          {showForm && (
            <ListGroup.Item>
              <Form noValidate validated={validated} onSubmit={handleSumbit}>
                <Form.Control onChange={handleValue} type="number" required />
                <Button type="submit" variant="primary" placeholder="valor">
                  Enviar
                </Button>
              </Form>
            </ListGroup.Item>
          )}
          {showForm ? (
            <Button onClick={handleForm} variant="danger">
              Cancelar
            </Button>
          ) : (
            <Button onClick={handleForm} variant="primary">
              Enviar cotización
            </Button>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default Module;
