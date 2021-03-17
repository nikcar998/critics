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
} from "semantic-ui-react";
import agent from "../app/api/agent";
import { LoadingComponent } from "../app/layout/LoadingComponent";
import { Film } from "../app/models/film";
import { useStore } from "../app/stores/store";
import { Movie } from "./Movie";

const LatestMovies = () => {
  const { filmStore } = useStore();

  useEffect(() => {
    filmStore.loadLatest();
  }, [filmStore]);

  //if (filmStore.loadingInitial) return <LoadingComponent />;
  return (
    <Grid.Column width={9} style={{ margin: "10px" }}>
      {filmStore.loadingInitial ? (
        <LoadingComponent />
      ) : (
        <Card.Group centered>
          {filmStore.movies.map((oneFilm) => (
            <Movie oneFilm={oneFilm} key={oneFilm.id}/>
          ))}
        </Card.Group>
      )}
    </Grid.Column>
  );
};

export default observer(LatestMovies);
