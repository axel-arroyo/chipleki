import { useState } from "react";
import moment from "moment";
import { Button, Form, Collapse, Card} from "react-bootstrap";
import { Comment } from "semantic-ui-react";
import axios from "axios";
import User from "./User.js";
import reply from "./images/respuesta.png";
import { Image } from "react-bootstrap";
import MetaTags from 'react-meta-tags';
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
   <div>
    <MetaTags>
    <meta charset="utf-8"></meta>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
		<meta name="viewport" content="width=device-width, initial-scale=1"></meta>
		<meta name="keywords" content="chat, user, comments, wide" />
    </MetaTags>

<link rel="stylesheet" href="styles.css"></link>



<ul class="comment-section">

  <li class="comment user-comment">

            <div class="info" >
                <a href="#">{props.comment.creator}</a>
                <span>4 hours ago  </span>
                
            </div>
            <a class="avatar" href="#">
            <img src={
                  "https://avatars.dicebear.com/api/bottts/" +
                  props.comment.creator +
                  ".svg"
                } width="25" alt="Profile Avatar" title="Jack Smith" />
            </a>
            
            <p>{props.comment.comment}</p>
            <div class="tab">
            <Comment.Actions>
              <div class="replyType">
              <a onClick= {() => setOpen(!open)} aria-controls="example-collapse-text"
                      aria-expanded={open}
                      variant="secondary"
                      > Responder

              </a>
              </div>
                  <Collapse in={open}>

                      <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                      >
                        <span class="areaNewWrite">
                        <Form.Control
                          onChange={handleComment}
                          as="textarea"
                          type="text"
                          placeholder="Agregar un comentario"
                          rows="3"
                          required
                        />
                        </span>
                        <div class="bottomSpace">
                        <button class="anchorButton" type="submit">
                          Comentar
                        </button>
                        </div>
                      </Form>

                  </Collapse>
                    </Comment.Actions>
                    </div>
                    </li>
                    {hasReply ? (
                props.reply.map((r) => (
                  <div class="tab3">
                  <li class="comment author-comment">
                        <div class="info" >
                <a href="#">{props.comment.creator}</a>
                <span>3 hours ago</span>
                <img src={
                  "https://avatars.dicebear.com/api/bottts/" +
                              r.creator +
                              ".svg"
                } width="25" alt="Profile Avatar" title="Jack Smith" />
            </div>
            <div class="tab2">
            <p>{r.comment}</p>
            </div>
                  </li>
                  </div>
                ))
              ) : (
                <></>
              )}
              
            
            
           
  
    
          
    
</ul>

</div>
  );
}
export default Comments;
