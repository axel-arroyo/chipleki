import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Header, Comment } from "semantic-ui-react";
import Comments from "./Comments.js";
import User from "./User.js";
import axios from "axios";
import { useHistory } from "react-router-dom";

function CommentSection(props) {
  const user = User();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [validated, setValidated] = useState(false);
  console.log(comments);

  const history = useHistory();

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/comment", {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      axios
        .post(
          "http://localhost:8080/comment",
          {
            comment: comment,
            creator: user.email,
            project: parseInt(props.project),
          },
          {
            headers: {
              "auth-token": localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setValidated(true);
  };

  return (
    <div>
      <Row>
        <Header as="h3" dividing>
          Comentarios
        </Header>
      </Row>

      <Row>
        <Col>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Control
              onChange={handleComment}
              as="textarea"
              type="text"
              placeholder="Agregar un comentario"
              rows="3"
              required
            />
            <Button variant="primary" type="submit">
              Comentar
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Comment.Group threaded>
          {comments
            .filter((c) => c.project == props.project)
            .reverse()
            .map((c) => (
              <Comments
                comment={c}
                reply={comments.filter((v) => v.replyOf === c.id)}
              />
            ))}
        </Comment.Group>
      </Row>
    </div>
  );
}

export default CommentSection;
