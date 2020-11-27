import React, { useEffect } from 'react';
import "./styles.css";
import axios from 'axios';
import plus from './images/plus.png';
import Project from './Project.js';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Container, Alert, Image } from "react-bootstrap";
import { fetchProjects } from './redux/actions/projectActions';
import {Link} from 'react-router-dom';
import Auth from './Auth';

function Projects(props){

	var accountType = Auth();
	const canCreate = accountType === 'Manager' || accountType === 'Analyst' ? true : false;
    const isLogged = useSelector((store) => store.authReducer.isLogged);
	const projects = useSelector((store) => store.projectReducer.projects);
	const dispatch = useDispatch();
	
    useEffect(() => {
		if (isLogged) {
			axios.get("http://localhost:8080/project", {
				headers: {
				'auth-token': localStorage.getItem('token'),
			}
				})
				.then((data) => {
					console.log(data);
					dispatch(fetchProjects(data.data));
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

    return isLogged ? (
        <Container fluid>
			{canCreate ? 
            <Link to="/newProject">
                <div className="newProject">
                    Crear Proyecto
                </div>
                <Image src={plus} className="newIcon"/>
			</Link> 
			:
			<></>
			}
			<Row>
				{
				projects !== undefined ?
				projects.map((v) => (
					<Col key={v.id} md={2}>
						<Project id={v.id}  flag="true" />
					</Col>
				)):
				<Col>
				</Col>
				}
			</Row>
		</Container>
		
    ) : (
        <Alert variant="danger">Necesitas permisos para acceder.</Alert>
    );
}

export default Projects;