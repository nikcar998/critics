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
import agent from "../app/api/agent";
import { Film } from "../app/models/film";
import { Movie } from "./Movie";

export const LatestMovies = () => {

  const [film, setFilm] = useState<Film[]>([]);

  useEffect(() => {
    agent.Movies.list().then((response) => {
      setFilm(response.results);
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
