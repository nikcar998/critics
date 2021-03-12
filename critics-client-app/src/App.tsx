import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  let config = {
    headers: {
      Authorization: "Bearer " + "18|o0SliifQoV49ih34zAj8THCVqHfl8kQywduP0lqN",
    },
  };
  const [film, setFilm] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/film/index", config)
      .then((response) => {
        setFilm(response.data.results);
        console.log(film);
      });
  }, []);
  return (
    <div>
      {film.map((oneFilm: any) => (
        <div
          key={oneFilm.id}
          style={{ backgroundColor: "black", color: "white" }}
        >
          <h3>{oneFilm.title}</h3>
          <p>{oneFilm.overview}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
