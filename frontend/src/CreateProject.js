import React, { useState } from 'react';
import axios from 'axios';
import {Form, Button, Alert} from 'react-bootstrap';
import Auth from './Auth';

function CreateProject(props){

    var accountType = Auth();
	var hasPermission = accountType === 'Manager' || accountType === 'Analyst' ? true : false
	const [deliver, setDeliver] = useState('');
	const [idClient, setIdClient] = useState('');
	const [idAnalyst, setIdAnalyst] = useState('');
    const [idManager, setIdManager] = useState('');
    const [estado, setEstado] = useState('');

	const handleDeliver = (e) => {
		setDeliver(e.target.value);
	}

	const handleIdClient = (e) => {
		setIdClient(e.target.value);
	}

	const handleIdAnalyst = (e) => {
		setIdAnalyst(e.target.value);
	}

	const handleIdManager = (e) => {
		setIdManager(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post('http://localhost:8080/project', {
			deliver_date: deliver,
			id_client: idClient,
			id_analyst: idAnalyst,
            id_manager: idManager
		}, {
			headers: {
				"auth-token": localStorage.getItem("token"),
			}
		}).then((data) => {
			setEstado('Proyecto creado');
			console.log(data);
		}).catch((error) => {
			setEstado('Error creando el proyecto');
		});
	}

	return hasPermission ? (
		<Form>
			{estado !== '' && (
				<Alert variant={estado === 'Proyecto creado' ? 'success' : 'danger'}>
					{estado}
				</Alert>	
			)}
		<Form.Group>
			<Form.Label>Deliver date</Form.Label>
		    <Form.Control onChange={handleDeliver} type="date"/>
		</Form.Group>

		<Form.Group>
		    <Form.Label>ID Manager</Form.Label>
		    <Form.Control onChange={handleIdManager} type="text"/>
		</Form.Group>

        <Form.Group>
		    <Form.Label>ID Analyst</Form.Label>
		    <Form.Control onChange={handleIdAnalyst} type="text"/>
		</Form.Group>

        <Form.Group>
		    <Form.Label>ID Client</Form.Label>
		    <Form.Control onChange={handleIdClient} type="text"/>
		</Form.Group>

		<Button onClick={handleSubmit} variant="primary" type="submit">
		    Enviar
		</Button>
		</Form>
	) : (
		<Alert variant="danger">Acceso Restringido</Alert>
	);
}

export default CreateProject;