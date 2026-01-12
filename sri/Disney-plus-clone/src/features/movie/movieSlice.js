import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  movies: [],
  recommend: [],
  newDisney: [],
  original: [],
  trending: [],
  Marvelmovies:[],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload.allMovies;
      state.recommend = action.payload.recommend;
      state.newDisney = action.payload.newDisney;
      state.original = action.payload.original;
      state.trending = action.payload.trending;
      state.marvelmovies = action.payload.marvelmovies;
    },
  },
});

export const { setMovies } = movieSlice.actions;

// Selectors for specific categories
export const selectMovies = (state) => state.movie.movies;
export const selectRecommend = (state) => state.movie.recommend;
export const selectNewDisney = (state) => state.movie.newDisney;
export const selectOriginal = (state) => state.movie.original;
export const selectTrending = (state) => state.movie.trending;
export const selectMarvelmovies = (state) => state.movie.marvelmovies;

export default movieSlice.reducer;
