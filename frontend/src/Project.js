import {Card, Button, ListGroup} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';

function Project(props){

    const {id,deliver_date,id_client,id_analyst,id_manager,createdAt,updatedAt} = useSelector((s) => s.projectReducer.projects.find((v) => v.id === props.id));

    return (
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{id}</Card.Title>
            <ListGroup variant="flush">
                <ListGroup.Item>Fecha de entrega prevista: {moment(deliver_date).format('DD/MM/YYYY')}</ListGroup.Item>
                <ListGroup.Item>Cliente: {id_client}</ListGroup.Item>
                <ListGroup.Item>Analista: {id_analyst}</ListGroup.Item>
                <ListGroup.Item>Manager: {id_manager}</ListGroup.Item>
                <ListGroup.Item>Proyecto creado el: {moment(createdAt).format('DD/MM/YYYY')}</ListGroup.Item>
                <ListGroup.Item>Última actualización: {moment(updatedAt).format('DD/MM/YYYY')}</ListGroup.Item>
            </ListGroup>
            {props.flag === "true" &&
                <Button as={Link} to={"/projects/"+id} variant="primary">Editar</Button>
            }
        </Card.Body>
        </Card>
    );
}

export default Project;