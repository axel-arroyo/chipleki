import React, { useState } from 'react';
import {Card, Button, ListGroup, Image, Modal} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';
import trash from './images/trash.png';
import {deleteRequirement} from './redux/actions/requirementActions';
import Auth from './Auth';

function Requirement(props){

    var accountType = Auth();
	const canDelete = accountType === 'Manager' || accountType === 'Analyst' ? true : false;

    const [show,setShow] = useState(false);
    const dispatch = useDispatch();

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const deleteReq = () => {
        dispatch(deleteRequirement(id));
        handleClose();
    }

    const {id,name,description, finished, estimated_time, deadline, id_project, id_analyst, priority, createdAt, updatedAt} = useSelector((s) => s.requirementReducer.requirements.find((v) => v.id === props.id));

    return (
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            {canDelete ? 
            <>
            <Image src={trash} className="trash" alt="" onClick={handleShow}/>
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
            :
            <></>
            }

            <Card.Title>
                {name}
            </Card.Title>
            <ListGroup variant="flush">
                <ListGroup.Item>Descripción: {description}</ListGroup.Item>
                <ListGroup.Item>Analista: {id_analyst}</ListGroup.Item>
                <ListGroup.Item>Prioridad: {priority}</ListGroup.Item>
                <ListGroup.Item>Proyecto creado el: {moment(createdAt).format('DD/MM/YYYY')}</ListGroup.Item>
                <ListGroup.Item>Última actualización: {moment(updatedAt).format('DD/MM/YYYY')}</ListGroup.Item>
                <ListGroup.Item>Estado: {finished ?
                    <div class="state finished"></div> : <div class="state unfinished"></div>}
                </ListGroup.Item>
            </ListGroup>
            {props.flag === "true" &&
                <Button as={Link} to={"/projects/"+id_project+"/"+id} variant="primary">Editar</Button>
            }
        </Card.Body>
        </Card>
    );
}

export default Requirement;