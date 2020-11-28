import React, { useState } from 'react';
import axios from 'axios';
import {Form, Button, Alert, Row, Col} from 'react-bootstrap';
import User from './User';
import { useHistory, useParams} from 'react-router-dom';


function CreateRequirement(props){

	const user = User();
    const accountType = user ? user.type : undefined;
	const hasPermission = accountType === 'Manager' || accountType === 'Analyst' ? true : false;

	const {idProject} = useParams();
	const history = useHistory();

	const [name, setName] = useState(null);
	const [desc, setDesc] = useState(null);
	const [estimated, setEstimated] = useState(null);
	const [deadline, setDeadline] = useState(null);
	const [priority, setPriority] = useState('Alta');
	const [estado, setEstado] = useState('');
	const [validated, setValidated] = useState(false);
	
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
	
	const handleBack = (e) => {
		history.push("/projects/"+idProject);

	}
	const handleSubmit = (e) => {
		const form = e.currentTarget;
		if (form.checkValidity() === false){
			e.preventDefault();
			e.stopPropagation();
		}
		else
		{
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
		setValidated(true);
	}

	return hasPermission ? (
		<Form noValidate validated={validated} onSubmit={handleSubmit}>
			{estado !== '' && (
				<Alert variant={estado === 'Requerimiento creado' ? 'success' : 'danger'}>
					{estado}
				</Alert>	
			)}
		<Form.Group>
			<Form.Label>Name</Form.Label>
			<div className="row">
				<div className="col-md-4 col-md-offset-3"></div>
			<Form.Control required onChange={handleName} type="text"/>
			</div>
		</Form.Group>

		<Form.Group>
			<Form.Label>Description</Form.Label>
			<div className="row">
			<div className="col-md-4 col-md-offset-3"></div>
			<Form.Control required onChange={handleDesc} type="text"/>
			</div>
		</Form.Group>

        <Form.Group>
			<Form.Label>Estimated Time</Form.Label>
			<div className="row">
			<div className="col-md-4 col-md-offset-3"></div>
			<Form.Control onChange={handleEstimated} type="text"/>
			</div>
		</Form.Group>

        <Form.Group>
			<Form.Label>deadline</Form.Label>
			<div className="row">
				<div className="col-md-4 col-md-offset-3"></div>
			<Form.Control onChange={handleDeadline} type="date"/>
			</div>
		</Form.Group>

		<Form.Group controlId="exampleForm.ControlSelect1">
			<Form.Label>Priority</Form.Label>
			<div className="row">
			<div className="col-md-4 col-md-offset-3"></div>
			<Form.Control onChange={handlePriority} as="select">
				<option value="Alta">Alta</option>
				<option value="Media">Media</option>
				<option value="Baja">Baja</option>
			</Form.Control>
			</div>
		</Form.Group>
		<Button variant="primary mr-3" type="submit">
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

export default CreateRequirement;