import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

const genres = ["All", "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Horror", "Mystery", "Romance", "Science Fiction", "Thriller"];

const Search = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [allMovies, setAllMovies] = useState([]); 
  const [filteredMovies, setFilteredMovies] = useState([]); 
  const [loading, setLoading] = useState(true);

  // Fetch movies from Firebase
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const db = firebase.firestore();
      const snapshot = await db.collection("movies").get();
      const fetchedMovies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAllMovies(fetchedMovies); 
      setFilteredMovies(fetchedMovies); 
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setLoading(false);
  };

  // Filter movies based on selected genre
  useEffect(() => {
    if (allMovies.length === 0) return; 
  
    let filtered = allMovies;
  
    if (selectedGenre !== "All") {
      filtered = filtered.filter((movie) => 
        typeof movie.genre === "string" && 
        movie.genre.toLowerCase() === selectedGenre.toLowerCase()
      );
    }
  
    setFilteredMovies(filtered);
  }, [selectedGenre, allMovies]);
  
  return (
    <Container>
      <h2>Select your favorite movie category:</h2>
      <DropdownContainer>
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </DropdownContainer>

      <MovieGrid>
        {loading ? (
          <p>Loading movies...</p>
        ) : filteredMovies.length > 0 ? (
          filteredMovies.map((movie, key) => (
            <MovieWrap key={movie.id || key}>
              <Link to={`/detail/${movie.id}`}>
                <img src={movie.cardImg} alt={movie.title} />
              </Link>
            </MovieWrap>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </MovieGrid>
    </Container>
  );
};

// Styled Components for UI
const Container = styled.div`
  padding: 20px;
  text-align: center;

  h2 {
    color: white;
    font-size: 22px;
    margin-bottom: 15px;
  }
`;

const DropdownContainer = styled.div`
  margin-bottom: 20px;

  select {
    padding: 10px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    background: #333;
    color: white;
    cursor: pointer;
  }
`;

const MovieGrid = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(100px, 1fr));
  }
`;

const MovieWrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;
export default Search;
