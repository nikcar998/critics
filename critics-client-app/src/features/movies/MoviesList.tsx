import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  Input,
} from "semantic-ui-react";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { Movie } from "./Movie";
import { useMediaQuery } from "react-responsive";

const MoviesList = () => {
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

export default observer(MoviesList);
