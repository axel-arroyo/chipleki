import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Col, Row, Container, Alert, Image } from "react-bootstrap";
import Project from "./Project.js";


function ProjectView(props){

    const isLogged = useSelector((store) => store.authReducer.isLogged);   
    const {thisId} = useParams();

    return isLogged ?(
        <Container fluid>
			<Row className="justify-content-md-center">
					<Project id={parseInt(thisId)} flag={false} />
			</Row>
		</Container>
    ) : (
        <Alert variant="danger">Necesitas permisos para acceder.</Alert>
    );
}

export default ProjectView;