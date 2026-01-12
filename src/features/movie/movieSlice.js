import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  movies: [],
  recommend: [],
  newDisney: [],
  original: [],
  trending: [],
  Marvelmovies:[],
  watchlist: [],
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
    addToWatchlist: (state, action) => {
      // Check if movie is already in watchlist
      const exists = state.watchlist.find(movie => movie.id === action.payload.id);
      if (!exists) {
        state.watchlist.push(action.payload);
      }
    },
  },
});

export const { setMovies, addToWatchlist } = movieSlice.actions;

// Selectors for specific categories
export const selectMovies = (state) => state.movie.movies;
export const selectRecommend = (state) => state.movie.recommend;
export const selectNewDisney = (state) => state.movie.newDisney;
export const selectOriginal = (state) => state.movie.original;
export const selectTrending = (state) => state.movie.trending;
export const selectMarvelmovies = (state) => state.movie.marvelmovies;
export const selectWatchlist = (state) => state.movie.watchlist;

export default movieSlice.reducer;
