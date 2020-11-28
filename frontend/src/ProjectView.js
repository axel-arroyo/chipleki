import { useSelector, useDispatch} from 'react-redux';
import { Col, Row, Container, Alert, Image } from "react-bootstrap";
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import React, { useEffect } from 'react';
import { fetchRequirements} from './redux/actions/requirementActions';
import Requirement from "./Requirement.js";
import User from './User';
import Button from 'react-bootstrap/Button'

function ProjectView(props){

    const user = User();
    const accountType = user ? user.type : undefined;
    const canCreate = accountType === 'Manager' || accountType === 'Analyst' ? true : false;
    
    const isLogged = useSelector((store) => store.authReducer.isLogged); 
    const {thisId} = useParams();
    const dispatch = useDispatch();
    const requirements = useSelector((store) => store.requirementReducer.requirements);
    console.log(requirements);  
    
    useEffect(() => {
		if (isLogged) {
			axios.get("http://localhost:8080/requirement", { 
                headers: {
                    "auth-token": localStorage.getItem("token"),
            }
				})
				.then((data) => {
					dispatch(fetchRequirements(data.data));
				})
				.catch((err) => {
					console.log(err);
				});
		}
    }, []);
    
    return isLogged ?(
        <Container fluid>
            {canCreate ? 
            <Link to={"/projects/"+thisId+"/newRequirement"}>
                &nbsp;
				<Button variant="secondary" size="sm" block>
					Crear requerimiento
  				</	Button>
				  &nbsp;
            </Link> 
            :
            <></>
            }
			<Row>
                {
                    (requirements != null && requirements.length  > 0)
                    ?
                    requirements.filter(r => r.id_project == thisId).map((v) => (
					<Col key={v.id} md={2}>
						<Requirement id={v.id} flag="true" />
					</Col>
                ))
                :
                <Col>
                </Col>
                }
			</Row>
		</Container>
    ) : (
        <Alert variant="danger">Necesitas permisos para acceder.</Alert>
    );
}

export default ProjectView;