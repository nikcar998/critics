import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header, List } from "semantic-ui-react";
import { Film } from "../models/film";
import { Navbar } from "./Navbar";

function App() {
  let config = {
    headers: {
      Authorization: "Bearer " + "18|o0SliifQoV49ih34zAj8THCVqHfl8kQywduP0lqN",
    },
  };

  const [film, setFilm] = useState<Film[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/film/index", config)
      .then((response) => {
        setFilm(response.data.results);
      });
  }, []);
  return (
    <List>
      <Navbar />
      {film.map((oneFilm) => (
        <List.Item key={oneFilm.id}>
          <Header as="h3" icon="film" content={oneFilm.title} />
          <List.Content>{oneFilm.overview}</List.Content>
        </List.Item>
      ))}
    </List>
  );
}

export default App;
