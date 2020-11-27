import React, { useState } from 'react';
import { useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {Form, Button, Alert} from 'react-bootstrap';
import axios from 'axios';
import Auth from './Auth';

function EditRequirement(props) {

    var accountType = Auth();
	var hasPermission = accountType === 'Manager' || accountType === 'Analyst' ? true : false
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
			<Form.Control value={name} onChange={handleName} type="text"/>
		</Form.Group>

		<Form.Group>
			<Form.Label>Description</Form.Label>
			<Form.Control value={desc} onChange={handleDesc} type="text"/>
		</Form.Group>

        <Form.Group>
			<Form.Label>Estimated Time</Form.Label>
			<Form.Control value={estimated} onChange={handleEstimated} type="text"/>
		</Form.Group>

        <Form.Group>
			<Form.Label>deadline</Form.Label>
			<Form.Control value={deadline} onChange={handleDeadline} type="date"/>
		</Form.Group>

		<Form.Group controlId="exampleForm.ControlSelect1">
			<Form.Label>Priority</Form.Label>
			<Form.Control value={priority} onChange={handlePriority} as="select">
				<option value="Alta">Alta</option>
				<option value="Media">Media</option>
				<option value="Baja">Baja</option>
			</Form.Control>
		</Form.Group>

		<Form.Group controlId="exampleForm.ControlSelect1">
			<Form.Label>Estado</Form.Label>
			<Form.Control value={finished} onChange={handleFinished} as="select">
				<option value={true}>Finalizado</option>
				<option value={false}>No Finalizado</option>
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

export default EditRequirement;