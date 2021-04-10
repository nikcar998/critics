import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Input } from "semantic-ui-react";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { Movie } from "./Movie";
import { ButtonGroupNextBack } from "../../app/layout/ButtonGroupNextBack";

//this component will show the list of movies of the chosen cathegory
//or the results of the search function
const MoviesList = () => {
  const { filmStore } = useStore();

  const [searchedFilm, setSearchedFilm] = useState("");

  //search function
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedFilm(event.currentTarget.value);
    filmStore.searchFilm(searchedFilm);
  };

  //this function simply get the movies and has "filmStore.whatToLoad" variable as dependency
  //so useEffect will be triggered when the movies category will change
  //similar thing for "filmStore.page" dependency
  useEffect(() => {
    window.scrollTo(0, 0);
    filmStore.loadMovies();
  }, [filmStore, filmStore.whatToLoad, filmStore.page]);

  return (
    <Fragment>
      {/** SEARCH INPUT */}
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
          {/** FILM LIST */}
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
