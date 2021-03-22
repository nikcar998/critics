import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Input } from "semantic-ui-react";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { Movie } from "./Movie";
import { ButtonGroupNextBack } from "../../app/layout/ButtonGroupNextBack";

const MoviesList = () => {
  const { filmStore } = useStore();

  const [searchedFilm, setSearchedFilm] = useState("");

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedFilm(event.currentTarget.value);
    filmStore.searchFilm(searchedFilm);
  };

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
