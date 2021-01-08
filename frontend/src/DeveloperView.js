import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { Col, Row } from "react-bootstrap";
import Module from "./Module.js";
import { fetchRequirements } from "./redux/actions/requirementActions.js";

function DeveloperView(props) {
  const dispatch = useDispatch();
  const requirements = useSelector(
    (store) => store.requirementReducer.requirements
  );

  useEffect(() => {
    axios
      .get("http://localhost:8080/requirement", {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch(fetchRequirements(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  return (
    <Row>
      {requirements
        .filter((r) => r.id_developer === null)
        .map((req) => (
          <Col key={req.id} md={3}>
            <Module id={req.id} flag={false} />
          </Col>
        ))}
    </Row>
  );
}

export default DeveloperView;
