import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, ListGroup, Image, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
import trash from "./images/trash.png";
import { deleteRequirement } from "./redux/actions/requirementActions";
import User from "./User";

function Requirement(props) {
  moment.locale("es");
  const [developers, setDevelopers] = useState([]);
  const user = User();
  const accountType = user ? user.type : undefined;
  const canDelete =
    accountType === "Manager" || accountType === "Analyst" ? true : false;

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const deleteReq = () => {
    dispatch(deleteRequirement(id));
    handleClose();
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/developer", {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setDevelopers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    s.requirementReducer.requirements.find((v) => v.id === props.id)
  );

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        {canDelete ? (
          <>
            <Image src={trash} className="trash" alt="" onClick={handleShow} />
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>¿Seguro que desea eliminar?</Modal.Title>
              </Modal.Header>
              <Modal.Body>No hay vuelta atras</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button variant="danger" onClick={deleteReq}>
                  Eliminar
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        ) : (
          <></>
        )}

        <Card.Title>{name}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Descripción: {description}</ListGroup.Item>
          <ListGroup.Item>Prioridad: {priority}</ListGroup.Item>
          <ListGroup.Item>
            Desarrollador:&nbsp;
            {id_developer && developers.length > 0 ? (
              developers.find((d) => d.id === id_developer).name
            ) : (
              <Link to={"/projects/" + id_project + "/" + id + "/assign"}>
                Asignar
              </Link>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            Proyecto creado el: {moment(createdAt).format("DD/MM/YYYY")}
          </ListGroup.Item>
          <ListGroup.Item>
            Última actualización: {moment(updatedAt).fromNow()}
          </ListGroup.Item>
          <ListGroup.Item>
            Estado:{" "}
            {finished ? (
              <div className="state finished"></div>
            ) : (
              <div className="state unfinished"></div>
            )}
          </ListGroup.Item>
        </ListGroup>
        {props.flag && (
          <Button
            as={Link}
            to={"/projects/" + id_project + "/" + id}
            variant="primary mr-3"
          >
            Editar
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Requirement;
