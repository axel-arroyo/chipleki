import React, { useState } from 'react';
import axios from 'axios';
import {Form, Button, Alert} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {login} from './redux/actions/authActions.js';

function Login(props) {
	
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [estado, setEstado] = useState('');
	const dispatch = useDispatch();

	const handleEmail = (e) => {
		setEmail(e.target.value);
	}

	const handlePass = (e) => {
		setPass(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post('http://localhost:8080/auth/login', {
			email: email,
			pass: pass,
		}).then((response) => {
			console.log(response.data)
			dispatch(login());
			setEstado("OK");
			localStorage.setItem('token', response.data);
		})
		.catch(error => {
			setEstado("Usuario o contrasena incorrecto");
		})
	}

	return (
		<Form>
			{estado !== '' && (
				<Alert variant={estado === 'OK' ? 'success' : 'danger'}>
					{estado}
				</Alert>	
			)}
		  <Form.Group controlId="formBasicEmail">
		    <Form.Label>Email address</Form.Label>
		    <Form.Control onChange={handleEmail} type="email" placeholder="Enter email" />
		    <Form.Text className="text-muted">
		      We'll never share your email with anyone else.
		    </Form.Text>
		  </Form.Group>

		  <Form.Group controlId="formBasicPassword">
		    <Form.Label>Password</Form.Label>
		    <Form.Control onChange={handlePass} type="password" placeholder="Password" />
		  </Form.Group>

		  <Button onClick={handleSubmit} variant="primary" type="submit">
		    Enviar
		  </Button>
		</Form>
	);
}

export default Login;