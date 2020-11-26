import { useSelector, useDispatch} from 'react-redux';
import { Col, Row, Container, Alert, Image } from "react-bootstrap";
import Project from "./Project.js";
import {Link, useParams} from 'react-router-dom';
import plus from './plus.png';
import axios from 'axios';
import React, { useEffect } from 'react';
import { fetchRequirements} from './redux/actions/requirementActions';
import Requirement from "./Requirement.js";
// v.id 
// mostrar requerimiento 
function ProjectView(props){

    const isLogged = useSelector((store) => store.authReducer.isLogged); 
    const {thisId} = useParams();
    const dispatch = useDispatch();
    const requirements = useSelector((store) => store.requirementReducer.requirements);
    console.log(requirements);  
    
    useEffect(() => {
		if (isLogged) {
			axios.get("http://localhost:8080/project/requirement", {
				})
				.then((data) => {
					dispatch(fetchRequirements(data.data));
				})
				.catch((err) => {
					console.log(err);
				});
		}
    }, [dispatch, isLogged]);
    
    return isLogged ?(
        <Container fluid>
            <Link to={"/projects/"+thisId+"/newRequirement"}>
                <div className="newProject">
                    Crear Requerimiento
                </div>
                <Image src={plus} className="newIcon"/>
            </Link> 

			<Row>
                {
                    (requirements != null && requirements.length  > 0)
                    ?
                    requirements.filter(v => v.id_project == thisId).map((v) => (
					<Col key={v.id} md={2}>
						<Requirement id={v.id} flag="true" />
					</Col>
                ))
                :
                (<li>No existen los datos</li>)
                }
			</Row>
		</Container>
    ) : (
        <Alert variant="danger">Necesitas permisos para acceder.</Alert>
    );

   
}

export default ProjectView;