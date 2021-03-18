import axios from "axios";
import { observer } from "mobx-react-lite";
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
  Input,
} from "semantic-ui-react";
import agent from "../app/api/agent";
import { LoadingComponent } from "../app/layout/LoadingComponent";
import { Film } from "../app/models/film";
import { useStore } from "../app/stores/store";
import { Movie } from "./Movie";
import { useMediaQuery } from "react-responsive";

const LatestMovies = () => {
  const { filmStore } = useStore();

  const [searchedFilm, setSearchedFilm] = useState("");

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedFilm(event.currentTarget.value);
    filmStore.searchFilm(searchedFilm);
  };

  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  useEffect(() => {
    filmStore.loadMovies();
  }, [filmStore, filmStore.whatToLoad]);

  return (
    <Grid.Column width={isDesktop ? 12 :15} style={{ margin: "10px" }}>
      <Input
        fluid
        icon="search"
        placeholder="Search..."
        onChange={(event) => {
          handleSearchInput(event);
        }}
        loading={filmStore.loadingInitial}
        style={{ margin: 5, marginBottom: 15 }}
      />
      {filmStore.loadingInitial ? (
        <LoadingComponent />
      ) : (
        <Card.Group centered>
          {filmStore.movies.map((oneFilm) => (
            <Movie oneFilm={oneFilm} key={oneFilm.id} />
          ))}
        </Card.Group>
      )}
    </Grid.Column>
  );
};

export default observer(LatestMovies);
