import "./App.css";
import "./styles.css";
import "./cartStyles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviesGrid from "./components/MoviesGrid";
import Watchlist from "./components/Watchlist";
import MovieDetail from "./components/MovieDetail";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import CartSidebar from "./components/CartSidebar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch("movies.json")
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  const toggleWatchlist = (movieId) => {
    setWatchlist((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
  };

  const addToCart = (movie) => {
  setCart((prev) => {
    const existingItem = prev.find((m) => m.id === movie.id);
    if (existingItem) {
      return prev.map(item =>
        item.id === movie.id 
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    }
    return [...prev, { ...movie, quantity: 1 }];
  });
  
  setShowPopup(true);
  setTimeout(() => setShowPopup(false), 1500);
};

    return (
      <div className="App">
        <div className="container">
          <Header></Header>

          <Router>
            <nav>
              <ul>
                {loggedIn && (
                  <>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/watchlist">Watchlist</Link>
                    </li>
                    <li>
                      <button onClick={() => setIsCartOpen(true)}>Cart</button>
                    </li>
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </>
                )}
                {!loggedIn && (
                  <>
                    <li>
                      <Link to="/loginpage">Login</Link>
                    </li>
                    <li>
                      <Link to="/registerpage">Register</Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>

            <Routes>
              <Route
                path="/"
                element={
                  loggedIn ? (
                    <MoviesGrid
                      watchlist={watchlist}
                      movies={movies}
                      toggleWatchlist={toggleWatchlist}
                      addToCart={addToCart}
                    />
                  ) : (
                    <Navigate to="/loginpage" />
                  )
                }
              />
              <Route
                path="/watchlist"
                element={
                  loggedIn ? (
                    <Watchlist
                      watchlist={watchlist}
                      movies={movies}
                      toggleWatchlist={toggleWatchlist}
                      addToCart={addToCart}
                    />
                  ) : (
                    <Navigate to="/loginpage" />
                  )
                }
              />
              <Route path="/movies/:id" element={<MovieDetail />} />
              <Route
                path="/loginpage"
                element={
                  loggedIn ? (
                    <Navigate to="/" />
                  ) : (
                    <LoginPage onLogin={() => setLoggedIn(true)} />
                  )
                }
              />
              <Route
                path="/registerpage"
                element={loggedIn ? <Navigate to="/" /> : <RegisterPage />}
              />
            </Routes>
          </Router>
        </div>

        <CartSidebar
          cart={cart}
          setCart={setCart}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />

        {showPopup && <div className="simple-popup">Added to Cart</div>}

        <Footer></Footer>
      </div>
    );
  };
export default App;
