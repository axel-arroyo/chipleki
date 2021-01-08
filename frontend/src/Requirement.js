import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Image, Modal } from "react-bootstrap";
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
    <div class="card-container">
      {canDelete ? (
        <>
          <div class="topRight">
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
          </div>
        </>
      ) : (
        <></>
      )}
      {finished ? (
        <span class="pro">Finalizado</span>
      ) : (
        <span class="pro">No Finalizado</span>
      )}

      <img
        class="round"
        src={"https://avatars.dicebear.com/api/jdenticon/" + id + ".svg"}
        alt="user"
      />
      <h3>{name}</h3>
      <p>{"Descripción: " + description}</p>
      <p>
        {estimated_time ? (
          "Tiempo estimado: " + estimated_time
        ) : (
          <div class="requirement-danger">Tiempo estimado: No especificado</div>
        )}
      </p>
      <p>{"Prioridad " + priority}</p>
      <p>Requerimiento creado el: {moment(createdAt).format("DD/MM/YYYY")}</p>
      <p>Última actualización: {moment(updatedAt).fromNow()}</p>
      <p>
        {deadline ? (
          "Fecha de entrega: " + moment(deadline).fromNow()
        ) : (
          <div class="requirement-danger">Fecha de entrega: No establecido</div>
        )}
      </p>
      <div class="buttons">
        {id_developer && developers.length > 0 ? (
          <img
            class="round-2"
            src={
              "https://avatars.dicebear.com/api/bottts/" + id_developer + ".svg"
            }
            alt="user"
          />
        ) : (
          <></>
        )}
        {id_developer && developers.length > 0
          ? developers.find((d) => d.id === id_developer).name
          : canDelete && (
              <Link to={"/projects/" + id_project + "/" + id + "/assign"}>
                <button class="primary ghost">Asignar desarrollador</button>
              </Link>
            )}
        {canDelete && (
          <Link to={"/projects/" + id_project + "/" + id}>
            <button class="primary">Editar requerimiento</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Requirement;
