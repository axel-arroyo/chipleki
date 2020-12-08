import { useState } from "react";
import moment from "moment";
import { Button, Form, Collapse } from "react-bootstrap";
import { Comment } from "semantic-ui-react";
import axios from "axios";
import User from "./User.js";

function Comments(props) {
  const user = User();
  const hasReply = props.reply !== undefined && props.reply.length > 0;
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [validated, setValidated] = useState(false);

  const handleComment = (e) => {
    setComment(e.target.value);
  };

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
            replyOf: props.comment.id,
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
    <Comment>
      <Comment.Avatar
        src={
          "https://avatars.dicebear.com/api/bottts/" +
          props.comment.creator +
          ".svg"
        }
      />
      <Comment.Content>
        <Comment.Author as="a">{props.comment.creator}</Comment.Author>
        <Comment.Metadata>
          <div>{moment(props.comment.updatedAt).fromNow()}</div>
        </Comment.Metadata>
        <Comment.Text>{props.comment.comment}</Comment.Text>
        <Comment.Actions>
          <Comment.Action
            as={Button}
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            Reply
          </Comment.Action>
          <Collapse in={open}>
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
          </Collapse>
        </Comment.Actions>
      </Comment.Content>

      {hasReply ? (
        props.reply.map((r) => (
          <Comment.Group>
            <Comment>
              <Comment.Avatar
                src={
                  "https://avatars.dicebear.com/api/bottts/" +
                  r.creator +
                  ".svg"
                }
              />
              <Comment.Content>
                <Comment.Author as="a">{r.creator}</Comment.Author>
                <Comment.Metadata>
                  <div>{moment(r.updatedAt).fromNow()}</div>
                </Comment.Metadata>
                <Comment.Text>{r.comment}</Comment.Text>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        ))
      ) : (
        <></>
      )}
    </Comment>
  );
}

export default Comments;
