import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Grid, Header, List, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";

const OptionSide = () => {
  const { filmStore } = useStore();

  const changeWhichMoviesToUpload = (filmKind: string) => {
    filmStore.changeWhatToLoad(filmKind);
  };
  return (
    <Grid.Column width={3}>
      <Segment.Group raised>
        {/* FILM SECTION  **********************************************/}
        <Segment className="itemsColor" style={{ padding: 0 }}>
          <Header
            as="h3"
            icon="film"
            content="Film"
            style={{ padding: 3, marginTop: 5 }}
            color="red"
          />
          <Button.Group vertical fluid color="black">
            <Button
              onClick={() => {
                changeWhichMoviesToUpload("nowPlaying");
              }}
              fluid
            >
              Now Playing
            </Button>
            <Button
              onClick={() => {
                changeWhichMoviesToUpload("popular");
              }}
              fluid
            >
              Popular
            </Button>
            <Button
              onClick={() => {
                changeWhichMoviesToUpload("top rated");
              }}
              fluid
            >
              Top Rated
            </Button>
            <Button
              onClick={() => {
                console.log("hello");
              }}
              fluid
            >
              Search
            </Button>
          </Button.Group>
        </Segment>
        {/************* REVIEWS SECTION *********************************** */}
        <Segment className="itemsColor" style={{ padding: 0 }}>
          <Header
            as="h4"
            icon="th list"
            content="Reviews"
            style={{ padding: 2, marginTop: 5 }}
            color="red"
          />
          <Button.Group vertical fluid color="black">
            <Button
              onClick={() => {
                console.log("hello");
              }}
              fluid
            >
              Timeline
            </Button>
            <Button
              onClick={() => {
                console.log("hello");
              }}
              fluid
            >
              Search
            </Button>
          </Button.Group>
        </Segment>
        {/************** PROFILE SECTION ************************* */}
        <Segment className="itemsColor" style={{ padding: 0 }}>
          <Header
            as="h4"
            icon="user outline"
            content="Profile"
            style={{ padding: 2, marginTop: 5 }}
            color="red"
          />
          <Button.Group vertical fluid color="black">
            <Button
              onClick={() => {
                console.log("hello");
              }}
              fluid
            >
              My Profile
            </Button>
            <Button
              onClick={() => {
                console.log("hello");
              }}
              fluid
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                console.log("hello");
              }}
              fluid
            >
              List
            </Button>
            <Button
              onClick={() => {
                console.log("hello");
              }}
              fluid
            >
              Search
            </Button>
            <Button
              onClick={() => {
                console.log("hello");
              }}
              fluid
            >
              <Header as="h5">Logout</Header>
            </Button>
            <Button
              onClick={() => {
                console.log("hello");
              }}
              fluid
            >
              <Header as="h5">Delete</Header>
            </Button>
          </Button.Group>
        </Segment>
      </Segment.Group>
    </Grid.Column>
  );
};

export default observer(OptionSide);
