import React, { useState } from 'react';
import { useSelector} from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import {Form, Button, Alert} from 'react-bootstrap';
import axios from 'axios';
import User from './User';

function EditRequirement(props) {

	const user = User();
    const accountType = user ? user.type : undefined;
	const hasPermission = accountType === 'Manager' || accountType === 'Analyst' ? true : false
	const {Project,Requirement} = useParams();
	const history = useHistory();

	const requirements = useSelector((store) => store.requirementReducer.requirements);
	const requirement = requirements.find(req => req.id == Requirement);

    const [name, setName] = useState(requirement.name);
	const [desc, setDesc] = useState(requirement.description);
	const [estimated, setEstimated] = useState(requirement.estimated_time);
	const [deadline, setDeadline] = useState(requirement.deadline);
	const [priority, setPriority] = useState(requirement.priority);
	const [finished, setFinished] = useState(requirement.finished);
    const [estado, setEstado] = useState('');


    const handleName = (e) => {
		setName(e.target.value);
	}

	const handleDesc = (e) => {
		setDesc(e.target.value);
	}

	const handleEstimated = (e) => {
		setEstimated(e.target.value);
	}

	const handleDeadline = (e) => {
		setDeadline(e.target.value);
	}

	const handlePriority = (e) => {
		setPriority(e.target.value);
	}
	
	const handleFinished = (e) => {
		setFinished(e.target.value);
	}
	
	const handleBack = (e) => {
		history.push("/projects/"+Project);

	}

    const handleSubmit = (e) => {
		e.preventDefault();
		axios.post('http://localhost:8080/requirement/edit', {
			id: requirement.id,
			name: name,
			description: desc,
			finished: finished,
			estimated_time: estimated,
			deadline: deadline,
			id_project: parseInt(Project),
			priority: priority
		}, {
			headers: {
				"auth-token": localStorage.getItem("token"),
			}
		}).then((data) => {
			setEstado('Requerimiento actualizado');
			history.push("/projects/"+Project);
		}).catch((error) => {
			setEstado('Error actualizando el requerimiento');
		});
	}

    return hasPermission ? (
            <Form>
			{estado !== '' && (
				<Alert variant={estado === 'Requerimiento actualizado' ? 'success' : 'danger'}>
					{estado}
				</Alert>	
			)}
		<Form.Group>
			<Form.Label>Name</Form.Label>
			<div className="row">
			<div className="col-md-4 col-md-offset-3"></div>
			<Form.Control value={name} onChange={handleName} type="text"/>
			</div>
		</Form.Group>

		<Form.Group>
			<Form.Label>Description</Form.Label>
			<div className="row">
			<div className="col-md-4 col-md-offset-3"></div>
			<Form.Control value={desc} onChange={handleDesc} type="text"/>
			</div>
		</Form.Group>

        <Form.Group>
			<Form.Label>Estimated Time</Form.Label>
			<div className="row">
			<div className="col-md-4 col-md-offset-3"></div>
			<Form.Control value={estimated} onChange={handleEstimated} type="text"/>
			</div>
		</Form.Group>

        <Form.Group>
			<Form.Label>deadline</Form.Label>
			<div className="row">
			<div className="col-md-4 col-md-offset-3"></div>
			<Form.Control value={deadline} onChange={handleDeadline} type="date"/>
			</div>
		</Form.Group>

		<Form.Group controlId="exampleForm.ControlSelect1">
			<Form.Label>Priority</Form.Label>
			<div className="row">
			<div className="col-md-4 col-md-offset-3"></div>
			<Form.Control value={priority} onChange={handlePriority} as="select">
				<option value="Alta">Alta</option>
				<option value="Media">Media</option>
				<option value="Baja">Baja</option>
			</Form.Control>
			</div>
		</Form.Group>

		<Form.Group controlId="exampleForm.ControlSelect1">
			<Form.Label>Estado</Form.Label>
			<div className="row">
			<div className="col-md-4 col-md-offset-3"></div>
			<Form.Control value={finished} onChange={handleFinished} as="select">
				<option value={true}>Finalizado</option>
				<option value={false}>No Finalizado</option>
			</Form.Control>
			</div>
		</Form.Group>

		<Button onClick={handleSubmit} variant="primary mr-3" type="submit">
			Enviar
		</Button>

		<Button onClick={handleBack} variant="danger" type="submit">
			Cancelar
		</Button>

		</Form>
	) : (
        <Alert variant="danger">Acceso Restringido</Alert>
    );
}

export default EditRequirement;
