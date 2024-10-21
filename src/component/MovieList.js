import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../MovieList.css'; // Importa los estilos

const MovieList = ({ movies, onEdit, onDelete }) => {
  return (
    <div className="movie-list-container">
      {movies.map(movie => (
        <div key={movie._id} className="movie-card">
          <h2>{movie.title}</h2>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Género:</strong> {movie.genre}</p>
          <p><strong>Fecha de Lanzamiento:</strong> {movie.releaseDate}</p>
          <p><strong>Estado:</strong> {movie.watched ? 'Visto' : 'No Visto'}</p>
          <div className="movie-actions">
            <button onClick={() => onEdit(movie)} className="action-button">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button onClick={() => onDelete(movie._id)} className="action-button delete-button">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
