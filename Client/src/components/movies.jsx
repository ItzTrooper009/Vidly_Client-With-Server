import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
// import Pagination from "./common/pagination";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
//import SearchBox from "./searchBox";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
// import auth from "../services/authService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    console.log("Genres :", data);
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    //console.log(this.state.genres);
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted.");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (e, page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      searchQuery: "",
      currentPage: 1,
    });
    //console.log(this.state.genres);
  };

  handleSearch = (e) => {
    this.setState({
      searchQuery: e.target.value,
      selectedGenre: null,
      currentPage: 1,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;
    //const user = auth.getCurrentUser();

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-13 col-md-3 pb-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
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
              onChange={this.handleSearch}
              style={{ width: "80%" }}
              className="pb-2"
            />
            {user && (
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
            )}
          </div>
          <p>Showing {totalCount} movies in the database.</p>
          {/* <SearchBox value={searchQuery} onChange={this.handleSearch} /> */}
          {/* Need to work on above shit */}
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          {/* <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          /> */}
          <Pagination
            count={Math.ceil(totalCount / pageSize)}
            page={currentPage}
            onChange={this.handlePageChange}
            color="primary"
            sx={{ pt: 2, ".MuiPaginationItem-page": { outline: "none" } }}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
