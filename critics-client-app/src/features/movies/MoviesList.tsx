import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect, useState } from "react";
import { Grid, Card, Input, Button, Icon, GridColumn } from "semantic-ui-react";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { Movie } from "./Movie";
import { useMediaQuery } from "react-responsive";
import { ButtonGroupNextBack } from "../../app/layout/ButtonGroupNextBack";
import axios from "axios";
import agent from "../../app/api/agent";

const MoviesList = () => {
  const { filmStore } = useStore();

  const [searchedFilm, setSearchedFilm] = useState("");
  const [page, setPage] = useState(1);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedFilm(event.currentTarget.value);
    filmStore.searchFilm(searchedFilm);
  };

  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  useEffect(() => {
 
      filmStore.loadMovies();
  
  }, [filmStore, filmStore.whatToLoad, filmStore.page]);

  return (
    <Fragment>
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
        <Fragment>
          <Card.Group centered>
            {filmStore.movies.map((oneFilm) => (
              <Movie oneFilm={oneFilm} key={oneFilm.id} />
            ))}
          </Card.Group>
          <ButtonGroupNextBack store={"filmStore"} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default observer(MoviesList);
