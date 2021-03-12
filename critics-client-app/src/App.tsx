import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

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
    <List>
      {film.map((oneFilm: any) => (
        <List.Item key={oneFilm.id}>
          <Header as="h3" icon="film" content={oneFilm.title} />
          <List.Content>{oneFilm.overview}</List.Content>
        </List.Item>
      ))}
    </List>
  );
}

export default App;
