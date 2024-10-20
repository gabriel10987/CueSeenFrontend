import React, {useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './component/MovieList';

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
    axios.get('http://localhost:5000/movies')
    .then(res => setMovies(res.data))
    .catch(err => console.log(err));
  }, []);

  const addMovie = () => {
    const newMovie = { title, director, genre, releaseDate, watched };

    if (editMode) {
      axios.put(`http://localhost:5000/movies/${editMovieId}`, newMovie)
      .then(res => {
        setMovies(movies.map((movie) => (movie._id === editMovieId ? res.data : movie)));
        resetForm();
      })
      .catch((err) => console.log(err));
    } else {
      axios.post('http://localhost:5000/movies', newMovie)
      .then(res => setMovies([...movies, res.data]))
      .catch(err => console.log(err));
    }
    
  };

  const deleteMovie = (id) => {
    axios.delete(`http://localhost:5000/movies/${id}`)
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
    <div>
      <h1>Mi Catálogo de Películas</h1>

      <input placeholder='Título' value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder='Director' value={director} onChange={e => setDirector(e.target.value)} />
      <input placeholder='Género' value={genre} onChange={e => setGenre(e.target.value)} />
      <input placeholder='Fecha de Lanzamiento' value={releaseDate} onChange={e => setReleaseDate(e.target.value)} />
      <label>
        Visto:
        <input type='checkbox' checked={watched} onChange={() => setWatched(!watched)} />
      </label>
      <button onClick={addMovie}>
        {editMode ? 'Guardar Cambios' : 'Agregar Película'}
      </button>

      <button onClick={resetForm} style={{ marginLeft: '10px' }}>
        Cancelar
      </button>
      <MovieList movies={movies} onEdit={editMovie} onDelete={deleteMovie} />
    </div>
  );
}

export default App;