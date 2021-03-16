import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import {
  Grid,
  List,
  Segment,
  Header,
  Image,
  Divider,
  Button,
  Card,
  Icon,
  CardGroup,
} from "semantic-ui-react";
import { Film } from "../app/models/film";
import { Movie } from "./Movie";

export const LatestMovies = () => {
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
    <Grid.Column width={9} style={{ margin: "10px" }}>
      <Card.Group centered>
        {film.map((oneFilm) => (
          <Movie oneFilm={oneFilm} />
        ))}
      </Card.Group>
    </Grid.Column>
  );
};
