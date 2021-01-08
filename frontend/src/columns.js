import { Button } from "react-bootstrap";
import axios from "axios";

const mean = (ratings) => {
  console.log(ratings);
  const promedio = Number(
    ratings.reduce((total, next) => total + next.rating, 0) / ratings.length
  ).toFixed(1);
  return isNaN(promedio) ? "New Developer" : promedio;
};

const handleSubmit = (id_dev) => {
  const url = document.location.pathname;
  const match = url.match(/[^/?]*[^/?]/g);
  const project = parseInt(match[1]);
  const requirement = parseInt(match[2]);
  axios
    .post(
      "http://localhost:8080/requirement/assign",
      {
        id: requirement,
        id_developer: id_dev,
      },
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      window.location.href = "/projects/" + project;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Rating",
    accessor: (row) => mean(row.Ratings),
  },
  {
    Header: "$",
    accessor: "Quotations[0].value",
  },
  {
    Header: "",
    id: "links",
    Cell: ({ row }) => (
      <Button onClick={() => handleSubmit(row.values.id)} variant="link">
        Asignar
      </Button>
    ),
  },
];
