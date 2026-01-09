import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs 
} from "firebase/firestore";
import { 
  getAuth, 
  GoogleAuthProvider 
} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2xDLU83ZYJunxge9pqNDtuYDcAx0E9v0",
  authDomain: "disneyplus-clone-8aa92.firebaseapp.com",
  projectId: "disneyplus-clone-8aa92",
  storageBucket: "disneyplus-clone-8aa92.firebasestorage.app",
  messagingSenderId: "901033370943",
  appId: "1:901033370943:web:4847849a250aa84bf95f8a",
  measurementId: "G-65J0V52Y2P",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

// Fetch movies
const fetchMovies = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "movies"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export { auth, provider, storage, fetchMovies,db };
export default db;



/*const firebaseConfig = {
  apiKey: "AIzaSyB2xDLU83ZYJunxge9pqNDtuYDcAx0E9v0",
  authDomain: "disneyplus-clone-8aa92.firebaseapp.com",
  projectId: "disneyplus-clone-8aa92",
  storageBucket: "disneyplus-clone-8aa92.firebasestorage.app",
  messagingSenderId: "901033370943",
  appId: "1:901033370943:web:4847849a250aa84bf95f8a",
  measurementId: "G-65J0V52Y2P"
};
*/
