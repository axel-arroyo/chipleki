import {Card, Button} from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Project(props){

    const {id,deliver_date,id_client,id_analyst,id_manager,createdAt,updatedAt} = useSelector((s) => s.projectReducer.projects.find((v) => v.id === props.id));

    return (
        <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{id}</Card.Title>
            <Card.Text>
                Fecha de entrega prevista: {deliver_date}.
                Cliente: {id_client}.
                Analista: {id_analyst}.
                Manager: {id_manager}.
                Proyecto creado el día: {createdAt}.
                Última actualización: {updatedAt}.
            </Card.Text>
            <Button href="#" variant="primary">Editar</Button>
        </Card.Body>
        </Card>
    );
}

export default Project;