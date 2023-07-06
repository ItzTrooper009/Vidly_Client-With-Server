import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import Confirmation from "./common/confirmation";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({
    path: "title",
    order: "asc",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getGenres();
      const genres = [{ _id: "", name: "All Genres" }, ...data];
      setGenres(genres);

      const { data: moviesData } = await getMovies();
      setMovies(moviesData);
    }

    fetchData();
  }, []);

  const handleDelete = async (movie) => {
    setShowConfirmation(true);
    setMovieToDelete(movie);
  };

  const handleConfirmation = async () => {
    const originalMovies = [...movies];
    const updatedMovies = originalMovies.filter(
      (m) => m._id !== movieToDelete._id
    );
    setMovies(updatedMovies);

    try {
      await deleteMovie(movieToDelete._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted.");
      }
      setMovies(originalMovies);
    }

    setShowConfirmation(false);
    setMovieToDelete(null);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
    setMovieToDelete(null);
  };

  const handleLike = (movie) => {
    const updatedMovies = [...movies];
    const index = updatedMovies.indexOf(movie);
    updatedMovies[index] = { ...updatedMovies[index] };
    updatedMovies[index].liked = !updatedMovies[index].liked;
    setMovies(updatedMovies);
  };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setSelectedGenre(null);
    setCurrentPage(1);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const getPagedData = () => {
    const filtered = searchQuery
      ? movies.filter((m) =>
          m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      : selectedGenre && selectedGenre._id
      ? movies.filter((m) => m.genre._id === selectedGenre._id)
      : movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const paginatedMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: paginatedMovies };
  };

  const { length: count } = movies;
  const { totalCount, data: moviesToShow } = getPagedData();

  if (count === 0) return <p>There are no movies in the database.</p>;

  return (
    <div className="row">
      <div className="col-13 col-md-3 pb-3">
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={handleGenreSelect}
        />
      </div>
      <div className="col">
        <div style={{ marginBottom: "12px" }}>
          <TextField
            id="standard-helperText"
            label="Search"
            variant="standard"
            type="search"
            defaultValue={searchQuery}
            onChange={handleSearch}
            style={{ width: "80%" }}
            className="pb-2"
          />
          <Link
            to="/movies/new"
            style={{
              marginBottom: 20,
              textDecoration: "none",
              width: "20%",
            }}
          >
            <Button variant="contained" color="primary" size="medium">
              <span style={{ fontWeight: "bolder", borderRadius: "20px" }}>
                Add New Movie
              </span>
            </Button>
          </Link>
        </div>
        <p>Showing {totalCount} movies in the database.</p>
        <MoviesTable
          movies={moviesToShow}
          sortColumn={sortColumn}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={handleSort}
        />
        <Pagination
          count={Math.ceil(totalCount / pageSize)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{ pt: 2, ".MuiPaginationItem-page": { outline: "none" } }}
        />
      </div>
      {showConfirmation && (
        <Confirmation
          open={showConfirmation}
          onConfirmation={handleConfirmation}
          handleClose={handleCancelConfirmation}
          title={`Deleting "${movieToDelete.title}"`}
          confirmColor="error"
        >
          {`Please confirm to delete this Movie.`}
        </Confirmation>
      )}
    </div>
  );
};

export default Movies;
