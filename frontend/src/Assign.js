import { useParams } from "react-router-dom";
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { GlobalFilter } from "./GlobalFilter.js";
import "./table.css";

import { COLUMNS } from "./columns";

function Assign(props) {
  const Requirement = useParams();
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    axios
      .post(
        "http://localhost:8080/developer/data",
        {
          id_requirement: parseInt(Requirement),
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((data) => {
        setDevelopers(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  const columns = useMemo(() => COLUMNS, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: developers,
    },
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  return (
    <div>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Assign;
