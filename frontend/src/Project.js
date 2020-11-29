import {Card, Button, ListGroup} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';

function Project(props){

    const {id,deliver_date,client_email,analyst_email,manager_email,createdAt,updatedAt} = useSelector((s) => s.projectReducer.projects.find(p => p.id === props.id));

    return (
        <Card border = "dark" style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{id}</Card.Title>
            <ListGroup variant="flush">
                <ListGroup.Item>Fecha de entrega prevista: {moment(deliver_date).format('DD/MM/YYYY')}</ListGroup.Item>
                <ListGroup.Item>Cliente: {client_email}</ListGroup.Item>
                <ListGroup.Item>Analista: {analyst_email}</ListGroup.Item>
                <ListGroup.Item>Manager: {manager_email}</ListGroup.Item>
                <ListGroup.Item>Proyecto creado el: {moment(createdAt).format('DD/MM/YYYY')}</ListGroup.Item>
                <ListGroup.Item>Última actualización: {moment(updatedAt).format('DD/MM/YYYY')}</ListGroup.Item>
            </ListGroup>
            {props.flag === "true" &&
                <Button as={Link} to={"/projects/"+id} variant="primary">Ver</Button>
            }
        </Card.Body>
        </Card>
    );
}

export default Project;