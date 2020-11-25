<<<<<<< HEAD
import { useSelector } from 'react-redux';
=======
import { useSelector, useDispatch} from 'react-redux';
>>>>>>> 91151aef3117c1de12a3534025e68879805ab303
import { Col, Row, Container, Alert, Image } from "react-bootstrap";
import Project from "./Project.js";
import {Link, useParams} from 'react-router-dom';
import plus from './plus.png';
<<<<<<< HEAD
=======
import axios from 'axios';
import React, { useEffect } from 'react';
import { fetchRequirements } from './redux/actions/requirementActions';
import Requirement from "./Requirement.js";
>>>>>>> 91151aef3117c1de12a3534025e68879805ab303

// v.id 
// mostrar requerimiento 
function ProjectView(props){

    const isLogged = useSelector((store) => store.authReducer.isLogged);   
    const {thisId} = useParams();
    const requirements = useSelector((store) => store.requirementReducer.requirements);
    const dispatch = useDispatch();
    console.log(requirements);      

    return isLogged ?(
        <Container fluid>
            <Link to={"/projects/"+thisId+"/newRequirement"}>
                <div className="newProject">
                    Crear Requerimiento
                </div>
                <Image src={plus} className="newIcon"/>
            </Link> 
			<Row className="justify-content-md-center">
					<Project id={parseInt(thisId)} flag={false} />
			</Row>
            <Row className="justify-content-md-center">
                {requirements}
			</Row>

		</Container>
    ) : (
        <Alert variant="danger">Necesitas permisos para acceder.</Alert>
    );
}

export default ProjectView;