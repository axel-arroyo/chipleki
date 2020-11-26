import React, { useEffect } from 'react';
import "./styles.css";
import axios from 'axios';
import plus from './plus.png';
import Project from './Project.js';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Container, Alert, Image } from "react-bootstrap";
import { fetchProjects } from './redux/actions/projectActions';
import {Link} from 'react-router-dom';


function Projects(props){

    const isLogged = useSelector((store) => store.authReducer.isLogged);
	const projects = useSelector((store) => store.projectReducer.projects);
	const dispatch = useDispatch();
	
    useEffect(() => {
		if (isLogged) {
			axios.get("http://localhost:8080/project", {
				})
				.then((data) => {
					console.log(data);
					dispatch(fetchProjects(data.data));
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [dispatch, isLogged]);

    return isLogged ? (
        <Container fluid>
            <Link to="/newProject">
                <div className="newProject">
                    Crear Proyecto
                </div>
                <Image src={plus} className="newIcon"/>
            </Link> 
			<Row>
				{projects.map((v) => (
					<Col key={v.id} md={2}>
						<Project id={v.id} flag="true" />
					</Col>
				))}
			</Row>
		</Container>
		
    ) : (
        <Alert variant="danger">Necesitas permisos para acceder.</Alert>
    );
}

export default Projects;