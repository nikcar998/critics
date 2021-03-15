import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Grid,
  List,
  Segment,
  Header,
  Image,
  Divider,
  Button,
} from "semantic-ui-react";
import { Film } from "../app/models/film";

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
      <List style={{ margin: "10px" }}>
        {film.map((oneFilm) => {
          const imageUrl =
            "https://image.tmdb.org/t/p/w500" + oneFilm.poster_path;
          console.log(imageUrl);
          return (
            <List.Item key={oneFilm.id} style={{ margin: "5px" }}>
              <Segment>
                <Grid divided>
                  <Grid.Row>
                    <Grid.Column
                      width={3}
                      style={{ textAlign: "start", padding: 0 }}
                    >
                      <Image src={imageUrl} size="tiny" centered />
                      <Header
                        as="h5"
                        style={{ marginLeft: "5px", marginTop: "10px" }}
                      >
                        Year: {oneFilm.release_date}
                      </Header>
                    </Grid.Column>

                    <Grid.Column width={12}>
                      <Header as="h3" content={oneFilm.title} />
                      <List.Content style={{ marginTop: "10px" }}>
                        <Header as="h5" floated="left" content="Plot:" />
                        {oneFilm.overview}
                      </List.Content>
                      <List.Content style={{ marginTop: "10px" }}>
                        <Header as="h5" floated="left">
                          Rating:
                        </Header>
                        {oneFilm.vote_average}
                        
                      </List.Content>
                      <Divider horizontal >review</Divider>
                      <List.Content style={{textAlign:"center"}}>
                      <Button
                        color="blue"
                        size="mini"
                        content="Create"
                        style={{marginTop:"5px"}}
                        centered
                      />
                      </List.Content>
                      
                    
                      
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </List.Item>
          );
        })}
      </List>
    </Grid.Column>
  );
};
