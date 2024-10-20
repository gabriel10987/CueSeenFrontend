import React from "react";

const MovieList = ({ movies, onEdit, onDelete }) => {
    return (
        <ul>
            {movies.map(movie => (
                <li key={movie._id}>
                    {movie.title} - {movie.director} ({movie.releaseDate}) - {movie.watched ? 'Visto' : 'No Visto'}
                    <button onClick={() => onEdit(movie)}> Editar </button>
                    <button onClick={() => onDelete(movie._id)}> Eliminar </button>
                </li>
            ))}
        </ul>
    );
};

export default MovieList;