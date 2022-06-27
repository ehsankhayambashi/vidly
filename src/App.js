import React from "react";
import "./App.css";
import Movies from "./components/movies";
import { Route, Routes, Navigate } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/customers" element={<Customers />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Navigate to="/movies" />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
