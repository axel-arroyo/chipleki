import { Card, Button, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

function Project(props) {
  const {
    id,
    deliver_date,
    client_email,
    analyst_email,
    manager_email,
    createdAt,
    updatedAt,
  } = useSelector((s) =>
    s.projectReducer.projects.find((p) => p.id === props.id)
  );

  return (
    <div class="card-container">
	    <span class="pro">No Finalizado</span>
	        <img class="round" src={
            "https://avatars.dicebear.com/api/bottts/" +
              client_email +".svg"
          } alt="user" />
	    <h3><b>{"Proyecto #" + id}</b></h3>
	    <p>{"Analista: " + analyst_email}</p>
	    <p>{"Manager: " + manager_email}</p>
      <p>{"Cliente:  " + client_email}</p>
      <p>Proyecto creado el: {moment(createdAt).format("DD/MM/YYYY")}</p>
      <Link to={"/projects/" + id}>
	      <div class="buttons">
		      <button class="primary">Ver</button>
        </div>
      </Link>
    </div>
  );
}

export default Project;
