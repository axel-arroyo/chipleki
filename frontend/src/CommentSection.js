import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { Comment } from "semantic-ui-react";
import Comments from "./Comments.js";
import User from "./User.js";
import axios from "axios";

function CommentSection(props) {
  const tx = document.getElementsByTagName("textarea");
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute(
      "style",
      "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
    );
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }
  const user = User();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [validated, setValidated] = useState(false);

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
    <div class="ui comments">
      <h3 class="ui dividing header">Comentarios</h3>
      <div class="submitType">
        <span class="write-new">
          <form onSubmit={handleSubmit}>
            <textarea
              type="text"
              placeholder="Unirse a la conversación"
              name="comment"
              required
              onChange={handleComment}
            ></textarea>

            <button type="submit">Submit</button>
          </form>
        </span>
        <div>
          <br></br>
          <Row>
            <Comment.Group>
              {comments
                .filter((c) => c.project === parseInt(props.project))
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
      </div>
    </div>
  );
}

export default CommentSection;
