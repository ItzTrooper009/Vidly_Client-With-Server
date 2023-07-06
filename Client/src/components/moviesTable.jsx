import React from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";
import auth from "../services/authService";
import { Button } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const MoviesTable = ({ movies, onSort, sortColumn, onLike, onDelete }) => {
  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => {
        return auth.getCurrentUser() ? (
          auth.isAdmin() ? (
            <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
          ) : (
            <p>{movie.title}</p>
          )
        ) : (
          <p>{movie.title}</p>
        );
      },
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => {
        return auth.isAdmin() ? (
          <Button
            onClick={() => onDelete(movie)}
            variant="contained"
            color="error"
            size="small"
            endIcon={<DeleteForeverOutlinedIcon />}
          >
            Delete
          </Button>
        ) : (
          <Button
            onClick={() => onDelete(movie)}
            variant="contained"
            color="error"
            size="small"
            endIcon={<DeleteForeverOutlinedIcon />}
            disabled
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      data={movies}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default MoviesTable;
