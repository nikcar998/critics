import { observer } from "mobx-react-lite";
import { history } from "../..";
import { Button, Grid, Header, Label, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import agent from "../api/agent";

//if the screen is  a desktop this will be shown on the left
const OptionSide = () => {
  const { filmStore, userStore } = useStore();

  const [numbOfNotifications, setNumbOfNotifications]=useState(0);

  const changeWhichMoviesToUpload = (filmKind: string) => {
    filmStore.changeWhatToLoad(filmKind);
    history.push("/");
  };

useEffect(()=>{
  agent.Notifications.countUreadNotifications().then((resp)=>{
    setNumbOfNotifications(resp)
  });
},[])

  return (
    <Grid.Column width={3}>
      <Segment.Group raised>
        {/********************* FILM SECTION  **************************/}
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
          </Button.Group>
        </Segment>
        {/********************* REVIEWS SECTION *********************************** */}
        <Segment className="itemsColor" style={{ padding: 0 }}>
          <Header
            as="h4"
            icon="th list"
            content="Reviews"
            style={{ padding: 2, marginTop: 5 }}
            color="red"
          />
          <Button.Group vertical fluid color="black">
            <Button as={Link} to="/reviews" fluid>
              Timeline
            </Button>
            <Button
               as={Link} to="/reviews/all"
              fluid
            >
              All
            </Button>
          </Button.Group>
        </Segment>
        {/*********************** PROFILE SECTION ************************* */}
        <Segment className="itemsColor" style={{ padding: 0 }}>
          <Header
            as="h4"
            icon="user outline"
            content="Profile"
            style={{ padding: 2, marginTop: 5 }}
            color="red"
          />
          <Button.Group vertical fluid color="black">
            <Button as={Link} to={"/profile/" + userStore.user?.id} fluid>
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
            <Button as={Link} to={"/profile/list/users"} fluid>
              List
            </Button>
            <Button
              as={Link}
              to="/followers"
              fluid
            >
              Followers
            </Button>
            <Button
              as={Link}
              to="/following"
              fluid
            >
              Following
            </Button>
            <Button
               as={Link} to={"/notifications"}
              fluid
            >
              Notifications

              <Label style={{margin:"auto"}} circular color="red" content={numbOfNotifications} />
            </Button>
            <Button
              onClick={() => {
                userStore.logout();
              }}
              fluid
            >
              Logout
            </Button>
          </Button.Group>
        </Segment>
      </Segment.Group>
    </Grid.Column>
  );
};

export default observer(OptionSide);
