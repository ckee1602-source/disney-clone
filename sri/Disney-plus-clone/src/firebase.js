import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2xDLU83ZYJunxge9pqNDtuYDcAx0E9v0",
  authDomain: "disneyplus-clone-8aa92.firebaseapp.com",
  projectId: "disneyplus-clone-8aa92",
  storageBucket: "disneyplus-clone-8aa92.firebasestorage.app",
  messagingSenderId: "901033370943",
  appId: "1:901033370943:web:4847849a250aa84bf95f8a",
  measurementId: "G-65J0V52Y2P"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

// Function to fetch movie data
const fetchMovies = async () => {
  try {
    const moviesRef = db.collection("movies"); // Collection name in Firestore
    const snapshot = await moviesRef.get(); // Fetch all documents from the "movies" collection
    const moviesList = snapshot.docs.map(doc => doc.data()); // Extract the movie data from the documents
    console.log(moviesList); // Log the movie data (optional, can be removed later)
    return moviesList; // Return the list of movies
  } catch (error) {
    console.error("Error fetching movies: ", error);
    return []; // Return an empty array if there's an error
  }
};

export { auth, provider, storage, fetchMovies }; // Export the fetchMovies function
export default db;
