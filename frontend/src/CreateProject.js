import React, { useState } from 'react';
import axios from 'axios';
import {Form, Button, Alert} from 'react-bootstrap';
import User from './User';
import { useHistory } from "react-router-dom";

function CreateProject(props){

	const user = User();
    const accountType = user ? user.type : undefined;
	const hasPermission = accountType === 'Manager' || accountType === 'Analyst' ? true : false
	const [deliver, setDeliver] = useState('');
	const [client, setClient] = useState('');
	const [analyst, setAnalyst] = useState('');
    const [manager, setManager] = useState('');
	const [estado, setEstado] = useState('');
	const history = useHistory();

	const handleDeliver = (e) => {
		setDeliver(e.target.value);
	}

	const handleClient = (e) => {
		setClient(e.target.value);
	}

	const handleAnalyst = (e) => {
		setAnalyst(e.target.value);
	}

	const handleManager = (e) => {
		setManager(e.target.value);
	}

	const handleBack = (e) => {
		history.push("/projects/");
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post('http://localhost:8080/project', {
			deliver_date: deliver,
			client_email: client,
			analyst_email: analyst,
            manager_email: manager
		}, {
			headers: {
				"auth-token": localStorage.getItem("token"),
			}
		}).then((data) => {
			setEstado('Proyecto creado');
			history.push("/projects");
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
			<div class="row">
    		<div class="col-md-4 col-md-offset-3"></div>
			<Form.Control onChange={handleDeliver} type="date"/>
			</div>
		</Form.Group>

		<Form.Group>
			<Form.Label>Manager Email</Form.Label>
			<div class="row">
    		<div class="col-md-4 col-md-offset-3"></div>
			<Form.Control onChange={handleManager} type="text"/>
			</div>
		</Form.Group>

        <Form.Group>
			<Form.Label>Analyst Email</Form.Label>
			<div class="row">
    		<div class="col-md-4 col-md-offset-3"></div>
			<Form.Control onChange={handleAnalyst} type="text"/>
			</div>
		</Form.Group>

        <Form.Group>
			<Form.Label>Client Email</Form.Label>
			<div class="row">
    		<div class="col-md-4 col-md-offset-3"></div>
			<Form.Control onChange={handleClient} type="text"/>
			</div>
		</Form.Group>

		<Button onClick={handleSubmit} variant="primary mr-3" type="submit">
			Enviar
		</Button>

		<Button onClick={handleBack} variant="danger " type="submit">
			Cancelar
		</Button>

		</Form>
	) : (
		<Alert variant="danger">Acceso Restringido</Alert>
	);
}

export default CreateProject;