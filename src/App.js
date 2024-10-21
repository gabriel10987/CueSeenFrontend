import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './component/MovieList';
import './App.css'; // Importa los estilos


function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [watched, setWatched] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editMovieId, setEditMovieId] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/movies`)
      .then(res => setMovies(res.data))
      .catch(err => console.log(err));
  }, []);

  const addMovie = () => {
    const newMovie = { title, director, genre, releaseDate, watched };

    if (editMode) {
      axios.put(`${process.env.REACT_APP_API_URL}/movies/${editMovieId}`, newMovie)
        .then(res => {
          setMovies(movies.map((movie) => (movie._id === editMovieId ? res.data : movie)));
          resetForm();
        })
        .catch((err) => console.log(err));
    } else {
      axios.post(`${process.env.REACT_APP_API_URL}/movies`, newMovie)
        .then(res => {
          setMovies([...movies, res.data]);
          resetForm();
        })
        .catch(err => console.log(err));
    }
  };

  const deleteMovie = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/movies/${id}`)
      .then(() => setMovies(movies.filter((movie) => movie._id !== id)))
      .catch((err) => console.log(err));
  };

  const editMovie = (movie) => {
    setTitle(movie.title);
    setDirector(movie.director);
    setGenre(movie.genre);
    setReleaseDate(movie.releaseDate);
    setWatched(movie.watched);
    setEditMode(true);
    setEditMovieId(movie._id);
  };

  const resetForm = () => {
    setTitle('');
    setDirector('');
    setGenre('');
    setReleaseDate('');
    setWatched(false);
    setEditMode(false);
    setEditMovieId(null);
  };

  return (
    <div className="app-container">
      <h1>Mi Catálogo de Películas</h1>
      <div className="main-content">
        <div className="form-section">
          <input
            placeholder="Título"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="input-field"
          />
          <input
            placeholder="Director"
            value={director}
            onChange={e => setDirector(e.target.value)}
            className="input-field"
          />
          <input
            placeholder="Género"
            value={genre}
            onChange={e => setGenre(e.target.value)}
            className="input-field"
          />
          <input
            placeholder="Fecha de Lanzamiento"
            value={releaseDate}
            onChange={e => setReleaseDate(e.target.value)}
            className="input-field"
            type="date"
          />
          <label className="checkbox-container">
            Visto:
            <input
              type="checkbox"
              checked={watched}
              onChange={() => setWatched(!watched)}
              className="checkbox"
            />
          </label>

          <div className="button-container">
            <button className="primary-button" onClick={addMovie}>
              {editMode ? 'Guardar Cambios' : 'Agregar Película'}
            </button>
            <button className="secondary-button" onClick={resetForm}>
              Cancelar
            </button>
          </div>
        </div>

        <MovieList movies={movies} onEdit={editMovie} onDelete={deleteMovie} />
      </div>
    </div>
  );
}

export default App;
