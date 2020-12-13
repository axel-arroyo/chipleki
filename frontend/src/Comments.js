import { useState } from "react";
import moment from "moment";
import { Button, Form, Collapse, Card } from "react-bootstrap";
import { Comment } from "semantic-ui-react";
import axios from "axios";
import User from "./User.js";
import reply from "./images/respuesta.png";
import {Image} from "react-bootstrap";
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
  <div className="card mt-2 mb-3">
    <Card bg={'Light'.toLocaleLowerCase()} border="dark" style={{ width: '80rem' }}>
      <Card.Header> {props.comment.creator}
        <div style={{float:'left'}}> {"#" + props.comment.id}
        </div>
        <div style={{float:'right'}}>
          <Comment.Metadata>
            <div>{moment(props.comment.updatedAt).fromNow()}</div>
          </Comment.Metadata>
        </div>
      </Card.Header>
    <Card.Body>
      <Card.Text>
        <Comment>
          <Comment.Avatar
            src={
              "https://avatars.dicebear.com/api/bottts/" +
              props.comment.creator +
              ".svg"
            }
          />
        <Comment.Content>
        <div style={{float:'left'}}>
          <Comment.Text>{props.comment.comment}</Comment.Text>
          </div>
          <Comment.Actions>
          <div className="mt-1 mb-3" style={{float:'right'}}>
          <Comment.Action
            as={Button}
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            variant="secondary"
          >
            Reply
          </Comment.Action>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <Collapse in={open}>
            
          <div style={{float:'none'}}>
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
            </div>
            
          </Collapse>
        </Comment.Actions>
      </Comment.Content>
      
      {hasReply ? (
        props.reply.map((r) => (
          <div className="card mt-2 mb-3">
          <Card  bg={'Light'.toLocaleLowerCase()} border="dark">
          <Card.Header> 
          <Image src={reply} className="reply" alt="" className="photo"/>
          {props.comment.creator}
          <div style={{float:'right'}}>
          <Comment.Metadata>
            <div>{moment(props.comment.updatedAt).fromNow()}</div>
          </Comment.Metadata>
        </div>
            </Card.Header>
          
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
              <div style={{float:'left'}}>
                <Comment.Text>{r.comment}</Comment.Text>
                </div>
              </Comment.Content>
            </Comment>
          </Comment.Group>
          </Card>
          </div>
        ))
      ) : (
        <></>
      )}
    </Comment>
    </Card.Text>
  </Card.Body>
</Card>
</div>
        
  );
 }
export default Comments;
