import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";
import auth from "../services/authService";
import { Button } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => {
        return auth.getCurrentUser() ? (
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        ) : (
          <p>{movie.title}</p>
        );
        // return <Link to={`/movies/${movie._id}`}>{movie.title}</Link>;
      },
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => {
        return auth.isAdmin() ? (
          <Button
            onClick={() => this.props.onDelete(movie)}
            variant="contained"
            color="error"
            size="small"
            endIcon={<DeleteForeverOutlinedIcon />}
          >
            Delete
          </Button>
        ) : null;
      },
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    // if (!user || !user.isAdmin) {
    //   this.columns.pop();
    // }

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
