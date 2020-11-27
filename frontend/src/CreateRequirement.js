import React, { useState } from 'react';
import axios from 'axios';
import {Form, Button, Alert} from 'react-bootstrap';
import User from './User';
import { useHistory, useParams } from 'react-router-dom';

function CreateRequirement(props){

	const user = User();
    const accountType = user ? user.type : undefined;
	const hasPermission = accountType === 'Manager' || accountType === 'Analyst' ? true : false;

	const {idProject} = useParams();
	const history = useHistory();

	const [name, setName] = useState('');
	const [desc, setDesc] = useState('');
	const [estimated, setEstimated] = useState('');
	const [deadline, setDeadline] = useState('');
	const [priority, setPriority] = useState('Alta');
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

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post('http://localhost:8080/requirement', {
			name: name,
			description: desc,
			finished: false,
			estimated_time: estimated,
			deadline: deadline,
			id_project: parseInt(idProject),
			priority: priority
		}, {
			headers: {
				"auth-token": localStorage.getItem("token"),
			}
		}).then((data) => {
			setEstado('Requerimiento creado');
			history.push("/projects/"+idProject);
		}).catch((error) => {
			setEstado('Error creando el requerimiento');
		});
	}

	return hasPermission ? (
		<Form>
			{estado !== '' && (
				<Alert variant={estado === 'Requerimiento creado' ? 'success' : 'danger'}>
					{estado}
				</Alert>	
			)}
		<Form.Group>
			<Form.Label>Name</Form.Label>
			<Form.Control onChange={handleName} type="text"/>
		</Form.Group>

		<Form.Group>
			<Form.Label>Description</Form.Label>
			<Form.Control onChange={handleDesc} type="text"/>
		</Form.Group>

        <Form.Group>
			<Form.Label>Estimated Time</Form.Label>
			<Form.Control onChange={handleEstimated} type="text"/>
		</Form.Group>

        <Form.Group>
			<Form.Label>deadline</Form.Label>
			<Form.Control onChange={handleDeadline} type="date"/>
		</Form.Group>

		<Form.Group controlId="exampleForm.ControlSelect1">
			<Form.Label>Priority</Form.Label>
			<Form.Control onChange={handlePriority} as="select">
				<option value="Alta">Alta</option>
				<option value="Media">Media</option>
				<option value="Baja">Baja</option>
			</Form.Control>
		</Form.Group>

		<Button onClick={handleSubmit} variant="primary" type="submit">
			Enviar
		</Button>
		</Form>
	) : (
		<Alert variant="danger">Acceso Restringido</Alert>
	);
}

export default CreateRequirement;